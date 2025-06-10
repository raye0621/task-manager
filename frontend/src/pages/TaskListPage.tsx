// src/pages/TaskListPage.tsx
import { useEffect, useState } from 'react';
import { useTaskStore } from '../store/taskStore';
import { authStore } from '../store/authStore';
import clsx from 'clsx';

const statusColumns = [
  { key: 'todo', label: 'TODO' },
  { key: 'in-progress', label: 'IN PROGRESS' },
  { key: 'done', label: 'DONE' },
] as const;

const TaskListPage = () => {
  const handleLogout = authStore((state) => state.handleLogout);
  const {
    formattedTasks,
    fetchTasks,
    addTask,
    updateTaskStatus,
    deleteTask,
    loading,
    error,
  } = useTaskStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const [modalStatus, setModalStatus] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleModalAddTask = async () => {
    if (!modalTitle.trim() || !modalStatus.trim()) return;
    const newTask = {
      title: modalTitle,
      description: modalDescription,
      status: modalStatus
    }
    console.log('Adding new task !!!!!!!!', newTask);
    await addTask(newTask);
    setModalTitle('');
    setShowAddModal(false);
  };

  const handleOpenAddModal = (taskStatus: string) => {
    setShowAddModal(true);
    setModalTitle('');
    setModalStatus(taskStatus);
  };

  const cycleStatus = (status: string) => {
    if (status === 'todo') return 'in-progress';
    if (status === 'in-progress') return 'done';
    return 'todo';
  };

  return (
    <div className="min-h-screen h-screen flex flex-col bg-[#fbf7ef] p-6">
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

      {loading && <p className="text-center">載入中...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* 主要內容區塊，flex-1 佔滿剩餘高度，overflow-x-auto 只顯示橫向滾動條 */}
      <div className="flex-1 flex justify-start items-start gap-4 overflow-x-auto">
        {Object.entries(formattedTasks).map(([taskStatus, taskArray], i) => {
          return (
            <div
              key={i}
              className={clsx('p-2 bg-gray-300 rounded-xl', 'min-w-[240px]')}
            >
              <div className={clsx('flex justify-between', 'px-2')}>
                <p className="mb-2 text-gray-800 text-center">{taskStatus}</p>
                <p>{'...'}</p>
              </div>
              {taskArray.length > 0 &&
                taskArray.map((task) => {
                  return (
                    <div
                      key={task.id}
                      className={clsx(
                        'flex justify-between items-center',
                        // 'w-[200px]',
                        'p-3 bg-gray-50 rounded shadow-sm',
                        'mb-2 last:mb-0'
                      )}
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
                        className="text-red-400 hover:text-red-600 text-sm whitespace-nowrap"
                      >
                        刪除
                      </button>
                    </div>
                  );
                })}
              <div
                className={clsx(
                  'flex justify-between items-center',
                  'p-2 rounded-xl',
                  'hover:bg-gray-400 cursor-pointer '
                )}
                onClick={() => handleOpenAddModal(taskStatus)}
              >
                <p className="">{'+ 新增卡片'}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal 彈窗 */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-lg shadow-lg p-6 min-w-[320px] relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowAddModal(false)}
            >
              ×
            </button>
            <h2 className="text-lg font-bold mb-4">新增卡片</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await handleModalAddTask();
              }}
            >
              <input
                type="text"
                value={modalTitle}
                onChange={(e) => setModalTitle(e.target.value)}
                className="border p-2 rounded w-full mb-4"
                placeholder="請輸入任務名稱"
                autoFocus
              />
              <input
                type="text"
                value={modalDescription}
                onChange={(e) => setModalDescription(e.target.value)}
                className="border p-2 rounded w-full mb-4"
                placeholder="請輸入任務描述"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => setShowAddModal(false)}
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  新增
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskListPage;
