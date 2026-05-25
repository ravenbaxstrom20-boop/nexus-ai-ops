import React, { useState, useEffect } from 'react';
import { Job, Lead } from '../../types';
import { X, Calendar } from 'lucide-react';

interface JobFormProps {
  job?: Job | null;
  leads: Lead[];
  onSubmit: (data: Partial<Job>) => void;
  onCancel: () => void;
}

const JobForm: React.FC<JobFormProps> = ({ job, leads, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Job>>({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: '',
    leadId: '',
  });

  useEffect(() => {
    if (job) {
      setFormData({
        ...job,
        dueDate: job.dueDate ? new Date(job.dueDate).toISOString().split('T')[0] : '',
        leadId: job.leadId || '',
      });
    }
  }, [job]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            {job ? 'Edit Job' : 'Create New Job'}
          </h2>
          <button 
            onClick={onCancel}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-1">Job Title</label>
              <input
                type="text"
                id="title"
                required
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Website Redesign"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
              <textarea
                id="description"
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all resize-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Briefly describe the job scope..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="status" className="block text-sm font-semibold text-slate-700 mb-1">Status</label>
                <select
                  id="status"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all bg-white"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="on_hold">On Hold</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label htmlFor="priority" className="block text-sm font-semibold text-slate-700 mb-1">Priority</label>
                <select
                  id="priority"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all bg-white"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="dueDate" className="block text-sm font-semibold text-slate-700 mb-1">Due Date</label>
                <input
                  type="date"
                  id="dueDate"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="leadId" className="block text-sm font-semibold text-slate-700 mb-1">Link to Lead</label>
                <select
                  id="leadId"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all bg-white"
                  value={formData.leadId}
                  onChange={(e) => setFormData({ ...formData, leadId: e.target.value })}
                >
                  <option value="">None</option>
                  {leads.map((lead) => (
                    <option key={lead.id} value={lead.id}>
                      {lead.firstName} {lead.lastName} ({lead.company || 'No Company'})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
            >
              {job ? 'Update Job' : 'Create Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
