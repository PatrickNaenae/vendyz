"use client";

import { useCreatePostMutation } from "@/redux/api/posts-api";
import { addPost } from "@/redux/slices/posts-slice";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

const CreatePostForm = ({ closeModal }: { closeModal: () => void }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [createPost, { isLoading, isSuccess }] = useCreatePostMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await createPost({ title, body });

    if (response.data) {
      dispatch(addPost(response.data));
    }
  };

  const handleCloseSuccessModal = () => {
    closeModal();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <div className="flex flex-col">
        <label
          htmlFor="title"
          className="text-base font-semibold text-gray-700 mb-2"
        >
          Post Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="body"
          className="text-base font-semibold text-gray-700 mb-2"
        >
          Post Body
        </label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter post body"
          rows={5}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      <div className="flex justify-between gap-4">
        <button
          type="button"
          onClick={closeModal}
          className="w-1/2 bg-gray-300 text-white py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-1/2 flex items-center justify-center ${
            isLoading ? "bg-indigo-400" : "bg-indigo-600"
          } text-white py-2 rounded-lg`}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {!isLoading ? "Create Post" : "Creating post..."}
        </button>
      </div>

      {isSuccess && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-2xl text-center font-semibold text-green-600 mb-4">
              Success!
            </h3>
            <p className="text-lg text-center">
              Your post has been created successfully!
            </p>
            <button
              onClick={handleCloseSuccessModal}
              className="w-full mt-4 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default CreatePostForm;
