const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  getAllUser: async (req, res, next) => {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Error fetching users" });
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(req.params.id) },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Error fetching user" });
    }
  },

  createUser: async (req, res, next) => {
    try {
      const newUser = await prisma.user.create({
        data: {
          ...req.body,
        },
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Error creating user" });
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(req.params.id) },
        data: {
          ...req.body,
        },
      });
      res.json(updatedUser);
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(500).json({ error: "Error updating user" });
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      await prisma.user.delete({
        where: { id: parseInt(req.params.id) },
      });
      res.status(204).send();
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(500).json({ error: "Error deleting user" });
    }
  },
};
