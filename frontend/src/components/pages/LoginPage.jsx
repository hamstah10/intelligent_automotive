import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner';

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('Bitte alle Felder ausfüllen');
      return;
    }
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast.success('Erfolgreich angemeldet!');
  };

  return (
    <div className="min-h-screen bg-[#050505] flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Back Link */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors"
            data-testid="back-to-home"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Startseite
          </Link>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <img 
              src="https://customer-assets.emergentagent.com/job_market-tuning-hub/artifacts/xfi7h1y0_automotive.png" 
              alt="intelligent automotive"
              className="w-16 h-16 object-contain"
            />
            <div className="flex flex-col leading-none">
              <span className="text-white font-semibold text-base">intelligent</span>
              <span className="text-[#CCFF00] font-bold text-base">automotive</span>
            </div>
          </div>

          {/* Header */}
          <h1 className="font-['Space_Grotesk'] text-3xl font-bold text-white mb-2">
            Willkommen zurück
          </h1>
          <p className="text-white/60 mb-8">
            Melde dich an, um auf dein Dashboard zuzugreifen.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" data-testid="login-form">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80">E-Mail</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@firma.de"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-12 py-6 bg-[#111111] border-white/10 text-white placeholder:text-white/40 rounded-lg"
                  data-testid="login-email-input"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/80">Passwort</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-12 pr-12 py-6 bg-[#111111] border-white/10 text-white placeholder:text-white/40 rounded-lg"
                  data-testid="login-password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-white/20 bg-[#111111]" />
                <span className="text-white/60 text-sm">Angemeldet bleiben</span>
              </label>
              <button type="button" className="text-[#00E5FF] text-sm hover:underline">
                Passwort vergessen?
              </button>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#CCFF00] text-black hover:bg-[#B3E600] font-semibold py-6 rounded-lg"
              data-testid="login-submit-btn"
            >
              {isLoading ? 'Wird angemeldet...' : 'Anmelden'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          {/* Register Link */}
          <p className="text-center text-white/60 mt-8">
            Noch kein Konto?{' '}
            <Link to="/register" className="text-[#CCFF00] hover:underline font-medium">
              Jetzt registrieren
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2ODl8MHwxfHNlYXJjaHwyfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkJTIwZGFya3xlbnwwfHx8fDE3NzQxNDkwODR8MA&ixlib=rb-4.1.0&q=85"
          alt="Dashboard"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center p-8">
            <h2 className="font-['Space_Grotesk'] text-4xl font-bold text-white mb-4">
              Market Intelligence
            </h2>
            <p className="text-white/60 max-w-md">
              Analysiere den Fahrzeugmarkt, erkenne Deals und überwache deine Konkurrenz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
