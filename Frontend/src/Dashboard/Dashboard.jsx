import React, { useEffect, useState } from 'react';
import { LayoutDashboard, Home, Building2 } from 'lucide-react';
import AdminDashboard from './AdminDashboard';
import OwnerDashboard from './OwnerDashboard';
import StudentDashboard from './StudentDashboard';

const Dashboard = () => {
  const [activePage, setActivePage] = useState('');

  // Set default dashboard page based on user role
  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role === 'admin') {
      setActivePage('admin');
    } else if (role === 'owner') {
      setActivePage('owner');
    } else {
      setActivePage('student');
    }
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case 'admin':
        return <AdminDashboard />;
      case 'owner':
        return <OwnerDashboard />;
      case 'student':
        return <StudentDashboard />;
      default:
        return <StudentDashboard />;
    }
  };

  const pageTitle = {
    student: 'Student Dashboard',
    owner: 'Owner Dashboard',
    admin: 'Admin Dashboard',
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col">
        <div className="p-6 text-3xl font-bold border-b border-blue-700">
          Dashboard
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem
            icon={<Home size={20} />}
            label="Student Dashboard"
            active={activePage === 'student'}
            onClick={() => setActivePage('student')}
          />
          <SidebarItem
            icon={<Building2 size={20} />}
            label="Owner Dashboard"
            active={activePage === 'owner'}
            onClick={() => setActivePage('owner')}
          />
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            label="Admin Dashboard"
            active={activePage === 'admin'}
            onClick={() => setActivePage('admin')}
          />
        </nav>
        <div className="p-4 border-t border-blue-700 text-sm text-center text-blue-200">
          &copy; 2025 BookNest
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="p-6 border-b bg-white shadow-sm text-2xl font-semibold">
          {pageTitle[activePage]}
        </header>
        <div className="p-6">{renderPage()}</div>
      </main>
    </div>
  );
};

// Sidebar Button Component
const SidebarItem = ({ icon, label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 ${
        active ? 'bg-blue-700 text-white' : 'hover:bg-blue-800 text-blue-200'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default Dashboard;