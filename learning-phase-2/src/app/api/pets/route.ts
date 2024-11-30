import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'

import prisma from '../../../../lib/prisma'

// GET /api/pets
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const queryName = searchParams.get('name')
  // findMany returns a list of records.
  const pets = await prisma.pet.findMany({
    // sort by id ascending
    orderBy: { id: 'asc' },
    // select only id, name, imageUrl, and owner.name
    select: { id: true, name: true, imageUrl: true, owner: { select: { name: true } } },
    where: queryName ? { name: { contains: queryName } } : undefined
  })
  // return Response with pets to json
  return NextResponse.json({ pets })
}
