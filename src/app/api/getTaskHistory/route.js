import { authOptions } from '../auth/[...nextauth]/route'
import { prisma } from "../../../server/db";
import { getServerSession } from "next-auth/next"
import { NextResponse, NextRequest } from 'next/server'

export async function GET(req) {
    const session = await getServerSession(authOptions)
    const id = session.user.id

    const url = new URL(req.url);
    const startDate = url.searchParams.get('startDate')
    const endDate = url.searchParams.get('endDate')
    console.log(startDate)
    console.log(endDate)


    const tasks = await prisma.tasks.findMany({
        where: {
            date: {
                gte: endDate,
                lte: startDate,
            }, 
            userId: id
        },
        orderBy: {
            date: 'desc',
        }
    })

    console.log(tasks)

    return NextResponse.json(tasks)
}