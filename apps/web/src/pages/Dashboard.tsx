import React from 'react';
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  Clock, 
  AlertCircle,
  CheckCircle2,
  MoreVertical
} from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Command Center</h1>
        <p className="text-slate-500">Welcome back. Here's what needs your attention today.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Active Jobs" 
          value="24" 
          change="+3 this week" 
          icon={<Briefcase className="text-blue-600" />} 
        />
        <StatCard 
          title="Hot Leads" 
          value="12" 
          change="+5 this week" 
          icon={<TrendingUp className="text-emerald-600" />} 
        />
        <StatCard 
          title="Tasks Due Today" 
          value="8" 
          change="3 overdue" 
          icon={<Clock className="text-orange-600" />} 
          trend="down"
        />
        <StatCard 
          title="Automations Run" 
          value="142" 
          change="99.2% success" 
          icon={<CheckCircle2 className="text-indigo-600" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">Recent Job Activity</h2>
              <button className="text-blue-600 text-sm font-medium hover:underline">View all</button>
            </div>
            <div className="divide-y divide-slate-100">
              <ActivityItem 
                client="Acme Corp" 
                project="Website Redesign" 
                status="In Progress" 
                time="2 hours ago" 
              />
              <ActivityItem 
                client="Global Tech" 
                project="SEO Audit" 
                status="Review" 
                time="5 hours ago" 
              />
              <ActivityItem 
                client="Local Shop" 
                project="Email Campaign" 
                status="Completed" 
                time="Yesterday" 
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-slate-900">AI Insights</h2>
              <AlertCircle size={18} className="text-blue-600" />
            </div>
            <div className="space-y-4">
              <InsightCard 
                type="warning"
                message="3 leads from 'Google Ads' haven't been contacted in 48 hours."
              />
              <InsightCard 
                type="info"
                message="Workload is high for 'Design' team next week. Consider rescheduling non-urgent tasks."
              />
            </div>
          </div>
        </div>

        {/* Sidebar content */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="font-semibold text-slate-900 mb-4">Pipeline Overview</h2>
            <div className="space-y-4">
              <PipelineStep label="New Leads" count={5} color="bg-blue-500" />
              <PipelineStep label="Discovery" count={3} color="bg-indigo-500" />
              <PipelineStep label="Proposal" count={2} color="bg-emerald-500" />
              <PipelineStep label="Negotiation" count={2} color="bg-orange-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, icon, trend = 'up' }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
      <MoreVertical size={16} className="text-slate-400 cursor-pointer" />
    </div>
    <p className="text-sm font-medium text-slate-500">{title}</p>
    <div className="flex items-end gap-2 mt-1">
      <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      <span className={`text-xs font-medium pb-1 ${trend === 'up' ? 'text-emerald-600' : 'text-orange-600'}`}>
        {change}
      </span>
    </div>
  </div>
);

const ActivityItem = ({ client, project, status, time }: any) => (
  <div className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
        {client[0]}
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-900">{project}</p>
        <p className="text-xs text-slate-500">{client}</p>
      </div>
    </div>
    <div className="text-right">
      <span className={`inline-block px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1
        ${status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 
          status === 'Review' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}
      `}>
        {status}
      </span>
      <p className="text-[10px] text-slate-400">{time}</p>
    </div>
  </div>
);

const InsightCard = ({ type, message }: any) => (
  <div className={`p-4 rounded-lg border flex gap-3 ${type === 'warning' ? 'bg-orange-50 border-orange-100' : 'bg-blue-50 border-blue-100'}`}>
    <AlertCircle size={18} className={type === 'warning' ? 'text-orange-600' : 'text-blue-600'} />
    <p className={`text-sm ${type === 'warning' ? 'text-orange-800' : 'text-blue-800'}`}>{message}</p>
  </div>
);

const PipelineStep = ({ label, count, color }: any) => (
  <div>
    <div className="flex justify-between text-xs font-medium mb-1">
      <span className="text-slate-600">{label}</span>
      <span className="text-slate-900">{count}</span>
    </div>
    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
      <div className={`${color} h-full rounded-full`} style={{ width: `${count * 10}%` }} />
    </div>
  </div>
);

export default Dashboard;
