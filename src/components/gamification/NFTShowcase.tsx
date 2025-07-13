import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Gem } from 'lucide-react';

const nftData = [
  {
    name: 'Genesis Leaf',
    rarity: 'Legendary',
    image: 'https://placehold.co/600x600.png',
    aiHint: 'abstract leaf',
  },
  {
    name: 'Water Guardian',
    rarity: 'Epic',
    image: 'https://placehold.co/600x600.png',
    aiHint: 'water droplet',
  },
  {
    name: 'Solar Pioneer',
    rarity: 'Rare',
    image: 'https://placehold.co/600x600.png',
    aiHint: 'sun pattern',
  },
  {
    name: 'Recycler\'s Badge',
    rarity: 'Common',
    image: 'https://placehold.co/600x600.png',
    aiHint: 'recycle symbol',
  },
];

export function NFTShowcase() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
            <Gem className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline">NFT Showcase</CardTitle>
        </div>
        <CardDescription>
          Digital collectibles earned for your sustainability milestones.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {nftData.map((nft, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg">
              <Image
                src={nft.image}
                alt={nft.name}
                width={200}
                height={200}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                data-ai-hint={nft.aiHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-3">
                <h3 className="font-semibold text-white">{nft.name}</h3>
                <Badge variant={nft.rarity === 'Legendary' ? 'default' : 'secondary'}>
                  {nft.rarity}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
