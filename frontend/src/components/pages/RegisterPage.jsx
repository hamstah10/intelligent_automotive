import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Building, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner';

export const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Bitte alle Pflichtfelder ausfüllen');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwörter stimmen nicht überein');
      return;
    }
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast.success('Account erstellt! Bitte E-Mail bestätigen.');
  };

  return (
    <div className="min-h-screen bg-[#050505] flex">
      {/* Left Side - Image */}
      <div className="hidden lg:block flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-l from-[#050505] to-transparent z-10" />
        <img
          src="https://images.pexels.com/photos/1409999/pexels-photo-1409999.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="Engine"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center p-8">
            <h2 className="font-['Space_Grotesk'] text-4xl font-bold text-white mb-4">
              Tuning Intelligence
            </h2>
            <p className="text-white/60 max-w-md">
              Verstehe jedes Steuergerät. ECU, TCU, Tools und Protokolle.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
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
              className="w-14 h-14 object-contain"
            />
            <div className="flex flex-col leading-none">
              <span className="text-white font-semibold text-base">intelligent</span>
              <span className="text-[#CCFF00] font-bold text-base">automotive</span>
            </div>
          </div>

          {/* Header */}
          <h1 className="font-['Space_Grotesk'] text-3xl font-bold text-white mb-2">
            Account erstellen
          </h1>
          <p className="text-white/60 mb-8">
            Starte jetzt mit intelligent automotive.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" data-testid="register-form">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white/80">Name *</Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Max Mustermann"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-12 py-6 bg-[#111111] border-white/10 text-white placeholder:text-white/40 rounded-lg"
                  data-testid="register-name-input"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80">E-Mail *</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@firma.de"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-12 py-6 bg-[#111111] border-white/10 text-white placeholder:text-white/40 rounded-lg"
                  data-testid="register-email-input"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-white/80">Firma</Label>
              <div className="relative">
                <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input
                  id="company"
                  type="text"
                  placeholder="Firma GmbH (optional)"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="pl-12 py-6 bg-[#111111] border-white/10 text-white placeholder:text-white/40 rounded-lg"
                  data-testid="register-company-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/80">Passwort *</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-12 py-6 bg-[#111111] border-white/10 text-white placeholder:text-white/40 rounded-lg"
                    data-testid="register-password-input"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm" className="text-white/80">Bestätigen *</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <Input
                    id="confirm"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="pl-12 py-6 bg-[#111111] border-white/10 text-white placeholder:text-white/40 rounded-lg"
                    data-testid="register-confirm-input"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input type="checkbox" className="rounded border-white/20 bg-[#111111] mt-1" required />
              <span className="text-white/60 text-sm">
                Ich akzeptiere die <a href="#" className="text-[#00E5FF] hover:underline">AGB</a> und <a href="#" className="text-[#00E5FF] hover:underline">Datenschutzbestimmungen</a>
              </span>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#CCFF00] text-black hover:bg-[#B3E600] font-semibold py-6 rounded-lg mt-2"
              data-testid="register-submit-btn"
            >
              {isLoading ? 'Wird erstellt...' : 'Account erstellen'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-white/60 mt-8">
            Bereits ein Konto?{' '}
            <Link to="/login" className="text-[#CCFF00] hover:underline font-medium">
              Jetzt anmelden
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
