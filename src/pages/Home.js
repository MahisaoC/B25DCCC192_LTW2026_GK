import { formatMoney } from '../data';

const Home = ({ expenses }) => {
  const totalCount = expenses.length;

  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);

  const totalUnpaid = expenses
    .filter((e) => !e.paid)
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <div>
      <h2>Chi tiêu cá nhân</h2>
      <p>Tổng số khoản chi: {totalCount}</p>
      <p>Tổng số tiền đã chi: {formatMoney(totalAmount)}</p>
      <p>Tổng số tiền chưa thanh toán: {formatMoney(totalUnpaid)}</p>
    </div>
  );
};

export default Home;
