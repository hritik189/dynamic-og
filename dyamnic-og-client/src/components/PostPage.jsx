import { useState } from "react";
import axios from "axios";

const PostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [ogImageUrl, setOgImageUrl] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(reader.result);
      setImage("");
    };
    reader.readAsDataURL(file);
  };

  const generateOgImage = async () => {
    try {
      const imageData = file ? file : image;
      const response = await axios.post(
        "http://localhost:8000/generate-og-image",
        { title, content, image: imageData }
      );
      const { ogImageUrl } = response.data;
      setOgImageUrl(ogImageUrl);
      document
        .querySelector('meta[property="og:image"]')
        .setAttribute("content", ogImageUrl);
    } catch (error) {
      console.error("Error generating OG image:", error);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this OG Image!',
        text: 'Here is an Open Graph image I generated.',
        url: ogImageUrl,
      }).catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Your browser does not support the Web Share API');
    }
  };

  return (
    <div className="flex flex-col items-center px-[5rem] py-[0.2rem] text-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-600">
        Create a New Post
      </h1>
      <form className="w-full max-w-lg bg-white p-5 rounded-lg shadow-md">
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter your title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="content"
          >
            Content
          </label>
          <textarea
            id="content"
            placeholder="Enter your content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image"
          >
            Image URL
          </label>
          <input
            id="image"
            type="text"
            placeholder="Enter image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            disabled={file !== null}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="file"
          >
            Or Upload Image
          </label>
          <input
            id="file"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            disabled={image !== ""}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={generateOgImage}
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Generate OG Image
          </button>
        </div>
      </form>
      {ogImageUrl && (
        <div className="mt-8 w-full max-w-lg">
          <h2 className="text-2xl mb-4 text-gray-800">OG Image Preview:</h2>
          <img
            src={ogImageUrl}
            alt="OG Image Preview"
            className="max-w-full h-auto border border-gray-300 rounded-lg shadow-md"
          />
          <button
            onClick={handleShare}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Share
          </button>
        </div>
      )}
    </div>
  );
};

export default PostPage;
