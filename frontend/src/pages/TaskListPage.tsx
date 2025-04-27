// src/pages/TaskListPage.tsx
import { useEffect } from 'react';
import { useTaskStore } from '../store/taskStore';
import { Task } from '../types/task';

const mockTasks: Task[] = [
  { id: 1, title: '學習 React', status: 'todo' },
  { id: 2, title: '串接 API', status: 'in-progress' },
  { id: 3, title: '完成作品集', status: 'done' },
  { id: 4, title: '讀設計模式', status: 'todo' },
  { id: 5, title: '優化專案結構', status: 'in-progress' },
];

const statusColumns = [
  { key: 'todo', label: 'TODO' },
  { key: 'in-progress', label: 'IN PROGRESS' },
  { key: 'done', label: 'DONE' },
] as const;

const TaskListPage = () => {
  const { tasks, setTasks } = useTaskStore();

  useEffect(() => {
    setTasks(mockTasks);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">任務管理看板</h1>

      <div className="flex gap-6 overflow-x-auto">
        {statusColumns.map((column) => (
          <div key={column.key} className="flex-1 min-w-[250px]">
            <h2 className="text-xl font-semibold mb-4 text-center">{column.label}</h2>
            <div className="bg-white rounded-lg shadow p-4 space-y-4 min-h-[400px]">
              {tasks
                .filter((task) => task.status === column.key)
                .map((task) => (
                  <div key={task.id} className="p-3 bg-gray-50 rounded shadow-sm">
                    <h3 className="font-medium">{task.title}</h3>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskListPage;
