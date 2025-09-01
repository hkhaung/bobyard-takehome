export default function AddBtn({ commentId, comments, setComments}) {
  function handleAdd() {
    const newText = prompt("Add a comment (Admin user)");
    if (newText !== null) {
      fetch(`http://127.0.0.1:5000/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newText })
      })
      .then(res => res.json())
      .then(data => {
        console.log(comments);
        setComments([...comments, data]);
      })
      .catch(err => console.error("Error adding comment:", err));
    }
  }

  return (
    <button 
      className="text-black hover:underline hover:text-green-400 transition"
      onClick={handleAdd}>
      Add
    </button>
  )
}