import { useState, useEffect } from 'react';
import FilterBar from '../components/FilterBar';
import ExpenseTable from '../components/ExpenseTable';

const ExpenseList = ({ expenses, onDelete, onTogglePaid }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [width, setWidth] = useState(window.innerWidth);

  // 2.5 Responsive: lắng nghe resize
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = width < 768;

  // Hàm xử lý khi gõ vào ô tìm kiếm (tên bắt buộc theo đề)
  const handleQueryShift = (e) => {
    setQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // Lọc dữ liệu
  const filtered = expenses.filter((e) => {
    const matchQuery = e.title.toLowerCase().includes(query.toLowerCase());
    const matchCategory = category === '' || e.category === category;
    return matchQuery && matchCategory;
  });

  return (
    <div>
      <h2>Danh sách khoản chi</h2>
      <p>Chế độ: {isMobile ? 'Điện thoại' : 'Máy tính'}</p>

      <FilterBar
        query={query}
        onQueryChange={handleQueryShift}
        category={category}
        onCategoryChange={handleCategoryChange}
      />

      <p>Tìm thấy {filtered.length} khoản chi</p>

      {filtered.length > 0 ? (
        <ExpenseTable
          expenses={filtered}
          onDelete={onDelete}
          onTogglePaid={onTogglePaid}
          isMobile={isMobile}
        />
      ) : (
        <p>Không có dữ liệu</p>
      )}
    </div>
  );
};

export default ExpenseList;
