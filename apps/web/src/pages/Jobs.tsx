import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Job } from '../types';
import { jobsApi, leadsApi } from '../api';
import JobsList from '../components/Jobs/JobsList';
import JobDetails from '../components/Jobs/JobDetails';
import JobForm from '../components/Jobs/JobForm';
import { Plus, Search, Filter, Loader2 } from 'lucide-react';

const JobsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Queries
  const { data: jobs = [], isLoading, isError, error } = useQuery({
    queryKey: ['jobs'],
    queryFn: jobsApi.getAll,
  });

  const { data: leads = [] } = useQuery({
    queryKey: ['leads'],
    queryFn: leadsApi.getAll,
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: jobsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      setIsFormOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: Partial<Job>) => jobsApi.update(editingJob!.id, data),
    onSuccess: (updatedJob) => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      if (selectedJob?.id === updatedJob.id) {
        setSelectedJob(updatedJob);
      }
      setEditingJob(null);
      setIsFormOpen(false);
    },
  });

  const handleAddJob = (data: Partial<Job>) => {
    createMutation.mutate(data);
  };

  const handleUpdateJob = (data: Partial<Job>) => {
    updateMutation.mutate(data);
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.lead?.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.lead?.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        Error loading jobs: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {!selectedJob ? (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Job Tracking</h1>
              <p className="text-slate-500">Monitor active delivery and project milestones.</p>
            </div>
            <button 
              onClick={() => {
                setEditingJob(null);
                setIsFormOpen(true);
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
            >
              <Plus size={18} />
              New Job
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search jobs by title, description or lead..." 
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
              <Filter size={18} />
              Filter
            </button>
          </div>

          <JobsList 
            jobs={filteredJobs} 
            onSelectJob={setSelectedJob}
            onEditJob={(job) => {
              setEditingJob(job);
              setIsFormOpen(true);
            }}
          />
        </>
      ) : (
        <JobDetails 
          job={selectedJob} 
          onBack={() => setSelectedJob(null)}
          onEdit={(job) => {
            setEditingJob(job);
            setIsFormOpen(true);
          }}
        />
      )}

      {isFormOpen && (
        <JobForm 
          job={editingJob}
          leads={leads}
          onSubmit={editingJob ? handleUpdateJob : handleAddJob}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingJob(null);
          }}
        />
      )}
      
      {(createMutation.isPending || updateMutation.isPending) && (
        <div className="fixed bottom-8 right-8 bg-white shadow-2xl border border-slate-200 rounded-lg px-4 py-2 flex items-center gap-3 animate-bounce">
          <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
          <span className="text-sm font-medium text-slate-700">Saving changes...</span>
        </div>
      )}
    </div>
  );
};

export default JobsPage;
