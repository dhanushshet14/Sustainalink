import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';
import Image from 'next/image';

const rewardsData = [
  {
    title: 'Plant a Tree',
    description: 'Redeem 500 points to plant a tree in a reforestation project.',
    points: 500,
    image: 'https://placehold.co/600x400.png',
    aiHint: 'forest sapling',
  },
  {
    title: 'Carbon Offset',
    description: 'Offset 1 ton of CO2 by redeeming 1000 points.',
    points: 1000,
    image: 'https://placehold.co/600x400.png',
    aiHint: 'wind turbines',
  },
  {
    title: 'Eco-Friendly Swag',
    description: 'Get exclusive SustainaLink merchandise for 750 points.',
    points: 750,
    image: 'https://placehold.co/600x400.png',
    aiHint: 'tote bag',
  },
];

export function Rewards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {rewardsData.map((reward, index) => (
        <Card key={index} className="flex flex-col">
          <CardHeader>
            <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
              <Image
                src={reward.image}
                alt={reward.title}
                layout="fill"
                objectFit="cover"
                data-ai-hint={reward.aiHint}
              />
            </div>
            <div className="pt-4">
                <CardTitle className="font-headline">{reward.title}</CardTitle>
                <CardDescription>{reward.description}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex-grow"></CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="font-bold text-lg text-primary">{reward.points} PTS</div>
            <Button>
                <Gift className="mr-2 h-4 w-4" />
                Redeem
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
