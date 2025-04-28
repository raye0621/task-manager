import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TaskListPage from './pages/TaskListPage';
import LoginPage from './pages/LoginPage';
import { authStore } from './store/authStore';

const App = () => {
  // Token 可能要改成從 Zustand 取得
  const isLogin = authStore((state) => state.isLogin());

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/tasks"
          element={<TaskListPage />}
        />
        <Route path="*" element={<Navigate to={isLogin ? "/tasks" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
