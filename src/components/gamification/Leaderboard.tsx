import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { User } from '@/lib/types';
import { Trophy } from 'lucide-react';

const leaderboardData: User[] = [
  { id: 1, name: 'Eco Warrior', avatar: 'https://placehold.co/40x40.png', points: 1250, rank: 1 },
  { id: 2, name: 'Green Giant', avatar: 'https://placehold.co/40x40.png', points: 1180, rank: 2 },
  { id: 3, name: 'Sustaina Champ', avatar: 'https://placehold.co/40x40.png', points: 1120, rank: 3 },
  { id: 4, name: 'Planet Protector', avatar: 'https://placehold.co/40x40.png', points: 1050, rank: 4 },
  { id: 5, name: 'Recycle Ranger', avatar: 'https://placehold.co/40x40.png', points: 980, rank: 5 },
];

export function Leaderboard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            <CardTitle className="font-headline">Leaderboard</CardTitle>
        </div>
        <CardDescription>See who's leading the sustainability charge!</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Rank</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="text-right">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.map((user) => (
              <TableRow key={user.id} className="font-medium">
                <TableCell className="font-bold text-lg">{user.rank}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="person portrait"/>
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{user.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">{user.points} PTS</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
