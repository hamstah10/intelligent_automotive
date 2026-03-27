import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  User, Mail, Phone, Building2, MapPin, CreditCard, Calendar,
  Shield, Bell, Eye, EyeOff, Save, Car, Code, ChevronRight,
  Edit3, Key, Globe, Clock, BarChart3, Zap, Settings2, Trash2, Plus
} from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { t, surface, surfaceAlt } from './themeUtils';

const PURPLE = '#c084fc';
const BLUE = '#00E5FF';
const GREEN = '#CCFF00';

const PROFILE_KEY = 'autointel_profile';
const GARAGE_KEY = 'autointel_garage';

const loadProfile = () => {
  try {
    return JSON.parse(localStorage.getItem(PROFILE_KEY)) || null;
  } catch { return null; }
};
const defaultProfile = {
  vorname: '', nachname: '', email: '', telefon: '', firma: '', position: '',
  standort: '', website: '', sprache: 'Deutsch', zeitzone: 'Europe/Berlin',
  notifications_email: true, notifications_push: true, notifications_alerts: true,
  plan: 'Combined Elite', planStart: '2025-09-01', apiNutzung: 78,
};

const markenColors = {
  'Audi': BLUE, 'BMW': '#1e90ff', 'Mercedes-Benz': '#94a3b8', 'Porsche': '#ef4444',
  'SEAT': '#f97316', 'Skoda': GREEN, 'VW': BLUE, 'Cupra': '#a855f7', 'Andere': '#666',
};

const Section = ({ title, icon: Icon, color, children }) => (
  <div className={surface('p-5')}>
    <div className="flex items-center gap-2 mb-4">
      <Icon className="w-4 h-4" style={{ color: color || PURPLE }} />
      <h3 className="font-['Orbitron'] text-xs font-bold" style={{ color: t.text }}>{title}</h3>
    </div>
    {children}
  </div>
);

const Field = ({ label, children }) => (
  <div>
    <label className="text-[10px] font-medium uppercase tracking-wider block mb-1.5" style={{ color: t.textDim }}>{label}</label>
    {children}
  </div>
);

const inputCls = "w-full h-10 px-3 rounded-lg text-sm";

export const DashboardProfil = () => {
  const [profile, setProfile] = useState(loadProfile() || { ...defaultProfile });
  const [garage, setGarage] = useState([]);
  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    try { setGarage(JSON.parse(localStorage.getItem(GARAGE_KEY) || '[]')); } catch { setGarage([]); }
  }, []);

  const set = (k, v) => setProfile(p => ({ ...p, [k]: v }));

  const handleSave = () => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    setEditing(false);
    toast.success('Profil gespeichert!');
  };

  const initials = `${(profile.vorname || 'A')[0]}${(profile.nachname || 'I')[0]}`.toUpperCase();

  const stats = [
    { label: 'Suchanfragen', value: '1.847', icon: BarChart3, color: BLUE },
    { label: 'Codierungen', value: '324', icon: Code, color: PURPLE },
    { label: 'Gespeicherte Alerts', value: '12', icon: Bell, color: GREEN },
    { label: 'API Aufrufe', value: '9.412', icon: Zap, color: '#facc15' },
  ];

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 data-testid="profil-title" className="font-['Orbitron'] text-xl font-bold tracking-tight" style={{ color: t.text }}>Mein Profil</h1>
          <p className="text-sm mt-1" style={{ color: t.textSec }}>Account, Einstellungen und Fahrzeug-Garage verwalten.</p>
        </div>
        {!editing ? (
          <Button onClick={() => setEditing(true)} data-testid="edit-profile-btn"
            variant="outline" className="h-10 px-4 rounded-lg text-xs font-semibold gap-2" style={{ borderColor: 'var(--d-border)', color: t.textSec }}>
            <Edit3 className="w-3.5 h-3.5" /> Bearbeiten
          </Button>
        ) : (
          <Button onClick={handleSave} data-testid="save-profile-btn"
            className="h-10 px-5 rounded-lg text-xs font-semibold gap-2" style={{ backgroundColor: PURPLE, color: '#000' }}>
            <Save className="w-3.5 h-3.5" /> Speichern
          </Button>
        )}
      </div>

      {/* Avatar + Quick Info */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className={`${surface('p-6')} mb-6`}>
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold font-['Orbitron'] shrink-0"
            style={{ backgroundColor: `${PURPLE}15`, border: `2px solid ${PURPLE}40`, color: PURPLE }}
            data-testid="profile-avatar">{initials}</div>
          <div className="flex-1">
            <h2 className="font-['Orbitron'] text-lg font-bold" style={{ color: t.text }}>
              {profile.vorname || 'Neuer'} {profile.nachname || 'Nutzer'}
            </h2>
            <p className="text-sm" style={{ color: t.textSec }}>{profile.position || 'Position'} {profile.firma ? `bei ${profile.firma}` : ''}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-[10px] px-2 py-0.5 rounded-md font-semibold" style={{ backgroundColor: `${GREEN}15`, color: GREEN, border: `1px solid ${GREEN}25` }}>
                {profile.plan}
              </span>
              <span className="text-[10px] flex items-center gap-1" style={{ color: t.textDim }}>
                <Calendar className="w-3 h-3" /> Mitglied seit {profile.planStart}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className={surface('p-4')} data-testid={`stat-${i}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}12` }}>
                  <Icon className="w-4 h-4" style={{ color: s.color }} />
                </div>
              </div>
              <div className="font-['Orbitron'] text-lg font-bold" style={{ color: t.text }}>{s.value}</div>
              <div className="text-[10px]" style={{ color: t.textDim }}>{s.label}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Personal Info */}
        <div className="lg:col-span-2 space-y-4">
          <Section title="Persönliche Daten" icon={User} color={PURPLE}>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Vorname">
                <Input value={profile.vorname} onChange={e => set('vorname', e.target.value)} disabled={!editing}
                  placeholder="Max" className={inputCls} data-testid="input-vorname"
                  style={{ backgroundColor: 'var(--d-surface-alt)', borderColor: 'var(--d-border)', color: t.text, opacity: editing ? 1 : 0.7 }} />
              </Field>
              <Field label="Nachname">
                <Input value={profile.nachname} onChange={e => set('nachname', e.target.value)} disabled={!editing}
                  placeholder="Mustermann" className={inputCls} data-testid="input-nachname"
                  style={{ backgroundColor: 'var(--d-surface-alt)', borderColor: 'var(--d-border)', color: t.text, opacity: editing ? 1 : 0.7 }} />
              </Field>
              <Field label="E-Mail">
                <Input value={profile.email} onChange={e => set('email', e.target.value)} disabled={!editing}
                  placeholder="max@beispiel.de" className={inputCls} data-testid="input-email"
                  style={{ backgroundColor: 'var(--d-surface-alt)', borderColor: 'var(--d-border)', color: t.text, opacity: editing ? 1 : 0.7 }} />
              </Field>
              <Field label="Telefon">
                <Input value={profile.telefon} onChange={e => set('telefon', e.target.value)} disabled={!editing}
                  placeholder="+49 123 456789" className={inputCls} data-testid="input-telefon"
                  style={{ backgroundColor: 'var(--d-surface-alt)', borderColor: 'var(--d-border)', color: t.text, opacity: editing ? 1 : 0.7 }} />
              </Field>
              <Field label="Firma">
                <Input value={profile.firma} onChange={e => set('firma', e.target.value)} disabled={!editing}
                  placeholder="Firma GmbH" className={inputCls} data-testid="input-firma"
                  style={{ backgroundColor: 'var(--d-surface-alt)', borderColor: 'var(--d-border)', color: t.text, opacity: editing ? 1 : 0.7 }} />
              </Field>
              <Field label="Position">
                <Input value={profile.position} onChange={e => set('position', e.target.value)} disabled={!editing}
                  placeholder="Geschäftsführer" className={inputCls} data-testid="input-position"
                  style={{ backgroundColor: 'var(--d-surface-alt)', borderColor: 'var(--d-border)', color: t.text, opacity: editing ? 1 : 0.7 }} />
              </Field>
              <Field label="Standort">
                <Input value={profile.standort} onChange={e => set('standort', e.target.value)} disabled={!editing}
                  placeholder="München, Deutschland" className={inputCls} data-testid="input-standort"
                  style={{ backgroundColor: 'var(--d-surface-alt)', borderColor: 'var(--d-border)', color: t.text, opacity: editing ? 1 : 0.7 }} />
              </Field>
              <Field label="Website">
                <Input value={profile.website} onChange={e => set('website', e.target.value)} disabled={!editing}
                  placeholder="https://..." className={inputCls} data-testid="input-website"
                  style={{ backgroundColor: 'var(--d-surface-alt)', borderColor: 'var(--d-border)', color: t.text, opacity: editing ? 1 : 0.7 }} />
              </Field>
            </div>
          </Section>

          <Section title="Sicherheit" icon={Shield} color="#ef4444">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Passwort ändern">
                <div className="relative">
                  <Input type={showPassword ? 'text' : 'password'} placeholder="Neues Passwort" disabled={!editing}
                    className={inputCls} style={{ backgroundColor: 'var(--d-surface-alt)', borderColor: 'var(--d-border)', color: t.text, opacity: editing ? 1 : 0.7 }} />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                    {showPassword ? <EyeOff className="w-4 h-4" style={{ color: t.textMut }} /> : <Eye className="w-4 h-4" style={{ color: t.textMut }} />}
                  </button>
                </div>
              </Field>
              <Field label="Passwort bestätigen">
                <Input type="password" placeholder="Passwort wiederholen" disabled={!editing}
                  className={inputCls} style={{ backgroundColor: 'var(--d-surface-alt)', borderColor: 'var(--d-border)', color: t.text, opacity: editing ? 1 : 0.7 }} />
              </Field>
            </div>
            <div className="mt-3 flex items-center gap-4">
              <div className="flex items-center gap-2 text-[11px]" style={{ color: t.textSec }}>
                <Key className="w-3.5 h-3.5" style={{ color: t.textDim }} /> 2FA: <span className="font-semibold" style={{ color: '#22c55e' }}>Aktiv</span>
              </div>
              <div className="flex items-center gap-2 text-[11px]" style={{ color: t.textSec }}>
                <Clock className="w-3.5 h-3.5" style={{ color: t.textDim }} /> Letzter Login: Heute, 14:32
              </div>
            </div>
          </Section>

          <Section title="Benachrichtigungen" icon={Bell} color="#facc15">
            <div className="space-y-3">
              {[
                { key: 'notifications_email', label: 'E-Mail Benachrichtigungen', desc: 'Neue Deals, Reports und Updates' },
                { key: 'notifications_push', label: 'Push Notifications', desc: 'Browser-Benachrichtigungen für Alerts' },
                { key: 'notifications_alerts', label: 'Preis-Alerts', desc: 'Sofortbenachrichtigung bei Preisänderungen' },
              ].map(n => (
                <div key={n.key} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'var(--d-surface-alt)' }}>
                  <div>
                    <span className="text-xs font-medium block" style={{ color: t.text }}>{n.label}</span>
                    <span className="text-[10px]" style={{ color: t.textDim }}>{n.desc}</span>
                  </div>
                  <button onClick={() => editing && set(n.key, !profile[n.key])}
                    className={`w-10 h-6 rounded-full transition-colors flex items-center ${profile[n.key] ? 'justify-end' : 'justify-start'} px-0.5`}
                    style={{ backgroundColor: profile[n.key] ? `${PURPLE}40` : 'var(--d-border)', opacity: editing ? 1 : 0.6 }}
                    data-testid={`toggle-${n.key}`}>
                    <div className="w-5 h-5 rounded-full transition-colors" style={{ backgroundColor: profile[n.key] ? PURPLE : 'var(--d-surface-alt)' }} />
                  </button>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Plan Info */}
          <Section title="Dein Plan" icon={CreditCard} color={GREEN}>
            <div className="text-center mb-4">
              <div className="font-['Orbitron'] text-lg font-bold mb-1" style={{ color: GREEN }}>{profile.plan}</div>
              <div className="text-[10px]" style={{ color: t.textDim }}>Aktiv seit {profile.planStart}</div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-[11px]">
                <span style={{ color: t.textSec }}>API Nutzung</span>
                <span className="font-semibold" style={{ color: t.text }}>{profile.apiNutzung}%</span>
              </div>
              <div className="w-full h-2 rounded-full" style={{ backgroundColor: 'var(--d-surface-alt)' }}>
                <div className="h-full rounded-full" style={{ width: `${profile.apiNutzung}%`, backgroundColor: profile.apiNutzung > 90 ? '#ef4444' : GREEN }} />
              </div>
            </div>
            <Link to="/dashboard/pakete">
              <button className="w-full text-[11px] font-medium p-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
                style={{ backgroundColor: `${GREEN}08`, color: GREEN, border: `1px solid ${GREEN}15` }}>
                Plan verwalten <ChevronRight className="w-3 h-3" />
              </button>
            </Link>
          </Section>

          {/* Garage Preview */}
          <Section title="Meine Garage" icon={Car} color={PURPLE}>
            {garage.length === 0 ? (
              <div className="text-center py-4">
                <Car className="w-8 h-8 mx-auto mb-2" style={{ color: `${PURPLE}30` }} />
                <p className="text-[11px] mb-3" style={{ color: t.textDim }}>Noch keine Fahrzeuge</p>
                <Link to="/dashboard/garage">
                  <Button size="sm" className="h-8 px-3 rounded-lg text-[10px] font-semibold gap-1.5" style={{ backgroundColor: PURPLE, color: '#000' }}>
                    <Plus className="w-3 h-3" /> Fahrzeug anlegen
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {garage.slice(0, 4).map((v, i) => {
                  const color = markenColors[v.marke] || '#666';
                  return (
                    <div key={v.id} className="flex items-center gap-2.5 p-2.5 rounded-lg" style={{ backgroundColor: 'var(--d-surface-alt)' }} data-testid={`garage-preview-${i}`}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}12` }}>
                        <Car className="w-4 h-4" style={{ color }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[11px] font-semibold block truncate" style={{ color: t.text }}>{v.marke} {v.modell}</span>
                        <span className="text-[9px]" style={{ color: t.textDim }}>{v.kennzeichen || v.plattform || v.baujahr || '—'}</span>
                      </div>
                    </div>
                  );
                })}
                <Link to="/dashboard/garage">
                  <button className="w-full text-[11px] font-medium p-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors mt-2"
                    style={{ backgroundColor: `${PURPLE}08`, color: PURPLE, border: `1px solid ${PURPLE}15` }}
                    data-testid="goto-garage-link">
                    {garage.length > 4 ? `Alle ${garage.length} Fahrzeuge` : 'Garage öffnen'} <ChevronRight className="w-3 h-3" />
                  </button>
                </Link>
              </div>
            )}
          </Section>

          {/* Quick Links */}
          <Section title="Schnellzugriff" icon={Settings2} color={BLUE}>
            <div className="space-y-1.5">
              {[
                { label: 'E-Mail Templates', href: '/dashboard/emails', icon: Mail, color: PURPLE },
                { label: 'Pakete & Addons', href: '/dashboard/pakete', icon: CreditCard, color: GREEN },
                { label: 'Coding Intelligence', href: '/dashboard/coding', icon: Code, color: PURPLE },
                { label: 'Reports', href: '/dashboard/reports', icon: BarChart3, color: BLUE },
              ].map(l => (
                <Link key={l.href} to={l.href} className="flex items-center justify-between p-2.5 rounded-lg transition-colors"
                  style={{ backgroundColor: 'transparent' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--d-surface-alt)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <div className="flex items-center gap-2">
                    <l.icon className="w-3.5 h-3.5" style={{ color: l.color }} />
                    <span className="text-[11px] font-medium" style={{ color: t.textSec }}>{l.label}</span>
                  </div>
                  <ChevronRight className="w-3 h-3" style={{ color: t.textDim }} />
                </Link>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </>
  );
};
