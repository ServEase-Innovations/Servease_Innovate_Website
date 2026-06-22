import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Code2, Users, TestTube2, Globe,
  Bot, Zap, Shield, Star, ChevronRight, TrendingUp,
  Award, Clock
} from 'lucide-react';
import { useScrollRevealAll } from '../hooks/useScrollReveal';

const services = [
  {
    icon: <Code2 size={22} className="text-electric-600" />,
    title: 'Product Development',
    desc: 'End-to-end SDLC from ideation to launch, scaling with your business.',
    color: 'bg-electric-500/10',
  },
  {
    icon: <Users size={22} className="text-electric-500" />,
    title: 'IT Staffing',
    desc: 'Agile, pre-vetted tech talent matched to your exact project needs.',
    color: 'bg-electric-500/10',
  },
  {
    icon: <TestTube2 size={22} className="text-electric-600" />,
    title: 'QA & Testing',
    desc: '20+ years of experience ensuring quality before it reaches users.',
    color: 'bg-electric-500/10',
  },
  {
    icon: <Globe size={22} className="text-electric-500" />,
    title: 'Web Design',
    desc: 'Responsive, accessible, and visually compelling digital experiences.',
    color: 'bg-electric-500/10',
  },
  {
    icon: <Bot size={22} className="text-electric-600" />,
    title: 'Automation',
    desc: 'Gen AI-integrated frameworks that let any team automate with ease.',
    color: 'bg-electric-500/10',
  },
];

const stats = [
  { value: '30+', label: 'Years Combined Experience', icon: <Award size={18} /> },
  { value: '20+', label: 'QA Expertise (Years)', icon: <Shield size={18} /> },
  { value: '2024', label: 'Founded', icon: <Clock size={18} /> },
  { value: '∞', label: 'Ideas Brought to Life', icon: <TrendingUp size={18} /> },
];

export default function Home() {
  useScrollRevealAll();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center bg-hero-gradient overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-electric-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-0">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/8 border border-white/15 rounded-full px-4 py-2 mb-8 animate-fade-in">
              <Zap size={12} className="text-electric-400 fill-electric-400" />
              <span className="text-white/70 text-xs font-medium tracking-wide">ServEase Innovation & Technology</span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.08] mb-6 animate-fade-up">
              Empowering Your{' '}
              <span className="bg-gradient-to-r from-white via-electric-100 to-electric-300 bg-clip-text text-transparent">
                Digital Future
              </span>
            </h1>

            <p className="text-white/70 text-lg lg:text-xl leading-relaxed mb-10 max-w-xl animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Unleashing the potential of technology for your business. From software development to AI-powered automation — we build the tools that move you forward.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/contact" className="btn-primary text-base py-3.5 px-8">
                Get Started <ArrowRight size={18} />
              </Link>
              <Link to="/services" className="inline-flex items-center gap-2 border-2 border-white/30 text-white hover:border-white hover:bg-white/10 font-semibold px-8 py-3.5 rounded-full transition-all duration-200">
                Our Services <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce">
          <div className="w-5 h-9 border-2 border-white/20 rounded-full flex justify-center pt-1">
            <div className="w-1 h-2 bg-white/40 rounded-full" />
          </div>
        </div>
      </section>

      {/* About Strip */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <span className="section-label">
                <Zap size={12} className="fill-electric-500" /> About ServEase
              </span>
              <h2 className="section-title mb-6">
                We make your ideas{' '}
                <span className="gradient-text">work for you</span>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                Founded in 2024, ServEase Innovation & Technology has quickly established itself as a trusted partner for businesses worldwide. Our founders bring over 30 years of collective IT expertise, building solutions that are reliable, scalable, and human-centered.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                We believe technology should serve people — not the other way around. That's why every solution we deliver is tailored to meet the unique goals of each client.
              </p>
              <Link to="/who-we-are" className="btn-outline">
                Meet the Team <ArrowRight size={16} />
              </Link>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 reveal">
              {stats.map(({ value, label, icon }) => (
                <div key={label} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:border-electric-200 hover:shadow-sm transition-all duration-300">
                  <div className="flex items-center gap-2 text-electric-500 mb-3">
                    {icon}
                  </div>
                  <div className="font-display font-bold text-3xl text-navy-900 mb-1">{value}</div>
                  <div className="text-gray-500 text-sm">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <span className="section-label justify-center">
              <Code2 size={12} /> What We Do
            </span>
            <h2 className="section-title mb-4">
              Services built to <span className="gradient-text">scale with you</span>
            </h2>
            <p className="section-subtitle mx-auto text-center text-gray-500">
              From initial concept to live product, our team covers every layer of the technology stack.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon, title, desc, color }, i) => (
              <div
                key={title}
                className={`card p-6 group reveal`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center mb-4`}>
                  {icon}
                </div>
                <h3 className="font-display font-semibold text-navy-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{desc}</p>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 text-electric-500 text-sm font-medium hover:gap-2.5 transition-all duration-200"
                >
                  Learn more <ArrowRight size={14} />
                </Link>
              </div>
            ))}

            {/* CTA card */}
            <div className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-3xl p-6 flex flex-col justify-between reveal sm:col-span-2 lg:col-span-1" style={{ transitionDelay: `${services.length * 60}ms` }}>
              <div>
                <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                  <Star size={20} className="text-gold-400 fill-gold-400" />
                </div>
                <h3 className="font-display font-semibold text-white text-lg mb-2">Ready to transform?</h3>
                <p className="text-white/55 text-sm leading-relaxed mb-6">
                  Every great product starts with a conversation. Let's talk about yours.
                </p>
              </div>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-navy-900 font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-electric-300 transition-colors w-fit">
                Contact Us <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="text-center mt-10 reveal">
            <Link to="/services" className="btn-outline inline-flex">
              View All Services <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Product Teaser */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
            <div className="absolute top-0 right-0 w-72 h-72 bg-electric-500/20 rounded-full blur-3xl" />
            <div className="relative p-10 lg:p-16 grid lg:grid-cols-2 gap-12 items-center">
              <div className="reveal">
                <span className="section-label text-electric-400">
                  <Zap size={12} className="fill-electric-400" /> Our Product
                </span>
                <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4 leading-tight">
                  Introducing{' '}
                  <span className="bg-gradient-to-r from-electric-400 to-electric-200 bg-clip-text text-transparent">
                    ServEaso
                  </span>
                </h2>
                <p className="text-white/60 leading-relaxed mb-8">
                  A location-based home care service application launching in the Indian market. Connecting busy professionals, parents, and the elderly with trusted, vetted household help — maids, nannies, cooks, elderly care, and more.
                </p>
                <Link to="/product" className="inline-flex items-center gap-2 bg-white text-navy-900 font-semibold px-6 py-3 rounded-full hover:bg-electric-300 transition-colors">
                  Explore ServEaso <ArrowRight size={16} />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4 reveal">
                {['Maids', 'Baby Caregivers', 'Elderly Care', 'Cooks', 'Drivers', 'Patient Care'].map((item, i) => (
                  <div
                    key={item}
                    className="bg-white/8 border border-white/10 rounded-2xl px-4 py-3 text-white/70 text-sm font-medium hover:bg-white/15 hover:text-white transition-all duration-200 cursor-default"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}