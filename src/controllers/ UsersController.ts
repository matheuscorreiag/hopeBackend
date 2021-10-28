import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

class UsersController {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;
    const prisma = new PrismaClient();

    prisma.users.create({ data: { email, password } }).then(() => {
      return res.json({ message: "created" });
    });

    return res.json({ message: "fail to create user" });
  }
  async read(req: Request, res: Response) {
    return res.json({ message: "read" });
  }
  async update(req: Request, res: Response) {
    return res.json({ message: "update" });
  }
  async delete(req: Request, res: Response) {
    return res.json({ message: "delete" });
  }
}

export default new UsersController();
