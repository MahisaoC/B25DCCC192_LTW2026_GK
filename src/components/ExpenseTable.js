import ExpenseRow from './ExpenseRow';

const ExpenseTable = ({ expenses, onDelete, onTogglePaid, isMobile }) => {
  return (
    <div className={`table-wrap${isMobile ? ' mobile' : ''}`}>
      <table>
        <thead>
          <tr>
            <th>Khoản chi</th>
            <th>Số tiền</th>
            <th className="col-category">Danh mục</th>
            <th className="col-date">Ngày</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <ExpenseRow
              key={expense.id}
              expense={expense}
              onDelete={onDelete}
              onTogglePaid={onTogglePaid}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
