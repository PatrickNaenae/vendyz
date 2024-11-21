"use client";

import React, { useState, useMemo, useEffect } from "react";
import CustomPagination from "../pagination";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CreatePostForm from "./create-post-form";

const PostList = () => {
  const posts = useSelector((state: RootState) => state.posts.posts);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchParams = useSearchParams();
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

  if (!posts.length) {
    return <p className="text-center my-10">No posts available</p>;
  }

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

      <div className="flex flex-col gap-5 my-6">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-b px-4 py-2 text-left">ID</th>
              <th className="border-b px-4 py-2 text-left">Title</th>
              <th className="border-b px-4 py-2 text-left">Body</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPosts.map((post) => {
              return (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="border-b px-4 py-2">{post.id}</td>
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

export default PostList;
