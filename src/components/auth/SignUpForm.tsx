
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Progress } from '../ui/progress';
import { cn } from '@/lib/utils';
import { Building, Factory, User } from 'lucide-react';
import { Separator } from '../ui/separator';

const accountSchema = z.object({
  fullName: z.string().min(2, { message: 'Name is too short.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
});

const roleSchema = z.object({
  role: z.enum(['brand', 'supplier', 'individual'], {
    required_error: 'You need to select a role.',
  }),
});

const formSchema = accountSchema.merge(roleSchema);

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Google</title>
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.9-4.96 1.9-3.99 0-7.22-3.22-7.22-7.22s3.23-7.22 7.22-7.22c2.31 0 3.73.93 4.58 1.73l2.58-2.58C18.25.75 15.75 0 12.48 0 5.88 0 0 5.88 0 12.48s5.88 12.48 12.48 12.48c6.96 0 12-4.82 12-12.24 0-.76-.07-1.5-.2-2.22h-11.8z" />
    </svg>
)

const roles = [
  { id: 'brand', label: 'Brand/Retailer', icon: <Building className="h-8 w-8" /> },
  { id: 'supplier', label: 'Supplier/Manufacturer', icon: <Factory className="h-8 w-8" /> },
  { id: 'individual', label: 'Individual/Consultant', icon: <User className="h-8 w-8" /> },
];

export function SignUpForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [step, setStep] = useState(1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(step === 1 ? accountSchema : formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      role: undefined,
    },
  });

  async function handleNextStep() {
    const isAccountStepValid = await form.trigger(['fullName', 'email', 'password']);
    if (isAccountStepValid) {
      setStep(2);
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Simulate API call
    toast({
      title: 'Account Created',
      description: "We've created your account for you.",
    });
    router.push('/dashboard');
  }

  const progressValue = step === 1 ? 50 : 100;

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Create an Account</CardTitle>
        <CardDescription>
          {step === 1
            ? 'Start your sustainability journey with us.'
            : 'What is your primary role?'}
        </CardDescription>
        <Progress value={progressValue} className="mt-2 h-1" />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className={cn(step === 1 ? 'block' : 'hidden')}>
              <div className="space-y-4">
                 <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} className="transition-all duration-300 focus:shadow-md"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="m@example.com" {...field} className="transition-all duration-300 focus:shadow-md"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                          className="transition-all duration-300 focus:shadow-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className={cn(step === 2 ? 'block' : 'hidden')}>
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                        <FormControl>
                            <div className="grid grid-cols-1 gap-4">
                            {roles.map((role) => (
                                <button
                                type="button"
                                key={role.id}
                                onClick={() => field.onChange(role.id)}
                                className={cn(
                                    "flex items-center gap-4 rounded-lg border p-4 text-left transition-all hover:bg-accent hover:text-accent-foreground",
                                    field.value === role.id && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                                )}
                                >
                                {role.icon}
                                <span>{role.label}</span>
                                </button>
                            ))}
                            </div>
                        </FormControl>
                        <FormMessage className="text-center pt-2" />
                        </FormItem>
                    )}
                />
            </div>

            {step === 1 && (
              <>
                <Button onClick={handleNextStep} type="button" className="w-full transition-transform hover:scale-105">
                  Next
                </Button>
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or sign up with</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full transition-transform hover:scale-105">
                  <GoogleIcon className="mr-2 h-4 w-4 fill-current" />
                  Continue with Google
                </Button>
              </>
            )}

            {step === 2 && (
              <div className="flex gap-4">
                <Button onClick={() => setStep(1)} type="button" variant="outline" className="w-full">
                  Back
                </Button>
                <Button type="submit" className="w-full transition-transform hover:scale-105">
                  Create Account
                </Button>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm">
        Already have an account?
        <Link href="/login" className="ml-1 font-semibold text-primary underline-offset-4 hover:underline">
          Login
        </Link>
      </CardFooter>
    </Card>
  );
}
