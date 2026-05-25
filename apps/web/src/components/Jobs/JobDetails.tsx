import React from 'react';
import { Job } from '../../types';
import { 
  Calendar, 
  Clock, 
  AlertCircle, 
  ArrowLeft, 
  User, 
  FileText,
  CheckCircle2,
  MoreVertical
} from 'lucide-react';

interface JobDetailsProps {
  job: Job;
  onBack: () => void;
  onEdit: (job: Job) => void;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job, onBack, onEdit }) => {
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
      case 'urgent': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-blue-600 bg-blue-50';
      case 'low': return 'text-slate-400 bg-slate-50';
      default: return 'text-slate-400 bg-slate-50';
    }
  };

  return (
    <div className="space-y-6">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Back to Jobs</span>
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-8 py-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20">
              <FileText size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{job.title}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(job.status)}`}>
                  {job.status.replace('_', ' ')}
                </span>
                <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getPriorityColor(job.priority)}`}>
                  <AlertCircle size={10} />
                  {job.priority}
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => onEdit(job)}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 hover:bg-slate-50 transition-colors bg-white"
          >
            Edit Job
          </button>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Description</h3>
              <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100">
                {job.description || 'No description provided.'}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Linked Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {job.lead ? (
                  <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      {job.lead.firstName[0]}{job.lead.lastName[0]}
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Associated Lead</p>
                      <p className="text-sm font-bold text-slate-900">{job.lead.firstName} {job.lead.lastName}</p>
                      <p className="text-[10px] text-slate-400">{job.lead.company}</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-center gap-4 text-slate-400">
                    <User size={20} />
                    <span className="text-sm">No lead linked</span>
                  </div>
                )}
                
                <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Due Date</p>
                    <p className="text-sm font-bold text-slate-900">
                      {job.dueDate ? new Date(job.dueDate).toLocaleDateString(undefined, { dateStyle: 'long' }) : 'Not set'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Metadata</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-slate-200">
                  <span className="text-xs text-slate-500">Created</span>
                  <span className="text-xs font-medium text-slate-900">{new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-200">
                  <span className="text-xs text-slate-500">Last Updated</span>
                  <span className="text-xs font-medium text-slate-900">{new Date(job.updatedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-xs text-slate-500">Job ID</span>
                  <span className="text-[10px] font-mono text-slate-400">{job.id}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-900 text-white rounded-xl p-6 shadow-lg shadow-indigo-900/20">
              <h3 className="text-sm font-semibold mb-4">AI Assistant</h3>
              <p className="text-xs text-indigo-200 leading-relaxed mb-4">
                This job is currently <strong>{job.status.replace('_', ' ')}</strong>. 
                {job.priority === 'urgent' && " High priority detected. Automation protocols are monitoring for delays."}
              </p>
              <button className="w-full py-2 bg-blue-600 rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors">
                Run Health Check
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
