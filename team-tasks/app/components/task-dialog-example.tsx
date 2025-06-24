"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { TaskDialog } from "./task-dialog"
import { Task } from "@/app/types/task"

// Example usage component
export function TaskDialogExample() {
  let [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false)
  let [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false)
  let [editingTask, setEditingTask] = React.useState<Task | undefined>(undefined)

  // Example task for editing
  let exampleTask: Task = {
    id: "1",
    title: "Example Task",
    description: "This is an example task for demonstration",
    status: "todo",
    priority: "medium",
    assignee: "john.doe",
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: ["example"],
  }

  let handleCreateTask = async (data: any) => {
    // Here you would typically call your API to create the task
    console.log("Creating task:", data)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Add your task creation logic here
    // e.g., await createTask(data)
  }

  let handleUpdateTask = async (data: any) => {
    // Here you would typically call your API to update the task
    console.log("Updating task:", editingTask?.id, data)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Add your task update logic here
    // e.g., await updateTask(editingTask.id, data)
  }

  let openEditDialog = (task: Task) => {
    setEditingTask(task)
    setIsEditDialogOpen(true)
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Task Dialog Examples</h2>
      
      <div className="space-x-2">
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          Create New Task
        </Button>
        
        <Button 
          variant="outline" 
          onClick={() => openEditDialog(exampleTask)}
        >
          Edit Example Task
        </Button>
      </div>

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
    </div>
  )
} 