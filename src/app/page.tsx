import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, LineChart, Zap } from 'lucide-react';
import Link from 'next/link';
import { SupplyChainStepper } from '@/components/landing/SupplyChainStepper';
import { TestimonialsCarousel } from '@/components/landing/TestimonialsCarousel';

export default function LandingPage() {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: 'Dynamic Dashboard',
      description: 'Visualize your ESG data with interactive charts and cards.',
    },
    {
      icon: <Leaf className="h-8 w-8 text-accent" />,
      title: 'AI Recommendations',
      description: 'Get actionable, AI-powered insights to boost your sustainability.',
    },
    {
      icon: <LineChart className="h-8 w-8 text-primary" />,
      title: 'Supplier Transparency',
      description:
        'Track supplier ESG performance with our transparent timelines.',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="relative w-full overflow-hidden bg-card py-20 md:py-32 lg:py-40">
          <div className="container mx-auto px-4 text-center animate-in fade-in-0 slide-in-from-bottom-12 duration-1000">
            <div
              className="absolute inset-0 -z-10 bg-grid-slate-900/[0.04] bg-[10px_10px] [mask-image:linear-gradient(0deg,transparent,#F0F4F5,transparent)] dark:bg-grid-slate-400/[0.05]"
              style={{ backgroundSize: '30px 30px' }}
            ></div>
            <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Forge a Sustainable Future
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              SustainaLink helps you track, manage, and improve your business's
              environmental and social impact with cutting-edge technology.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button asChild size="lg" className="transition-transform hover:scale-105">
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="transition-transform hover:scale-105">
                <Link href="/dashboard">View Demo</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-20 md:py-32">
          <div className="container mx-auto space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                Key Features
              </div>
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                Powerful Tools for a Greener Business
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                From real-time data analysis to gamified rewards, we provide
                everything you need to make sustainability a core part of your
                success.
              </p>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <CardHeader className="flex flex-row items-center gap-4">
                    {feature.icon}
                    <CardTitle className="font-headline">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <SupplyChainStepper />
        
        <TestimonialsCarousel />

        <section className="w-full bg-primary/10 py-20 md:py-32">
          <div className="container mx-auto text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter text-foreground sm:text-4xl">
              Ready to Transform Your Business?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground md:text-lg">
              Join the growing community of businesses committed to sustainability and start making a measurable impact today.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="transition-transform hover:scale-105">
                <Link href="/signup">Start Your Free Trial</Link>
              </Button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
