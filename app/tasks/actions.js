// app/tasks/actions.js
"use server";

import { revalidatePath } from 'next/cache';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createTask(_prevState, formData) {
  try {
    const titleValue = formData?.get('title');
    const title = typeof titleValue === 'string' ? titleValue.trim() : '';

    if (!title) {
      return { error: 'Title is required' };
    }

    await prisma.task.create({
      data: {
        title,
        status: 'active',
      },
    });

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error creating task:', error);
    return { error: 'Failed to create task' };
  }
}

export async function getTasks() {
  try {
    return await prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
}

export async function updateTaskStatus(id, status) {
  try {
    await prisma.task.update({
      where: { id: parseInt(id) },
      data: { status },
    });
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error updating task:', error);
    return { error: 'Failed to update task' };
  }
}

export async function deleteTask(id) {
  try {
    await prisma.task.delete({
      where: { id: parseInt(id) },
    });
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error deleting task:', error);
    return { error: 'Failed to delete task' };
  }
}