import { ProductJourney } from '@/components/product/ProductJourney';
import { QRScanner } from '@/components/product/QRScanner';

export default function ProductJourneyPage() {
  return (
    <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      <h1 className="font-headline text-3xl font-bold tracking-tight mb-2">
        Product Journey
      </h1>
      <p className="text-muted-foreground mb-6">
        Trace a product's lifecycle from source to shelf.
      </p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <QRScanner />
        </div>
        <div className="md:col-span-2">
          <ProductJourney />
        </div>
      </div>
    </div>
  );
}
