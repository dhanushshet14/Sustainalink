import { LoginForm } from '@/components/auth/LoginForm';
import { Navbar } from '@/app/common/Navbar';
import { Footer } from '@/components/common/Footer';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-card">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full animate-in fade-in-0 zoom-in-95 duration-500">
          <LoginForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
