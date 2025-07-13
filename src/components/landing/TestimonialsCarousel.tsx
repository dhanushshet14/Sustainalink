
'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    title: 'CEO, Eco-Threads',
    avatar: 'https://placehold.co/100x100.png',
    aiHint: 'woman portrait',
    quote: "SustainaLink revolutionized our supply chain. The transparency has not only improved our efficiency but also built incredible trust with our customers. It's a game-changer.",
    rating: 5,
  },
  {
    name: 'Michael Chen',
    title: 'Founder, GreenBean Coffee',
    avatar: 'https://placehold.co/100x100.png',
    aiHint: 'man portrait',
    quote: "The AI recommendations are brilliant. We've cut our energy consumption by 20% in just six months by following the platform's data-driven advice. Our bottom line has never been greener.",
    rating: 5,
  },
  {
    name: 'Aisha Patel',
    title: 'COO, Earthly Goods',
    avatar: 'https://placehold.co/100x100.png',
    aiHint: 'woman smiling',
    quote: "The dashboard is incredibly intuitive. For the first time, we have all our ESG data in one place, beautifully visualized. Reporting to stakeholders is now a breeze.",
    rating: 5,
  },
    {
    name: 'David Rodriguez',
    title: 'Sustainability Manager, PureForm',
    avatar: 'https://placehold.co/100x100.png',
    aiHint: 'man smiling',
    quote: "The gamification and rewards features have been a surprise hit with our team. It's made our sustainability goals engaging and fun for everyone involved.",
    rating: 5,
  },
];

export function TestimonialsCarousel() {
  return (
    <section id="testimonials" className="w-full py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">
            Trusted by Leaders
          </div>
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
            What Our Partners Say
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Hear from businesses that are transforming their operations with SustainaLink.
          </p>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="flex flex-col items-center justify-center flex-grow p-6 text-center">
                      <Avatar className="w-20 h-20 mb-4">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.aiHint} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <p className="text-lg font-semibold font-headline">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      <div className="flex justify-center my-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                          ))}
                      </div>
                      <blockquote className="mt-2 text-foreground italic">
                        "{testimonial.quote}"
                      </blockquote>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
