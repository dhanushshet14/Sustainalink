
'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Shield, Bell, BarChart } from 'lucide-react';
import { Switch } from '../ui/switch';

export function UserProfile() {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="profile">
          <Avatar className="mr-2 h-4 w-4" />
          Profile
        </TabsTrigger>
        <TabsTrigger value="impact">
          <BarChart className="mr-2 h-4 w-4" />
          Impact
        </TabsTrigger>
        <TabsTrigger value="notifications">
          <Bell className="mr-2 h-4 w-4" />
          Notifications
        </TabsTrigger>
        <TabsTrigger value="security">
          <Shield className="mr-2 h-4 w-4" />
          Security
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your personal details here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person portrait"/>
                  <AvatarFallback>EW</AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <h3 className="text-xl font-bold">Eco Warrior</h3>
                <p className="text-muted-foreground">eco.warrior@example.com</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" defaultValue="Eco Warrior" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="eco.warrior@example.com" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="impact">
        <Card>
          <CardHeader>
            <CardTitle>Your ESG Impact</CardTitle>
            <CardDescription>A summary of your sustainability scores.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                 <Card>
                    <CardHeader>
                        <CardTitle>Environmental</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">85</p>
                        <p className="text-sm text-muted-foreground">out of 100</p>
                    </CardContent>
                 </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Social</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">92</p>
                        <p className="text-sm text-muted-foreground">out of 100</p>
                    </CardContent>
                 </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Governance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">78</p>
                        <p className="text-sm text-muted-foreground">out of 100</p>
                    </CardContent>
                 </Card>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Manage how you receive communications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive updates and reports via email.</p>
                </div>
                <Switch defaultChecked/>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                    <h4 className="font-medium">Push Notifications</h4>
                    <p className="text-sm text-muted-foreground">Get real-time alerts on your devices.</p>
                </div>
                <Switch />
            </div>
             <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                    <h4 className="font-medium">Weekly Summary</h4>
                    <p className="text-sm text-muted-foreground">A roundup of your weekly progress.</p>
                </div>
                <Switch defaultChecked/>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Preferences</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>
              Manage your password and account security.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Change Password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
