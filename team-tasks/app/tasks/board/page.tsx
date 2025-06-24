"use client";

import { useState } from "react";
import { KanbanBoard } from "@/app/components/kanban/kanban-board";
import { TaskDialog } from "@/app/components/task-dialog";
import { Task } from "@/app/types/task";
import { ThemeToggle } from "@/app/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";

// Sample tasks for demonstration
let sampleTasks: Task[] = [
  {
    id: "1",
    title: "Design system setup",
    description: "Set up the design system with shadcn/ui components and Tailwind CSS configuration.",
    status: "todo",
    priority: "high",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    assignee: "john.doe",
    tags: ["design", "setup", "ui"]
  },
  {
    id: "2",
    title: "API Integration",
    description: "Integrate with the backend API endpoints for task management.",
    status: "todo",
    priority: "medium",
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-16"),
    assignee: "jane.smith",
    tags: ["api", "backend"]
  },
  {
    id: "3",
    title: "User Authentication",
    description: "Implement user login and registration functionality with proper validation.",
    status: "in-progress",
    priority: "high",
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-17"),
    assignee: "mike.johnson",
    tags: ["auth", "security", "frontend"]
  },
  {
    id: "4",
    title: "Database Schema",
    description: "Design and implement the database schema for tasks and users.",
    status: "in-progress",
    priority: "medium",
    createdAt: new Date("2024-01-13"),
    updatedAt: new Date("2024-01-16"),
    assignee: "sarah.wilson",
    tags: ["database", "schema"]
  },
  {
    id: "5",
    title: "Project Setup",
    description: "Initial project setup with Next.js, TypeScript, and essential dependencies.",
    status: "done",
    priority: "low",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-12"),
    assignee: "john.doe",
    tags: ["setup", "nextjs", "typescript"]
  },
  {
    id: "6",
    title: "Responsive Design",
    description: "Ensure the application works well on mobile and tablet devices.",
    status: "done",
    priority: "medium",
    createdAt: new Date("2024-01-11"),
    updatedAt: new Date("2024-01-13"),
    assignee: "jane.smith",
    tags: ["responsive", "mobile", "css"]
  }
];

export default function KanbanBoardPage() {
  let [tasks, setTasks] = useState<Task[]>(sampleTasks);
  let [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  let [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  let [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  let [createTaskStatus, setCreateTaskStatus] = useState<Task['status']>('todo');

  let handleTaskClick = (task: Task) => {
    console.log("Task clicked:", task);
    // Here you could open a task detail modal or navigate to a task page
  };

  let handleAddTask = (status: Task['status']) => {
    setCreateTaskStatus(status);
    setIsCreateDialogOpen(true);
  };

  let handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsEditDialogOpen(true);
  };

  let handleAssigneeChange = (taskId: string, assignee: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, assignee, updatedAt: new Date() }
          : task
      )
    );
  };

  let handleCreateTask = async (data: any) => {
    // Generate a unique ID (in a real app, this would be handled by the backend)
    const newId = (Math.max(...tasks.map(t => parseInt(t.id))) + 1).toString();
    
    const newTask: Task = {
      id: newId,
      title: data.title,
      description: data.description || "",
      status: createTaskStatus,
      priority: data.priority || "medium",
      assignee: data.assignee === "unassigned" ? "" : data.assignee || "",
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: data.tags || [],
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
    console.log("Created task:", newTask);
  };

  let handleUpdateTask = async (data: any) => {
    if (!editingTask) return;

    const updatedTask = {
      ...editingTask,
      title: data.title,
      description: data.description || "",
      status: data.status,
      priority: data.priority || "medium",
      assignee: data.assignee === "unassigned" ? "" : data.assignee || "",
      updatedAt: new Date(),
    };

    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === editingTask.id ? updatedTask : task
      )
    );

    console.log("Updated task:", updatedTask);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Kanban Board</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Task
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-muted-foreground">
            Team Tasks Management
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Organize your tasks using a beautiful kanban board interface with assignee management
          </p>
        </div>

        <KanbanBoard
          tasks={tasks}
          onTaskClick={handleTaskClick}
          onAddTask={handleAddTask}
          onAssigneeChange={handleAssigneeChange}
          onEdit={handleEditTask}
        />

        {/* Create Task Dialog */}
        <TaskDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onSubmit={handleCreateTask}
        />

        {/* Edit Task Dialog */}
        <TaskDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          task={editingTask}
          onSubmit={handleUpdateTask}
        />
      </main>
    </div>
  );
} 