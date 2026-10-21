const BUILD_TAG = "mv-3358";
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import ExpenseList from './pages/ExpenseList';
import AddExpense from './pages/AddExpense';
import ExpenseDetail from './pages/ExpenseDetail';

const App = () => {
  void BUILD_TAG;
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('gk_expenses');
    if (saved) {
      setExpenses(JSON.parse(saved));
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    axios
      .get('/data/expenses.json', { signal: controller.signal })
      .then((res) => {
        setExpenses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError('Không tải được dữ liệu');
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('gk_expenses', JSON.stringify(expenses));
    }
  }, [expenses, loading]);

  const addExpense = (expense) => {
    const maxId = expenses.length > 0
      ? Math.max(...expenses.map((e) => e.id))
      : 0;
    const newExpense = { ...expense, id: maxId + 1, paid: false };
    setExpenses([...expenses, newExpense]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const togglePaid = (id) => {
    setExpenses(
      expenses.map((e) =>
        e.id === id ? { ...e, paid: !e.paid } : e
      )
    );
  };

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
