import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookies_accepted');
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookies_accepted', 'true');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('cookies_accepted', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50 animate-fade-up">
      <div className="bg-navy-900 text-white rounded-3xl shadow-2xl p-5 border border-white/10">
        <div className="flex items-start gap-3 mb-4">
          <Cookie size={18} className="text-electric-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-sm mb-1">This website uses cookies</h4>
            <p className="text-white/55 text-xs leading-relaxed">
              We use cookies to analyze traffic and optimize your experience. Your data will be aggregated with other user data.
            </p>
          </div>
          <button onClick={decline} className="text-white/40 hover:text-white transition-colors shrink-0">
            <X size={16} />
          </button>
        </div>
        <div className="flex gap-3">
          <button
            onClick={decline}
            className="flex-1 px-4 py-2 text-xs font-medium text-white/60 border border-white/20 rounded-full hover:bg-white/10 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="flex-1 px-4 py-2 text-xs font-semibold bg-electric-500 hover:bg-electric-400 text-white rounded-full transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}