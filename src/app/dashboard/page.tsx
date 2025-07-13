import { AIRecommendations } from '@/components/dashboard/AIRecommendations';
import { ESGCards } from '@/components/dashboard/ESGCards';
import { WasteTrendsChart } from '@/components/dashboard/WasteTrendsChart';

export default function DashboardPage() {
  return (
    <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      <h1 className="font-headline text-3xl font-bold tracking-tight mb-2">
        Dashboard
      </h1>
      <p className="text-muted-foreground mb-6">
        Welcome back! Here's your sustainability overview.
      </p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ESGCards />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <WasteTrendsChart />
        </div>
        <div className="lg:col-span-2">
            <AIRecommendations />
        </div>
      </div>
    </div>
  );
}
