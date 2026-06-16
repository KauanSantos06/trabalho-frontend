import { Outlet } from 'react-router';
import Menu from '../components/Menu';

export default function Layout() {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <Menu />
      <main className="flex-1 p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
  
}