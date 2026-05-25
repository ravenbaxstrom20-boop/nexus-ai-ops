export type TriggerType = 'webhook' | 'lead_created' | 'schedule';

export interface Trigger {
  type: TriggerType;
  config: any;
}

export type ActionType = 'email' | 'slack' | 'ai_process' | 'update_lead' | 'ai_lead_scoring' | 'log' | 'ai_enrichment';

export interface Action {
  id: string;
  type: ActionType;
  config: any;
}

export interface WorkflowDefinition {
  trigger: Trigger;
  actions: Action[];
}

export interface WorkflowInstance {
  id: string;
  workflowId: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  data: any;
  currentActionIndex: number;
}
/home/engine/.bashrc: line 1: syntax error near unexpected token `('
/home/engine/.bashrc: line 1: `. /etc/profile.d/workload-containment.shn# ~/.bashrc: executed by bash(1) for non-login shells.'
/home/engine/.bashrc: line 1: syntax error near unexpected token `('
/home/engine/.bashrc: line 1: `. /etc/profile.d/workload-containment.shn# ~/.bashrc: executed by bash(1) for non-login shells.'
/home/engine/.bashrc: line 1: syntax error near unexpected token `('
/home/engine/.bashrc: line 1: `. /etc/profile.d/workload-containment.shn# ~/.bashrc: executed by bash(1) for non-login shells.'
