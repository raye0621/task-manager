// src/pages/TaskListPage.tsx
import { useEffect, useState } from 'react';
import { useTaskStore } from '../store/taskStore';
import { TaskStatus } from '../types/task';
import { authStore } from '../store/authStore';

const statusColumns = [
  { key: 'todo', label: 'TODO' },
  { key: 'in-progress', label: 'IN PROGRESS' },
  { key: 'done', label: 'DONE' },
] as const;

const TaskListPage = () => {
  const handleLogout = authStore((state) => state.handleLogout);
  const {
    tasks,
    fetchTasks,
    addTask,
    updateTaskStatus,
    deleteTask,
    loading,
    error,
  } = useTaskStore();
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!newTitle.trim()) return;
    await addTask({ title: newTitle });
    setNewTitle('');
  };

  const cycleStatus = (status: TaskStatus): TaskStatus => {
    if (status === 'todo') return 'in-progress';
    if (status === 'in-progress') return 'done';
    return 'todo';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">任務管理看板</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            handleLogout();
            location.href = '/login';
          }}
          className="text-sm text-gray-600 underline hover:text-gray-800"
        >
          登出
        </button>
      </div>
      <div className="flex justify-center gap-4 mb-8">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border p-2 rounded w-64"
          placeholder="新增任務..."
        />
        <button
          onClick={handleAddTask}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          新增
        </button>
      </div>
      {loading && <p className="text-center">載入中...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="flex gap-6 overflow-x-auto">
        {statusColumns.map((column) => (
          <div key={column.key} className="flex-1 min-w-[250px]">
            <h2 className="text-xl font-semibold mb-4 text-center">
              {column.label}
            </h2>
            <div className="bg-white rounded-lg shadow p-4 space-y-4 min-h-[400px]">
              {tasks
                .filter((task) => task.status === column.key)
                .map((task) => (
                  <div
                    key={task.id}
                    className="p-3 bg-gray-50 rounded shadow-sm flex justify-between items-center"
                  >
                    <div
                      onClick={() =>
                        updateTaskStatus(task.id, cycleStatus(task.status))
                      }
                      className="cursor-pointer"
                    >
                      <h3 className="font-medium">{task.title}</h3>
                      <p className="text-xs text-gray-400">{task.status}</p>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-400 hover:text-red-600 text-sm"
                    >
                      刪除
                    </button>
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
