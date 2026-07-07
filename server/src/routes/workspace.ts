import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import prisma from '../prismaClient';

const router = Router();

router.post('/', authenticateToken, async (req: any, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.id;

    const workspace = await prisma.workspace.create({
      data: {
        name,
        description,
        members: {
          create: {
            userId
          }
        }
      }
    });

    res.status(201).json(workspace);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', authenticateToken, async (req: any, res) => {
  try {
    const userId = req.user.id;
    const workspaces = await prisma.workspace.findMany({
      where: {
        members: {
          some: {
            userId
          }
        }
      },
      include: {
        members: {
          include: {
            user: {
              select: { id: true, name: true, email: true, role: true }
            }
          }
        }
      }
    });
    res.json(workspaces);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/:workspaceId/members', authenticateToken, async (req: any, res) => {
  try {
    const { workspaceId } = req.params;
    const { email } = req.body; 

    const userToAdd = await prisma.user.findUnique({ where: { email } });
    if (!userToAdd) {
      return res.status(404).json({ error: 'User not found' });
    }

    const member = await prisma.workspaceMember.create({
      data: {
        workspaceId,
        userId: userToAdd.id
      }
    });

    res.status(201).json(member);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
