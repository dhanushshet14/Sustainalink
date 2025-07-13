import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle, Factory, Leaf, Package, Warehouse } from 'lucide-react';

const journeySteps = [
  {
    title: 'Raw Material Sourcing',
    location: 'Peru Highlands',
    date: '2023-10-15',
    icon: <Leaf className="h-6 w-6 text-white" />,
    details: 'Organic cotton sourced from certified sustainable farms.',
    completed: true,
  },
  {
    title: 'Manufacturing',
    location: 'Lisbon, Portugal',
    date: '2023-11-05',
    icon: <Factory className="h-6 w-6 text-white" />,
    details: 'Processed in a factory powered by 80% renewable energy.',
    completed: true,
  },
  {
    title: 'Packaging',
    location: 'Lisbon, Portugal',
    date: '2023-11-06',
    icon: <Package className="h-6 w-6 text-white" />,
    details: 'Packaged using 100% recycled and biodegradable materials.',
    completed: true,
  },
  {
    title: 'Distribution Center',
    location: 'Berlin, Germany',
    date: '2023-11-20',
    icon: <Warehouse className="h-6 w-6 text-white" />,
    details: 'Arrived at central European distribution hub.',
    completed: false,
  },
];

export function ProductJourney() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Organic Cotton T-Shirt
        </CardTitle>
        <CardDescription>Product ID: 8A4D3-B4C2</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6">
          {/* Vertical line */}
          <div className="absolute left-9 top-0 h-full w-0.5 bg-border"></div>

          {journeySteps.map((step, index) => (
            <div key={index} className="relative mb-8 flex items-start gap-6">
              <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-md">
                {step.icon}
              </div>
              <div className="w-full rounded-md border bg-card p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                  {step.completed && (
                    <div className="flex items-center gap-1 text-sm text-accent">
                      <CheckCircle className="h-4 w-4" />
                      <span>Completed</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{step.location}</p>
                <p className="mt-2 text-sm">{step.details}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
