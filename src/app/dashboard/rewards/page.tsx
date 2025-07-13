import { Leaderboard } from '@/components/gamification/Leaderboard';
import { NFTShowcase } from '@/components/gamification/NFTShowcase';
import { Rewards } from '@/components/gamification/Rewards';

export default function RewardsPage() {
  return (
    <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500 space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight mb-2">
          Rewards & Gamification
        </h1>
        <p className="text-muted-foreground mb-6">
          Earn points, claim rewards, and climb the leaderboard!
        </p>
        <Rewards />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Leaderboard />
        </div>
        <div className="lg:col-span-1">
            <NFTShowcase />
        </div>
      </div>
    </div>
  );
}
