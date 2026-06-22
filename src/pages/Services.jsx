import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Code2, Users, TestTube2, Globe, Bot, ArrowRight,
  CheckCircle2, Layers, Cpu, Rocket, Search, Palette,
  Settings, GitBranch, Database
} from 'lucide-react';
import { useScrollRevealAll } from '../hooks/useScrollReveal';

const sdlcStages = ['Ideation', 'Validation', 'Prototyping', 'Development', 'Testing', 'Launch', 'Improvement'];

const automationFrameworks = [
  { icon: <GitBranch size={14} />, label: 'TDD — JUnit, TestNG' },
  { icon: <Layers size={14} />, label: 'BDD — Cucumber, JBehave, Serenity' },
  { icon: <Cpu size={14} />, label: 'Page Object Model' },
  { icon: <Settings size={14} />, label: 'Keyword Driven Framework' },
  { icon: <Database size={14} />, label: 'Data Driven Framework' },
  { icon: <Code2 size={14} />, label: 'API Framework' },
  { icon: <Database size={14} />, label: 'Backend / ETL Framework' },
  { icon: <Layers size={14} />, label: 'Hybrid Framework' },
];

const services = [
  {
    id: 'product-dev',
    icon: <Code2 size={28} />,
    color: 'from-electric-600 to-electric-400',
    bg: 'bg-electric-500/8',
    accent: 'text-electric-600',
    label: 'Product Development',
    headline: 'From idea to market — every step covered',
    body: `Product development is the process of taking a product from an idea through its market release and beyond: planning, analysis, design, implementation, testing, deployment, and maintenance. Each stage plays a crucial role in ensuring the product meets the needs of its intended users and performs reliably.`,
    steps: [
      { name: 'Planning', desc: 'Define concept, identify target markets, establish resources and timelines.' },
      { name: 'Analysis', desc: 'Gather detailed requirements, understand user needs, and align with stakeholders.' },
      { name: 'Design', desc: 'Outline architecture, UI, and system components. Create prototypes for early feedback.' },
      { name: 'Implementation', desc: 'Write code, integrate components, and build according to design specs.' },
      { name: 'Testing', desc: 'Rigorous functional and non-functional testing to identify and fix issues.' },
      { name: 'Deployment', desc: 'Launch to market with beta testing options before full-scale release.' },
      { name: 'Maintenance', desc: 'Ongoing support, updates, and new features to keep your product competitive.' },
    ],
  },
  {
    id: 'it-staffing',
    icon: <Users size={28} />,
    color: 'from-electric-500 to-electric-300',
    bg: 'bg-electric-500/8',
    accent: 'text-electric-600',
    label: 'IT Staffing',
    headline: 'The right talent, exactly when you need it',
    body: `IT staffing has become essential in today's competitive landscape. By partnering with us, businesses gain access to a pool of highly skilled professionals tailored to their specific needs — from temporary and contract positions to full-time placements and executive searches.`,
    bullets: [
      'Temporary, contract, and full-time placements',
      'Scale workforce up or down by project requirements',
      'Strategic long-term IT workforce planning',
      'Consulting services beyond mere recruitment',
      'Tech startups and enterprise solutions',
    ],
  },
  {
    id: 'qa-testing',
    icon: <TestTube2 size={28} />,
    color: 'from-electric-600 to-electric-400',
    bg: 'bg-electric-500/8',
    accent: 'text-electric-600',
    label: 'QA & Testing Services',
    headline: '20+ years ensuring nothing ships broken',
    body: `Quality assurance, testing, and automation are integral to the SDLC — guaranteeing that products meet stringent quality and performance standards before reaching end-users. Our QA team covers functional, performance, security, and usability testing across the full spectrum.`,
    bullets: [
      'Functional & non-functional testing',
      'Performance & load testing',
      'Security and usability audits',
      'Early-stage risk mitigation',
      'Cost reduction through early defect detection',
    ],
  },
  {
    id: 'web-design',
    icon: <Palette size={28} />,
    color: 'from-electric-500 to-electric-300',
    bg: 'bg-electric-500/8',
    accent: 'text-electric-600',
    label: 'Web Design',
    headline: 'Beautiful, accessible, responsive experiences',
    body: `Web design is a dynamic field that blends creativity with technology. We create visually appealing and functional websites that provide an optimal user experience — considering layout, color schemes, typography, and imagery to harmoniously convey your brand identity. Accessibility and responsive design are not afterthoughts; they're built in from the start.`,
    bullets: [
      'Responsive design for all devices',
      'Accessibility-first approach (WCAG)',
      'Brand identity integration',
      'Performance-optimized builds',
      'Dedicated design and development team',
    ],
  },
  {
    id: 'automation',
    icon: <Bot size={28} />,
    color: 'from-electric-600 to-electric-400',
    bg: 'bg-electric-500/8',
    accent: 'text-electric-600',
    label: 'Automation Development',
    headline: 'Gen AI-powered automation any team can run',
    body: `Our award-winning codeless automation framework enables Business Analysts and Manual Testers to automate without writing code. We've integrated Gen AI to generate BDD feature files automatically, making automation faster and more accessible than ever.`,
    frameworks: true,
  },
];

export default function Services() {
  useScrollRevealAll();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-navy-900 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-electric-500/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <span className="section-label text-electric-400 justify-start">
            <Rocket size={12} /> Services
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight max-w-2xl">
            Technology services <span className="bg-gradient-to-r from-electric-300 to-electric-100 bg-clip-text text-transparent">for every stage</span>
          </h1>
          <p className="text-white/55 text-lg max-w-xl leading-relaxed">
            From product development to automated testing, our end-to-end services help you build, ship, and scale with confidence.
          </p>
        </div>
      </section>

      {/* SDLC Banner */}
      <section className="bg-gray-50 py-10 border-b border-gray-200 overflow-x-auto reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 min-w-max mx-auto justify-center flex-wrap">
            {sdlcStages.map((stage, i) => (
              <div key={stage} className="flex items-center gap-2">
                <span className="bg-white border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-full shadow-sm whitespace-nowrap">
                  {stage}
                </span>
                {i < sdlcStages.length - 1 && (
                  <ArrowRight size={14} className="text-gray-300 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Sections */}
      <div className="bg-white">
        {services.map((svc, idx) => (
          <section
            key={svc.id}
            id={svc.id}
            className={`py-20 lg:py-28 ${idx % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`grid lg:grid-cols-2 gap-16 items-start ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`reveal ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className={`w-14 h-14 bg-gradient-to-br ${svc.color} rounded-2xl flex items-center justify-center text-white shadow-lg mb-6`}>
                    {svc.icon}
                  </div>
                  <span className={`section-label ${svc.accent}`}>
                    {svc.label}
                  </span>
                  <h2 className="section-title mb-5">{svc.headline}</h2>
                  <p className="text-gray-500 leading-relaxed mb-8">{svc.body}</p>

                  {svc.bullets && (
                    <ul className="space-y-3">
                      {svc.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-gray-600">
                          <CheckCircle2 size={16} className={`${svc.accent} shrink-0 mt-0.5`} />
                          <span className="text-sm">{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {svc.frameworks && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {automationFrameworks.map((fw) => (
                        <div key={fw.label} className="flex items-center gap-2.5 bg-electric-50 text-electric-800 text-sm px-3 py-2.5 rounded-2xl border border-electric-100">
                          <span className="text-electric-500">{fw.icon}</span>
                          {fw.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Visual side */}
                <div className={`reveal ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  {svc.steps ? (
                    <div className="space-y-3">
                      {svc.steps.map((step, i) => (
                        <div
                          key={step.name}
                          className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-electric-200 hover:shadow-sm transition-all duration-200 group"
                        >
                          <div className="w-7 h-7 bg-electric-500/10 rounded-lg flex items-center justify-center shrink-0 font-mono text-electric-500 text-xs font-bold group-hover:bg-electric-500 group-hover:text-white transition-all">
                            {String(i + 1).padStart(2, '0')}
                          </div>
                          <div>
                            <div className="font-semibold text-navy-900 text-sm mb-0.5">{step.name}</div>
                            <div className="text-gray-500 text-sm leading-relaxed">{step.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={`${svc.bg} rounded-3xl p-8 lg:p-10 flex flex-col gap-4`}>
                      <div className="font-display font-bold text-navy-900 text-2xl mb-2">{svc.label}</div>
                      <div className="w-12 h-1 bg-gradient-to-r from-electric-600 to-electric-300 rounded-full mb-4" />
                      <p className="text-gray-600 leading-relaxed text-sm">{svc.body}</p>
                      <Link to="/contact" className="mt-4 btn-primary self-start text-sm">
                        Get a Quote <ArrowRight size={14} />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="bg-navy-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
            Not sure which service fits?
          </h2>
          <p className="text-white/55 mb-8 leading-relaxed">
            Book a free consultation and we'll map your needs to the right solution.
          </p>
          <Link to="/contact" className="btn-primary text-base py-3.5 px-8 inline-flex">
            Book a Free Consultation <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}