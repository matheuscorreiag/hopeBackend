import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

interface BodyRequest {
  id?: number;
  email: string;
  password: string;
}
class UsersController {
  async create(req: Request, res: Response) {
    try {
      const prisma = new PrismaClient();
      const body: BodyRequest = req.body;

      if (
        body.email !== "" &&
        body.password !== "" &&
        (await prisma.users.findMany({ where: { email: body.email } }))
          .length === 0
      ) {
        await prisma.users
          .create({
            data: {
              email: body.email,
              password: await bcrypt.hash(body.password, 10),
            },
          })
          .then(() => {
            return res.json({ message: "created" });
          });
      } else {
        return res.json({
          message: "email or password missing arguments or already exists",
        });
      }
    } catch (e) {
      return res.json({ message: "fail to create user", error: e });
    }
  }
  async read(req: Request, res: Response) {
    try {
      const prisma = new PrismaClient();

      await prisma.users.findMany().then((users) => {
        return res.json(users);
      });
    } catch (e) {
      return res.json({ message: "fail to list users", error: e });
    }
  }
  async update(req: Request, res: Response) {
    try {
      const prisma = new PrismaClient();
      const body: BodyRequest = req.body;

      await prisma.users
        .update({
          where: { id: body.id },
          data: {
            email: body.email,
            password: await bcrypt.hash(body.password, 10),
          },
        })
        .then((user) => {
          return res.json({ message: "updated", user });
        });
    } catch (e) {
      return res.json({ message: "fail to update user", error: e });
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const prisma = new PrismaClient();
      const id = req.params.id;

      await prisma.users.delete({ where: { id: Number(id) } }).then(() => {
        return res.json({ message: "deleted" });
      });
    } catch (e) {
      return res.json({ message: "fail to delete user", error: e });
    }
  }
}
export default new UsersController();
