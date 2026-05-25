import axios from 'axios';
import { Lead } from './types';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const leadsApi = {
  getAll: async (): Promise<Lead[]> => {
    const response = await api.get('/leads');
    return response.data;
  },
  getOne: async (id: string): Promise<Lead> => {
    const response = await api.get(`/leads/${id}`);
    return response.data;
  },
  create: async (lead: Partial<Lead>): Promise<Lead> => {
    const response = await api.post('/leads', lead);
    return response.data;
  },
  update: async (id: string, lead: Partial<Lead>): Promise<Lead> => {
    const response = await api.patch(`/leads/${id}`, lead);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/leads/${id}`);
  },
  executeWorkflow: async (leadId: string): Promise<{ score: number }> => {
    // Stub for now, will connect to POST /workflows/:id/execute
    // Assuming workflow id 'lead-scorer' for now
    // const response = await api.post(`/workflows/lead-scorer/execute`, { leadId });
    // return response.data;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { score: Math.floor(Math.random() * 100) };
  }
};

export const jobsApi = {
  getAll: async (): Promise<Job[]> => {
    const response = await api.get('/jobs');
    return response.data;
  },
  getOne: async (id: string): Promise<Job> => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },
  create: async (job: Partial<Job>): Promise<Job> => {
    const response = await api.post('/jobs', job);
    return response.data;
  },
  update: async (id: string, job: Partial<Job>): Promise<Job> => {
    const response = await api.patch(`/jobs/${id}`, job);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/jobs/${id}`);
  },
};
