import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, bio, phone, facebook, twitter, instagram } = req.body;
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const slug = String(name.replace(/\s+/g, "-").toLocaleLowerCase());
    const profile = await prisma.profile.create({
      data: {
        name,
        bio,
        phone,
        slug: slug,
        email: String(session.user?.email),
        facebook,
        twitter,
        instagram,
        user: { connect: { email: String(session.user?.email) } },
      },
    });

    return res.status(201).json({ message: "Successfuly created profile", profile });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
};
