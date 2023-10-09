def recursiveDelete(comment_id, cur):
    # Fetch all child comments
    cur.execute("SELECT commentid FROM comment_details WHERE parentid = %s", (comment_id,))
    child_comments = [row[0] for row in cur.fetchall()]

    # Recursively delete child comments
    for child_comment_id in child_comments:
        recursiveDelete(child_comment_id, cur)

    # Delete the comment
    cur.execute("DELETE FROM comment_details WHERE commentid = %s", (comment_id,))
    
