// src/pages/LoginPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authStore } from '../store/authStore';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const handleLogin = authStore((state) => state.handleLogin);

  const handleClickLogin = async () => {
    if (!email || !password) {
      setError('請輸入 Email 和密碼');
      return;
    }
    try {
      await handleLogin(email, password);
      console.log('[handleClickLogin] --- 11 ');
      navigate('/tasks');
    } catch (err) {
      console.log('[handleClickLogin] --- 99 err', err);
      setError('登入失敗，請檢查帳密');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          任務管理系統 - 登入
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="密碼"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          onClick={handleClickLogin}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          登入
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
