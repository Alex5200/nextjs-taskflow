import { getTasks } from './tasks/actions';
import { TaskInput } from './components/taskinput';
import TaskListItem from './components/tasklistitem';

export default async function Home() {
    const tasks = await getTasks();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-2xl mx-auto p-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                    Мой список задач
                </h1>

                <TaskInput />

                <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                    {tasks.length === 0 ? (
                        <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                            Нет задач. Добавьте новую задачу выше.
                        </div>
                    ) : (
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {tasks.map((task) => (
                                <li key={task.id}>
                                    <TaskListItem task={task} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

// This tells Next.js to revalidate the page every 0 seconds (effectively disabling caching)
export const revalidate = 0;