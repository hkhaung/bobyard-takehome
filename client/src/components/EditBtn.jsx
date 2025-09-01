export default function EditBtn({ commentId, currentText, comments, setComments }) {
  function handleEdit() {
    const newText = prompt("Edit your comment:", currentText);
    if (newText !== null && newText !== currentText) {
      fetch(`http://127.0.0.1:5000/api/comments/${commentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newText })
      })
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        
        setComments(
          comments.map((comment) => {
            if (comment.id === commentId) {
              return { ...comment, text: newText };
            } else {
              return comment;
            }
          })
        );

      })
      .catch(err => console.error("Error updating comment:", err));
    }

  }

  return (
    <button 
      className="text-black hover:underline hover:text-yellow-600 transition"
      onClick={handleEdit}>
      Edit
    </button>
  )
}