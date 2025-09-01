export default function DeleteBtn() {
  function handleDelete() {
    console.log("hi");
  }

  return (
    <button 
      className="text-black hover:underline hover:text-red-400 transition"
      onClick={handleDelete}>
      Delete
    </button>
  )
}