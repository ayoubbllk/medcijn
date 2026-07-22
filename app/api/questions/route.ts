import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { author, content } = body;

    if (!content || typeof content !== "string" || content.trim().length === 0) {
      return NextResponse.json(
        { error: "Le contenu de la question est requis." },
        { status: 400 }
      );
    }

    const question = await prisma.question.create({
      data: {
        author: author && typeof author === "string" ? author.trim().slice(0, 50) : null,
        content: content.trim().slice(0, 1000),
        answer:
          "Merci pour votre question. Le médecin y répondra prochainement. N'oubliez pas qu'en cas d'urgence, vous devez contacter le 14.",
        votes: 0,
      },
    });

    return NextResponse.json({ success: true, question }, { status: 201 });
  } catch (error) {
    console.error("Error creating question:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la création de la question." },
      { status: 500 }
    );
  }
}
