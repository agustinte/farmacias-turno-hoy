import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('localidad');

  if (!slug) return NextResponse.json({ error: 'Falta localidad' }, { status: 400 });

  const ahora = new Date();

  const turnos = await prisma.turno.findMany({
    where: {
      fechaInicio: { lte: ahora },
      fechaFin: { gte: ahora },
      farmacia: { localidad: { slug } }
    },
    include: { farmacia: true }
  });

  return NextResponse.json(turnos.map(t => t.farmacia));
}