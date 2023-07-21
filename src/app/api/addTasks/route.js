import { authOptions } from '../auth/[...nextauth]/route'
import { prisma } from "../../../server/db";
import { getServerSession } from "next-auth/next"

export async function POST(req) {

    const session = await getServerSession(authOptions)
    const id = session.user.id

    const body = await req.json();
    const date = body.date;

    for (const task of body.tasks) {
      await prisma.tasks.create({
        data: {
          name: task.name,
          emoji: task.emoji,
          startTime: task.startTime,
          endTime: task.endTime,
          date: date,
          userId: id,
        },
      })
    }

    return new Response(JSON.stringify('OK'))
}