import "./App.css";
import PostPage from "./components/PostPage";

function App() {
  return (
    <div className="min-h-screen bg-blue-100 flex flex-col justify-center sm:py-4">
      <div className="relative sm:max-w-xl sm:mx-auto">
        <PostPage />
      </div>
    </div>
  );
}

export default App;
