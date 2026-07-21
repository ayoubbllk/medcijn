import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { surveyId, option, isCorrect } = body;

    if (!surveyId || typeof option !== "number" || typeof isCorrect !== "boolean") {
      return NextResponse.json(
        { error: "Données invalides." },
        { status: 400 }
      );
    }

    await prisma.surveyResponse.create({
      data: {
        surveyId,
        option,
        isCorrect,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error saving survey response:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'enregistrement de la réponse." },
      { status: 500 }
    );
  }
}
