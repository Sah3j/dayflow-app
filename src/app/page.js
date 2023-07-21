import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import LandingPage from "./LandingPage.js"
import { redirect } from 'next/navigation'

export default async function page() {
  const session = await getServerSession(authOptions)

  if(session) {
    redirect(`/${session.user.name}`)
  }

  return (
    <>
          <LandingPage />
    </>
  )
}
