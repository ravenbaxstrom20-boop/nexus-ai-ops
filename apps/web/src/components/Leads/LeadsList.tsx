import React from 'react';
import { Lead } from '../../types';
import { MoreVertical, Mail, Building2, Calendar, Target } from 'lucide-react';

interface LeadsListProps {
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
  onEditLead: (lead: Lead) => void;
  onScoreLead: (lead: Lead) => void;
}

const LeadsList: React.FC<LeadsListProps> = ({ leads, onSelectLead, onEditLead, onScoreLead }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Lead</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Company</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Score</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Contact</th>
            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {leads.map((lead) => (
            <tr 
              key={lead.id} 
              className="hover:bg-slate-50 transition-colors cursor-pointer"
              onClick={() => onSelectLead(lead)}
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                    {lead.firstName[0]}{lead.lastName[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{lead.firstName} {lead.lastName}</p>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Mail size={12} />
                      <span>{lead.email}</span>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Building2 size={14} className="text-slate-400" />
                  {lead.company}
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-block px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                  ${lead.status === 'Closed' ? 'bg-emerald-100 text-emerald-700' : 
                    lead.status === 'Negotiation' ? 'bg-orange-100 text-orange-700' : 
                    lead.status === 'Proposal' ? 'bg-indigo-100 text-indigo-700' : 
                    lead.status === 'Discovery' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'}
                `}>
                  {lead.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="w-12 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        (lead.score || 0) > 70 ? 'bg-emerald-500' : 
                        (lead.score || 0) > 40 ? 'bg-orange-500' : 'bg-slate-400'
                      }`}
                      style={{ width: `${lead.score || 0}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-600">{lead.score || 0}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Calendar size={14} className="text-slate-400" />
                  {lead.lastContacted || 'Never'}
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                  <button 
                    onClick={() => onScoreLead(lead)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    title="Score Lead"
                  >
                    <Target size={18} />
                  </button>
                  <button 
                    onClick={() => onEditLead(lead)}
                    className="p-2 text-slate-400 hover:bg-slate-100 rounded-md transition-colors"
                  >
                    <MoreVertical size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsList;
