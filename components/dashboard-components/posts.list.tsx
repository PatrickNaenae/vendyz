"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux/slices/posts-slice";
import { RootState, AppDispatch } from "../../redux/store";
import { Loader2 } from "lucide-react";
import CustomPagination from "../pagination";
import { useSearchParams } from "next/navigation";

const PostList = () => {
  const posts = useSelector((state: RootState) => state.posts.items);
  const status = useSelector((state: RootState) => state.posts.status);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchParams = useSearchParams();

  console.log(posts);

  const currentPageFromURL = searchParams.get("page");
  const initialPage = currentPageFromURL ? parseInt(currentPageFromURL) : 1;

  const [currentPage, setCurrentPage] = useState(initialPage);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const postsPerPage = 10;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return posts.slice(startIndex, endIndex);
  }, [posts, currentPage]);

  useEffect(() => {
    if (currentPage > 0 && currentPage <= totalPages) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", currentPage.toString());
      window.history.replaceState(null, "", `?${params.toString()}`);
    }
  }, [currentPage, totalPages, searchParams]);

  // Calculate the starting index for each page
  const startingIndex = (currentPage - 1) * postsPerPage + 1;

  return (
    <div className="post-list px-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-[#232323] font-bold uppercase">Posts</h2>
        <button
          onClick={openModal}
          className="bg-[#5271FF] text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none"
        >
          Create Post
        </button>
      </div>

      {status === "loading" ? (
        <p>Loading...</p>
      ) : status === "failed" ? (
        <p>Failed to load posts</p>
      ) : (
        <div className="flex flex-col gap-5 my-6">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border-b px-4 py-2 text-center">ID</th>
                <th className="border-b px-4 py-2 text-center">Title</th>
                <th className="border-b px-4 py-2 text-center">Body</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPosts.map((post, index) => {
                const postIndex = startingIndex + index;
                return (
                  <tr key={postIndex} className="hover:bg-gray-50">
                    <td className="border-b px-4 py-2">{postIndex}</td>
                    <td className="border-b px-4 py-2">{post.title}</td>
                    <td className="border-b px-4 py-2">{post.body}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <CustomPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center p-2 items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full lg:max-w-lg ">
            <h3 className="text-2xl font-semibold mb-4">Create New Post</h3>
            <CreatePostForm closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

const CreatePostForm = ({ closeModal }: { closeModal: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.posts.items);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const status = useSelector((state: RootState) => state.posts.status);

  console.log("Current Posts: ", posts);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPost = { title, body };

    dispatch(createPost(newPost))
      .unwrap()
      .then(() => {
        setSuccessModalOpen(true);
      })
      .catch((error) => {
        console.error("Failed to create post:", error);
      });
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
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
          className="w-4/12 py-3 px-6 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-8/12 py-3 px-6 bg-[#5271FF] text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {status === "loading" && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {status === "idle" ? "Create Post" : "Creating Post..."}
        </button>
      </div>

      {successModalOpen && (
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

export { PostList, CreatePostForm };
