import { useEffect, useState } from "react";
import EditBtn from "./EditBtn";
import AddBtn from "./AddBtn";
import DeleteBtn from "./DeleteBtn";

export default function Comments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/comments")
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error("Error fetching comments:", err));
  }, []);

  console.log(comments);

  return (
    <div className="w-full max-w-4xl shadow-md rounded-lg p-6 mb-8">
      <ul className="space-y-3 text-black text-left">
        {comments.map((comment) => (
          <li
            key={comment.id}
            className="p-3 border rounded shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold">{comment.author}</p>
              <div className="flex gap-2">
                <EditBtn commentId={comment.id} currentText={comment.text} comments={comments} setComments={setComments}/>
                <AddBtn commentId={comment.id} comments={comments} setComments={setComments} />
                <DeleteBtn />
              </div>
            </div>

            <p>{comment.text}</p>
            <p className="text-sm text-gray-500">
              {comment.date} | Likes: {comment.likes}
            </p>
            {comment.image && (
              <img
                src={comment.image}
                alt="comment img"
                className="mt-2 max-w-full rounded justify-self-center"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
