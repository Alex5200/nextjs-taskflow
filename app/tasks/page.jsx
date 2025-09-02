// app/tasks/page.jsx
import { prisma } from '@/lib/prisma';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';
import { createTask } from './actions';

export default async function TasksPage() {
    const tasks = await prisma.task.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Мои задачи</h1>
            <TaskForm createTask={createTask} />
            <TaskList tasks={tasks} />
        </div>
    );
}