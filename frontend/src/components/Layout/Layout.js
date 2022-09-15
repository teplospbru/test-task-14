import './Layout.scss';
import { Outlet } from 'react-router-dom';

function Layout() {
  
  return (
    <>
        <div className="App">
            <div className='header'>
                <h1>Таблица</h1>
            </div>
            <Outlet />
        </div>
    </>
  );
}

export default Layout;