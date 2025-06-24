"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Task } from "@/app/types/task";
import { Clock, User, Edit3, CheckCircle, MoreVertical, Edit } from "lucide-react";
import { ASSIGNEES, getAssigneeById, getAssigneeOptions } from "@/app/lib/assignees";

interface TaskCardProps {
  task: Task;
  onTaskClick?: (task: Task) => void;
  onAssigneeChange?: (taskId: string, assignee: string) => void;
  onEdit?: (task: Task) => void;
}

// Get assignee options from centralized data
const availableAssignees = getAssigneeOptions();

export function TaskCard({ task, onTaskClick, onAssigneeChange, onEdit }: TaskCardProps) {
  let [isEditingAssignee, setIsEditingAssignee] = useState(false);
  
  let priorityColors = {
    low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  let getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  let handleAssigneeChange = (newAssignee: string) => {
    onAssigneeChange?.(task.id, newAssignee);
    setIsEditingAssignee(false);
  };

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 mb-3 border-l-4 border-l-blue-500 dark:border-l-blue-400">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle 
            className="text-sm font-semibold leading-tight text-gray-900 dark:text-gray-100 flex-1"
            onClick={() => onTaskClick?.(task)}
          >
            {task.title}
          </CardTitle>
          <div className="flex items-center gap-2">
            {task.priority && (
              <Badge 
                variant="secondary" 
                className={`text-xs font-medium shrink-0 ${priorityColors[task.priority]}`}
              >
                {task.priority}
              </Badge>
            )}
            
            {/* Task Actions Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical className="h-3 w-3 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem 
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.(task);
                  }}
                  className="cursor-pointer"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Task
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-3">
        {task.description && (
          <div onClick={() => onTaskClick?.(task)}>
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
              {task.description}
            </p>
          </div>
        )}
        
        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {task.tags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
          {/* Assignee Section */}
          <div className="flex items-center gap-2">
            {task.assignee ? (
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={getAssigneeById(task.assignee)?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${task.assignee}`} />
                  <AvatarFallback className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                    {getAssigneeById(task.assignee)?.initials || getInitials(task.assignee)}
                  </AvatarFallback>
                </Avatar>
                
                {isEditingAssignee ? (
                  <Select 
                    defaultValue={task.assignee} 
                    onValueChange={handleAssigneeChange}
                    onOpenChange={(open) => !open && setIsEditingAssignee(false)}
                  >
                    <SelectTrigger className="h-6 text-xs w-auto min-w-[100px] bg-transparent border-none p-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ASSIGNEES.map((assignee) => (
                        <SelectItem key={assignee.id} value={assignee.id} className="text-xs">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-4 w-4">
                              <AvatarImage src={assignee.avatar} />
                              <AvatarFallback className="text-xs">
                                {assignee.initials}
                              </AvatarFallback>
                            </Avatar>
                            {assignee.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                      {getAssigneeById(task.assignee)?.name || task.assignee}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsEditingAssignee(true);
                      }}
                    >
                      <Edit3 className="h-3 w-3 text-gray-500" />
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500">
                    <User className="h-3 w-3" />
                  </AvatarFallback>
                </Avatar>
                
                {isEditingAssignee ? (
                  <Select 
                    onValueChange={handleAssigneeChange}
                    onOpenChange={(open) => !open && setIsEditingAssignee(false)}
                  >
                    <SelectTrigger className="h-6 text-xs w-auto min-w-[100px] bg-transparent border-none p-1">
                      <SelectValue placeholder="Assign..." />
                    </SelectTrigger>
                    <SelectContent>
                      {ASSIGNEES.map((assignee) => (
                        <SelectItem key={assignee.id} value={assignee.id} className="text-xs">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-4 w-4">
                              <AvatarImage src={assignee.avatar} />
                              <AvatarFallback className="text-xs">
                                {assignee.initials}
                              </AvatarFallback>
                            </Avatar>
                            {assignee.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditingAssignee(true);
                    }}
                  >
                    Assign
                  </Button>
                )}
              </div>
            )}
          </div>
          
          {/* Date Section */}
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{new Date(task.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 