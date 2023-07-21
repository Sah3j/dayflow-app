import { authOptions } from '../auth/[...nextauth]/route'
import { prisma } from "../../../server/db";
import { getServerSession } from "next-auth/next"

export async function POST(req) {

    console.log("hello")
    const session = await getServerSession(authOptions)
    const id = session.user.id

    const body = await req.json();
    const taskId = body.id;
    
    const isCompleted = body.completed;

    await prisma.tasks.update({
        where: {
            id: taskId,
        },
        data: {
            completed: {
                set: isCompleted
            }
        },
    })

    return new Response(JSON.stringify('OK'))
}