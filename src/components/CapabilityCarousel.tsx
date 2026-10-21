import { useEffect, useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import renderBold from './renderBold';

interface CapabilityItem {
  benefit: string;
  context: string;
  description: string;
}

const CAPABILITY_DATA: CapabilityItem[] = [
  {
    benefit: 'Delivery 3 months ahead of schedule',
    context: 'Frontier AI Lab — AI for Tier 1 Investment Bank',
    description: 'Introduced Claude Code and applied AI to technology PM practices at a global tier 1 investment bank. Collaborated with the AI lab\'s FDEs to implement a complex prototype; trained staff and built agents to automate project processing, documentation, and reporting, completing the project 3 months early.'
  },
  {
    benefit: 'AI-driven delivery at enterprise scale',
    context: 'Technology Consultancy — Capability Building',
    description: 'Boosting clients\' technology capabilities to tackle complex or scale-up challenges. Established the company\'s product lab and **Hatstand**, a spec and AI-driven software development framework (SDLC) for large financial enterprises. Guiding clients in understanding and adopting AI, sharing insights from real-world deployments.'
  },
  {
    benefit: 'An AI product from concept to market',
    context: 'PropTech Start-up — AI Provenance & Scoring',
    description: 'Coaxing and coaching this AI-based provenance and scoring start-up for landlords and homeowners from concept to proof, to product.'
  },
  {
    benefit: '4,000+ people confident with Claude',
    context: 'AI Consultancy — Claude Training & AI Advisory',
    description: 'Part of a vetted AI talent pool, working on and sharing expertise on AI projects. Facilitating Anthropic Claude projects and workshops, training over 4,000 people in Claude, and helping clients identify best-value AI use cases.'
  },
  {
    benefit: 'A new healthcare service live in 5 months',
    context: 'Healthcare Start-up — Caribbean Telemedicine',
    description: 'Co-founding a telemedicine offering to the chronically under-served Caribbean region, starting in Barbados and spreading to Dominica, St Vincent and Guyana. Bootstrapped with a website plugging into various healthcare platforms. Launched in 5 months.'
  },
  {
    benefit: 'Confidence to scale, safely',
    context: 'Scale-up Telemedicine — Technology Function Assessment',
    description: 'An established telemedicine business was scaling up and the CEO needed an external assessment of the technology function to ensure it had what it needed to scale effectively and safely. A 3-month assessment of systems and people produced findings for the founders. The business went on to scale to meet NHS requirements and sold half the company to private equity.'
  },
  {
    benefit: 'Secure, scalable systems from day one',
    context: 'Financial Services Start-up — Multi-Family Office',
    description: 'Joined as employee #5 at this financial services startup. Established information architecture and procedures, including security and data governance. Ran selection for, and deployment of, a cutting-edge wealth advisor platform (D1g1t + FutureVault + Bloomberg). Established solid partnerships with vendors and transitioned the firm to best-in-class secure, scalable systems.'
  },
  {
    benefit: '60% lower IT costs and a successful exit',
    context: 'Global Consultancy — Sold to Fortune 1000 Firm',
    description: 'Led the technology function including outsourced IT, development and support teams for 3 core SaaS products and mobile apps serving 70+ clients including Walmart, Diageo, Heineken, and JP Morgan. Reduced IT costs by 60%, increased margins by 25%. Helped the CEO sell the business to a Fortune 1000 firm.'
  },
  {
    benefit: '$250,000+ saved every year',
    context: 'Caribbean Manufacturer — 17 International Markets',
    description: 'Oversaw all IT across this $50m turnover company operating in 17 international markets. Rescued a stalling ERP project, migrated IT to Google Cloud, re-negotiated international telecoms. Saved over $250,000 annually and delivered 20% YoY operational savings.'
  }
];

export default function CapabilityCarousel() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    const item = itemRefs.current[index];
    if (!track || !item) return;
    track.scrollTo({ left: item.offsetLeft - track.offsetLeft, behavior: 'smooth' });
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    let closestIndex = 0;
    let closestDistance = Infinity;

    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      const distance = Math.abs(item.offsetLeft - track.offsetLeft - track.scrollLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    // With several cards visible the track can't scroll the last ones to the start, so treat the end as the last card.
    const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
    setActiveIndex(atEnd ? CAPABILITY_DATA.length - 1 : closestIndex);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => track.removeEventListener('scroll', handleScroll);
  }, []);

  const step = (direction: number) => {
    const next = (activeIndex + direction + CAPABILITY_DATA.length) % CAPABILITY_DATA.length;
    scrollToIndex(next);
  };

  const arrowClasses = `
    hidden md:flex absolute top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center
    rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-lg text-primary-text
    hover:bg-white dark:hover:bg-gray-700 transition-colors
    focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary
  `;

  return (
    <div className="relative max-w-6xl mx-auto" role="region" aria-roledescription="carousel" aria-label="Examples of Adaptive capability">
      <button type="button" onClick={() => step(-1)} className={`${arrowClasses} -left-5`} aria-label="Previous example">
        <ChevronLeftIcon className="w-5 h-5" />
      </button>

      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {CAPABILITY_DATA.map((item, index) => (
          <div
            key={item.context}
            ref={el => itemRefs.current[index] = el}
            className="snap-start shrink-0 w-full md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${CAPABILITY_DATA.length}: ${item.benefit}`}
          >
            <div className="h-full flex flex-col bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <h3 className="font-heading text-xl mb-2 text-primary-text">
                {item.benefit}
              </h3>
              <p className="text-sm font-bold text-gray-900 dark:text-white mb-4">
                {item.context}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {renderBold(item.description)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button type="button" onClick={() => step(1)} className={`${arrowClasses} -right-5`} aria-label="Next example">
        <ChevronRightIcon className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {CAPABILITY_DATA.map((item, index) => (
          <button
            key={item.context}
            type="button"
            onClick={() => scrollToIndex(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === index ? 'w-8 bg-primary' : 'w-2.5 bg-gray-300 dark:bg-gray-600'}`}
            aria-label={`Show example ${index + 1}`}
            aria-current={activeIndex === index}
          />
        ))}
      </div>
    </div>
  );
}
