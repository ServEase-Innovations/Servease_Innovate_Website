import { Link } from 'react-router-dom';
import {
  Zap, ArrowRight, Heart, Globe2, Users2, Lightbulb,
  Target, Handshake, TrendingUp, BookOpen, Briefcase
} from 'lucide-react';
import { useScrollRevealAll } from '../hooks/useScrollReveal';

const values = [
  {
    icon: <Lightbulb size={22} />,
    color: 'from-amber-400 to-orange-500',
    bg: 'bg-amber-50',
    title: 'Innovation First',
    desc: 'We strive to create a collaborative environment where creativity flourishes and groundbreaking solutions emerge. Every project is driven by a passion for excellence.',
  },
  {
    icon: <Handshake size={22} />,
    color: 'from-electric-500 to-purple-600',
    bg: 'bg-electric-50',
    title: 'Partnership Over Transaction',
    desc: "We believe in the power of partnership. By fostering open communication and building strong relationships, every solution is tailored to meet your specific goals.",
  },
  {
    icon: <Heart size={22} />,
    color: 'from-rose-400 to-pink-600',
    bg: 'bg-rose-50',
    title: 'Community Impact',
    desc: 'Through our CSR initiatives, we help lower-to-middle class citizens find employment based on their interests, supporting education, volunteering, and diversity.',
  },
  {
    icon: <Globe2 size={22} />,
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    title: 'Sustainable Future',
    desc: 'We remain dedicated to making a positive impact — through sustainable practices, community engagement, and cutting-edge technology for a brighter, inclusive world.',
  },
];

const processSteps = [
  { step: '01', title: 'Understand', desc: "We start by deeply understanding your requirements, challenges, and aspirations." },
  { step: '02', title: 'Prototype', desc: "We build a working prototype to validate concepts before full development begins." },
  { step: '03', title: 'Build & Test', desc: "Our engineers build with quality in mind, backed by rigorous testing at every stage." },
  { step: '04', title: 'Deploy & Support', desc: "We deploy your solution and provide ongoing maintenance, updates, and support." },
];

const expertise = [
  { icon: <Briefcase size={16} />, label: 'Software Development' },
  { icon: <Globe2 size={16} />, label: 'Web Design' },
  { icon: <TrendingUp size={16} />, label: 'Cloud Computing' },
  { icon: <Target size={16} />, label: 'Cybersecurity' },
  { icon: <BookOpen size={16} />, label: 'QA & Automation' },
  { icon: <Users2 size={16} />, label: 'IT Staffing' },
];

export default function WhoWeAre() {
  useScrollRevealAll();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-navy-900 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-electric-500/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <span className="section-label text-electric-400">
            <Users2 size={12} /> Who We Are
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight max-w-2xl">
            We innovate for{' '}
            <span className="bg-gradient-to-r from-electric-400 to-purple-400 bg-clip-text text-transparent">
              better lives
            </span>
          </h1>
          <p className="text-white/55 text-lg max-w-xl leading-relaxed">
            Founded in 2024, ServEase Innovation & Technology is built on the belief that technology should serve people — and make their lives meaningfully better.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            <div className="reveal bg-gradient-to-br from-navy-900 to-navy-800 rounded-3xl p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-electric-500/10 rounded-full blur-2xl" />
              <div className="relative">
                <div className="w-12 h-12 bg-electric-500/20 rounded-xl flex items-center justify-center text-electric-400 mb-5">
                  <Target size={22} />
                </div>
                <h2 className="text-2xl font-display font-bold text-white mb-4">Our Mission</h2>
                <p className="text-white/60 leading-relaxed">
                  To help businesses grow by providing innovative IT solutions. We strive to deliver the highest quality products and services that exceed our clients' expectations — while making a positive impact on the communities we serve.
                </p>
              </div>
            </div>

            <div className="reveal bg-gradient-to-br from-electric-500/8 to-purple-500/8 rounded-3xl p-8 lg:p-10 border border-electric-100">
              <div className="w-12 h-12 bg-electric-500/15 rounded-xl flex items-center justify-center text-electric-500 mb-5">
                <Globe2 size={22} />
              </div>
              <h2 className="text-2xl font-display font-bold text-navy-900 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                Building inclusive communities through technology. Our company prioritizes Corporate Social Responsibility by developing solutions that enable lower-to-middle class citizens to find meaningful work, supporting education, promoting diversity, and adopting ethical business practices.
              </p>
            </div>
          </div>

          {/* About content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <span className="section-label">
                <Zap size={12} className="fill-electric-500" /> Our Story
              </span>
              <h2 className="section-title mb-6">
                Ideas. Innovation.{' '}
                <span className="gradient-text">Implementation.</span>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-5">
                ServEase Innovation & Technology creates a future where creativity knows no bounds. Our collaborative environment nurtures your vision, providing the tools and support necessary to bring groundbreaking concepts to life.
              </p>
              <p className="text-gray-500 leading-relaxed mb-5">
                Together, we can transform industries, improve lives, and make a lasting impact — whether you're an entrepreneur with a bold startup or an established business looking to stay ahead of the curve.
              </p>
              <p className="text-gray-500 leading-relaxed">
                Ideas, innovation, and implementation are more than just new technological inventions. We drive innovation focused on people, innovators, and business.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 reveal">
              <div className="col-span-2 bg-navy-900 rounded-2xl p-6">
                <p className="text-white/80 text-sm leading-relaxed italic">
                  "Join our community of forward-thinkers and change-makers. Let's push the boundaries of what's possible and build a better tomorrow, today."
                </p>
              </div>
              {[
                { label: 'Founded', value: '2024' },
                { label: 'Team', value: '20+' },
                { label: 'Experience', value: '30+ yrs' },
                { label: 'Locations', value: '2 Cities' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <div className="font-display font-bold text-2xl text-navy-900 mb-1">{value}</div>
                  <div className="text-gray-500 text-sm">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <span className="section-label justify-center">
              <Heart size={12} /> Core Values
            </span>
            <h2 className="section-title mb-4">
              What drives <span className="gradient-text">everything we do</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon, color, bg, title, desc }, i) => (
              <div
                key={title}
                className="card p-6 reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center text-white mb-4 shadow-md`}>
                  {icon}
                </div>
                <h3 className="font-display font-semibold text-navy-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <span className="section-label justify-center">
              <Target size={12} /> Our Process
            </span>
            <h2 className="section-title mb-4">
              How we <span className="gradient-text">deliver results</span>
            </h2>
            <p className="section-subtitle mx-auto text-center text-gray-500">
              A streamlined, collaborative process to deliver customized IT solutions.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map(({ step, title, desc }, i) => (
              <div key={step} className="relative reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="card p-6 h-full">
                  <div className="font-mono text-4xl font-bold text-electric-500/20 mb-3">{step}</div>
                  <h3 className="font-display font-semibold text-navy-900 mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
                {i < processSteps.length - 1 && (
                  <ArrowRight
                    size={16}
                    className="hidden lg:block absolute top-1/2 -right-3 text-electric-300 z-10 -translate-y-1/2"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="bg-navy-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <span className="section-label text-electric-400">
                <Briefcase size={12} /> Our Expertise
              </span>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
                Skilled across the full technology stack
              </h2>
              <p className="text-white/55 leading-relaxed mb-8">
                Our team comprises highly skilled professionals with expertise in diverse areas of IT. We stay current with the latest trends and technologies to deliver the best solutions.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-navy-900 font-semibold px-6 py-3 rounded-xl hover:bg-electric-300 transition-colors">
                Work With Us <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 reveal">
              {expertise.map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-white/70 hover:text-white hover:bg-white/15 transition-all duration-200"
                >
                  <span className="text-electric-400">{icon}</span>
                  <span className="text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
