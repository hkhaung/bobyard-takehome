from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
import sqlite3
import datetime


app = Flask(__name__)
CORS(app)

DEFAULT_AUTHOR = "admin"


def get_db_connection():
    conn = sqlite3.connect("data.db")
    conn.row_factory = sqlite3.Row
    return conn


@app.route("/api/comments/<int:id>", methods=["PUT"])
def edit_comment(id):
    data = request.get_json()
    new_text = data.get("text")

    if new_text is None:
        return jsonify({"error": "No fields to update"}), 400

    try:
        conn = get_db_connection()

        comment = conn.execute("SELECT * FROM comments WHERE id = ?", (id,)).fetchone()
        if comment is None:
            conn.close()
            return jsonify({"error": "Comment does not exist"}), 400

        conn.execute("UPDATE comments SET text = ? WHERE id = ?", (new_text, id))

        conn.commit()
        return jsonify({"message": "Comment updated!"})
    except:
        conn.rollback()
        return jsonify({"error": "Error occurred when editing comment"}), 400
    finally:
        conn.close()


@app.route("/api/comments", methods=["POST", "OPTIONS"])
def add_comment():
    if request.method == "OPTIONS":
        return ("", 204)
    
    payload = request.get_json()
    text = payload.get("text")
    if not text:
        return jsonify({"error": "No text"}), 400

    try:
        date = datetime.datetime.now().isoformat()

        conn = get_db_connection()
        cursor = conn.execute("INSERT INTO comments (author, text, date) VALUES (?) (?) (?)", (DEFAULT_AUTHOR, text, date,))
        conn.commit()

        last_id = cursor.lastrowid
        new_comment = conn.execute("SELECT * FROM comments WHERE id = ?", (last_id,)).fetchone()

        return jsonify(dict(new_comment)), 200
    except:
        conn.rollback()
        return jsonify({"error": "Error occurred when adding comment"}), 400
    finally:
        conn.close()


@app.route("/api/comments/<string:id>")
def delete_comment(id):
    try:
        conn = get_db_connection()
        conn.execute("DELETE FROM comments WHERE id = ?", (id,))
        conn.commit()
        return jsonify(message=f"Comment with id {id} deleted"), 200
    except:
        conn.rollback()
        return jsonify({"error": "Error occurred when adding comment"}), 400
    finally:
        conn.close()



@app.route("/api/comments", methods=["GET"])
def list_all_comments():
    try:
        conn = get_db_connection()
        rows = conn.execute("SELECT * FROM comments").fetchall()
        comments = [dict(row) for row in rows]
        return jsonify(comments), 200
    except:
        return jsonify({"error": "Error occurred when adding comment"}), 400
    finally:
        conn.close()



if __name__ == "__main__":
    app.run(debug=True, port=5000)
