import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
        Trang chủ
      </NavLink>
      <NavLink to="/expenses" end className={({ isActive }) => isActive ? 'active' : ''}>
        Danh sách
      </NavLink>
      <NavLink to="/expenses/new" end className={({ isActive }) => isActive ? 'active' : ''}>
        Thêm mới
      </NavLink>
    </nav>
  );
};

export default NavBar;
