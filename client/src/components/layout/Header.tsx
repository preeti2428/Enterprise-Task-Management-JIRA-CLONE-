import { Search, Bell, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const { user } = useAuth();
  return (
    <header className="h-16 border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-6 shrink-0 transition-all">
      <div className="flex items-center gap-4 flex-1">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="relative w-96 hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search tasks, projects..." 
            className="w-full bg-muted/40 pl-9 pr-4 rounded-full border-transparent focus-visible:border-primary/50 focus-visible:ring-primary/20 shadow-sm transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative transition-all hover:bg-muted/50">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive border-2 border-background"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 glass-panel border-border/50">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
              <span className="font-medium text-sm">New Task Assigned</span>
              <span className="text-xs text-muted-foreground">John assigned "Update landing page" to you.</span>
              <span className="text-[10px] text-primary mt-1">2 hours ago</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
              <span className="font-medium text-sm">Mentioned in Comment</span>
              <span className="text-xs text-muted-foreground">Sarah mentioned you in "API Integration".</span>
              <span className="text-[10px] text-primary mt-1">4 hours ago</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-primary cursor-pointer font-medium">
              Mark all as read
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="h-8 w-px bg-border mx-2"></div>
        
        <div className="flex items-center gap-3">
          <div className="hidden text-sm text-right md:block">
            <p className="font-medium leading-none mb-1">{user?.name || 'Preeti'}</p>
            <p className="text-xs text-muted-foreground">{user?.role || 'Admin'}</p>
          </div>
          <Avatar className="shadow-sm border border-border/50">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Preeti'}`} />
            <AvatarFallback>{user?.name?.[0] || 'PR'}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
