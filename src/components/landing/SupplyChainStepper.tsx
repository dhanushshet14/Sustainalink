
'use client';

import { cn } from '@/lib/utils';
import { Factory, Leaf, Package, Truck, Warehouse } from 'lucide-react';
import React from 'react';

const steps = [
  {
    icon: Leaf,
    title: 'Sourcing',
    description: 'Ethically source raw materials with full supplier transparency.',
  },
  {
    icon: Factory,
    title: 'Manufacturing',
    description: 'Monitor energy usage and waste output during production.',
  },
  {
    icon: Package,
    title: 'Packaging',
    description: 'Utilize sustainable, recyclable, and minimal packaging options.',
  },
  {
    icon: Truck,
    title: 'Logistics',
    description: 'Optimize shipping routes to reduce carbon emissions.',
  },
  {
    icon: Warehouse,
    title: 'Retail & Consumer',
    description: 'Engage customers with transparent journey data via QR codes.',
  },
];

export function SupplyChainStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-card py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                Supply Chain Visibility
            </div>
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                Trace Every Step, Effortlessly
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Gain unprecedented insight into your product's lifecycle, from raw material to the hands of your customer.
            </p>
        </div>

        <div className="w-full max-w-4xl mx-auto">
          <div className="flex justify-between items-center relative">
            <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-border" />
            <div
              className="absolute left-0 top-1/2 h-1 -translate-y-1/2 bg-primary transition-all duration-500 ease-in-out"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            />
            {steps.map((step, index) => (
              <div key={index} className="relative z-10 flex items-center justify-center">
                <div
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-500',
                    activeStep >= index ? 'bg-primary border-primary text-primary-foreground' : 'bg-card border-border'
                  )}
                >
                  <step.icon className="h-6 w-6" />
                </div>
              </div>
            ))}
          </div>

          <div className="relative mt-8 h-24">
            {steps.map((step, index) => (
              <div
                key={index}
                className={cn(
                  'absolute w-full text-center transition-opacity duration-500 ease-in-out',
                  activeStep === index ? 'opacity-100' : 'opacity-0'
                )}
              >
                <h3 className="text-lg font-semibold font-headline">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
