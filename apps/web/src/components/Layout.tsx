import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Zap, 
  Settings,
  Bell,
  Search
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-900 text-white flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Zap size={20} className="fill-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Nexus AI</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          <NavItem to="/" icon={<LayoutDashboard size={20} />} label="Command Center" />
          <NavItem to="/jobs" icon={<Briefcase size={20} />} label="Job Tracking" />
          <NavItem to="/leads" icon={<Users size={20} />} label="CRM & Leads" />
          <NavItem to="/automation" icon={<Zap size={20} />} label="Automation Lab" />
          <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" />
        </nav>

        <div className="p-4 border-t border-indigo-800">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-800 cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-slate-400 flex-shrink-0" />
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">Ops Manager</p>
              <p className="text-xs text-indigo-300 truncate">Nexus Agency</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <div className="relative w-96">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search everything..." 
              className="w-full pl-10 pr-4 py-2 rounded-md bg-slate-100 border-transparent focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-sm transition-all"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2" />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
              New Automation
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) => (
  <NavLink 
    to={to}
    className={({ isActive }) => `
      flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-all
      ${isActive 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
        : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
      }
    `}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </NavLink>
);

export default Layout;
