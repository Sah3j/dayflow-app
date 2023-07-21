import { authOptions } from '../auth/[...nextauth]/route'
import { prisma } from "../../../server/db";
import { getServerSession } from "next-auth/next"
import { NextResponse, NextRequest } from 'next/server'

export async function DELETE(req) {
    const session = await getServerSession(authOptions)
    const id = session.user.id

    const url = new URL(req.url);
    const date = url.searchParams.get('date')

    console.log(date)

    await prisma.tasks.deleteMany({
        where: {
            AND: [
                {userId: id},
                {date: date},
            ]
        }
    })


    return NextResponse.json('OK')
}