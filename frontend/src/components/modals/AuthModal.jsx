import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner';

export const AuthModal = ({ isOpen, onClose, initialTab = 'login' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Login form state
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  
  // Register form state
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error('Bitte alle Felder ausfüllen');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast.success('Erfolgreich angemeldet!');
    onClose();
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!registerData.name || !registerData.email || !registerData.password) {
      toast.error('Bitte alle Pflichtfelder ausfüllen');
      return;
    }
    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Passwörter stimmen nicht überein');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast.success('Account erstellt! Bitte E-Mail bestätigen.');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            data-testid="auth-modal-backdrop"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 p-4"
            data-testid="auth-modal"
          >
            <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="relative p-6 pb-0">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 p-2 text-white/50 hover:text-white transition-colors"
                  data-testid="auth-modal-close"
                >
                  <X className="w-5 h-5" />
                </button>
                
                {/* Logo */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[#CCFF00] flex items-center justify-center">
                    <span className="font-bold text-black text-lg font-['Space_Grotesk']">iA</span>
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="text-white font-semibold text-sm">intelligent</span>
                    <span className="text-[#CCFF00] font-bold text-sm">automotive</span>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 p-1 bg-[#0A0A0A] rounded-lg">
                  <button
                    onClick={() => setActiveTab('login')}
                    data-testid="auth-tab-login"
                    className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'login'
                        ? 'bg-[#CCFF00] text-black'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    Anmelden
                  </button>
                  <button
                    onClick={() => setActiveTab('register')}
                    data-testid="auth-tab-register"
                    className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'register'
                        ? 'bg-[#CCFF00] text-black'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    Registrieren
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === 'login' ? (
                    <motion.form
                      key="login"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={handleLogin}
                      className="space-y-4"
                      data-testid="login-form"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="login-email" className="text-white/80">E-Mail</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                          <Input
                            id="login-email"
                            type="email"
                            placeholder="name@firma.de"
                            value={loginData.email}
                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                            className="pl-10 bg-[#0A0A0A] border-white/10 text-white placeholder:text-white/40 rounded-lg"
                            data-testid="login-email-input"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="login-password" className="text-white/80">Passwort</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                          <Input
                            id="login-password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            className="pl-10 pr-10 bg-[#0A0A0A] border-white/10 text-white placeholder:text-white/40 rounded-lg"
                            data-testid="login-password-input"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded border-white/20 bg-[#0A0A0A]" />
                          <span className="text-white/60 text-sm">Angemeldet bleiben</span>
                        </label>
                        <button type="button" className="text-[#00E5FF] text-sm hover:underline">
                          Passwort vergessen?
                        </button>
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#CCFF00] text-black hover:bg-[#B3E600] font-semibold py-5 rounded-lg"
                        data-testid="login-submit-btn"
                      >
                        {isLoading ? 'Wird angemeldet...' : 'Anmelden'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.form>
                  ) : (
                    <motion.form
                      key="register"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={handleRegister}
                      className="space-y-4"
                      data-testid="register-form"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="register-name" className="text-white/80">Name *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                          <Input
                            id="register-name"
                            type="text"
                            placeholder="Max Mustermann"
                            value={registerData.name}
                            onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                            className="pl-10 bg-[#0A0A0A] border-white/10 text-white placeholder:text-white/40 rounded-lg"
                            data-testid="register-name-input"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-email" className="text-white/80">E-Mail *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                          <Input
                            id="register-email"
                            type="email"
                            placeholder="name@firma.de"
                            value={registerData.email}
                            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                            className="pl-10 bg-[#0A0A0A] border-white/10 text-white placeholder:text-white/40 rounded-lg"
                            data-testid="register-email-input"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-company" className="text-white/80">Firma</Label>
                        <Input
                          id="register-company"
                          type="text"
                          placeholder="Firma GmbH (optional)"
                          value={registerData.company}
                          onChange={(e) => setRegisterData({ ...registerData, company: e.target.value })}
                          className="bg-[#0A0A0A] border-white/10 text-white placeholder:text-white/40 rounded-lg"
                          data-testid="register-company-input"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="register-password" className="text-white/80">Passwort *</Label>
                          <Input
                            id="register-password"
                            type="password"
                            placeholder="••••••••"
                            value={registerData.password}
                            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                            className="bg-[#0A0A0A] border-white/10 text-white placeholder:text-white/40 rounded-lg"
                            data-testid="register-password-input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="register-confirm" className="text-white/80">Bestätigen *</Label>
                          <Input
                            id="register-confirm"
                            type="password"
                            placeholder="••••••••"
                            value={registerData.confirmPassword}
                            onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                            className="bg-[#0A0A0A] border-white/10 text-white placeholder:text-white/40 rounded-lg"
                            data-testid="register-confirm-input"
                          />
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <input type="checkbox" className="rounded border-white/20 bg-[#0A0A0A] mt-1" required />
                        <span className="text-white/60 text-sm">
                          Ich akzeptiere die <a href="#" className="text-[#00E5FF] hover:underline">AGB</a> und <a href="#" className="text-[#00E5FF] hover:underline">Datenschutzbestimmungen</a>
                        </span>
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#CCFF00] text-black hover:bg-[#B3E600] font-semibold py-5 rounded-lg"
                        data-testid="register-submit-btn"
                      >
                        {isLoading ? 'Wird erstellt...' : 'Account erstellen'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
