import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Check, Factory, Recycle, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

const timelineEvents = [
  {
    title: 'Fair Trade Certified',
    date: 'Jan 2024',
    description: 'Achieved certification for fair labor practices and wages.',
    icon: <ShieldCheck className="h-5 w-5 text-white" />,
    type: 'Certification',
  },
  {
    title: 'Solar Panel Installation',
    date: 'Sep 2023',
    description: 'Installed a 50kW solar array, now covering 40% of energy needs.',
    icon: <Factory className="h-5 w-5 text-white" />,
    type: 'Milestone',
  },
  {
    title: 'Zero-Waste Initiative',
    date: 'Mar 2023',
    description: 'Launched a program to divert 90% of manufacturing waste from landfills.',
    icon: <Recycle className="h-5 w-5 text-white" />,
    type: 'Initiative',
  },
  {
    title: 'Partnership Began',
    date: 'Jun 2022',
    description: 'Initial partnership and onboarding with SustainaLink.',
    icon: <Building className="h-5 w-5 text-white" />,
    type: 'Onboarding',
  },
];

export function ESGTimeline() {
  return (
    <Card>
      <CardHeader className="flex-row items-start gap-4">
        <Image
          src="https://placehold.co/80x80.png"
          width={80}
          height={80}
          alt="Supplier Logo"
          data-ai-hint="company logo"
          className="rounded-lg border"
        />
        <div>
          <CardTitle className="font-headline text-2xl">EcoFabrics Ltd.</CardTitle>
          <CardDescription>
            A leading supplier of sustainable textiles since 2010.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="mb-4 text-lg font-semibold">ESG Timeline</h3>
        <div className="relative pl-8">
          <div className="absolute left-11 top-0 h-full w-0.5 bg-border"></div>
          {timelineEvents.map((event, index) => (
            <div key={index} className="relative mb-8 flex items-center gap-6">
              <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-accent">
                <Check className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <p className="font-semibold text-foreground">{event.title}</p>
                  <Badge variant="outline">{event.type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{event.date}</p>
                <p className="text-sm">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
