import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckSquare, MoreHorizontal } from "lucide-react";

const mockTasks = [
  { id: 'TSK-101', title: 'Complete onboarding flow', project: 'Sprint 4 Board', priority: 'HIGH', status: 'In Progress', date: 'Today' },
  { id: 'TSK-102', title: 'Fix navigation layout bug', project: 'Sprint 4 Board', priority: 'MEDIUM', status: 'Review', date: 'Yesterday' },
  { id: 'TSK-105', title: 'Draft API documentation', project: 'Acme Website', priority: 'LOW', status: 'To Do', date: 'Tomorrow' },
  { id: 'TSK-108', title: 'Update dependencies', project: 'Internal Tools', priority: 'MEDIUM', status: 'To Do', date: 'Oct 24' },
  { id: 'TSK-110', title: 'Design system revamp', project: 'Sprint 4 Board', priority: 'HIGH', status: 'Done', date: 'Oct 20' },
];

export default function MyTasks() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
      case 'LOW': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done': return 'text-green-500';
      case 'In Progress': return 'text-blue-500';
      case 'Review': return 'text-purple-500';
      default: return 'text-slate-500';
    }
  };

  return (
    <div className="p-8 h-full bg-grid-pattern bg-muted/10 relative overflow-y-auto">
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 to-background/50 pointer-events-none"></div>
      
      <div className="relative max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">My Tasks</h1>
            <p className="text-muted-foreground mt-1">Here is a list of all tasks currently assigned to you.</p>
          </div>
          <Button>
            <CheckSquare className="w-4 h-4 mr-2" />
            Mark All as Done
          </Button>
        </div>

        <Card className="glass-panel overflow-hidden">
          <CardHeader className="bg-muted/30 border-b">
            <CardTitle>Open Tasks</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="w-full">
              <div className="grid grid-cols-12 gap-4 p-4 font-medium text-sm text-muted-foreground border-b bg-muted/10">
                <div className="col-span-5">Task Name</div>
                <div className="col-span-2">Project</div>
                <div className="col-span-2">Priority</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1 text-right">Actions</div>
              </div>

              <div className="divide-y divide-border/50">
                {mockTasks.map(task => (
                  <div key={task.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/30 transition-colors group">
                    <div className="col-span-5 flex items-center gap-3">
                      <Button variant="outline" size="icon" className="w-6 h-6 rounded-full shrink-0 group-hover:border-primary">
                        <CheckSquare className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                      </Button>
                      <div>
                        <p className="font-medium text-foreground">{task.title}</p>
                        <p className="text-xs text-muted-foreground">{task.id} • Due {task.date}</p>
                      </div>
                    </div>
                    
                    <div className="col-span-2 text-sm text-muted-foreground">
                      {task.project}
                    </div>
                    
                    <div className="col-span-2">
                      <Badge variant="outline" className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                    
                    <div className="col-span-2 flex items-center gap-2 text-sm font-medium">
                      <div className={`w-2 h-2 rounded-full bg-current ${getStatusColor(task.status)}`}></div>
                      {task.status}
                    </div>
                    
                    <div className="col-span-1 flex justify-end">
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
