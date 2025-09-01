import "./App.css";
import Comments from "./components/Comments";

function App() {
  return (
    <>
      <div className="min-h-screen max-w-7xl bg-neutral-100 flex flex-col items-center justify-start p-4">
        <header className="w-full min-w-5xl mb-8">
          <h1 className="text-3xl font-bold text-center text-black">
            Comments.json
          </h1>
        </header>

        <main>
          <Comments />
        </main>
      </div>
    </>
  );
}

export default App;
