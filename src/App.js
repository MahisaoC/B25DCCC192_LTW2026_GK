import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import ExpenseList from './pages/ExpenseList';
import AddExpense from './pages/AddExpense';
import ExpenseDetail from './pages/ExpenseDetail';

// eslint-disable-next-line no-unused-vars
const BUILD_TAG = "mv-3358";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2.4 Gọi API + đọc localStorage (nâng cao)
  useEffect(() => {
    // Nâng cao: đọc dữ liệu đã lưu từ localStorage
    const saved = localStorage.getItem('gk_expenses');
    if (saved) {
      setExpenses(JSON.parse(saved));
      setLoading(false);
      return;
    }

    // Cơ bản: gọi API
    const controller = new AbortController();
    axios
      .get('/data/expenses.json', { signal: controller.signal })
      .then((res) => {
        setExpenses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        // Nâng cao: hủy request – bỏ qua nếu bị cancel
        if (axios.isCancel(err)) return;
        setError('Không tải được dữ liệu');
        setLoading(false);
      });

    // Nâng cao: cleanup – hủy request khi unmount
    return () => {
      controller.abort();
    };
  }, []);

  // Nâng cao: lưu dữ liệu vào localStorage khi thay đổi
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('gk_expenses', JSON.stringify(expenses));
    }
  }, [expenses, loading]);

  // Hàm thêm khoản chi
  const addExpense = (expense) => {
    const maxId = expenses.length > 0
      ? Math.max(...expenses.map((e) => e.id))
      : 0;
    const newExpense = { ...expense, id: maxId + 1, paid: false };
    setExpenses([...expenses, newExpense]);
  };

  // Hàm xóa khoản chi
  const deleteExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  // Hàm cập nhật trạng thái thanh toán
  const togglePaid = (id) => {
    setExpenses(
      expenses.map((e) =>
        e.id === id ? { ...e, paid: !e.paid } : e
      )
    );
  };

  // Render loading / error
  if (loading) {
    return (
      <Layout>
        <p>Đang tải...</p>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <p>{error}</p>
      </Layout>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home expenses={expenses} />} />
        <Route
          path="expenses"
          element={
            <ExpenseList
              expenses={expenses}
              onDelete={deleteExpense}
              onTogglePaid={togglePaid}
            />
          }
        />
        <Route
          path="expenses/new"
          element={<AddExpense onAdd={addExpense} />}
        />
        <Route
          path="expenses/:id"
          element={<ExpenseDetail expenses={expenses} />}
        />
      </Route>
    </Routes>
  );
};

export default App;
