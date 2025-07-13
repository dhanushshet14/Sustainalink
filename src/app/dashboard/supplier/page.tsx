import { ESGTimeline } from '@/components/supplier/ESGTimeline';

export default function SupplierProfilePage() {
  return (
    <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      <h1 className="font-headline text-3xl font-bold tracking-tight mb-2">
        Supplier Profile
      </h1>
      <p className="text-muted-foreground mb-6">
        An overview of your supplier's ESG performance and milestones.
      </p>

      <ESGTimeline />
    </div>
  );
}
