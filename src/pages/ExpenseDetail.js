import { useParams, useNavigate } from 'react-router-dom';
import { formatMoney } from '../data';

const ExpenseDetail = ({ expenses }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const expense = expenses.find((e) => e.id === Number(id));

  if (!expense) {
    return (
      <div>
        <p>Không tìm thấy khoản chi</p>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    );
  }

  const { title, amount, category, date, paid } = expense;

  return (
    <div>
      <h2>Chi tiết khoản chi</h2>
      <p>Tên khoản chi: {title}</p>
      <p>Số tiền: {formatMoney(amount)}</p>
      <p>Danh mục: {category}</p>
      <p>Ngày: {date}</p>
      <p>Trạng thái: {paid ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
      <button onClick={() => navigate(-1)}>Quay lại</button>
    </div>
  );
};

export default ExpenseDetail;
