'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { QrCode, ScanLine } from 'lucide-react';

export function QRScanner() {
  const { toast } = useToast();

  const handleScan = () => {
    toast({
      title: 'Scan Simulated',
      description: 'Product journey for "Organic Cotton T-Shirt" is now displayed.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Scan Product QR Code</CardTitle>
        <CardDescription>
          Use your device to scan a product's QR code and view its full journey.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-6 p-8">
        <div className="relative h-48 w-48 rounded-lg border-2 border-dashed flex items-center justify-center">
            <QrCode className="h-24 w-24 text-muted-foreground" />
            <ScanLine className="absolute h-1 w-full bg-primary/70 animate-ping"/>
        </div>
        <Button size="lg" onClick={handleScan}>
          Simulate Scan
        </Button>
      </CardContent>
    </Card>
  );
}
