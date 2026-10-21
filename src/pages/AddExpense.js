import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data';

const AddExpense = ({ onAdd }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Ăn uống');
  const [date, setDate] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !amount || !date) {
      setErrorMsg('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    const amountNum = Number(amount);
    if (!Number.isInteger(amountNum) || amountNum < 1000 || amountNum > 100000000) {
      setErrorMsg('Số tiền phải từ 1.000 đến 100.000.000');
      return;
    }

    onAdd({
      title: title.trim(),
      amount: amountNum,
      category,
      date,
    });

    navigate('/expenses', { replace: true });
  };

  return (
    <div>
      <h2>Thêm khoản chi mới</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Tên khoản chi</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Số tiền</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Danh mục</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Ngày chi</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button type="submit">Thêm</button>
      </form>
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
    </div>
  );
};

export default AddExpense;
