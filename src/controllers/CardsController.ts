import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

class CardsController {
  async create(req: Request, res: Response) {
    try {
      const prisma = new PrismaClient();
      const { message } = req.body;

      await prisma.cards.create({ data: { message } }).then(() => {
        return res.json({ message: "Card created" });
      });
    } catch (e) {
      return res.json({ message: "Card not created" });
    }
  }
  async read(req: Request, res: Response) {
    try {
      const prisma = new PrismaClient();
      await prisma.cards.findMany().then((cards) => {
        return res.send(cards);
      });
    } catch (e) {
      return res.json({ message: "Error listing cards" });
    }
  }
  async update(req: Request, res: Response) {
    try {
      const prisma = new PrismaClient();
      const { id, message } = req.body;

      await prisma.cards
        .update({
          where: { id },
          data: { message },
        })
        .then(() => {
          return res.json({ message: "Card updated" });
        });
    } catch (e) {
      return res.json({ message: "Card not updated" });
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const prisma = new PrismaClient();
      const id = req.params.id;

      await prisma.cards.delete({ where: { id: Number(id) } }).then(() => {
        return res.json({ message: "Card deleted" });
      });
    } catch (e) {
      return res.json({ message: "Card not deleted" });
    }
  }
}
export default new CardsController();
