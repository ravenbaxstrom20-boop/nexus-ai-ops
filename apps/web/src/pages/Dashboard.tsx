import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { dashboardApi, jobsApi } from '../api';
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  Clock, 
  AlertCircle,
  CheckCircle2,
  MoreVertical,
  Loader2
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const Dashboard: React.FC = () => {
  const { data: stats, isLoading: statsLoading } = useQuery(['dashboard-stats'], dashboardApi.getStats);
  const { data: jobs, isLoading: jobsLoading } = useQuery(['recent-jobs'], jobsApi.getAll);

  if (statsLoading || jobsLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  const activeJobsCount = stats?.jobsByStatus?.reduce((acc: number, curr: any) => {
    if (curr.status !== 'completed' && curr.status !== 'cancelled') {
      return acc + curr.count;
    }
    return acc;
  }, 0) || 0;

  const recentJobs = [...(jobs || [])]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3);

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
          value={activeJobsCount.toString()} 
          change="Real-time" 
          icon={<Briefcase className="text-blue-600" />} 
        />
        <StatCard 
          title="Hot Leads" 
          value={stats?.hotLeadsCount?.toString() || '0'} 
          change="Score > 80" 
          icon={<TrendingUp className="text-emerald-600" />} 
        />
        <StatCard 
          title="Lead Pipeline Value" 
          value={`${(stats?.totalLeadsValue || 0).toLocaleString()}`} 
          change="Potential revenue" 
          icon={<TrendingUp className="text-indigo-600" />} 
        />
        <StatCard 
          title="Completed Jobs" 
          value={(stats?.jobsByStatus?.find((s: any) => s.status === 'completed')?.count || 0).toString()} 
          change="Finished projects" 
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
              {recentJobs.map((job) => (
                <ActivityItem 
                  key={job.id}
                  client={job.lead?.company || job.lead?.firstName || 'Unknown Client'} 
                  project={job.title} 
                  status={job.status} 
                  time={formatDistanceToNow(new Date(job.updatedAt), { addSuffix: true })} 
                />
              ))}
              {recentJobs.length === 0 && (
                <p className="px-6 py-8 text-center text-sm text-slate-500 italic">No recent activity</p>
              )}
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
            <h2 className="font-semibold text-slate-900 mb-4">Industry Breakdown</h2>
            <div className="space-y-4">
              {stats?.industryBreakdown?.map((item: any) => (
                <PipelineStep 
                  key={item.industry}
                  label={item.industry} 
                  count={item.count} 
                  color="bg-blue-500" 
                />
              ))}
              {(!stats?.industryBreakdown || stats.industryBreakdown.length === 0) && (
                <p className="text-sm text-slate-500 italic">No industry data available</p>
              )}
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
        ${status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 
          status === 'pending' ? 'bg-orange-100 text-orange-700' : 
          status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
          status === 'on_hold' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'}
      `}>
        {status.replace('_', ' ')}
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
