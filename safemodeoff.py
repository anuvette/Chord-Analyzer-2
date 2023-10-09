def safemodeoff(cur):
    sql = "SET SQL_SAFE_UPDATES = 0"
    cur.execute(sql)
    
def get_isadmin_status(username, cur):
    try:

        query = "SELECT isadmin FROM user_details WHERE username = %s"


        cur.execute(query, (username,))


        isadmin_status = cur.fetchone()

        if isadmin_status is not None:
            return isadmin_status[0]  # Return the isadmin status
        else:
            return None

    except Exception as e:
        print("Error:", e)
        return None
