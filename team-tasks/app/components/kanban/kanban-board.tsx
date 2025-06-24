"use client";

import { useState } from "react";
import { KanbanColumn } from "./kanban-column";
import { Task, KanbanColumn as KanbanColumnType } from "@/app/types/task";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface KanbanBoardProps {
  tasks?: Task[];
  onTaskClick?: (task: Task) => void;
  onAddTask?: (status: Task['status']) => void;
  onAssigneeChange?: (taskId: string, assignee: string) => void;
  onEdit?: (task: Task) => void;
}

export function KanbanBoard({ tasks = [], onTaskClick, onAddTask, onAssigneeChange, onEdit }: KanbanBoardProps) {
  // Group tasks by status
  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = [];
    }
    acc[task.status].push(task);
    return acc;
  }, {} as Record<Task['status'], Task[]>);

  const columns: KanbanColumnType[] = [
    {
      id: 'todo',
      title: 'Todo',
      tasks: groupedTasks.todo || []
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      tasks: groupedTasks['in-progress'] || []
    },
    {
      id: 'done',
      title: 'Done',
      tasks: groupedTasks.done || []
    }
  ];

  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full min-h-[600px]">
        {columns.map((column) => (
          <div key={column.id} className="flex flex-col">
            {/* Add Task Button */}
            {onAddTask && (
              <div className="mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => onAddTask(column.id)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </div>
            )}
            
            {/* Column */}
            <div className="flex-1">
              <KanbanColumn
                column={column}
                onTaskClick={onTaskClick}
                onAssigneeChange={onAssigneeChange}
                onEdit={onEdit}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 