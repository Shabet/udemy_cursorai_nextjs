"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TaskCard } from "./task-card";
import { Task, KanbanColumn as KanbanColumnType } from "@/app/types/task";

interface KanbanColumnProps {
  column: KanbanColumnType;
  onTaskClick?: (task: Task) => void;
  onAssigneeChange?: (taskId: string, assignee: string) => void;
  onEdit?: (task: Task) => void;
}

export function KanbanColumn({ column, onTaskClick, onAssigneeChange, onEdit }: KanbanColumnProps) {
  const getColumnColor = (status: string) => {
    switch (status) {
      case 'todo':
        return 'bg-slate-100 dark:bg-slate-800';
      case 'in-progress':
        return 'bg-blue-100 dark:bg-blue-900';
      case 'done':
        return 'bg-green-100 dark:bg-green-900';
      default:
        return 'bg-gray-100 dark:bg-gray-800';
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Card className={`${getColumnColor(column.id)} border-2 h-full`}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              {column.title}
            </CardTitle>
            <Badge variant="secondary" className="font-medium">
              {column.tasks.length}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto">
          <div className="space-y-3">
            {column.tasks.length === 0 ? (
              <div className="text-center text-muted-foreground text-sm py-8">
                No tasks yet
              </div>
            ) : (
              column.tasks.map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onTaskClick={onTaskClick}
                  onAssigneeChange={onAssigneeChange}
                  onEdit={onEdit}
                />
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 