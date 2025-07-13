import { UserProfile } from '@/components/profile/UserProfile';

export default function ProfilePage() {
  return (
    <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      <h1 className="font-headline text-3xl font-bold tracking-tight mb-2">
        Profile & Settings
      </h1>
      <p className="text-muted-foreground mb-6">
        Manage your account settings and track your ESG impact.
      </p>

      <UserProfile />
    </div>
  );
}
