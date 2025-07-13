import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowUp, Leaf, Scale, Users } from 'lucide-react';

export function ESGCards() {
  const esgData = [
    {
      title: 'Environmental',
      icon: <Leaf className="h-6 w-6 text-accent" />,
      metric: '85/100',
      progress: 85,
      change: '+5% this month',
      description: 'Carbon footprint, waste reduction, and energy efficiency.',
    },
    {
      title: 'Social',
      icon: <Users className="h-6 w-6 text-primary" />,
      metric: '92/100',
      progress: 92,
      change: '+2% this month',
      description: 'Labor practices, community engagement, and diversity.',
    },
    {
      title: 'Governance',
      icon: <Scale className="h-6 w-6 text-yellow-500" />,
      metric: '78/100',
      progress: 78,
      change: '+8% this month',
      description: 'Board diversity, executive pay, and business ethics.',
    },
  ];

  return (
    <>
      {esgData.map((item, index) => (
        <Card key={index} className="transform-gpu transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-headline text-lg">{item.title}</CardTitle>
              {item.icon}
            </div>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{item.metric}</div>
            <p className="text-xs text-muted-foreground flex items-center">
                <ArrowUp className="h-3 w-3 mr-1 text-green-500"/>
                {item.change}
            </p>
            <Progress value={item.progress} className="mt-4 h-2" />
          </CardContent>
        </Card>
      ))}
    </>
  );
}
