export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  company?: string;
  status: string;
  source?: string;
  value?: number;
  score?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'on_hold' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: string;
  leadId?: string;
  lead?: Lead;
  createdAt: string;
  updatedAt: string;
}
