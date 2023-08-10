'use client';
import React from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Form } from '@components/Form';

const EditPrompt = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const promptId = searchParams.get('id');
  const [submitting, setSubmitting] = React.useState(false);
  const [post, setPost] = React.useState({
    prompt: '',
    tag: '',
  });

  React.useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const response = await fetch(`/api/prompts/${promptId}`);
        const data = await response.json();
        setPost({ prompt: data.prompt, tag: data.tag });
      } catch (error) {
        console.log(error);
      }
    };

    if (promptId) fetchPrompt();
  }, [promptId]);

  const editPrompt = async (e) => {
    e.preventDefault();

    if (!promptId) {
      alert('No prompt ID');
    }

    setSubmitting(true);

    try {
      console.log('post post', post);

      const response = await fetch(`/api/prompts/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      setSubmitting(false);
      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editPrompt}
    />
  );
};

export default EditPrompt;
