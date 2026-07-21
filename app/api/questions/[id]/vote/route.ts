import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface VoteRouteParams {
  params: { id: string };
}

export async function POST(_request: Request, { params }: VoteRouteParams) {
  try {
    const { id } = params;

    await prisma.question.update({
      where: { id },
      data: { votes: { increment: 1 } },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error voting on question:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors du vote." },
      { status: 500 }
    );
  }
}
