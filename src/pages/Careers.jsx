import { useState } from 'react';
import {
  Briefcase, MapPin, Mail, ChevronDown,
  CheckCircle2, Star, Users2, Zap, Clock
} from 'lucide-react';
import { useScrollRevealAll } from '../hooks/useScrollReveal';
import SplitText from '../components/SplitText';

const responsibilities = [
  'Develop and execute marketing strategies aligned with overall business objectives.',
  'Lead and manage marketing campaigns from concept to execution and analysis.',
  'Collaborate with cross-functional teams to ensure brand consistency.',
  'Analyse market trends and customer insights to identify growth opportunities.',
  'Manage social media platforms, enhancing engagement and increasing brand awareness.',
  'Track performance of all marketing campaigns and assess ROI and KPIs.',
  'Prepare and manage the marketing budget.',
  'Organize and attend promotional events and conferences.',
];

const requirements = [
  "Bachelor's degree in Marketing, Business Administration or relevant field.",
  'Proven track record in developing effective marketing strategies and campaigns.',
  'Strong analytical skills to forecast and identify trends and challenges.',
  'Excellent communication and interpersonal skills.',
  'Familiarity with CRM software and digital marketing tools and techniques.',
  'Ability to lead and inspire a team.',
];

const perks = [
  { icon: <Zap size={18} />, label: 'Innovation-led culture' },
  { icon: <Users2 size={18} />, label: 'Collaborative team' },
  { icon: <Star size={18} />, label: 'Growth opportunities' },
  { icon: <Clock size={18} />, label: 'Flexible work environment' },
];

function JobCard({ job }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card reveal overflow-hidden">
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-5">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-electric-500/10 text-electric-600 text-xs font-semibold px-3 py-1 rounded-full border border-electric-200">
                {job.type}
              </span>
              <span className="bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full border border-amber-200">
                {job.category}
              </span>
            </div>
            <h3 className="font-display font-bold text-navy-900 text-xl mb-1">{job.title}</h3>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <MapPin size={13} className="text-electric-500" />
                {job.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase size={13} className="text-electric-500" />
                {job.dept}
              </span>
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 text-sm font-medium text-electric-500 hover:text-electric-400 transition-colors shrink-0"
          >
            {expanded ? 'Show Less' : 'Show More'}
            {expanded ? <ChevronDown size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed">{job.summary}</p>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-gray-100 p-6 lg:p-8 bg-gray-50/50">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-navy-900 mb-4 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-electric-500" />
                Responsibilities
              </h4>
              <ul className="space-y-3">
                {responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-electric-500 rounded-full shrink-0 mt-1.5" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-navy-900 mb-4 flex items-center gap-2">
                <Star size={16} className="text-amber-500" />
                Requirements
              </h4>
              <ul className="space-y-3">
                {requirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0 mt-1.5" />
                    {r}
                  </li>
                ))}
              </ul>

              <div className="mt-8 bg-electric-50 border border-electric-200 rounded-2xl p-5">
                <p className="text-electric-800 text-sm font-medium mb-3">Ready to apply?</p>
                <p className="text-electric-700/70 text-sm mb-4">
                  Share your resume. Shortlisted candidates will be contacted by our HR team.
                </p>
                <a
                  href="mailto:hr@serveaseinnovation.com"
                  className="inline-flex items-center gap-2 bg-electric-500 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-electric-400 transition-colors"
                >
                  <Mail size={14} />
                  hr@serveaseinnovation.com
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const jobs = [
  {
    title: 'Digital Marketing Manager',
    type: 'Full-Time',
    category: 'Non-Tech',
    dept: 'Marketing',
    location: 'Bangalore, India & Dubai, UAE',
    summary:
      "We're looking for a flexible and versatile marketer who will set up the marketing strategies for our product ServEaso — a location-based home care service in India and Dubai. If you live and breathe marketing, we need to talk.",
  },
];

export default function Careers() {
  useScrollRevealAll();

  return (
    <div className="min-h-screen">
      {/* Hero — plain #082f49 background, no animation */}
      <section className="pt-32 pb-20 relative overflow-hidden" style={{ backgroundColor: '#082f49' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="section-label text-electric-400">
            <Briefcase size={12} /> Careers
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight max-w-2xl">
            We are{' '}
            <span className="bg-gradient-to-r from-electric-300 to-electric-100 bg-clip-text text-transparent">
              hiring
            </span>
          </h1>
          <p className="text-white/55 text-lg max-w-xl leading-relaxed">
            Join a team of forward-thinkers building technology that makes a real difference — in homes, businesses, and communities.
          </p>
        </div>
      </section>

      {/* Perks */}
      <section className="bg-white py-14 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {perks.map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-gray-600 reveal">
                <div className="w-9 h-9 bg-electric-50 border border-electric-100 rounded-2xl flex items-center justify-center text-electric-500 shrink-0">
                  {icon}
                </div>
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="section-label">
              <Briefcase size={12} /> Open Positions
            </span>
            <SplitText
              text="Find your next opportunity"
              tag="h2"
              className="section-title mb-4"
              delay={40}
              duration={0.7}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 36 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-60px"
              textAlign="left"
            />
            <SplitText
              text="We're a growing team with ambitions to transform everyday lives. Here's where you fit in."
              tag="p"
              className="text-gray-500"
              delay={18}
              duration={0.6}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-40px"
              textAlign="left"
            />
          </div>

          <div className="space-y-6">
            {jobs.map((job) => (
              <JobCard key={job.title} job={job} />
            ))}
          </div>

          {/* General application */}
          <div className="mt-10 bg-gradient-to-br from-navy-900 to-navy-800 rounded-2xl p-6 lg:p-8 relative overflow-hidden reveal">
            <div className="absolute top-0 right-0 w-48 h-48 bg-electric-500/10 rounded-full blur-2xl" />
            <div className="relative">
              <SplitText
                text="Don't see a role that fits?"
                tag="h3"
                className="font-display font-semibold text-white text-lg mb-2"
                delay={35}
                duration={0.6}
                ease="power3.out"
                splitType="words"
                from={{ opacity: 0, y: 24 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-40px"
                textAlign="left"
              />
              <SplitText
                text="We're always looking for talented people. Send us your resume and tell us where you'd add value."
                tag="p"
                className="text-white/55 text-sm mb-5 max-w-md"
                delay={14}
                duration={0.55}
                ease="power3.out"
                splitType="words"
                from={{ opacity: 0, y: 18 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-40px"
                textAlign="left"
              />
              <a
                href="mailto:hr@serveaseinnovation.com"
                className="inline-flex items-center gap-2 bg-white text-navy-900 font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-electric-300 transition-colors"
              >
                <Mail size={14} />
                Send Open Application
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}