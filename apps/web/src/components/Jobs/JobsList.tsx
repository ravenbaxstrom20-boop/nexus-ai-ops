import React from 'react';
import { Job } from '../../types';
import { MoreVertical, Calendar, Clock, AlertCircle, CheckCircle2, User } from 'lucide-react';

interface JobsListProps {
  jobs: Job[];
  onSelectJob: (job: Job) => void;
  onEditJob: (job: Job) => void;
}

const JobsList: React.FC<JobsListProps> = ({ jobs, onSelectJob, onEditJob }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-700';
      case 'in_progress': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-slate-100 text-slate-700';
      case 'on_hold': return 'bg-orange-100 text-orange-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-blue-600';
      case 'low': return 'text-slate-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Job Title</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Lead</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Priority</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Due Date</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {jobs.map((job) => (
            <tr 
              key={job.id} 
              className="hover:bg-slate-50 transition-colors cursor-pointer"
              onClick={() => onSelectJob(job)}
            >
              <td className="px-6 py-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{job.title}</p>
                  {job.description && (
                    <p className="text-xs text-slate-500 truncate max-w-xs">{job.description}</p>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                {job.lead ? (
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <User size={14} className="text-slate-400" />
                    {job.lead.firstName} {job.lead.lastName}
                  </div>
                ) : (
                  <span className="text-xs text-slate-400">Unlinked</span>
                )}
              </td>
              <td className="px-6 py-4">
                <span className={`inline-block px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(job.status)}`}>
                  {job.status.replace('_', ' ')}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1.5 text-xs font-medium capitalize">
                  <AlertCircle size={14} className={getPriorityColor(job.priority)} />
                  <span className={getPriorityColor(job.priority)}>{job.priority}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Calendar size={14} className="text-slate-400" />
                  {job.dueDate ? new Date(job.dueDate).toLocaleDateString() : 'No date'}
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditJob(job);
                  }}
                  className="p-2 text-slate-400 hover:bg-slate-100 rounded-md transition-colors"
                >
                  <MoreVertical size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {jobs.length === 0 && (
        <div className="p-12 text-center">
          <Clock size={48} className="mx-auto text-slate-200 mb-4" />
          <p className="text-slate-500 font-medium">No active jobs found.</p>
        </div>
      )}
    </div>
  );
};

export default JobsList;
