import { Feed } from "@components/Feed";

const Home = () => {
  return <section className="w-full flex-center flex-col">
  <h1 className="head_text text-center">Discover & Share</h1>
  <br  className="max-md:hidden" />
  <span className="orange_gradient text-center">AI-Powered Prompts</span>
  <p className="dsc text-center">
  Promptosharer is a community for sharing AI-generated prompts.
  </p>

  <Feed />
  </section>;
}

export default Home;