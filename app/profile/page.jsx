'use client';
import React from 'react';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

import { Profile } from '@components/Profile';

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await fetch(`/api/users/${session.user.id}/posts`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (session?.user?.id) fetchPrompts();
  }, [session]);

  const handleEdit = (post) => {
    console.log('post: ', post);
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm('Are you sure you want to delete this post?');

    if (hasConfirmed) {
      try {
        const response = fetch(`/api/prompts/${post._id}`, {
          method: 'DELETE',
        });

        // ???
        // await response.json();

        // if (response.ok) {
        setPosts((prev) => prev.filter((item) => item._id !== post._id));
        // }
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  };

  console.log('posts: ', posts);

  return (
    <Profile
      name="my"
      desc="Welcome to your profile"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
