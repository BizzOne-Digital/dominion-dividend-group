import type {
  AboutContent, BusinessModelPage, BusinessSection, ContactContent, HomeContent, SeedRoundSettings, SiteSettings,
} from '../validation'

const u = (id: string, w = 2000) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const IMAGES = {
  heroMountain: u('1464822759023-fed622ff2c3b', 2400),
  mountainsClouds: u('1506905925346-21bda4d32df4'),
  mountainsNight: u('1519681393784-d120267933ba'),
  architecture: u('1486406146926-c627a92ad1ab', 1600),
  documents: u('1454165804606-c3d57bc86b40', 1600),
}

export const DEFAULT_MISSION =
  'To build the institutional foundation necessary to support responsible long-term growth, professional governance, disciplined capital stewardship, financial accountability, risk management, and future investment-management operations.'

export const DEFAULT_LEGAL_DISCLAIMER =
  'Dominion Dividend Group Management Company is currently under development. Nothing on this website should be interpreted as an offer, solicitation, investment recommendation, or representation that regulated investment-management services are currently available.'

export const defaultSiteSettings: SiteSettings = {
  companyName: 'Dominion Dividend Group Management Company',
  shortName: 'Dominion Dividend Group',
  tagline: 'Discipline · Diversification · Growth',
  logoUrl: '',
  faviconUrl: '',
  email: 'info@dominiondividendgroup.com',
  phone: '',
  linkedinUrl: '',
  footerText:
    'Building the governance, operational infrastructure, and organizational foundation for a future long-term, dividend-focused investment-management platform.',
  legalDisclaimer: DEFAULT_LEGAL_DISCLAIMER,
  socialLinks: [],
}

export const defaultHome: HomeContent = {
  heroTitle: 'Building the Foundation for Institutional Investment Management',
  heroDescription:
    'Dominion Dividend Group Management Company is currently in a pre-launch and development stage, focused on establishing the corporate governance, operational infrastructure, financial administration, compliance readiness, and organizational foundation required to support future long-term investment-management operations.',
  heroImageUrl: IMAGES.heroMountain,
  primaryCtaText: 'Learn More',
  primaryCtaUrl: '/about',
  secondaryCtaText: 'Our Business Model',
  secondaryCtaUrl: '/business-model',
  missionLabel: 'Overview',
  missionHeading: 'Our Mission',
  missionText: DEFAULT_MISSION,
  pillarsLabel: 'Our Core Pillars',
  pillars: [
    { title: 'Governance', description: 'Disciplined executive oversight, accountability, and structured corporate governance.', icon: 'landmark' },
    { title: 'Operations', description: 'Scalable administrative and operational infrastructure designed for professional execution.', icon: 'settings' },
    { title: 'Compliance Readiness', description: 'Coordination of legal, accounting, regulatory, risk, and compliance preparation.', icon: 'shield-check' },
    { title: 'Long-Term Growth', description: 'Building a stable institutional foundation intended to support sustainable organizational development.', icon: 'trending-up' },
  ],
  businessLabel: 'Our Business Model',
  businessHeading: 'A Disciplined, Scalable Institutional Platform',
  businessCards: [
    { title: 'Corporate Development & Governance', description: 'Developing the executive structure, governance systems, financial controls, and administrative framework required for the Management Company.', icon: 'coins' },
    { title: 'Institutional Infrastructure', description: 'Designing operational systems for financial administration, reporting, risk oversight, technology, and future investment operations.', icon: 'layers' },
    { title: 'Sustainable Organizational Development', description: 'Establishing a measured, professionally governed foundation intended to support long-term organizational growth.', icon: 'sprout' },
  ],
  seedLabel: 'Seed Round 1',
  seedHeading: 'Proposed Corporate Financing',
  seedNoticeTitle: 'Draft Notice — Proposed C$5 Million Corporate Seed Financing',
  seedDescription:
    'Dominion Dividend Group Management Company is preparing a proposed C$5 million corporate seed financing initiative intended to support corporate establishment, professional staffing, legal and regulatory work, technology infrastructure, financial administration, and initial operating capabilities.',
  seedLegalNote:
    'This information is presented as a development-stage draft and remains subject to appropriate Canadian securities counsel review and Founder authorization before publication.',
  seedCtaText: 'Learn About Seed Round 1',
  approachLabel: 'Our Approach',
  approachHeading: 'Discipline. Diversification. Growth.',
  approachText:
    'Institutions that last are built deliberately. Our approach places structure before scale: governance, controls, and professional standards are established first, so that any future activity rests on a foundation designed to endure.',
  principles: [
    { title: 'Discipline', description: 'Clear policies, defined responsibilities, and consistent decision-making processes applied at every level of the organization.', icon: 'scale' },
    { title: 'Diversification', description: 'A balanced organizational design that avoids concentration of risk, authority, or dependency on any single function.', icon: 'network' },
    { title: 'Growth', description: 'Measured, sustainable development, pursued only when the governance and infrastructure to support it are in place.', icon: 'trending-up' },
  ],
  roadmapLabel: 'Development Roadmap',
  roadmapHeading: 'A Phased Path to Institutional Readiness',
  roadmapIntro:
    'Development is organized into sequential phases. Each phase is intended to be substantially complete before the next begins. Timing and scope remain subject to professional advice and regulatory requirements.',
  roadmap: [
    { phase: 'Phase 1', title: 'Corporate Foundation', description: 'Corporate formation, executive structure, governance framework, and core administrative policies.', status: 'In Progress' },
    { phase: 'Phase 2', title: 'Professional & Compliance Readiness', description: 'Engagement of legal, securities, accounting, and compliance professionals to define regulatory requirements.', status: 'Planned' },
    { phase: 'Phase 3', title: 'Operational Infrastructure', description: 'Financial administration, reporting, recordkeeping, technology, cybersecurity, and professional staffing.', status: 'Planned' },
    { phase: 'Phase 4', title: 'Future Operations', description: 'Consideration of future investment-management operations, only after all applicable approvals and requirements are met.', status: 'Future' },
  ],
  commitmentsLabel: 'Our Commitments',
  commitmentsHeading: 'Standards We Intend to Uphold',
  commitmentsText:
    'Trust is earned through conduct, not claims. These commitments guide how the organization is being built and how it intends to operate.',
  commitments: [
    'Transparency in how the organization is governed and developed',
    'Accountability through clear oversight and documented controls',
    'Compliance with all applicable Canadian legal and regulatory requirements',
    'Prudent financial stewardship and responsible use of corporate resources',
    'Independent professional advice on legal, accounting, and regulatory matters',
    'A long-term perspective over short-term outcomes',
  ],
  commitmentsImageUrl: IMAGES.architecture,
  ctaHeading: 'Interested in Our Development?',
  ctaText:
    'We welcome inquiries from professionals, advisors, and organizations interested in the corporate development of Dominion Dividend Group. All conversations are held by appointment.',
  ctaButtonText: 'Request Information',
  ctaButtonUrl: '/contact',
  sections: {
    mission: true, pillars: true, businessModel: true, seedRound: true,
    approach: true, roadmap: true, commitments: true, cta: true,
  },
}

export const defaultAbout: AboutContent = {
  heroLabel: 'About Dominion Dividend Group',
  heroTitle: 'Building an Institutional Foundation for Long-Term Development',
  heroIntro:
    'A development-stage organization focused on governance, operational discipline, and the professional infrastructure required for future investment-management operations.',
  heroImageUrl: IMAGES.mountainsClouds,
  whoWeAreTitle: 'Who We Are',
  whoWeAreText:
    'Dominion Dividend Group Management Company Inc. is a proposed Canadian corporation being developed to establish the corporate, operational, governance, financial, compliance, and technology infrastructure for a future investment-management organization.',
  statusNote: 'The organization is currently in its pre-launch development and pre-incorporation stage.',
  whoWeAreImageUrl: IMAGES.architecture,
  missionTitle: 'Our Mission',
  missionText: DEFAULT_MISSION,
  visionTitle: 'Our Vision',
  visionIntro: 'To build an institution centered on the principles that sustain organizations over decades, not quarters.',
  visionItems: [
    'Disciplined capital stewardship',
    'Professional governance',
    'Financial accountability',
    'Risk management',
    'Institutional-quality operations',
    'Long-term sustainability',
  ],
  frameworkTitle: 'Development Framework',
  frameworkIntro: 'The core areas being developed to establish a professionally governed Management Company.',
  frameworkItems: [
    { title: 'Executive Leadership', description: 'Defining executive roles, responsibilities, and decision-making authority.', icon: 'briefcase' },
    { title: 'Corporate Governance', description: 'Board-level oversight, policies, and accountability structures.', icon: 'landmark' },
    { title: 'Financial Administration', description: 'Budgeting, accounting, controls, and financial reporting frameworks.', icon: 'wallet' },
    { title: 'Compliance Coordination', description: 'Working with legal, accounting, and regulatory professionals on readiness.', icon: 'shield-check' },
    { title: 'Technology Infrastructure', description: 'Secure systems for records, reporting, and cybersecurity.', icon: 'server' },
    { title: 'Personnel Development', description: 'Recruiting and developing a professional, accountable team.', icon: 'users' },
    { title: 'Operational Oversight', description: 'Processes and controls for consistent, reviewable execution.', icon: 'clipboard-check' },
  ],
  initiativesTitle: 'Future Initiatives',
  initiatives: [
    { title: 'Dominion Dividend Group Capital', description: 'A proposed future investment-management operation being developed around a structured capital-allocation philosophy.' },
    { title: 'DDG University', description: 'A planned future educational initiative intended to support the development of future investment operators.' },
  ],
  initiativesDisclaimer:
    'These initiatives are under development and should not be interpreted as currently operating regulated businesses.',
  initiativesImageUrl: IMAGES.mountainsNight,
  shareStructureVisible: true,
  shareStructureTitle: 'Share Structure — Dominion Dividend Group Management Company Inc.',
  shareStructureRows: [
    { label: 'Six classes of shares', value: 'Class A (Founder) · Class B (Seed Round 1) · Class C (Seed Round 2) · Class D (Ordinary) · Class E (Seed Round 1 successor) · Class F (Seed Round 2 successor)' },
    { label: 'Voting rights per share', value: 'A — 10 · B — 8 · C — 5 · D, E, F — 1' },
    { label: 'Dividend and surplus participation weights', value: 'A — 4 · B and E — 3 · C and F — 1.5 · D — 1' },
    { label: 'Designed ownership on completion of Seed Round 2', value: 'Founder 56.7% · Seed Round 1 investors 33.3% · Seed Round 2 investors 10.0%' },
  ],
}

export const defaultContact: ContactContent = {
  heading: 'Contact Dominion Dividend Group',
  intro:
    'For corporate, professional services, or development-related inquiries, please submit the form below. A member of the team will respond by appointment.',
  businessName: 'Dominion Dividend Group Management Company Inc.',
  statusNote: 'Proposed corporate name — incorporation pending',
  email: 'info@dominiondividendgroup.com',
  phone: '',
  showPhone: false,
  location: 'Ontario, Canada',
  businessHours: 'By appointment',
  inquiryCategories: [
    'General Corporate Inquiry',
    'Corporate Development',
    'Professional Services',
    'Seed Round 1 Information Request',
    'Other',
  ],
}

export const defaultBusinessPage: BusinessModelPage = {
  heading: 'Our Business Model',
  subheading: 'Developing the Infrastructure Required for Professional Investment Operations',
  intro:
    'Our development framework is organized around the corporate, operational, financial, and compliance capabilities a professionally governed Management Company requires before any future regulated activity may begin.',
  heroImageUrl: IMAGES.mountainsNight,
  disclaimer:
    "All activities described represent the company's intended development framework. They should not be interpreted as representations that regulated investment-management services are currently available.",
}

export const defaultBusinessSections: BusinessSection[] = [
  {
    title: 'Corporate Development & Governance',
    description: 'Developing organizational structure, executive governance, financial controls, administrative procedures, and institutional policies.',
    icon: 'landmark', imageUrl: '', bullets: [], visible: true, order: 0,
  },
  {
    title: 'Investment Operations Infrastructure',
    description: 'Designing operational and administrative systems intended to support future professionally managed investment activities, portfolio reporting, recordkeeping, risk oversight, and investment operations.',
    icon: 'layers', imageUrl: '', bullets: [], visible: true, order: 1,
  },
  {
    title: 'Financial Administration & Corporate Treasury',
    description: 'Establishing budgeting, accounting, payroll, financial reporting, treasury management, expense controls, and corporate operating-reserve frameworks.',
    icon: 'wallet', imageUrl: '', bullets: [], visible: true, order: 2,
  },
  {
    title: 'Legal, Regulatory & Compliance Readiness',
    description: 'Coordinating professional legal, securities, accounting, regulatory, and compliance work required before future regulated operations may begin.',
    icon: 'scale', imageUrl: '', bullets: [], visible: true, order: 3,
  },
  {
    title: 'Professional Development & Operator Training',
    description: 'Developing a long-term workforce and educational framework for future investment operators, including the proposed DDG University initiative.',
    icon: 'graduation-cap', imageUrl: '', bullets: [], visible: true, order: 4,
  },
  {
    title: 'Corporate Seed Financing Development',
    description: 'Preparing for a proposed C$5 million corporate seed financing initiative intended to support:',
    icon: 'coins', imageUrl: '',
    bullets: ['Corporate formation', 'Professional staffing', 'Regulatory preparation', 'Technology', 'Financial administration', 'Initial operating infrastructure'],
    visible: true, order: 5,
  },
]

export const defaultSeedRound: SeedRoundSettings = {
  published: false,
  showInNav: true,
  heroLabel: 'Seed Round 1',
  title: 'Proposed C$5 Million Corporate Seed Financing Initiative',
  intro:
    'The proposed Seed Round 1 is intended to finance the establishment and development of Dominion Dividend Group Management Company.',
  heroImageUrl: IMAGES.heroMountain,
  targetLabel: 'Proposed Financing Target',
  targetDisplay: 'C$5,000,000',
  targetNote: 'Proposed corporate seed financing for the Management Company. This figure is a development target only and does not represent capital raised or assets under management.',
  useOfCapitalTitle: 'Intended Use of Capital',
  useOfCapital: [
    'Corporate formation and administration',
    'Professional legal services',
    'Securities and regulatory counsel',
    'Accounting and financial systems',
    'Compliance infrastructure',
    'Professional staffing',
    'Technology and cybersecurity',
    'Operational infrastructure',
    'Corporate reserves',
    'Business development',
  ],
  supportTitle: 'What Seed Round 1 Is Intended To Support',
  supportText:
    'Seed Round 1 is intended to support the establishment of the Management Company itself: its corporate formation, executive and professional staffing, governance framework, financial administration, technology, and the legal and regulatory preparation required before any future regulated activity could be considered.\n\nThe objective is to build a properly governed, adequately resourced organization with the controls, personnel, and infrastructure expected of an institutional-quality firm.',
  distinctionTitle: 'Important Distinction',
  distinctionText:
    'Seed Round 1 relates to proposed financing for the Management Company.\n\nIt is separate from any future investment-fund subscriptions or investment products. No investment fund is currently operating, and nothing on this page relates to the purchase of units or interests in any fund.',
  legalNotice:
    'This webpage is provided solely as draft corporate-development information. It does not constitute an offer to sell securities, a solicitation to purchase securities, investment advice, or a representation that any securities offering is currently available. Any future financing communication will remain subject to applicable legal requirements and review by appropriate Canadian securities counsel.',
}
