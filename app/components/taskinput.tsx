"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { createTask } from '@/app/tasks/actions';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? 'Добавление...' : 'Добавить'}
    </button>
  );
}

export function TaskInput() {
    const [state, formAction] = useFormState(createTask, {success: true, error: undefined });

    return (
        <div className="sticky top-0 bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-700">
            <form action={formAction} className="flex gap-2">
                <input
                    type="text"
                    name="title"
                    placeholder="Новая задача..."
                    className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    required
                />
                <SubmitButton/>
            </form>
            {state?.error && (
                <p className="mt-2 text-sm text-red-600">{state.error}</p>
            )}
        </div>
    );
}
