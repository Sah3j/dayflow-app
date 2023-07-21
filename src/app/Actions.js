"use client"

import { signIn, signOut } from "next-auth/react"

export function SignOut() {
    return (
        <button onClick={() => signOut()}
        className="border-2 border-gray-950 text-gray-950 rounded px-2 font-light hover:bg-gray-950 hover:text-blue-600">
            Sign Out
        </button>
    )
}

export function SignIn() {
    return (
        <button onClick={() => signIn()}
        className="rounded bg-blue-600 px-4 py-2 text-white font-bold text-2xl max-md:text-xl">
            Get Started
        </button>
    )
}