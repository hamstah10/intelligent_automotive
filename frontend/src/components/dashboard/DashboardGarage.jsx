import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Car, Plus, X, Edit3, Trash2, Search, Code, ChevronRight,
  Gauge, Calendar, Hash, MapPin, Fuel, Settings2, Save, Wrench
} from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { t, surface, surfaceAlt } from './themeUtils';

const PURPLE = '#c084fc';
const BLUE = '#00E5FF';
const GREEN = '#CCFF00';

const marken = ['Audi', 'BMW', 'Mercedes-Benz', 'Porsche', 'SEAT', 'Skoda', 'VW', 'Cupra', 'Andere'];
const plattformen = ['MQB', 'MQB Evo', 'MLB Evo', 'PPC', 'CLAR', 'FAAR', 'UKL', 'MRA2', 'MHA2', 'Andere'];
const getriebe = ['Automatik (DSG)', 'Automatik (Wandler)', 'Manuell', 'Andere'];
const kraftstoffe = ['Benzin', 'Diesel', 'Hybrid', 'Elektro', 'Andere'];

const markenColors = {
  'Audi': BLUE, 'BMW': '#1e90ff', 'Mercedes-Benz': '#94a3b8', 'Porsche': '#ef4444',
  'SEAT': '#f97316', 'Skoda': GREEN, 'VW': BLUE, 'Cupra': '#a855f7', 'Andere': '#666',
};

const STORAGE_KEY = 'autointel_garage';

const loadGarage = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
};
const saveGarage = (vehicles) => localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));

const emptyVehicle = {
  marke: '', modell: '', baujahr: '', plattform: '', kennzeichen: '', vin: '',
  farbe: '', motorisierung: '', leistung: '', getriebe: '', kraftstoff: '',
  kilometerstand: '', notizen: '',
};

const Field = ({ label, children }) => (
  <div>
    <label className="text-[10px] font-medium uppercase tracking-wider block mb-1.5" style={{ color: t.textDim }}>{label}</label>
    {children}
  </div>
);

const inputStyle = `w-full h-10 px-3 rounded-lg text-sm transition-colors focus:outline-none`;

export const DashboardGarage = () => {
  const [vehicles, setVehicles] = useState(loadGarage);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ ...emptyVehicle });
  const [searchText, setSearchText] = useState('');

  useEffect(() => { saveGarage(vehicles); }, [vehicles]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.marke || !form.modell) { toast.error('Marke und Modell sind Pflichtfelder'); return; }
    if (editId) {
      setVehicles(vs => vs.map(v => v.id === editId ? { ...form, id: editId, updatedAt: new Date().toISOString() } : v));
      toast.success('Fahrzeug aktualisiert');
    } else {
      setVehicles(vs => [...vs, { ...form, id: crypto.randomUUID(), createdAt: new Date().toISOString() }]);
      toast.success('Fahrzeug hinzugefügt!');
    }
    setForm({ ...emptyVehicle });
    setShowForm(false);
    setEditId(null);
  };

  const handleEdit = (v) => {
    setForm({ ...v });
    setEditId(v.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setVehicles(vs => vs.filter(v => v.id !== id));
    toast('Fahrzeug entfernt');
  };

  const filtered = vehicles.filter(v => {
    if (!searchText) return true;
    const q = searchText.toLowerCase();
    return [v.marke, v.modell, v.kennzeichen, v.plattform].some(f => f?.toLowerCase().includes(q));
  });

  const SelectField = ({ value, onChange, options, placeholder }) => (
    <select value={value} onChange={e => onChange(e.target.value)}
      className={inputStyle} style={{ backgroundColor: 'var(--d-surface-alt)', border: '1px solid var(--d-border)', color: value ? t.text : t.textMut, appearance: 'none' }}>
      <option value="">{placeholder}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 data-testid="garage-title" className="font-['Orbitron'] text-xl font-bold tracking-tight" style={{ color: t.text }}>Meine Garage</h1>
          <p className="text-sm mt-1" style={{ color: t.textSec }}>Deine gespeicherten Fahrzeuge — schneller Zugriff auf passende Codierungen.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: t.textMut }} />
            <Input value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="Suchen..."
              className="pl-9 w-48 h-10 rounded-lg text-sm" style={{ backgroundColor: t.surface, borderColor: t.border, color: t.text }}
              data-testid="garage-search" />
          </div>
          <Button onClick={() => { setForm({ ...emptyVehicle }); setEditId(null); setShowForm(true); }}
            data-testid="add-vehicle-btn" className="h-10 px-4 rounded-lg text-xs font-semibold gap-2" style={{ backgroundColor: PURPLE, color: '#000' }}>
            <Plus className="w-4 h-4" /> Fahrzeug hinzufügen
          </Button>
        </div>
      </div>

      {/* Vehicle Grid */}
      {filtered.length === 0 && !showForm ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center" data-testid="garage-empty">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${PURPLE}10` }}>
            <Car className="w-10 h-10" style={{ color: `${PURPLE}50` }} />
          </div>
          <h3 className="font-['Orbitron'] text-base font-bold mb-2" style={{ color: t.text }}>Deine Garage ist leer</h3>
          <p className="text-sm mb-6" style={{ color: t.textDim }}>Füge dein erstes Fahrzeug hinzu, um Codierungen schneller zu finden.</p>
          <Button onClick={() => { setForm({ ...emptyVehicle }); setEditId(null); setShowForm(true); }}
            className="h-10 px-5 rounded-lg text-xs font-semibold gap-2" style={{ backgroundColor: PURPLE, color: '#000' }}>
            <Plus className="w-4 h-4" /> Erstes Fahrzeug anlegen
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
          {filtered.map((v, i) => {
            const color = markenColors[v.marke] || '#666';
            return (
              <motion.div key={v.id} data-testid={`vehicle-card-${i}`}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className={`${surface('p-5')} group`}>
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}>
                      <Car className="w-5 h-5" style={{ color }} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold" style={{ color: t.text }}>{v.marke} {v.modell}</h3>
                      <span className="text-[10px] font-mono" style={{ color: t.textDim }}>{v.plattform || '—'} · {v.baujahr || '—'}</span>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(v)} className="p-1.5 rounded-lg hover:bg-white/5" data-testid={`edit-vehicle-${i}`}>
                      <Edit3 className="w-3.5 h-3.5" style={{ color: t.textMut }} />
                    </button>
                    <button onClick={() => handleDelete(v.id)} className="p-1.5 rounded-lg hover:bg-white/5" data-testid={`delete-vehicle-${i}`}>
                      <Trash2 className="w-3.5 h-3.5 text-[#ef4444]/60" />
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {v.kennzeichen && (
                    <div className="flex items-center gap-1.5 text-[11px]" style={{ color: t.textSec }}>
                      <Hash className="w-3 h-3" style={{ color: t.textDim }} />{v.kennzeichen}
                    </div>
                  )}
                  {v.motorisierung && (
                    <div className="flex items-center gap-1.5 text-[11px]" style={{ color: t.textSec }}>
                      <Gauge className="w-3 h-3" style={{ color: t.textDim }} />{v.motorisierung}
                    </div>
                  )}
                  {v.leistung && (
                    <div className="flex items-center gap-1.5 text-[11px]" style={{ color: t.textSec }}>
                      <Fuel className="w-3 h-3" style={{ color: t.textDim }} />{v.leistung}
                    </div>
                  )}
                  {v.kilometerstand && (
                    <div className="flex items-center gap-1.5 text-[11px]" style={{ color: t.textSec }}>
                      <MapPin className="w-3 h-3" style={{ color: t.textDim }} />{v.kilometerstand} km
                    </div>
                  )}
                </div>

                {v.notizen && (
                  <p className="text-[10px] mb-3 p-2 rounded-lg line-clamp-2 leading-relaxed" style={{ backgroundColor: 'var(--d-surface-alt)', color: t.textDim }}>{v.notizen}</p>
                )}

                {/* Action */}
                <Link to="/dashboard/coding" className="flex items-center justify-between p-2.5 rounded-lg transition-colors" style={{ backgroundColor: `${PURPLE}06`, border: `1px solid ${PURPLE}12` }}
                  data-testid={`goto-coding-${i}`}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = `${PURPLE}12`}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = `${PURPLE}06`}>
                  <div className="flex items-center gap-2">
                    <Code className="w-3.5 h-3.5" style={{ color: PURPLE }} />
                    <span className="text-[11px] font-medium" style={{ color: PURPLE }}>Codierungen finden</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5" style={{ color: PURPLE }} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Add/Edit Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
            onClick={() => setShowForm(false)}>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
              className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl"
              style={{ backgroundColor: 'var(--d-bg)', border: '1px solid var(--d-border)' }}
              onClick={e => e.stopPropagation()} data-testid="vehicle-form-modal">

              <div className="flex items-center justify-between p-5" style={{ borderBottom: '1px solid var(--d-border)' }}>
                <h3 className="font-['Orbitron'] text-sm font-bold" style={{ color: t.text }}>
                  {editId ? 'Fahrzeug bearbeiten' : 'Neues Fahrzeug'}
                </h3>
                <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-white/5">
                  <X className="w-4 h-4" style={{ color: t.textMut }} />
                </button>
              </div>

              <div className="p-5 space-y-5">
                {/* Basic */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5" style={{ color: PURPLE }}>
                    <Car className="w-3 h-3" /> Grunddaten
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Marke *"><SelectField value={form.marke} onChange={v => set('marke', v)} options={marken} placeholder="Marke wählen..." /></Field>
                    <Field label="Modell *"><Input value={form.modell} onChange={e => set('modell', e.target.value)} placeholder="z.B. Golf 8, A3 8Y..."
                      className={inputStyle} style={{ backgroundColor: 'var(--d-surface-alt)', borderColor: 'var(--d-border)', color: t.text }} data-testid="input-modell" /></Field>
                    <Field label="Baujahr"><Input value={form.baujahr} onChange={e => set('baujahr', e.target.value)} placeholder="z.B. 2022"
                      className={inputStyle} style={{ backgroundColor: 'var(--d-surface-alt)', borderColor: 'var(--d-border)', color: t.text }} data-testid="input-baujahr" /></Field>
                    <Field label="Plattform"><SelectField value={form.plattform} onChange={v => set('plattform', v)} options={plattformen} placeholder="Plattform wählen..." /></Field>
                  </div>
                </div>

                {/* Identification */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5" style={{ color: BLUE }}>
                    <Hash className="w-3 h-3" /> Identifikation
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Kennzeichen"><Input value={form.kennzeichen} onChange={e => set('kennzeichen', e.target.value)} placeholder="z.B. M-AI 2026"
                      className={inputStyle} style={{ backgroundColor: 'var(--d-surface-alt)', borderColor: 'var(--d-border)', color: t.text }} data-testid="input-kennzeichen" /></Field>
                    <Field label="Fahrgestellnummer (VIN)"><Input value={form.vin} onChange={e => set('vin', e.target.value)} placeholder="17-stellig (optional)"
                      className={inputStyle} style={{ backgroundColor: 'var(--d-surface-alt)', borderColor: 'var(--d-border)', color: t.text }} data-testid="input-vin" /></Field>
                  </div>
                </div>

                {/* Technical */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5" style={{ color: GREEN }}>
                    <Settings2 className="w-3 h-3" /> Technische Daten
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Motorisierung"><Input value={form.motorisierung} onChange={e => set('motorisierung', e.target.value)} placeholder="z.B. 2.0 TSI, 35 TFSI..."
                      className={inputStyle} style={{ backgroundColor: 'var(--d-surface-alt)', borderColor: 'var(--d-border)', color: t.text }} data-testid="input-motor" /></Field>
                    <Field label="Leistung"><Input value={form.leistung} onChange={e => set('leistung', e.target.value)} placeholder="z.B. 150 PS"
                      className={inputStyle} style={{ backgroundColor: 'var(--d-surface-alt)', borderColor: 'var(--d-border)', color: t.text }} data-testid="input-leistung" /></Field>
                    <Field label="Getriebe"><SelectField value={form.getriebe} onChange={v => set('getriebe', v)} options={getriebe} placeholder="Getriebe wählen..." /></Field>
                    <Field label="Kraftstoff"><SelectField value={form.kraftstoff} onChange={v => set('kraftstoff', v)} options={kraftstoffe} placeholder="Kraftstoff wählen..." /></Field>
                    <Field label="Kilometerstand"><Input value={form.kilometerstand} onChange={e => set('kilometerstand', e.target.value)} placeholder="z.B. 45000"
                      className={inputStyle} style={{ backgroundColor: 'var(--d-surface-alt)', borderColor: 'var(--d-border)', color: t.text }} data-testid="input-km" /></Field>
                    <Field label="Farbe"><Input value={form.farbe} onChange={e => set('farbe', e.target.value)} placeholder="z.B. Mythosschwarz"
                      className={inputStyle} style={{ backgroundColor: 'var(--d-surface-alt)', borderColor: 'var(--d-border)', color: t.text }} data-testid="input-farbe" /></Field>
                  </div>
                </div>

                {/* Notes */}
                <Field label="Notizen">
                  <textarea value={form.notizen} onChange={e => set('notizen', e.target.value)} rows={3}
                    placeholder="Besonderheiten, bereits durchgeführte Codierungen, etc."
                    className="w-full px-3 py-2.5 rounded-lg text-sm resize-none"
                    style={{ backgroundColor: 'var(--d-surface-alt)', border: '1px solid var(--d-border)', color: t.text }}
                    data-testid="input-notizen" />
                </Field>
              </div>

              <div className="flex justify-end gap-3 p-5" style={{ borderTop: '1px solid var(--d-border)' }}>
                <Button onClick={() => setShowForm(false)} variant="outline" className="h-10 px-4 rounded-lg text-xs"
                  style={{ borderColor: 'var(--d-border)', color: t.textSec }}>Abbrechen</Button>
                <Button onClick={handleSave} data-testid="save-vehicle-btn"
                  className="h-10 px-5 rounded-lg text-xs font-semibold gap-2" style={{ backgroundColor: PURPLE, color: '#000' }}>
                  <Save className="w-3.5 h-3.5" /> {editId ? 'Speichern' : 'Hinzufügen'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
