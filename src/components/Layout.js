import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <NavBar />
      <main className="content">
        {children || <Outlet />}
      </main>
    </div>
  );
};

export default Layout;
