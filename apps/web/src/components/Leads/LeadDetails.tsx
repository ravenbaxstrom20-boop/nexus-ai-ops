import React from 'react';
import { Lead } from '../../types';
import { Mail, Building2, Calendar, Target, ArrowLeft, Phone, Globe, MapPin } from 'lucide-react';

interface LeadDetailsProps {
  lead: Lead;
  onBack: () => void;
  onEdit: (lead: Lead) => void;
  onScore: (lead: Lead) => void;
}

const LeadDetails: React.FC<LeadDetailsProps> = ({ lead, onBack, onEdit, onScore }) => {
  return (
    <div className="space-y-6">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Back to Leads</span>
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-8 py-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-600/20">
              {lead.firstName[0]}{lead.lastName[0]}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{lead.firstName} {lead.lastName}</h2>
              <p className="text-slate-500">{lead.company}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onScore(lead)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Target size={18} />
              Score Lead
            </button>
            <button 
              onClick={() => onEdit(lead)}
              className="px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Edit Details
            </button>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ContactInfoItem icon={<Mail size={18} />} label="Email" value={lead.email} />
                <ContactInfoItem icon={<Phone size={18} />} label="Phone" value="+1 (555) 123-4567" />
                <ContactInfoItem icon={<Globe size={18} />} label="Website" value="www.acmecorp.com" />
                <ContactInfoItem icon={<MapPin size={18} />} label="Location" value="San Francisco, CA" />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Activity Timeline</h3>
              <div className="space-y-4">
                <TimelineItem 
                  date="May 24, 2026" 
                  title="Status updated to Negotiation" 
                  description="Lead showed strong interest in the proposal." 
                />
                <TimelineItem 
                  date="May 22, 2026" 
                  title="Proposal Sent" 
                  description="Detailed service package sent for review." 
                />
                <TimelineItem 
                  date="May 20, 2026" 
                  title="Lead Created" 
                  description="Inbound inquiry from contact form." 
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Lead Insights</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Lead Score</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${lead.score && lead.score > 70 ? 'bg-emerald-500' : 'bg-orange-500'}`}
                        style={{ width: `${lead.score || 0}%` }}
                      />
                    </div>
                    <span className="text-lg font-bold text-slate-900">{lead.score || 0}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Status</p>
                  <span className="inline-block px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700">
                    {lead.status}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Source</p>
                  <p className="text-sm font-medium text-slate-900">Inbound / Website</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactInfoItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string }) => (
  <div className="flex items-start gap-3">
    <div className="mt-1 text-slate-400">{icon}</div>
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-sm font-medium text-slate-900">{value || 'N/A'}</p>
    </div>
  </div>
);

const TimelineItem = ({ date, title, description }: { date: string, title: string, description: string }) => (
  <div className="relative pl-6 pb-6 border-l border-slate-200 last:border-0 last:pb-0">
    <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-white" />
    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{date}</p>
    <h4 className="text-sm font-semibold text-slate-900 mb-1">{title}</h4>
    <p className="text-sm text-slate-500">{description}</p>
  </div>
);

export default LeadDetails;
