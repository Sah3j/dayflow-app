import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from 'next/navigation'
import DisplayTodayTasks from './DisplayTodayTasks'
import TomorrowTasks from "./TomorrowTasks"
import GoalsHistory from "./GoalsHistory"
import NavBar from './NavBar'
import { prisma } from "../../server/db";


export async function generateStaticParams() {
  const users = await prisma.user.findMany()

  console.log(users)

  return users.map((user) => ({
    userName: user.name,
  }))
}

export default async function UserPage( {params} ) {
  const { userName } = params
  const session = await getServerSession(authOptions)

  if(!session) {
    redirect("/")
  }

  return (
    <div className="bg-gray-950 w-full min-h-screen flex flex-col items-center">
      <div className="w-full">
        <NavBar userName={session?.user?.name}/>
      </div>
      <div className="py-4 w-full flex justify-center">
        <TomorrowTasks />
      </div>
      <div className=" py-4 w-full flex justify-center bg-gray-900
      border-t-2 border-t-blue-600">
        <DisplayTodayTasks />
      </div>
      <div className="py-4 w-full flex justify-center h-2/4">
        <GoalsHistory />
      </div>
    </div>
  )
}
