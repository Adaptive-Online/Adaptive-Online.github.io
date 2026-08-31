import { useEffect, useRef, useState } from 'react';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    year: 'Applied AI PM',
    title: 'Anthropic — AI for Tier 1 Investment Bank',
    description: 'Introduced Claude Code and applied AI to technology PM practices at a global tier 1 investment bank. Collaborated with Anthropic FDEs to implement a complex prototype; trained staff and built agents to automate project processing, documentation, and reporting, completing the project 3 months early.'
  },
  {
    year: 'Partner',
    title: 'Blue Hat Associates — Technology Capability',
    description: 'Specialising in boosting clients\' technology capabilities to tackle complex or scale-up challenges. Established the company\'s product lab; guiding clients in understanding and adopting AI, sharing insights from real-world deployments.'
  },
  {
    year: 'Founding CTO',
    title: 'VeriHome — AI & Blockchain Provenance',
    description: 'Coaxing and coaching this AI and blockchain-based provenance and scoring start-up for landlords and homeowners from concept to proof, to product.'
  },
  {
    year: 'Principal AI PM',
    title: 'Tribe AI — AI Collective',
    description: 'Part of the Tribe AI collective — a vetted talent pool working on and sharing expertise on AI projects. Facilitating Anthropic Claude projects and workshops, and helping clients identify best-value AI use cases.'
  },
  {
    year: 'Co-founder',
    title: 'Caribbean Mind & Hormone Clinic — Telemedicine',
    description: 'Co-founding a telemedicine offering to the chronically under-served Caribbean region, starting in Barbados and spreading to Dominica, St Vincent and Guyana. Bootstrapped with a website plugging into various healthcare platforms. Launched in 5 months.'
  },
  {
    year: 'Tech function assessment',
    title: 'Advising scale-up telemedicine business',
    description: 'An established telemedicine business was scaling up and the CEO needed an external assessment of the technology function to ensure it had what it needed to scale effectively and safely. There was a 3-month assessment of systems and people, and I reported findings back to the founders. They recently sold half the business to private equity, after successfully scaling to meet NHS requirements.'
  },
  {
    year: 'Chief Technology Officer',
    title: 'FigTree Financial Group — Multi-Family Office',
    description: 'Employee #5 at this financial services startup. Established information architecture and procedures, including security and data governance. Ran selection for, and deployment of, a cutting-edge wealth advisor platform (D1g1t + FutureVault + Bloomberg). Established solid partnerships with vendors and transitioned FigTree to best-in-class secure, scalable systems.'
  },
  {
    year: 'Chief Technology Officer',
    title: 'McKinney Rogers — Global Consultancy, sold to Fortune 1000',
    description: 'Led the technology function including outsourced IT, development and support teams for 3 core SaaS products and mobile apps serving 70+ clients including Walmart, Diageo, Heineken, and JP Morgan. Reduced IT costs by 60%, increased margins by 25%. Helped the CEO sell the business to GP Strategies.'
  },
  {
    year: 'VP Technology',
    title: 'Harris Paints Group — Caribbean Manufacturer',
    description: 'Oversaw all IT across this $50m turnover company operating in 17 international markets. Rescued a stalling ERP project, migrated IT to Google Cloud, re-negotiated international telecoms. Saved over $250,000 annually and delivered 20% YoY operational savings.'
  }
];

export default function Timeline() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRef = useRef<HTMLDivElement | null>(null);

  const updateDotPosition = (index: number) => {
    if (!dotRef.current || !timelineRef.current) return;
    const timelineRect = timelineRef.current.getBoundingClientRect();
    const currentItem = itemRefs.current[index];
    if (!currentItem) return;

    const itemRect = currentItem.getBoundingClientRect();
    const relativePosition = itemRect.top - timelineRect.top;
    dotRef.current.style.transform = `translateY(${relativePosition}px) translateX(-50%)`;
  };

  const handleScroll = () => {
    if (!timelineRef.current) return;
    const timelineRect = timelineRef.current.getBoundingClientRect();
    const viewportMiddle = window.innerHeight / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      const itemRect = item.getBoundingClientRect();
      const itemMiddle = itemRect.top + (itemRect.height / 2);
      const distance = Math.abs(itemMiddle - viewportMiddle);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
    updateDotPosition(closestIndex);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const TimelineItem = ({ item, index }: { item: TimelineItem; index: number }) => {
    const cardClasses = `
      bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm 
      rounded-lg p-6 shadow-lg transition-all duration-300
      ${activeIndex === index ? 'opacity-100 scale-105' : 'opacity-50 scale-100'}
    `;

    return (
      <div
        ref={el => itemRefs.current[index] = el}
        className="mb-24 last:mb-0"
      >
        <div className="flex items-start justify-center gap-8">
          {/* Left side: Year and Title */}
          <div className="w-60 text-right">
            <span className="text-xl font-bold text-primary block mb-2">
              {item.year}
            </span>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {item.title}
            </h3>
          </div>

          {/* Right side: Description */}
          <div className="w-1/2">
            <div className={cardClasses}>
              <p className="text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div ref={timelineRef} className="relative max-w-6xl mx-auto">
      {/* Center line */}
      <div className="absolute left-1/2 top-[20px] bottom-[20px] w-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2" />
      
      {/* Animated dot */}
      <div 
        ref={dotRef}
        className="absolute left-1/2 top-0 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 transition-transform duration-500 ease-in-out z-10"
      />

      {/* Timeline items */}
      <div className="relative">
        {TIMELINE_DATA.map((item, index) => (
          <TimelineItem key={item.year} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}
