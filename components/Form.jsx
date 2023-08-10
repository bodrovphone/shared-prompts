import Link from 'next/link';

export const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type}</span> Post
      </h1>

      <p className="desc text-left max-w-md">
        {type} amazing prompts and share them with the world, and let your
        imagination run wild with AI-powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semicolon text-base text-grey-700">
            Your AI Prompt
          </span>

          <textarea
            className="form_textarea"
            placeholder="Write your prompt here..."
            value={post.prompt}
            required
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
          />
        </label>

        <label>
          <span className="font-satoshi font-semicolon text-base text-grey-700">
            Tag {` `}
            <span className="font-normal">
              (#product, #webdevelopment, #ai, #machinelearning, #datascience)
            </span>
          </span>

          <input
            className="form_input"
            placeholder="#tag"
            value={post.tag}
            required
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};
