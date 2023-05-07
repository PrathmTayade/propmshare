"use client";
import Profile from "@/components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const MyProfile = () => {
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json();
      setPosts(data);
    };
    if (session?.user.id) {
      fetchPost();
    }
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push( `/update-prompt/?id=${post._id}`)
  };

  //delete the post
  const handleDelete = async (post) => {
    try {
      const hasConfirm = confirm(`Are you sure you want to delete the prompt?`);

      if (hasConfirm) {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
      }
      const filteredPosts = posts.filter((item) => item._id !== post._id);
      setPosts(filteredPosts);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Profile
      name="My"
      desc="Welcome to your profile page"
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      data={posts}
    />
  );
};

export default MyProfile;
