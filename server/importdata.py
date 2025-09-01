import json
import sqlite3

with open("comments.json", "r") as f:
    data = json.load(f)

conn = sqlite3.connect("data.db")
cur = conn.cursor()

cur.execute("""
CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author TEXT,
    text TEXT,
    date TEXT,
    likes INTEGER DEFAULT 0,
    image TEXT
)
""")

for item in data["comments"]:
    cur.execute("""
    INSERT OR REPLACE INTO comments (id, author, text, date, likes, image)
    VALUES (?, ?, ?, ?, ?, ?)
    """, (int(item["id"]), item["author"], item["text"], item["date"], item["likes"], item["image"])
    )

conn.commit()
conn.close()
