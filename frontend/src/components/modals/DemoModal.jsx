import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar as CalendarIcon, Clock, User, Mail, Building, MessageSquare, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Calendar } from '../ui/calendar';
import { toast } from 'sonner';
import { format, addDays, isBefore, isWeekend } from 'date-fns';
import { de } from 'date-fns/locale';

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
];

const demoTypes = [
  { id: 'market', name: 'Market Intelligence', color: '#00E5FF' },
  { id: 'tuning', name: 'Tuning Intelligence', color: '#CCFF00' },
  { id: 'both', name: 'Beide Produkte', color: '#CCFF00' },
];

export const DemoModal = ({ isOpen, onClose }) => {
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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setStep(4); // Success step
  };

  const resetAndClose = () => {
    setStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedType(null);
    setFormData({ name: '', email: '', company: '', message: '' });
    onClose();
  };

  // Disable weekends and past dates
  const disabledDays = (date) => {
    return isBefore(date, new Date()) || isWeekend(date);
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
            onClick={resetAndClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            data-testid="demo-modal-backdrop"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50 p-4 max-h-[90vh] overflow-y-auto"
            data-testid="demo-modal"
          >
            <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="relative p-6 pb-4 border-b border-white/10">
                <button
                  onClick={resetAndClose}
                  className="absolute right-4 top-4 p-2 text-white/50 hover:text-white transition-colors"
                  data-testid="demo-modal-close"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <h2 className="text-xl font-bold text-white font-['Orbitron']">Demo buchen</h2>
                <p className="text-white/50 text-sm mt-1">
                  {step === 4 ? 'Buchung bestätigt!' : `Schritt ${step} von 3`}
                </p>

                {/* Progress Bar */}
                {step < 4 && (
                  <div className="flex gap-2 mt-4">
                    {[1, 2, 3].map((s) => (
                      <div
                        key={s}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          s <= step ? 'bg-[#CCFF00]' : 'bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {/* Step 1: Select Demo Type */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h3 className="text-white font-medium mb-4">Welches Produkt interessiert dich?</h3>
                      <div className="space-y-3">
                        {demoTypes.map((type) => (
                          <button
                            key={type.id}
                            onClick={() => setSelectedType(type.id)}
                            data-testid={`demo-type-${type.id}`}
                            className={`w-full p-4 rounded-xl border text-left transition-all ${
                              selectedType === type.id
                                ? 'border-[#CCFF00] bg-[#CCFF00]/10'
                                : 'border-white/10 bg-[#0A0A0A] hover:border-white/20'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-white font-medium">{type.name}</span>
                              {selectedType === type.id && (
                                <div className="w-6 h-6 rounded-full bg-[#CCFF00] flex items-center justify-center">
                                  <Check className="w-4 h-4 text-black" />
                                </div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>

                      <Button
                        onClick={() => selectedType && setStep(2)}
                        disabled={!selectedType}
                        className="w-full bg-[#CCFF00] text-black hover:bg-[#B3E600] font-semibold py-5 rounded-lg mt-6"
                        data-testid="demo-step1-next"
                      >
                        Weiter
                      </Button>
                    </motion.div>
                  )}

                  {/* Step 2: Select Date & Time */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h3 className="text-white font-medium mb-4">Wähle Datum und Uhrzeit</h3>
                      
                      {/* Calendar */}
                      <div className="flex justify-center bg-[#0A0A0A] rounded-xl p-4 border border-white/10">
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
                      {selectedDate && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <Label className="text-white/80 mb-3 block">Verfügbare Zeiten</Label>
                          <div className="grid grid-cols-4 gap-2">
                            {timeSlots.map((time) => (
                              <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                data-testid={`demo-time-${time}`}
                                className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                                  selectedTime === time
                                    ? 'bg-[#CCFF00] text-black'
                                    : 'bg-[#0A0A0A] text-white/70 border border-white/10 hover:border-white/20'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      <div className="flex gap-3 mt-6">
                        <Button
                          variant="outline"
                          onClick={() => setStep(1)}
                          className="flex-1 border-white/20 text-white hover:bg-white/5 rounded-lg"
                        >
                          Zurück
                        </Button>
                        <Button
                          onClick={() => selectedDate && selectedTime && setStep(3)}
                          disabled={!selectedDate || !selectedTime}
                          className="flex-1 bg-[#CCFF00] text-black hover:bg-[#B3E600] font-semibold rounded-lg"
                          data-testid="demo-step2-next"
                        >
                          Weiter
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Contact Info */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h3 className="text-white font-medium mb-4">Deine Kontaktdaten</h3>

                      {/* Summary */}
                      <div className="p-4 bg-[#0A0A0A] rounded-xl border border-white/10 mb-4">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2 text-white/70">
                            <CalendarIcon className="w-4 h-4 text-[#CCFF00]" />
                            {selectedDate && format(selectedDate, 'dd. MMMM yyyy', { locale: de })}
                          </div>
                          <div className="flex items-center gap-2 text-white/70">
                            <Clock className="w-4 h-4 text-[#CCFF00]" />
                            {selectedTime} Uhr
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="demo-name" className="text-white/80">Name *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                          <Input
                            id="demo-name"
                            type="text"
                            placeholder="Max Mustermann"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="pl-10 bg-[#0A0A0A] border-white/10 text-white placeholder:text-white/40 rounded-lg"
                            data-testid="demo-name-input"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="demo-email" className="text-white/80">E-Mail *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                          <Input
                            id="demo-email"
                            type="email"
                            placeholder="name@firma.de"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="pl-10 bg-[#0A0A0A] border-white/10 text-white placeholder:text-white/40 rounded-lg"
                            data-testid="demo-email-input"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="demo-company" className="text-white/80">Firma</Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                          <Input
                            id="demo-company"
                            type="text"
                            placeholder="Firma GmbH (optional)"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="pl-10 bg-[#0A0A0A] border-white/10 text-white placeholder:text-white/40 rounded-lg"
                            data-testid="demo-company-input"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="demo-message" className="text-white/80">Nachricht</Label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-white/40" />
                          <textarea
                            id="demo-message"
                            placeholder="Was möchtest du in der Demo sehen? (optional)"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            rows={3}
                            className="w-full pl-10 pr-4 py-3 bg-[#0A0A0A] border border-white/10 text-white placeholder:text-white/40 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-[#CCFF00]/50"
                            data-testid="demo-message-input"
                          />
                        </div>
                      </div>

                      <div className="flex gap-3 mt-6">
                        <Button
                          variant="outline"
                          onClick={() => setStep(2)}
                          className="flex-1 border-white/20 text-white hover:bg-white/5 rounded-lg"
                        >
                          Zurück
                        </Button>
                        <Button
                          onClick={handleSubmit}
                          disabled={isLoading || !formData.name || !formData.email}
                          className="flex-1 bg-[#CCFF00] text-black hover:bg-[#B3E600] font-semibold rounded-lg"
                          data-testid="demo-submit-btn"
                        >
                          {isLoading ? 'Wird gebucht...' : 'Demo buchen'}
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Success */}
                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 rounded-full bg-[#CCFF00]/20 flex items-center justify-center mx-auto mb-6">
                        <Check className="w-8 h-8 text-[#CCFF00]" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Demo gebucht!</h3>
                      <p className="text-white/60 mb-4">
                        Wir haben dir eine Bestätigung an<br />
                        <span className="text-white">{formData.email}</span> gesendet.
                      </p>
                      <div className="p-4 bg-[#0A0A0A] rounded-xl border border-white/10 inline-flex items-center gap-4">
                        <div className="flex items-center gap-2 text-white/70">
                          <CalendarIcon className="w-4 h-4 text-[#CCFF00]" />
                          {selectedDate && format(selectedDate, 'dd.MM.yyyy', { locale: de })}
                        </div>
                        <div className="flex items-center gap-2 text-white/70">
                          <Clock className="w-4 h-4 text-[#CCFF00]" />
                          {selectedTime} Uhr
                        </div>
                      </div>
                      <Button
                        onClick={resetAndClose}
                        className="w-full bg-[#CCFF00] text-black hover:bg-[#B3E600] font-semibold py-5 rounded-lg mt-8"
                        data-testid="demo-close-btn"
                      >
                        Schließen
                      </Button>
                    </motion.div>
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
