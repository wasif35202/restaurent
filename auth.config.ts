 import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

const authOptions: NextAuthConfig = {
  providers: [
    Google,
  
  ],

};

export default authOptions;
