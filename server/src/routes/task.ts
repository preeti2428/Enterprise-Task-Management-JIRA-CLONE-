import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import prisma from '../prismaClient';

const router = Router();

router.post('/', authenticateToken, async (req: any, res) => {
  try {
    const { title, description, priority, deadline, projectId, assigneeId } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority: priority || 'MEDIUM',
        deadline: deadline ? new Date(deadline) : null,
        projectId,
        assigneeId
      }
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/project/:projectId', authenticateToken, async (req: any, res) => {
  try {
    const { projectId } = req.params;

    const tasks = await prisma.task.findMany({
      where: { projectId },
      include: {
        assignee: { select: { id: true, name: true, email: true, role: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.patch('/:taskId/status', authenticateToken, async (req: any, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const task = await prisma.task.update({
      where: { id: taskId },
      data: { status }
    });

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.patch('/:taskId', authenticateToken, async (req: any, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, priority, assigneeId } = req.body;

    const task = await prisma.task.update({
      where: { id: taskId },
      data: { 
        title, 
        description, 
        priority, 
        assigneeId 
      }
    });

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:taskId', authenticateToken, async (req: any, res) => {
  try {
    const { taskId } = req.params;

    await prisma.task.delete({
      where: { id: taskId }
    });

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
