import { authOptions } from '../auth/[...nextauth]/route'
import { prisma } from "../../../server/db";
import { getServerSession } from "next-auth/next"
import { NextResponse, NextRequest } from 'next/server'

export async function GET(req) {
    const session = await getServerSession(authOptions)
    const id = session.user.id

    const url = new URL(req.url);
    const date = url.searchParams.get('date')

    console.log(date)

    const tasks = await prisma.tasks.findMany({
        where: {
            AND: [
                {userId: id},
                {date: date},
            ]
        }
    })

    console.log(tasks)

    return NextResponse.json(tasks)
}