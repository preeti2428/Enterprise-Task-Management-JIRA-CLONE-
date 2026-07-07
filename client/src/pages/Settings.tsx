import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save, Loader2 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../lib/api";
import { useState } from "react";

export default function Settings() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [role, setRole] = useState(user?.role || '');
  const [isSaving, setIsSaving] = useState(false);
  const [notifyAssignments, setNotifyAssignments] = useState(true);
  const [notifyMentions, setNotifyMentions] = useState(true);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const res = await api.patch('/auth/me', { name, role });
      updateUser(res.data.user);
      alert('Profile updated successfully!');
    } catch (error: any) {
      alert('Failed to update profile: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-8 h-full bg-grid-pattern bg-muted/10 relative overflow-y-auto">
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 to-background/50 pointer-events-none"></div>
      
      <div className="relative max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account settings and preferences.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1 space-y-4">
            <h3 className="font-semibold text-lg">Profile</h3>
            <p className="text-sm text-muted-foreground">This is how others will see you on the platform.</p>
          </div>
          
          <Card className="md:col-span-2 glass-panel">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your photo and personal details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <Avatar className="w-24 h-24 border-4 border-background shadow-md">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Preeti'}`} />
                    <AvatarFallback>{user?.name?.[0] || 'PR'}</AvatarFallback>
                  </Avatar>
                  <button 
                    onClick={() => alert('Your profile picture is automatically generated based on your Full Name using DiceBear. Change your name below to generate a new avatar!')}
                    className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white"
                  >
                    <Camera className="w-6 h-6" />
                  </button>
                </div>
                <div className="space-y-1">
                  <h4 className="font-medium text-sm">Profile Picture</h4>
                  <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size of 5MB.</p>
                  <Button variant="outline" size="sm" className="mt-2" onClick={() => alert('Your profile picture is automatically generated based on your Full Name using DiceBear. Change your name below to generate a new avatar!')}>Change Picture</Button>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={name} onChange={e => setName(e.target.value)} className="bg-background/50" />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={user?.email || ''} readOnly disabled className="bg-background/50 opacity-50 cursor-not-allowed" />
                  <p className="text-xs text-muted-foreground">Email cannot be changed directly.</p>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="role">Role / Job Title</Label>
                  <Input id="role" value={role} onChange={e => setRole(e.target.value)} className="bg-background/50" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/10 px-6 py-4 flex justify-end">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1 space-y-4">
            <h3 className="font-semibold text-lg">Notifications</h3>
            <p className="text-sm text-muted-foreground">Choose what updates you want to receive.</p>
          </div>
          
          <Card className="md:col-span-2 glass-panel">
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h4 className="font-medium text-sm">Task Assignments</h4>
                  <p className="text-xs text-muted-foreground">Get notified when someone assigns a task to you.</p>
                </div>
                <div 
                  onClick={() => setNotifyAssignments(!notifyAssignments)}
                  className={`w-10 h-5 rounded-full relative shadow-inner cursor-pointer transition-colors ${notifyAssignments ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 shadow-sm transition-all ${notifyAssignments ? 'right-0.5' : 'left-0.5'}`}></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h4 className="font-medium text-sm">Mentions</h4>
                  <p className="text-xs text-muted-foreground">Get notified when someone mentions you in a comment.</p>
                </div>
                <div 
                  onClick={() => setNotifyMentions(!notifyMentions)}
                  className={`w-10 h-5 rounded-full relative shadow-inner cursor-pointer transition-colors ${notifyMentions ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 shadow-sm transition-all ${notifyMentions ? 'right-0.5' : 'left-0.5'}`}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
