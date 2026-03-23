import { motion } from 'framer-motion';
import { t } from './themeUtils';

export const DashboardToolWrapper = ({ title, description, icon: Icon, accentColor = '#00E5FF', children }) => (
  <div data-testid={`dashboard-tool-${title.toLowerCase().replace(/[\s\/]/g, '-')}`}>
    {/* Header */}
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-1.5">
        {Icon && (
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${accentColor}15`, border: `1px solid ${accentColor}25` }}>
            <Icon className="w-4.5 h-4.5" style={{ color: accentColor }} />
          </div>
        )}
        <h1 data-testid="tool-page-title" className="font-['Orbitron'] text-xl font-bold tracking-tight" style={{ color: t.text }}>
          {title}
        </h1>
      </div>
      {description && (
        <p className="text-sm ml-12" style={{ color: t.textSec }}>{description}</p>
      )}
    </div>

    {/* Tool Content — forced dark container for landing components */}
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl overflow-hidden"
      style={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="tool-embed [&_section]:py-8 [&_section]:px-4 [&_section]:lg:py-10 [&_section]:lg:px-6">
        {children}
      </div>
    </motion.div>
  </div>
);
