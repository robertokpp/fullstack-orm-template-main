import { Request, Response } from "express";
import { prisma } from "@/prisma";

class QuestionsController {
  async index(request: Request, response: Response) {
    const questions = await prisma.question.findMany({
      where: {
        tittle: {
          contains: request.query.tittle?.toString().trim(),
          mode: "insensitive",
        },
      },
      orderBy: {
        tittle: "asc",
      },
    });

    return response.json(questions);
  }

  async create(request: Request, response: Response) {
    const { tittle, content, userId } = request.body;
    await prisma.question.create({ data: { tittle, content, userId } });
    return response.status(201).json();
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { tittle, content } = request.body;

    await prisma.question.update({
      data: {
        tittle,
        content,
      },
      where: {
        id,
      },
    });

    return response.json();
  }

  async remove(request: Request, response: Response) {
    const {id }= request.params;

    await prisma.question.delete({ where: { id } });
    return response.json();
  }
}

export { QuestionsController };
