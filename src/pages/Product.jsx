import { Link } from 'react-router-dom';
import {
  Home, User, Heart, ChefHat, Car, Shield, Package,
  MapPin, ArrowRight, Sparkles, AlertCircle, CheckCircle2,
  Clock, Smartphone
} from 'lucide-react';
import { useScrollRevealAll } from '../hooks/useScrollReveal';

const serviceItems = [
  { icon: <Home size={18} />, label: 'Maids' },
  { icon: <Heart size={18} />, label: 'Japa Maids' },
  { icon: <User size={18} />, label: 'Baby Caregiver / Nanny' },
  { icon: <Heart size={18} />, label: 'Elderly Care' },
  { icon: <Shield size={18} />, label: 'Patient Care' },
  { icon: <ChefHat size={18} />, label: 'Cooks' },
  { icon: <Car size={18} />, label: 'Driver' },
  { icon: <Shield size={18} />, label: 'House Surveillance' },
  { icon: <Package size={18} />, label: 'Labors' },
];

const mandiPoints = [
  {
    title: 'Regulation',
    desc: 'APMCs regulate trade of agricultural commodities within specific geographical areas, setting rules and managing market infrastructure.',
  },
  {
    title: 'Auction System',
    desc: "Farmers bring produce to the mandi for open auction, ensuring transparent price discovery and fair competition among buyers.",
  },
  {
    title: 'Coming Soon',
    desc: 'Our digital Mandi platform will modernize this centuries-old system, connecting farmers directly with buyers through a transparent online marketplace.',
    soon: true,
  },
];

export default function Product() {
  useScrollRevealAll();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-navy-900 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-electric-200/20 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <span className="section-label text-electric-400">
            <Package size={12} /> Our Products
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight max-w-2xl">
            Products that solve{' '}
            <span className="bg-gradient-to-r from-electric-300 to-electric-100 bg-clip-text text-transparent">
              real problems
            </span>
          </h1>
          <p className="text-white/55 text-lg max-w-xl leading-relaxed">
            We build technology around the challenges people actually face — in their homes, businesses, and communities.
          </p>
        </div>
      </section>

      {/* ServEaso Product */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Product header */}
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
            <div className="reveal">
              <div className="inline-flex items-center gap-2 bg-electric-500/10 text-electric-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 border border-electric-200">
                <Smartphone size={12} />
                Mobile App · In Development
              </div>
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-navy-900 mb-4 leading-tight">
                ServEaso
              </h2>
              <p className="text-xl text-gray-400 font-medium mb-6">Home care, handled.</p>
              <p className="text-gray-500 leading-relaxed mb-6">
                A location-based home care service application launching in the Indian market. ServEaso addresses one of modern life's most persistent headaches: finding reliable, trustworthy household help when you need it most.
              </p>
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                <MapPin size={14} className="text-electric-500" />
                Launching in Bangalore, India & Dubai, UAE
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-8">
                <User size={14} className="text-electric-500" />
                B2C mobile application · 20-person team
              </div>
              <Link to="/contact" className="btn-primary inline-flex">
                Stay Updated <ArrowRight size={16} />
              </Link>
            </div>

            {/* Problem Statement */}
            <div className="reveal">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle size={20} className="text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-2">The Problem We're Solving</h3>
                    <p className="text-amber-800/70 text-sm leading-relaxed">
                      In today's fast-paced world, many individuals — particularly working professionals — face significant stress due to unreliable home care staff. A sudden absence of a nanny or maid without prior notice can severely disrupt a family's daily routine.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="font-semibold text-navy-900 mb-4">Consider this scenario</h3>
                <blockquote className="text-gray-600 text-sm leading-relaxed italic border-l-2 border-electric-500 pl-4">
                  "Both partners are working professionals who hired a nanny for their infant. One morning, the nanny's phone is switched off and there's no response."
                </blockquote>
                <p className="text-gray-500 text-sm mt-4">
                  These scenarios happen every day. ServEase was founded with the vision of simplifying the lives of individuals who struggle to balance professional commitments with household responsibilities.
                </p>
              </div>
            </div>
          </div>

          {/* Service offerings */}
          <div className="reveal">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-display font-bold text-navy-900 mb-2">Initial Service Offerings</h3>
              <p className="text-gray-500 text-sm">Vetted and trained home care professionals, available on demand</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {serviceItems.map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2.5 p-4 bg-gray-50 border border-gray-100 rounded-2xl hover:border-electric-200 hover:bg-electric-500/5 transition-all duration-200 text-center group"
                >
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-electric-500 shadow-sm group-hover:shadow-electric-500/20 group-hover:text-electric-600 transition-all">
                    {icon}
                  </div>
                  <span className="text-gray-700 text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution section */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-800 py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-electric-500/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl mx-auto text-center reveal mb-16">
            <span className="section-label text-electric-400 justify-center">
              <Sparkles size={12} /> Our Solution
            </span>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
              Seamless. Secure. Reliable.
            </h2>
            <p className="text-white/55 leading-relaxed">
              ServEaso connects individuals with vetted and trained home care professionals through a seamless, secure platform — providing peace of mind and high-quality care.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: <Shield size={24} />, title: 'Thoroughly Vetted', desc: 'Every professional goes through background checks and skills verification before joining the platform.' },
              { icon: <Clock size={24} />, title: 'On-Demand Access', desc: 'Find and book reliable help whenever you need it — no waiting, no uncertainty.' },
              { icon: <CheckCircle2 size={24} />, title: 'Peace of Mind', desc: 'Transparent ratings, reviews, and guaranteed service quality for every booking.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white/8 border border-white/10 rounded-2xl p-6 reveal hover:bg-white/12 transition-colors">
                <div className="w-12 h-12 bg-electric-500/20 rounded-xl flex items-center justify-center text-electric-400 mb-4">
                  {icon}
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mandi System */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="reveal">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 border border-emerald-200">
                <Clock size={12} />
                Coming Soon
              </div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-navy-900 mb-4 leading-tight">
                Indian Mandi System
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                The Indian "mandi" is a regulated wholesale market for agricultural produce. These markets — known as Agricultural Produce Market Committees (APMCs) — were established by state governments to protect farmers from exploitation by intermediaries.
              </p>
              <p className="text-gray-500 leading-relaxed">
                We're digitizing this ecosystem to bring transparency, fairness, and efficiency to agricultural trade across India.
              </p>
            </div>

            <div className="space-y-4 reveal">
              {mandiPoints.map(({ title, desc, soon }) => (
                <div
                  key={title}
                  className={`p-5 rounded-2xl border ${soon ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-100'}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${soon ? 'bg-emerald-500' : 'bg-electric-500'}`} />
                    <h4 className={`font-semibold text-sm ${soon ? 'text-emerald-800' : 'text-navy-900'}`}>{title}</h4>
                    {soon && (
                      <span className="ml-auto bg-emerald-200 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <p className={`text-sm leading-relaxed ${soon ? 'text-emerald-700/80' : 'text-gray-500'}`}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}