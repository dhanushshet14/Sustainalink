
'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, Send, Sparkles, User, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getChatResponse } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '../ui/badge';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    'What is ESG?',
    'How can I reduce my carbon footprint?',
    'Explain the product journey feature.',
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>, quickAction?: string) => {
    if(e) e.preventDefault();
    const userMessage = quickAction || input;
    if (!userMessage.trim() || isPending) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setInput('');

    startTransition(async () => {
      const result = await getChatResponse({
        history: messages,
        message: userMessage,
      });
      if (result.success && result.data) {
        setMessages([...newMessages, { role: 'model', content: result.data.response }]);
      } else {
        toast({
          variant: 'destructive',
          title: 'Oh no! Something went wrong.',
          description: result.error,
        });
         setMessages(messages); // Revert messages if API call fails
      }
    });
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full shadow-lg transition-transform hover:scale-110"
          >
            <Sparkles className="h-8 w-8" />
            <span className="sr-only">Open AI Assistant</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle className="flex items-center gap-2 font-headline">
              <Sparkles className="h-6 w-6 text-primary" />
              SustainaBot Assistant
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
            <div className="space-y-6">
              {messages.length === 0 && (
                <div className="text-center p-8 animate-in fade-in-0 duration-500">
                    <Avatar className="mx-auto h-16 w-16 mb-4">
                        <AvatarFallback className="bg-primary/10"><Leaf className="h-8 w-8 text-primary"/></AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold">Welcome to SustainaBot!</h3>
                    <p className="text-sm text-muted-foreground">Ask me anything about sustainability or our platform.</p>
                </div>
              )}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-start gap-3 animate-in fade-in-0 slide-in-from-bottom-4 duration-500',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.role === 'model' && (
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10"><Sparkles className="h-4 w-4 text-primary" /></AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'max-w-xs rounded-lg p-3 text-sm',
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    {message.content}
                  </div>
                   {message.role === 'user' && (
                    <Avatar className="h-8 w-8">
                       <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isPending && (
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                     <AvatarFallback className="bg-primary/10"><Sparkles className="h-4 w-4 text-primary" /></AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg p-3 bg-muted">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
           <div className="p-4 border-t bg-background">
             {messages.length === 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {quickActions.map((action) => (
                    <Badge 
                        key={action} 
                        variant="outline"
                        onClick={() => handleSubmit(undefined, action)}
                        className="cursor-pointer hover:bg-accent"
                    >
                        {action}
                    </Badge>
                ))}
              </div>
             )}
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about sustainability..."
                className="flex-grow"
                disabled={isPending}
              />
              <Button type="submit" size="icon" disabled={!input.trim() || isPending}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
