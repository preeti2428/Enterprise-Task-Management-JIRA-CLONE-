import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import prisma from '../prismaClient';

const router = Router();

router.post('/', authenticateToken, async (req: any, res) => {
  try {
    const { name, description, deadline, workspaceId } = req.body;

    const project = await prisma.project.create({
      data: {
        name,
        description,
        deadline: deadline ? new Date(deadline) : null,
        workspaceId
      }
    });

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/workspace/:workspaceId', authenticateToken, async (req: any, res) => {
  try {
    const { workspaceId } = req.params;

    const projects = await prisma.project.findMany({
      where: { workspaceId },
      include: {
        tasks: true
      }
    });

    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
