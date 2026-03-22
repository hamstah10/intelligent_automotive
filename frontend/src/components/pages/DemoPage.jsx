import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar as CalendarIcon, Clock, User, Mail, Building, 
  MessageSquare, Check, ArrowRight, ArrowLeft, BarChart2, Cpu
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Calendar } from '../ui/calendar';
import { toast } from 'sonner';
import { format, isBefore, isWeekend } from 'date-fns';
import { de } from 'date-fns/locale';

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
];

const demoTypes = [
  { id: 'market', name: 'Market Intelligence', icon: BarChart2, color: '#00E5FF', desc: 'Fahrzeugmarkt analysieren' },
  { id: 'tuning', name: 'Tuning Intelligence', icon: Cpu, color: '#CCFF00', desc: 'ECU/TCU Datenbank' },
  { id: 'both', name: 'Beide Produkte', icon: null, color: '#CCFF00', desc: 'Komplette Plattform' },
];

export const DemoPage = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime || !selectedType || !formData.name || !formData.email) {
      toast.error('Bitte alle Pflichtfelder ausfüllen');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setStep(4);
  };

  const disabledDays = (date) => {
    return isBefore(date, new Date()) || isWeekend(date);
  };

  return (
    <div className="min-h-screen bg-[#050505] py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors"
          data-testid="back-to-home"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Startseite
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <img 
              src="https://customer-assets.emergentagent.com/job_market-tuning-hub/artifacts/xfi7h1y0_automotive.png" 
              alt="intelligent automotive"
              className="w-14 h-14 object-contain"
            />
          </div>
          <h1 className="font-['Space_Grotesk'] text-4xl font-bold text-white mb-4">
            Demo buchen
          </h1>
          <p className="text-white/60 max-w-lg mx-auto">
            Vereinbare einen persönlichen Termin und entdecke, wie intelligent automotive dein Geschäft transformieren kann.
          </p>
        </motion.div>

        {/* Progress Steps */}
        {step < 4 && (
          <div className="flex items-center justify-center gap-4 mb-12">
            {[
              { num: 1, label: 'Produkt' },
              { num: 2, label: 'Termin' },
              { num: 3, label: 'Kontakt' },
            ].map((s, index) => (
              <div key={s.num} className="flex items-center">
                <div className={`flex items-center gap-2 ${step >= s.num ? 'text-white' : 'text-white/30'}`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-semibold transition-colors ${
                    step >= s.num ? 'bg-[#CCFF00] text-black' : 'bg-[#111111] text-white/50'
                  }`}>
                    {step > s.num ? <Check className="w-5 h-5" /> : s.num}
                  </div>
                  <span className="hidden sm:block text-sm font-medium">{s.label}</span>
                </div>
                {index < 2 && (
                  <div className={`w-12 h-px mx-4 ${step > s.num ? 'bg-[#CCFF00]' : 'bg-white/10'}`} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Content */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#111111] border border-white/10 rounded-2xl p-8"
        >
          {/* Step 1: Select Product */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">
                Welches Produkt interessiert dich?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {demoTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      data-testid={`demo-type-${type.id}`}
                      className={`p-6 rounded-xl border text-left transition-all ${
                        selectedType === type.id
                          ? 'border-[#CCFF00] bg-[#CCFF00]/10'
                          : 'border-white/10 bg-[#0A0A0A] hover:border-white/20'
                      }`}
                    >
                      {Icon && <Icon className="w-8 h-8 mb-4" style={{ color: type.color }} />}
                      {!Icon && (
                        <div className="flex gap-1 mb-4">
                          <BarChart2 className="w-6 h-6 text-[#00E5FF]" />
                          <Cpu className="w-6 h-6 text-[#CCFF00]" />
                        </div>
                      )}
                      <div className="text-white font-semibold mb-1">{type.name}</div>
                      <div className="text-white/50 text-sm">{type.desc}</div>
                      {selectedType === type.id && (
                        <div className="mt-4 flex items-center gap-2 text-[#CCFF00] text-sm">
                          <Check className="w-4 h-4" />
                          Ausgewählt
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              <Button
                onClick={() => selectedType && setStep(2)}
                disabled={!selectedType}
                className="w-full bg-[#CCFF00] text-black hover:bg-[#B3E600] font-semibold py-6 rounded-lg"
                data-testid="demo-step1-next"
              >
                Weiter
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {/* Step 2: Select Date & Time */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">
                Wähle Datum und Uhrzeit
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Calendar */}
                <div className="bg-[#0A0A0A] rounded-xl p-4 border border-white/10">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={disabledDays}
                    locale={de}
                    className="text-white"
                    data-testid="demo-calendar"
                  />
                </div>

                {/* Time Slots */}
                <div>
                  <Label className="text-white/80 mb-4 block">
                    {selectedDate 
                      ? `Verfügbare Zeiten am ${format(selectedDate, 'dd. MMMM', { locale: de })}`
                      : 'Wähle zuerst ein Datum'
                    }
                  </Label>
                  <div className="grid grid-cols-3 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => selectedDate && setSelectedTime(time)}
                        disabled={!selectedDate}
                        data-testid={`demo-time-${time}`}
                        className={`py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                          selectedTime === time
                            ? 'bg-[#CCFF00] text-black'
                            : selectedDate
                              ? 'bg-[#0A0A0A] text-white/70 border border-white/10 hover:border-white/20'
                              : 'bg-[#0A0A0A] text-white/30 border border-white/5 cursor-not-allowed'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 border-white/20 text-white hover:bg-white/5 py-6 rounded-lg"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Zurück
                </Button>
                <Button
                  onClick={() => selectedDate && selectedTime && setStep(3)}
                  disabled={!selectedDate || !selectedTime}
                  className="flex-1 bg-[#CCFF00] text-black hover:bg-[#B3E600] font-semibold py-6 rounded-lg"
                  data-testid="demo-step2-next"
                >
                  Weiter
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Contact Info */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">
                Deine Kontaktdaten
              </h2>

              {/* Summary */}
              <div className="p-4 bg-[#0A0A0A] rounded-xl border border-[#CCFF00]/20 mb-6">
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-white">
                    <CalendarIcon className="w-4 h-4 text-[#CCFF00]" />
                    {selectedDate && format(selectedDate, 'dd. MMMM yyyy', { locale: de })}
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <Clock className="w-4 h-4 text-[#CCFF00]" />
                    {selectedTime} Uhr
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    {selectedType === 'market' && <BarChart2 className="w-4 h-4 text-[#00E5FF]" />}
                    {selectedType === 'tuning' && <Cpu className="w-4 h-4 text-[#CCFF00]" />}
                    {selectedType === 'both' && <Check className="w-4 h-4 text-[#CCFF00]" />}
                    {demoTypes.find(t => t.id === selectedType)?.name}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                      className="pl-12 py-6 bg-[#0A0A0A] border-white/10 text-white placeholder:text-white/40 rounded-lg"
                      data-testid="demo-name-input"
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
                      className="pl-12 py-6 bg-[#0A0A0A] border-white/10 text-white placeholder:text-white/40 rounded-lg"
                      data-testid="demo-email-input"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <Label htmlFor="company" className="text-white/80">Firma</Label>
                <div className="relative">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <Input
                    id="company"
                    type="text"
                    placeholder="Firma GmbH (optional)"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="pl-12 py-6 bg-[#0A0A0A] border-white/10 text-white placeholder:text-white/40 rounded-lg"
                    data-testid="demo-company-input"
                  />
                </div>
              </div>

              <div className="space-y-2 mb-8">
                <Label htmlFor="message" className="text-white/80">Nachricht</Label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-white/40" />
                  <textarea
                    id="message"
                    placeholder="Was möchtest du in der Demo sehen? (optional)"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full pl-12 pr-4 py-4 bg-[#0A0A0A] border border-white/10 text-white placeholder:text-white/40 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-[#CCFF00]/50"
                    data-testid="demo-message-input"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="flex-1 border-white/20 text-white hover:bg-white/5 py-6 rounded-lg"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Zurück
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading || !formData.name || !formData.email}
                  className="flex-1 bg-[#CCFF00] text-black hover:bg-[#B3E600] font-semibold py-6 rounded-lg"
                  data-testid="demo-submit-btn"
                >
                  {isLoading ? 'Wird gebucht...' : 'Demo buchen'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 rounded-2xl bg-[#CCFF00]/20 flex items-center justify-center mx-auto mb-8">
                <Check className="w-10 h-10 text-[#CCFF00]" />
              </div>
              <h2 className="font-['Space_Grotesk'] text-3xl font-bold text-white mb-4">
                Demo erfolgreich gebucht!
              </h2>
              <p className="text-white/60 mb-8 max-w-md mx-auto">
                Wir haben dir eine Bestätigung an <span className="text-white">{formData.email}</span> gesendet.
                Wir freuen uns auf das Gespräch!
              </p>
              
              <div className="inline-flex items-center gap-6 p-6 bg-[#0A0A0A] rounded-xl border border-white/10 mb-8">
                <div className="flex items-center gap-2 text-white">
                  <CalendarIcon className="w-5 h-5 text-[#CCFF00]" />
                  {selectedDate && format(selectedDate, 'dd.MM.yyyy', { locale: de })}
                </div>
                <div className="w-px h-6 bg-white/10" />
                <div className="flex items-center gap-2 text-white">
                  <Clock className="w-5 h-5 text-[#CCFF00]" />
                  {selectedTime} Uhr
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/5 px-8 py-6 rounded-lg"
                  >
                    Zur Startseite
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    className="bg-[#CCFF00] text-black hover:bg-[#B3E600] font-semibold px-8 py-6 rounded-lg"
                  >
                    Account erstellen
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
