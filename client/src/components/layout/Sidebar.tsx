import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  KanbanSquare, 
  BarChart2, 
  Settings, 
  Users,
  ChevronDown,
  LogOut,
  Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '../../contexts/AuthContext';

export default function Sidebar() {
  const { logout } = useAuth();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 border-r bg-muted/10 h-screen flex flex-col transition-all">
      <div className="p-6 border-b flex items-center justify-between">
        <div className="flex items-center gap-3 font-bold text-2xl tracking-tight">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 shadow-md text-primary-foreground flex items-center justify-center text-lg">
            T
          </div>
          <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">TaskFlow</span>
        </div>
      </div>
      
      <div className="p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between mb-6 shadow-sm hover:shadow transition-all bg-background/50 backdrop-blur-sm">
              <span className="font-semibold">Acme Corp</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 glass-panel border-border/50">
            <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Briefcase className="mr-2 h-4 w-4 text-primary" />
              <span className="font-medium text-primary">Acme Corp</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => alert('Multi-workspace switching is coming soon! For now, all your projects are in Acme Corp.')}>
              <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Personal Workspace</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => {
                logout();
                window.location.href = '/login';
              }} 
              className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50 dark:focus:bg-red-900/20"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <nav className="space-y-1.5">
          <Link to="/dashboard">
            <Button variant={isActive('/dashboard') ? 'default' : 'ghost'} className={`w-full justify-start ${isActive('/dashboard') ? 'shadow-md' : 'hover:translate-x-1 hover:bg-muted/50 transition-all'}`}>
              <LayoutDashboard className="mr-3 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link to="/my-tasks">
            <Button variant={isActive('/my-tasks') ? 'default' : 'ghost'} className={`w-full justify-start ${isActive('/my-tasks') ? 'shadow-md' : 'hover:translate-x-1 hover:bg-muted/50 transition-all'}`}>
              <CheckSquare className="mr-3 h-4 w-4" />
              My Tasks
            </Button>
          </Link>
          <Link to="/board">
            <Button variant={isActive('/board') ? 'default' : 'ghost'} className={`w-full justify-start ${isActive('/board') ? 'shadow-md' : 'hover:translate-x-1 hover:bg-muted/50 transition-all'}`}>
              <KanbanSquare className="mr-3 h-4 w-4" />
              Project Board
            </Button>
          </Link>
        </nav>
      </div>

      <div className="mt-auto p-4 space-y-1.5 border-t">
        <Link to="/settings">
          <Button variant="ghost" className="w-full justify-start hover:translate-x-1 hover:bg-muted/50 transition-all text-muted-foreground hover:text-foreground">
            <Settings className="mr-3 h-4 w-4" />
            Settings
          </Button>
        </Link>
      </div>
    </div>
  );
}
