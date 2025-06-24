export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done';
  priority?: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  assignee?: string;
  tags?: string[];
}

export type TaskStatus = Task['status'];

export interface KanbanColumn {
  id: TaskStatus;
  title: string;
  tasks: Task[];
} 