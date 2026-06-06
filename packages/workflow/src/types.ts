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
