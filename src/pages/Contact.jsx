import { useState } from 'react';
import {
  Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle,
  MessageSquare, ArrowRight, Loader2
} from 'lucide-react';
import { useScrollRevealAll } from '../hooks/useScrollReveal';

const contactInfo = [
  {
    icon: <Phone size={20} />,
    label: 'Phone',
    value: '+91 80 4090 6245',
    href: 'tel:+918040906245',
    sub: 'Mon–Fri, 9am–6pm IST',
  },
  {
    icon: <Mail size={20} />,
    label: 'Email',
    value: 'info@serveaseinnovation.com',
    href: 'mailto:info@serveaseinnovation.com',
    sub: 'We respond within 24 hours',
  },
  {
    icon: <MapPin size={20} />,
    label: 'Office',
    value: 'Bangalore, India',
    sub: 'Available for in-person meetings',
  },
];

export default function Contact() {
  useScrollRevealAll();

  const [form, setForm] = useState({ name: '', email: '', message: '', subscribe: false });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus('loading');
    // Simulate form submission
    await new Promise((res) => setTimeout(res, 1200));
    setStatus('success');
    setForm({ name: '', email: '', message: '', subscribe: false });
  };

  return (
    <div className="min-h-screen">
      {/* Hero - Updated background color */}
      <section className="pt-32 pb-20 relative overflow-hidden" style={{ backgroundColor: '#082f49' }}>
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-electric-500/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <span className="section-label text-electric-400">
            <MessageSquare size={12} /> Contact Us
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight max-w-2xl">
            Let's start a{' '}
            <span className="bg-gradient-to-r from-electric-300 to-electric-100 bg-clip-text text-transparent">
              conversation
            </span>
          </h1>
          <p className="text-white/55 text-lg max-w-xl leading-relaxed">
            We know that every client has unique needs. Send us a message and we'll get back to you soon — or call us directly for a live demo.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact info */}
            <div className="lg:col-span-1 space-y-6 reveal">
              <div>
                <h2 className="text-2xl font-display font-bold text-navy-900 mb-2">Get in touch</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Questions, project ideas, or just want to say hello — we're always available to chat.
                </p>
              </div>

              {contactInfo.map(({ icon, label, value, href, sub }) => (
                <div key={label} className="flex gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-electric-200 hover:shadow-sm transition-all duration-200">
                  <div className="w-10 h-10 bg-electric-500/10 rounded-2xl flex items-center justify-center text-electric-500 shrink-0">
                    {icon}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{label}</div>
                    {href ? (
                      <a href={href} className="font-medium text-navy-900 hover:text-electric-500 transition-colors text-sm">
                        {value}
                      </a>
                    ) : (
                      <div className="font-medium text-navy-900 text-sm">{value}</div>
                    )}
                    <div className="text-gray-400 text-xs mt-0.5">{sub}</div>
                  </div>
                </div>
              ))}

              <div className="bg-navy-900 rounded-2xl p-5">
                <p className="text-white/80 text-sm font-medium mb-1">Call for a live demo</p>
                <a
                  href="tel:+918040906245"
                  className="text-electric-400 font-semibold text-lg hover:text-electric-300 transition-colors"
                >
                  +91 80 4090 6245
                </a>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2 reveal">
              <div className="card p-8 lg:p-10">
                {status === 'success' ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 size={32} className="text-emerald-500" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-navy-900 mb-2">Message sent!</h3>
                    <p className="text-gray-500 mb-6">
                      Thanks for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="btn-outline text-sm"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-display font-bold text-navy-900 mb-1">Send us a message</h2>
                      <p className="text-gray-500 text-sm">We'll respond within one business day.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          required
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@company.com"
                          required
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project, what services you're interested in, or any questions you have..."
                        required
                        rows={5}
                        className="input-field resize-none"
                      />
                    </div>

                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="subscribe"
                        name="subscribe"
                        checked={form.subscribe}
                        onChange={handleChange}
                        className="mt-1 w-4 h-4 accent-electric-500"
                      />
                      <label htmlFor="subscribe" className="text-sm text-gray-500 cursor-pointer">
                        Sign me up for updates, promotions, and news from ServEase Innovation.
                      </label>
                    </div>

                    {status === 'error' && (
                      <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                        <AlertCircle size={15} />
                        Something went wrong. Please try again or email us directly.
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-primary w-full justify-center"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send size={16} />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-gray-400 text-center">
                      This site is protected by reCAPTCHA and the Google{' '}
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="underline hover:text-gray-600">
                        Privacy Policy
                      </a>{' '}
                      and{' '}
                      <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="underline hover:text-gray-600">
                        Terms of Service
                      </a>{' '}
                      apply.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}