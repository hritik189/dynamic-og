import "./App.css";
import PostPage from "./components/PostPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <PostPage />
      </div>
    </div>
  );
}

export default App;