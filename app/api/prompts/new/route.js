import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt';

export const POST = async (req, _res) => {
  const { creator , prompt, tag } = await req.json(); 
  console.log('req', req);
  console.log('creator', creator);
  console.log('prompt', prompt);
  console.log('tag', tag);

  try {
await connectToDB();
const newPrompt = new Prompt({
  creator,
  prompt,
  tag: tag
});

await newPrompt.save();
return new Response(JSON.stringify(newPrompt), {
  status: 201,
});
  } catch (error) {
    console.log(error);
    return new Response('Failed to create a new prompt ', {
      status: 500,
    });
  }

}