"use server"

import { signIn } from "@/auth"

export const Signin_Google = async () => {

        await signIn("google")
}