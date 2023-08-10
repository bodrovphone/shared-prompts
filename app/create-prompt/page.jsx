'use client';
import React from 'react';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Form } from '@components/Form';

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = React.useState(false);
  const [post, setPost] = React.useState({
    prompt: '',
    tag: '',
  });

  console.log('post', post);
  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/prompts/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          creator: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
