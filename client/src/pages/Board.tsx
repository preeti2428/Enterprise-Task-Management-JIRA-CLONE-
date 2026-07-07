import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Paperclip, MessageSquare, Plus, Filter, Loader2, AlertCircle } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import EditTaskModal from '@/components/tasks/EditTaskModal';

const COLUMNS = ['To Do', 'In Progress', 'Review', 'Testing', 'Done'];

export default function KanbanBoard() {
  const queryClient = useQueryClient();
  const [selectedTask, setSelectedTask] = useState<any | null>(null);

  const { data: workspaces, isLoading: wsLoading } = useQuery({
    queryKey: ['workspaces'],
    queryFn: async () => {
      const { data } = await api.get('/workspaces');
      return data;
    }
  });

  const currentWorkspace = workspaces?.[0];

  const { data: projects, isLoading: projLoading } = useQuery({
    queryKey: ['projects', currentWorkspace?.id],
    queryFn: async () => {
      const { data } = await api.get(`/projects/workspace/${currentWorkspace.id}`);
      return data;
    },
    enabled: !!currentWorkspace?.id
  });

  const currentProject = projects?.[0];

  const { data: tasks = [], isLoading: tasksLoading } = useQuery({
    queryKey: ['tasks', currentProject?.id],
    queryFn: async () => {
      const { data } = await api.get(`/tasks/project/${currentProject.id}`);
      return data;
    },
    enabled: !!currentProject?.id
  });

  const updateTaskStatus = useMutation({
    mutationFn: async ({ taskId, status }: { taskId: string, status: string }) => {
      const { data } = await api.patch(`/tasks/${taskId}/status`, { status });
      return data;
    },
    onMutate: async ({ taskId, status }) => {
      await queryClient.cancelQueries({ queryKey: ['tasks', currentProject?.id] });
      const previousTasks = queryClient.getQueryData(['tasks', currentProject?.id]);
      
      queryClient.setQueryData(['tasks', currentProject?.id], (old: any) => {
        if (!old) return old;
        return old.map((t: any) => t.id === taskId ? { ...t, status } : t);
      });
      return { previousTasks };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['tasks', currentProject?.id], context?.previousTasks);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', currentProject?.id] });
    }
  });

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    updateTaskStatus.mutate({ taskId: draggableId, status: destination.droppableId });
  };

  const getTasksByStatus = (status: string) => tasks.filter((t: any) => t.status === status);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'LOW': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (wsLoading || projLoading || tasksLoading) {
    return <div className="h-full flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  if (!currentWorkspace || !currentProject) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8">
        <AlertCircle className="w-12 h-12 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">No Project Found</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          You don't have any active projects or workspaces yet. Create one to start managing your tasks!
        </p>
        <Button onClick={async () => {
          try {
            const res = await api.post('/workspaces', { name: 'Acme Corp', description: 'Main Workspace' });
            await api.post('/projects', { name: 'Sprint 4 Board', description: 'Current sprint', workspaceId: res.data.id });
            queryClient.invalidateQueries({ queryKey: ['workspaces'] });
          } catch (err: any) {
            console.error(err);
            if (err.response?.status === 401 || err.response?.status === 403) {
              alert("Error: Aap logged in nahi hain! Redirecting to login page...");
              window.location.href = '/login';
            } else {
              alert("Failed to initialize project: " + err.message);
            }
          }
        }}>
          Initialize Demo Project
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8 h-full bg-grid-pattern bg-muted/10 flex flex-col min-h-0 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 to-background/50 pointer-events-none"></div>
      <div className="relative mb-8 flex flex-col gap-4 sm:flex-row sm:items-center justify-between shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{currentProject.name}</h1>
          <p className="text-muted-foreground">{currentProject.description}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden sm:flex">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button onClick={async () => {
            try {
              await api.post('/tasks', {
                title: 'New Task ' + Math.floor(Math.random() * 1000),
                description: 'Auto-generated task',
                priority: 'MEDIUM',
                projectId: currentProject.id
              });
              queryClient.invalidateQueries({ queryKey: ['tasks', currentProject.id] });
            } catch (err: any) {
              console.error(err);
              if (err.response?.status === 401 || err.response?.status === 403) {
                alert("Error: Aap logged in nahi hain! Redirecting to login page...");
                window.location.href = '/login';
              } else {
                alert("Failed to create task: " + err.message);
              }
            }
          }}>
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-1 gap-6 overflow-x-auto pb-4">
          {COLUMNS.map((colId) => {
            const colTasks = getTasksByStatus(colId);
            return (
              <div key={colId} className="flex flex-col w-80 shrink-0">
                <div className="flex items-center justify-between mb-4 px-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${colId === 'To Do' ? 'bg-slate-400' : colId === 'In Progress' ? 'bg-blue-500' : colId === 'Review' ? 'bg-purple-500' : colId === 'Testing' ? 'bg-orange-500' : 'bg-green-500'}`}></div>
                    <h2 className="font-semibold text-foreground/90 tracking-tight">{colId}</h2>
                  </div>
                  <Badge variant="secondary" className="bg-muted/50">{colTasks.length}</Badge>
                </div>
                
                <Droppable droppableId={colId}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`flex-1 p-3 rounded-2xl transition-all glass-panel ${snapshot.isDraggingOver ? 'bg-primary/5 border-primary/20 scale-[1.02]' : ''}`}
                    >
                      {colTasks.map((task: any, index: number) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mb-4 group"
                              style={{ ...provided.draggableProps.style }}
                            >
                              <Card 
                                onClick={() => setSelectedTask(task)}
                                className={`shadow-sm bg-background/95 backdrop-blur-sm rounded-xl overflow-hidden border-l-4 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${snapshot.isDragging ? 'shadow-2xl border-primary/50 rotate-2 scale-105' : ''} ${
                                  task.priority === 'HIGH' ? 'border-l-red-500' : task.priority === 'MEDIUM' ? 'border-l-yellow-500' : 'border-l-green-500'
                                }`}
                              >
                                <CardHeader className="p-4 pb-2">
                                  <div className="flex justify-between items-start mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                    <Badge className={getPriorityColor(task.priority)} variant="outline">
                                      {task.priority}
                                    </Badge>
                                  </div>
                                  <CardTitle className="text-base font-bold leading-tight">{task.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                    {task.description}
                                  </p>
                                  <div className="flex items-center justify-between text-muted-foreground">
                                    <div className="flex gap-3 text-xs">
                                      <div className="flex items-center gap-1">
                                        <MessageSquare className="w-3 h-3" />
                                        <span>0</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Paperclip className="w-3 h-3" />
                                        <span>0</span>
                                      </div>
                                    </div>
                                    {task.assignee && (
                                      <Avatar className="w-6 h-6">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${task.assignee.name}`} />
                                        <AvatarFallback>{task.assignee.name[0]}</AvatarFallback>
                                      </Avatar>
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>

      <EditTaskModal 
        isOpen={!!selectedTask} 
        onClose={() => setSelectedTask(null)} 
        task={selectedTask} 
        projectId={currentProject?.id} 
      />
    </div>
  );
}
