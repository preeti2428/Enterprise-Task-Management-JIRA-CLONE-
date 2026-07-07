import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckCircle2, Clock, ListTodo, AlertCircle } from 'lucide-react';

const mockChartData = [
  { name: 'Mon', completed: 4, added: 6 },
  { name: 'Tue', completed: 7, added: 5 },
  { name: 'Wed', completed: 5, added: 8 },
  { name: 'Thu', completed: 10, added: 4 },
  { name: 'Fri', completed: 8, added: 7 },
  { name: 'Sat', completed: 2, added: 1 },
  { name: 'Sun', completed: 3, added: 2 },
];

const mockRecentActivity = [
  { id: 1, user: 'John Doe', action: 'completed task', task: 'Update landing page', time: '2 hours ago' },
  { id: 2, user: 'Sarah Smith', action: 'commented on', task: 'API Integration', time: '4 hours ago' },
  { id: 3, user: 'Preeti', action: 'created project', task: 'Q3 Marketing', time: '1 day ago' },
  { id: 4, user: 'Mike Johnson', action: 'moved task to Review', task: 'Fix login bug', time: '1 day ago' },
];

export default function Dashboard() {
  return (
    <div className="p-8 h-full bg-grid-pattern bg-muted/10 relative overflow-y-auto">
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 to-background/50 pointer-events-none"></div>
      
      <div className="relative max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here is what's happening across your projects.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="glass-panel border-l-4 border-l-blue-500 hover:-translate-y-1 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Tasks</CardTitle>
              <ListTodo className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">124</div>
              <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
            </CardContent>
          </Card>
          
          <Card className="glass-panel border-l-4 border-l-amber-500 hover:-translate-y-1 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">32</div>
              <p className="text-xs text-muted-foreground mt-1">4 pending review</p>
            </CardContent>
          </Card>

          <Card className="glass-panel border-l-4 border-l-green-500 hover:-translate-y-1 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">85</div>
              <p className="text-xs text-muted-foreground mt-1">This week: +14</p>
            </CardContent>
          </Card>

          <Card className="glass-panel border-l-4 border-l-red-500 hover:-translate-y-1 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Overdue</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">7</div>
              <p className="text-xs text-red-500 mt-1">Requires immediate attention</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Section */}
          <Card className="col-span-1 lg:col-span-2 glass-panel">
            <CardHeader>
              <CardTitle>Task Velocity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorAdded" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--muted-foreground))'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--muted-foreground))'}} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--background))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                      itemStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Area type="monotone" dataKey="completed" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#colorCompleted)" />
                    <Area type="monotone" dataKey="added" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorAdded)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Activity Feed */}
          <Card className="col-span-1 glass-panel">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockRecentActivity.map((activity) => (
                  <div key={activity.id} className="flex gap-4">
                    <div className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0"></div>
                    <div>
                      <p className="text-sm">
                        <span className="font-semibold text-foreground">{activity.user}</span>{' '}
                        <span className="text-muted-foreground">{activity.action}</span>{' '}
                        <span className="font-medium text-foreground">{activity.task}</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
