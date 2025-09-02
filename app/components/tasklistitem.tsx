"use client";

import { useFormStatus } from 'react-dom';
import { updateTaskStatus, deleteTask } from '@/app/tasks/actions';

const TrashIcon = () => (
    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd"/>
    </svg>
);

const CheckIcon = ({ completed }: { completed: boolean }) => (
    <div className={`w-5 h-5 rounded border ${completed ? 'bg-blue-600 border-blue-600' : 'border-gray-300'} flex items-center justify-center`}>
        {completed && (
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
        )}
    </div>
);

export default function TaskListItem({ task }: { task: { id: number; title: string; status: string } }) {
    const { pending } = useFormStatus();

    const handleStatusChange = async () => {
        const newStatus = task.status === 'active' ? 'completed' : 'active';
        await updateTaskStatus(task.id, newStatus);
    };

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (confirm('Вы уверены, что хотите удалить задачу?')) {
            await deleteTask(task.id);
        }
    };

    return (
        <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
            <button
                onClick={handleStatusChange}
                disabled={pending}
                className="flex-shrink-0 mr-3 focus:outline-none"
                type="button"
            >
                <CheckIcon completed={task.status === 'completed'} />
            </button>

            <span className={`flex-1 text-gray-900 dark:text-white ${task.status === 'completed' ? 'line-through text-gray-400' : ''}`}>
        {task.title}
      </span>

            <button
                onClick={handleDelete}
                disabled={pending}
                className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                type="button"
            >
                <TrashIcon />
            </button>
        </div>
    );
}