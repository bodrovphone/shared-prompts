import User from "@models/user";
import { connectToDB } from "@utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";


console.log(
  {clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET}
)
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {

    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    
    async signIn({profile}) {
  
      try {
        await connectToDB();
  
      // check if a user already exist
  
      const ifUserExists = await User.findOne({
        email: profile.email
      })
  
      // if not, create a new user
  
      if (!ifUserExists) {
         await User.create({
          email: profile.email,
          userName: profile.name.replace(" ", "").toLowerCase(),
          image: profile.image
        })
      }

      console.log('user created')
      
      return true;
      } catch (e) {
        console.error(e);
        return false; 
      }
  
    }
  },
});

export { handler as GET, handler as POST};