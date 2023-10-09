from flask import Flask, render_template, url_for, request, jsonify, make_response, session, redirect, send_from_directory
from flask_mail import Mail, Message
from flask_mysqldb import MySQL
from safemodeoff import safemodeoff,get_isadmin_status
from datetime import datetime, timedelta
from dotenv import load_dotenv
from recursiveDelete import recursiveDelete
import bcrypt
import secrets
import os


app  = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")


app.config['MYSQL_HOST'] = "localhost"
app.config['MYSQL_USER'] = os.getenv("SQL_USER")
app.config['MYSQL_PASSWORD'] = os.getenv("SQL_KEY")
app.config['MYSQL_DB'] = os.getenv("SQL_DB")

mysql = MySQL(app)

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT']=587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME']='thisisanuxoxo@gmail.com'
app.config['MAIL_PASSWORD']=os.getenv("MAIL_KEY")
app.config['MAIL_DEFAULT_SENDER'] = 'noreply@chordanalyzer.com'

app.config['SESSION_COOKIE_HTTPONLY'] = True  # Prevent JavaScript access to the cookie
app.config['SESSION_COOKIE_SECURE'] = True  # Use secure cookies (HTTPS only)
app.config['SESSION_COOKIE_SAMESITE'] = 'Strict' 

mail = Mail(app)


@app.route('/')
@app.route('/home.html')
@app.route('/Home.html')
def index():
    if 'username' in session:
        logged_in = True
        username = session['username']
    else:
        logged_in = False
        username = None
    return render_template('Home.html' , logged_in=logged_in, username=username)

@app.route('/login.html')
@app.route('/Login.html')
def loginpage():
    if 'username' in session:
        return redirect('/Home.html')
    return render_template('Login.html')


@app.route('/forum.html')
@app.route('/Forum.html')
def forumpage():
    if 'username' in session:
        logged_in = True
        username = session['username']
    else:
        logged_in = False
        username = None
    return render_template('Forum.html' , logged_in=logged_in, username=username)

@app.route('/analyze.html')
@app.route('/Analyze.html')
def analyzepage():
    if 'username' in session:
        logged_in = True
        username = session['username']
    else:
        logged_in = False
        username = None
    return render_template('Analyze.html' , logged_in=logged_in, username=username)

@app.route('/PinnedHowTo.html')
@app.route('/pinnedhowto.html')
@app.route('/Pinnedhowto.html')
def pinnedhowtopage():
    if 'username' in session:
        logged_in = True
        username = session['username']
    else:
        logged_in = False
        username = None
    return render_template('PinnedHowTo.html' , logged_in=logged_in, username=username)

@app.route('/newpost.html')
@app.route('/NewPost.html')
def newpostpage():
    if 'username' in session:
        logged_in = True
        username = session['username']
    
        return render_template('NewPost.html',logged_in=logged_in, username=username)

    else:
        logged_in = False
        username = None
        return redirect('/Login.html')
    
@app.route('/Post.html/post')
@app.route('/post.html/post')
def PostPage():
    if 'username' in session:
        logged_in = True
        username = session['username']
        postId = request.args.get('id')
        return render_template('Post.html',logged_in=logged_in, username=username)

    else:
        logged_in = False
        username = None
        return redirect('/Login.html')
    
@app.route('/YourPosts.html')
@app.route('/YourPosts.html')
def YourPostsPage():
    if 'username' in session:
        logged_in = True
        username = session['username']
        return render_template('YourPosts.html',logged_in=logged_in, username=username)
    else:
        logged_in = False
        username = None
        return redirect('/Login.html')
    
@app.route('/Settings.html')
@app.route('/settings.html')
def SettingsPage():
    if 'username' in session:
        logged_in = True
        username = session['username']
        
        cur = mysql.connection.cursor()
        getEmailPictureQuery = "SELECT email,ProPicName FROM user_details WHERE username = %s;"
        cur.execute(getEmailPictureQuery, (username,))
        details = cur.fetchone()
        email = details[0]
        profilepicture = details[1]

        # You can retrieve the isadmin status here using the get_isadmin_status function
        isadmin = get_isadmin_status(username, cur)
        cur.close()


        return render_template('/Settings.html', logged_in=logged_in, username=username, email=email, profilepicture=profilepicture, isadmin=isadmin)
    else:
        logged_in = False
        username = None
        return redirect('/Login.html')
    
@app.route('/admin.html')
@app.route('/Admin.html')
def AdminPage():
    if 'username' in session:
        username = session['username']

        cur=mysql.connection.cursor()
        isadmin_status = get_isadmin_status(username,cur)

        if isadmin_status == 1:
            logged_in = True
            cur.close()
            return render_template('Admin.html', logged_in=logged_in, username=username)
        else:
            logged_in = False
            return redirect('Home.html')
    else:
        logged_in = False
        return redirect('Login.html')


@app.route('/register', methods=['POST'])
def register():
    json_data = request.get_json()
    
    
    rusername = json_data.get('rusername')
    salt = bcrypt.gensalt()
    rpassword = bcrypt.hashpw(json_data.get('rpassword').encode('utf-8'), salt) 
    remail = json_data.get('remail')
    verification_token = rusername+secrets.token_hex(32)
    
    # print(remail)
    # print(rpassword)
    # print(rusername)
    
    cur = mysql.connection.cursor()
    chk_dup_user = "SELECT username FROM user_details WHERE username = %s"
    cur.execute(chk_dup_user, (rusername,))
    existing_username = cur.fetchone()
    if existing_username:
        cur.close()
        return "Username Already Taken. Choose a different username!"
    
    chk_dup_mail = "SELECT email FROM user_details WHERE email = %s"
    cur.execute(chk_dup_mail, (remail,))
    existing_mail = cur.fetchone()
    if existing_mail:
        cur.close()
        return "Email already in use. Choose a different Email!"

    sql = "INSERT INTO user_details (username, password, email, verification_token) VALUES (%s, %s, %s, %s)"
    cur.execute(sql,(rusername, rpassword, remail, verification_token))
    mysql.connection.commit()
    
    msg = Message("Verification Chord Analyzer", sender = 'noreply@chordanalyzer.com', recipients=[remail])
    msg.html = f"Hey {rusername},<br><br>Your Verification Link is:<br><br><a href='http://localhost:8000/verify?verification_token={verification_token}'>Click Here To Verify!</a>"
    
    try:
        mail.send(msg)
        cur.close()
        return "Email Sent Successfully. Please reload your page!"
    except Exception as e:
        safemodeoff(cur)
        delete_bogus_data = "DELETE FROM user_details where username=%s"
        cur.execute(delete_bogus_data,(rusername,))
        mysql.connection.commit()
        cur.close()
        return f"Email doesn't exist. Enter a valid mail!"
    
    
@app.route('/verify', methods=['GET'])
def verify_token():
    
    verification_token = request.args.get('verification_token')
    # print("token="+verification_token)

    
    cur = mysql.connection.cursor()
    username = verification_token[:-64]
    # print("username="+username)
    # print("token="+verification_token)
    sql = "SELECT verification_token FROM user_details where username= %s"
    cur.execute(sql, (username,))
    expected_token = cur.fetchone()
    # print(expected_token)
    if expected_token is not None:
        expected_token = expected_token[0]
    # print("expected token="+expected_token)
    
     
    if verification_token == expected_token:
        update_sql = "UPDATE user_details SET verification_status = 1 WHERE username = %s"
        cur.execute(update_sql, (username,))
        mysql.connection.commit()
        cur.close()
        verification_success = True

    else:
        safemodeoff(cur)
        delete_bogus_data = "DELETE FROM user_details where username=%s"
        cur.execute(delete_bogus_data,(username,))
        mysql.connection.commit()
        cur.close()
        verification_success = False
    return render_template('verification.html', verification_success=verification_success)
    
    
@app.route('/login', methods=['POST']) # login data route
def login():
    if 'username' in session:
        return "Already logged in!"

    json_data = request.get_json()
    lusername = json_data.get('lusername')
    lpassword = json_data.get('lpassword')

    # Check if either lusername or lpassword is empty
    if not lusername or not lpassword:
        return "Fields cannot be empty"

    cur = mysql.connection.cursor()
    query = "SELECT COUNT(*) FROM user_details WHERE username = %s"
    cur.execute(query, (lusername,))
    count = cur.fetchone()[0]

    if count > 0:
        query = "SELECT isdeleted, isbanned, password FROM user_details WHERE username = %s"
        cur.execute(query, (lusername,))
        user_data = cur.fetchone()
        is_deleted = user_data[0]
        is_banned = user_data[1]
        hashed_password = user_data[2].encode('utf-8')

        if is_banned:
            return "Account was banned!"

        if is_deleted:
            return "Account was deleted!"

        if bcrypt.checkpw(lpassword.encode('utf-8'), hashed_password):
            session['username'] = lusername
            return "Login Successful!"
        else:
            return "Wrong Password!"

    return "Username doesn't exist", 404


@app.route('/postThread', methods=['POST'])   #this is for posting stuff to the forum
def postThread():
    try:
        title = request.json.get('title')
        body = request.json.get('post')
        postdate = request.json.get('date')
        # Access the username from the session
        username = session.get('username')
        
        cur = mysql.connection.cursor()
        getuserIDquery= "SELECT user_id FROM user_details where username = %s"
        cur.execute(getuserIDquery,(username,))
        user_id = cur.fetchone()[0]  # Fetch the user_id
        
        createpostquery = "INSERT INTO forum_details (user_id, title, body, postdate) VALUES (%s, %s, %s, %s)"
        cur.execute(createpostquery, (user_id, title, body, postdate,))
        mysql.connection.commit()

        cur.close()

        return redirect('Forum.html')
    
    except Exception as e:
        return str(e)
    

@app.route('/getProfilePic/<string:profile_pic_name>', methods=['GET'])
def get_profile_pic(profile_pic_name):
    if profile_pic_name == 'trashcan.png':
        # Serve a different image (e.g., 'img/trashcan.png')
        return send_from_directory('static', f'img/{profile_pic_name}')
    else:
        # Serve the profile picture from 'IMG/profilepic'
        profile_pic_path = f'IMG/profilepic/{profile_pic_name}'
        return send_from_directory('static', profile_pic_path)

@app.route('/getForumData', methods=['GET']) 
def getForumData():
    cur = mysql.connection.cursor()
    getPostDetailsQuery = """
        SELECT
            f.post_id,
            f.title,
            f.postdate,
            u.username,
            u.propicname,
            f.likes_total,
            f.dislikes_total
        FROM forum_details f
        LEFT JOIN user_details u ON f.user_id = u.user_id;
    """
    
    getLikeDetailsQuery = """
        SELECT
            ld.post_id,
            ld.user_id,
            u.username,
            ld.like_status
        FROM like_details ld
        LEFT JOIN user_details u ON ld.user_id = u.user_id;
    """
        
    cur.execute(getPostDetailsQuery)
    
    myData = cur.fetchall()
    totality = []
    
    cur.execute(getLikeDetailsQuery)
    
    likeData = cur.fetchall()
    likeTotality=[]


    if 'username' in session:
        logged_in = True
        username = session['username']
    else:
        logged_in = False
        username = None

    for row in myData:
        post = {
            "post_id": row[0],
            "title": row[1],
            "date": row[2].strftime('%Y-%m-%d'),
            "username": row[3] if row[3] is not None else "[deleted]",
            "Pic_Path": row[4] if row[4] is not None else 'animetest.png',
            "logged_in": logged_in,
            "session_username": username,
            "likes_total": row[5],
            "dislikes_total": row[6],  
        }
        totality.append(post)
        
    for row in likeData:
        likes = {
            "likes_post_id": row[0],
            "likes_user_id": row[1],
            "likes_username": row[2],
            "likes_status": row[3]
        }
        
        likeTotality.append(likes)

    return jsonify({"forum_data": totality, "like_data": likeTotality })

@app.route('/YourPosts', methods=['GET'])
def YourPosts():
    if 'username' not in session:
        return redirect('login.html')

    logged_in = True
    username = session['username']

    cur = mysql.connection.cursor()
    getPostDetailsQuery = """
        SELECT
            f.post_id,
            f.title,
            f.postdate,
            u.username,
            u.propicname,
            f.likes_total,
            f.dislikes_total
        FROM forum_details f
        LEFT JOIN user_details u ON f.user_id = u.user_id
        WHERE u.username = %s;
    """

    getLikeDetailsQuery = """
        SELECT
            ld.post_id,
            ld.user_id,
            u.username,
            ld.like_status
        FROM like_details ld
        LEFT JOIN user_details u ON ld.user_id = u.user_id
        WHERE u.username = %s;
    """

    cur.execute(getPostDetailsQuery, (session['username'],))
    myData = cur.fetchall()
    totality = []

    cur.execute(getLikeDetailsQuery, (session['username'],))
    likeData = cur.fetchall()
    likeTotality = []

    for row in myData:
        post = {
            "post_id": row[0],
            "title": row[1],
            "date": row[2].strftime('%Y-%m-%d'),
            "username": row[3] if row[3] is not None else "[deleted]",
            "Pic_Path": row[4] if row[4] is not None else 'animetest.png',
            "logged_in": logged_in,
            "session_username": username,
            "likes_total": row[5],
            "dislikes_total": row[6],
        }
        totality.append(post)

    for row in likeData:
        likes = {
            "likes_post_id": row[0],
            "likes_user_id": row[1],
            "likes_username": row[2],
            "likes_status": row[3]
        }
        likeTotality.append(likes)

    return jsonify({"forum_data": totality, "like_data": likeTotality})


@app.route('/PostData/', methods=['GET'])
def getPostData():
    post_id = request.args.get('id')
    cur = mysql.connection.cursor()

    # Retrieve post data
    retrievePostQuery = """
        SELECT f.title, f.body, f.postdate, u.username
        FROM forum_details f
        LEFT JOIN user_details u ON f.user_id = u.user_id
        WHERE post_id = %s;
    """
    cur.execute(retrievePostQuery, (post_id,))
    post_data = cur.fetchone()
    post_response_data = {
        "title": post_data[0],
        "body": post_data[1],
        "date": post_data[2].strftime("%Y-%m-%d"),
        "username": post_data[3] if post_data[3] is not None else "[deleted]"
    }

    # Retrieve comments for the post
    retrieveCommentsQuery = """
        SELECT c.commentid, c.parentid, c.body, c.date, c.likes, c.dislikes, u.username
        FROM comment_details c
        LEFT JOIN user_details u ON c.userid = u.user_id
        WHERE c.postid = %s;
    """
    cur.execute(retrieveCommentsQuery, (post_id,))
    comments_data = cur.fetchall()
    comments_response_data = []

    for comment in comments_data:
        comment_response = {
            "commentid": comment[0],
            "parentid": comment[1],
            "body": comment[2],
            "date": comment[3].strftime("%Y-%m-%d"),
            "like": comment[4],
            "dislike": comment[5],
            "username": comment[6] if comment[6] is not None else "[deleted]",
        }
        comments_response_data.append(comment_response)

    response_data = {
        "post": post_response_data,
        "comments": comments_response_data,
        "current_user": session['username']
    }

    cur.close()
    #print(response_data["current_user"])
    return jsonify(response_data)

@app.route('/LikeDislike', methods=['POST'])
def LikeDislikes():
    # Check if the request contains JSON data
    if not request.is_json:
        return jsonify({'error': 'Invalid JSON data'}), 400
    
    
    data = request.get_json()
    #print("Im coming in from line 424 fam")
    #print(data)
    post_id = data.get('data-post-id')
    aria_pressed = data.get('aria-pressed')
    aria_label = data.get('aria-label')

    if 'username' in session:
        username = session['username']

        # Retrieve the user_id for the logged-in user
        cursor = mysql.connection.cursor()
        cursor.execute("SET SQL_SAFE_UPDATES = 0;")
        query = "SELECT user_id FROM user_details WHERE username = %s;"
        cursor.execute(query, (username,))
        result = cursor.fetchone()

        if result:
            user_id = result[0]

            try:
                if aria_pressed == 'true' and aria_label == 'like-button':
                    # Insert the like into the like_details table
                    cursor.execute(
                        """
                        INSERT INTO like_details (post_id, user_id, like_status)
                        VALUES (%s, %s, 'like')
                        ON DUPLICATE KEY UPDATE like_status = 'like';
                        """,
                        (post_id, user_id)
                    )
                elif aria_pressed == 'false' and aria_label == 'like-button':
                    cursor.execute(
                        "DELETE FROM like_details WHERE post_id = %s AND user_id = %s AND like_status = %s;",
                        (post_id, user_id, 'like',)
                    )
                elif aria_pressed =='true' and aria_label == 'dislike-button':
                    # Insert the dislike into the like_details table
                    cursor.execute(
                        """
                        INSERT INTO like_details (post_id, user_id, like_status)
                        VALUES (%s, %s, 'dislike')
                        ON DUPLICATE KEY UPDATE like_status = 'dislike';
                        """,
                        (post_id, user_id)
                    )
                elif aria_pressed =='false' and aria_label == 'dislike-button':
                    # Delete the dislike from the like_details table
                    cursor.execute(
                        "DELETE FROM like_details WHERE post_id = %s AND user_id = %s AND like_status = %s;",
                        (post_id, user_id, 'dislike',)
                    )


                mysql.connection.commit()
            except Exception as e:
                # Handle exceptions here
                return jsonify({'error': str(e)}), 500
            finally:
                cursor.execute("""
                    UPDATE forum_details AS fd
                    SET likes_total = (
                        SELECT IFNULL(SUM(1), 0)
                        FROM like_details AS ld
                        WHERE ld.post_id = fd.post_id
                        AND ld.like_status = 'like'
                    );
                """)
                
                cursor.execute("""
                    UPDATE forum_details AS fd
                    SET dislikes_total = (
                        SELECT IFNULL(SUM(1), 0)
                        FROM like_details AS ld
                        WHERE ld.post_id = fd.post_id
                        AND ld.like_status = 'dislike'
                    );
                """)

                mysql.connection.commit()
                cursor.execute("SELECT likes_total, dislikes_total FROM forum_details WHERE post_id = %s;", (post_id,))
                counts = cursor.fetchone()
                # Re-enable safe update mode and close the cursor
                cursor.execute("SET SQL_SAFE_UPDATES = 1")
                cursor.close()
                
                return jsonify({'message': 'Like/Dislike action saved successfully','likes_total': counts[0], 'dislikes_total': counts[1] }), 200
        else:
            return jsonify({'error': 'User not found'}), 404
    else:
        return jsonify({'error': 'Not logged in'}), 401


@app.route('/postComment', methods=['POST'])
def postComment():
    try:
        # Check if 'username' is in the session
        if 'username' not in session:
            return redirect('/Home.html')  # Redirect to /Home.html

        # Get the username from the session
        username = session['username']

        # Get the postId from the query parameter
        post_id = request.args.get('postId')

        if not post_id:
            return jsonify({"error": "postId not found in query parameters"}), 400

        # Get the JSON data from the request body
        data = request.json

        # Convert the date string to MySQL DATETIME format
        date_string = data['date']
        date_obj = datetime.strptime(date_string, '%m/%d/%Y, %I:%M:%S %p')
        formatted_date = date_obj.strftime('%Y-%m-%d %H:%M:%S')
        
        print(formatted_date)

        # Create a database cursor
        cur = mysql.connection.cursor()

        # Execute a SQL query to retrieve the userId based on the username from the session
        query = "SELECT user_id FROM user_details WHERE username = %s"
        cur.execute(query, (username,))
        
        user_id = cur.fetchone()

        if not user_id:
            return jsonify({"error": "User not found"}), 404

        # user_id is a tuple, so we extract the first element (the userId)
        user_id = user_id[0]

        # Insert the data into the comment_details table
        insert_query = """
        INSERT INTO comment_details (parentid, userid, postid, body, date)
        VALUES (%s, %s, %s, %s, %s)
        """
        cur.execute(insert_query, (data['parentid'], user_id, post_id, data['body'], formatted_date))
        mysql.connection.commit()

        return jsonify("Comment Received and Stored Successfully!"), 200
    except Exception as e:
        return str(e), 400
    finally:
        cur.close()
        
@app.route('/deleteComment', methods=['POST'])
def deleteComment():
    try:
        comment_id = request.json.get('commentId')
        parent_id = request.json.get('parentId')

        cur = mysql.connection.cursor()

        # Fetch all child comments
        cur.execute("SELECT commentid FROM comment_details WHERE parentid = %s", (comment_id,))
        child_comments = [row[0] for row in cur.fetchall()]

        # Recursively delete child comments
        for child_comment_id in child_comments:
            recursiveDelete(child_comment_id, cur)

        # Delete the original comment
        cur.execute("DELETE FROM comment_details WHERE commentid = %s", (comment_id,))
        mysql.connection.commit()
        cur.close()
        mysql.connection.close()

        return jsonify("Successful"), 200
    except Exception as e:
        return str(e), 400
    


@app.route('/ProfilePicture', methods=['POST'])
def changeprofilepic():
    if 'profilePicture' not in request.files:
        return "Upload a valid picture!"
    profilepic = request.files['profilePicture']
    
    username = session['username']
    
    upload_folder = 'static/IMG/ProfilePic/'
    if not os.path.exists(upload_folder):
        os.makedirs(upload_folder)
    file_path = os.path.join(upload_folder, f"{username}.png")
    profilepic.save(file_path)   
    
    uploadProfilePicQuery = "UPDATE user_details SET ProPicName=%s WHERE username=%s;"
    cur = mysql.connection.cursor()
    cur.execute(uploadProfilePicQuery, (f"{username}.png", username,))
    mysql.connection.commit()
    cur.close()
    
    return "Profile Picture Uploaded Successfully!"

@app.route('/ChangeUsername', methods=['PUT'])
def changeUserName():
    if 'username' not in session:
        return "Denied"
    
    new_username = request.data.decode('utf-8')
    if not new_username:
        return "New username cannot be empty"
    
    cur = mysql.connection.cursor()
    cur.execute("SELECT username FROM user_details WHERE username = %s", (new_username,))
    existing_username = cur.fetchone()
    
    if existing_username is not None:
        return "Username Taken!", 409
    
    
    username = session['username']
    
    changePasswordQuery="UPDATE user_details SET username=%s WHERE username=%s;"
    cur=mysql.connection.cursor()
    cur.execute(changePasswordQuery, (new_username, username,))
    mysql.connection.commit()
    cur.close()
    
    session['username'] = new_username
        
    return "username Changed Successfully!"

@app.route('/ChangePassword', methods=['PUT'])
def changePassword():
    if 'username' not in session:
        return "Denied"
    
    password = request.data
    if not password:
        return "New password cannot be empty"
    
    username = session['username']
    salt = bcrypt.gensalt()
    password = bcrypt.hashpw(password, salt) 
    
    changePasswordQuery="UPDATE user_details SET password=%s WHERE username=%s;"
    cur=mysql.connection.cursor()
    cur.execute(changePasswordQuery, (password, username,))
    mysql.connection.commit()
    cur.close()
    return "Password Changed Successfully!"

    


@app.route('/logout', methods=['GET'])
def logout():
    if 'username' in session:
        session.pop('username', None)
        response = make_response("Logged out successfully")
        # expiration_date = datetime.now() - timedelta(days=1)  # Set the expiration date to the past.
        # response.set_cookie('session', '', expires=expiration_date)
        
        return response
    else:
        return "You are not logged in"
    
    
@app.route('/admin', methods=['GET'])
def admin_get():
    try:
        if 'username' in session:
            username = session['username']
            cur = mysql.connection.cursor()
            isadmin = get_isadmin_status(username, cur)
            if isadmin == 1:
                query = "SELECT username, email, isdeleted, isbanned FROM user_details"
                cur.execute(query)
                results = cur.fetchall()
                data = []
                for row in results:
                    username, email, isdeleted, isbanned = row
                    user_data = {
                        "username": username,
                        "email": email,
                        "isdeleted": isdeleted,
                        "isbanned": isbanned
                    }
                    data.append(user_data)
                # print(data)
                return jsonify(data)
        cur.close()
        return jsonify({"error": "Unauthorized"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/admindata', methods=['POST'])
def admin_post():
    try:
        if 'username' in session:
            username = session['username']
            cur = mysql.connection.cursor()
            isadmin = get_isadmin_status(username, cur)
            
            if isadmin == 1:
                data = request.json
                # print(data)

                if not data:
                    return jsonify({"message": "Data updated successfully"})

                for entry in data:
                    if entry['status'] == 'banned':
                        # print(entry['username'])
                        update_query = "UPDATE user_details SET isbanned = 1 WHERE username = %s"
                        cur.execute(update_query, (entry['username'],))
                    elif entry['status'] == 'active':
                        update_query = "UPDATE user_details SET isbanned = 0 WHERE username = %s"
                        cur.execute(update_query, (entry['username'],))

                mysql.connection.commit()
                cur.close()
                return jsonify({"message": "Data updated successfully"})
            
            cur.close()
            return jsonify({"error": "Unauthorized"}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"error": "Bad Request"}), 400
    
    
        
@app.route('/DeletePost', methods=["DELETE"])
def delete_post():
    if 'username' in session:
        try:
            post_id = int(request.data.decode("utf-8"))
        except ValueError:
            return "Invalid post_id format"
        cur = mysql.connection.cursor()
        update_query = "DELETE FROM forum_details WHERE post_id = %s"
        cur.execute(update_query, (post_id,))
        mysql.connection.commit()
        cur.close()
        
        return "Deleted Successfully!",200
    
    return "You aren't logged in!"
    
    
    
@app.route('/delete', methods=["DELETE"])
def deleteaccount():
    if 'username' in session:
        cur = mysql.connection.cursor()
        update_query = "UPDATE user_details SET isdeleted = 1 WHERE username = %s"
        cur.execute(update_query, (session['username'],))
        mysql.connection.commit()
        cur.close()
        
        session.pop('username', None)
        return "Deleted Successfully!"
    
    return "You aren't logged in!"
    
    


if __name__ ==  "__main__":
    #app.run(debug=True, port=8000)  
    app.run(debug=True, host='0.0.0.0', port=8000)
    
    
    