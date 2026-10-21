import { CATEGORIES } from '../data';

const FilterBar = ({ query, onQueryChange, category, onCategoryChange }) => {
  return (
    <div className="filter-bar">
      <div className="filter-item">
        <label htmlFor="search">Tìm kiếm</label>
        <input
          type="text"
          id="search"
          placeholder="Tìm kiếm theo tên khoản chi"
          value={query}
          onChange={onQueryChange}
        />
      </div>
      <div className="filter-item">
        <label htmlFor="category">Danh mục</label>
        <select id="category" value={category} onChange={onCategoryChange}>
          <option value="">Tất cả</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
