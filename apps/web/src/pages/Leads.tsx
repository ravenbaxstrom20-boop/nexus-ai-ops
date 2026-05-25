import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Lead } from '../types';
import { leadsApi } from '../api';
import LeadsList from '../components/Leads/LeadsList';
import LeadDetails from '../components/Leads/LeadDetails';
import LeadForm from '../components/Leads/LeadForm';
import { Plus, Search, Filter, Loader2 } from 'lucide-react';

const LeadsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Queries
  const { data: leads = [], isLoading, isError, error } = useQuery({
    queryKey: ['leads'],
    queryFn: leadsApi.getAll,
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: leadsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      setIsFormOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: Partial<Lead>) => leadsApi.update(editingLead!.id, data),
    onSuccess: (updatedLead) => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      if (selectedLead?.id === updatedLead.id) {
        setSelectedLead(updatedLead);
      }
      setEditingLead(null);
      setIsFormOpen(false);
    },
  });

  const scoreMutation = useMutation({
    mutationFn: (leadId: string) => leadsApi.executeWorkflow(leadId),
    onSuccess: (data, leadId) => {
      // After scoring, we update the lead with the new score
      updateMutation.mutate({ score: data.score });
      alert(`Lead scored: ${data.score}`);
    },
  });

  const handleAddLead = (data: Partial<Lead>) => {
    createMutation.mutate(data);
  };

  const handleUpdateLead = (data: Partial<Lead>) => {
    updateMutation.mutate(data);
  };

  const handleScoreLead = (lead: Lead) => {
    setEditingLead(lead); // Set for the follow-up update
    scoreMutation.mutate(lead.id);
  };

  const filteredLeads = leads.filter(lead => 
    lead.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.email?.toLowerCase().includes(searchQuery.toLowerCase())
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
        Error loading leads: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {!selectedLead ? (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">CRM & Leads</h1>
              <p className="text-slate-500">Manage your pipeline and track customer relationships.</p>
            </div>
            <button 
              onClick={() => {
                setEditingLead(null);
                setIsFormOpen(true);
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
            >
              <Plus size={18} />
              Add Lead
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search leads by name, company or email..." 
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

          <LeadsList 
            leads={filteredLeads} 
            onSelectLead={setSelectedLead}
            onEditLead={(lead) => {
              setEditingLead(lead);
              setIsFormOpen(true);
            }}
            onScoreLead={handleScoreLead}
          />
        </>
      ) : (
        <LeadDetails 
          lead={selectedLead} 
          onBack={() => setSelectedLead(null)}
          onEdit={(lead) => {
            setEditingLead(lead);
            setIsFormOpen(true);
          }}
          onScore={handleScoreLead}
        />
      )}

      {isFormOpen && (
        <LeadForm 
          lead={editingLead}
          onSubmit={editingLead ? handleUpdateLead : handleAddLead}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingLead(null);
          }}
        />
      )}
      
      {(createMutation.isPending || updateMutation.isPending || scoreMutation.isPending) && (
        <div className="fixed bottom-8 right-8 bg-white shadow-2xl border border-slate-200 rounded-lg px-4 py-2 flex items-center gap-3 animate-bounce">
          <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
          <span className="text-sm font-medium text-slate-700">Saving changes...</span>
        </div>
      )}
    </div>
  );
};

export default LeadsPage;
