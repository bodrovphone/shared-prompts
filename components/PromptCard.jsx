'use client';

import { useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export const PromptCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}) => {
  const { data: session } = useSession();
  const [copy, setCopy] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setCopy(post?.prompt);
    navigator.clipboard.writeText(post?.prompt);
    setTimeout(() => {
      setCopy('');
    }, 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex flex-justify-center gap-3 cursor-pointer">
          {post?.creator?.image && (
            <Image
              src={post?.creator?.image}
              alt="user image"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
          )}
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-grey-900">
              {post?.creator?.userName}
            </h3>
            <p className="font-inter text-sm text-grey-500">
              {post?.creator?.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copy === post?.prompt
                ? 'assets/icons/tick.svg'
                : 'assets/icons/copy.svg'
            }
            alt="copy icon"
            width={20}
            height={20}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-grey-700">{post?.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick?.(post?.tag)}
      >
        #{post?.tag}
      </p>

      {session?.user?.id === post?.creator?._id && pathname === '/profile' && (
        <div className="flex-center gap-4 border-t border-gray-100 mt-5 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>

          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};
