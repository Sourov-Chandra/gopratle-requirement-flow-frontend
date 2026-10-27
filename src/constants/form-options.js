export const EVENT_TYPE_OPTIONS = [
  { value: "WEDDING", label: "Wedding" },
  { value: "CORPORATE_EVENT", label: "Corporate Event" },
  { value: "BIRTHDAY", label: "Birthday" },
  { value: "CONCERT", label: "Concert" },
  { value: "FESTIVAL", label: "Festival" },
  { value: "CONFERENCE", label: "Conference" },
  { value: "PRIVATE_PARTY", label: "Private Party" },
  { value: "GRADUATION", label: "Graduation" },
  { value: "OTHER", label: "Other (Please specify)" },
];

export const CATEGORY_OPTIONS = [
  {
    id: "PLANNER",
    title: "Event Planner",
    subtitle: "Planning, styling, coordination, vendors & decor logistics",
    icon: "CalendarCheck",
    badge: "Full Coordination",
  },
  {
    id: "PERFORMER",
    title: "Performer",
    subtitle: "Bands, solo artists, DJs, standup comedians, magicians & dancers",
    icon: "Music",
    badge: "Stage & Entertainment",
  },
  {
    id: "CREW",
    title: "Event Crew",
    subtitle: "Ushers, stagehands, bartenders, security & AV tech support",
    icon: "Users",
    badge: "Operations & On-Ground",
  },
];

export const GUEST_COUNT_OPTIONS = [
  { value: "FEWER_THAN_50", label: "Fewer than 50 guests" },
  { value: "50_200", label: "50 – 200 guests" },
  { value: "201_500", label: "201 – 500 guests" },
  { value: "MORE_THAN_500", label: "More than 500 guests" },
];

export const PLANNING_SCOPE_OPTIONS = [
  { value: "FULL_PLANNING", label: "Full Planning (Concept to execution)" },
  { value: "DAY_OF_COORDINATION", label: "Day-of Coordination" },
  { value: "PARTIAL_PLANNING", label: "Partial Planning & Advisory" },
  { value: "VENDOR_MANAGEMENT", label: "Vendor Management & Logistics" },
];

export const PERFORMER_TYPE_OPTIONS = [
  { value: "BAND", label: "Live Musical Band" },
  { value: "SOLO_SINGER", label: "Solo Singer / Vocalist" },
  { value: "DJ", label: "DJ / Music Producer" },
  { value: "STANDUP_COMEDIAN", label: "Stand-up Comedian" },
  { value: "MAGICIAN", label: "Magician / Illusionist" },
  { value: "DANCERS", label: "Dance Troupe / Performer" },
  { value: "OTHER", label: "Other (Please specify)" },
];

export const AUDIENCE_VIBE_OPTIONS = [
  { value: "RELAXED", label: "Relaxed & Ambient" },
  { value: "FAMILY_FRIENDLY", label: "Family-Friendly" },
  { value: "HIGH_ENERGY", label: "High-Energy & Upbeat" },
  { value: "FORMAL", label: "Formal & Elegant" },
  { value: "MIXED", label: "Mixed / Dynamic" },
];

export const AUDIENCE_AGE_OPTIONS = [
  { value: "CHILDREN", label: "Children" },
  { value: "TEENAGERS", label: "Teenagers" },
  { value: "ADULTS", label: "Adults" },
  { value: "ALL_AGES", label: "All Ages" },
];

export const CREW_SPECIALIZATION_OPTIONS = [
  { value: "USHERS_HOSTESSES", label: "Ushers or Hostesses" },
  { value: "STAGEHANDS", label: "Stagehands" },
  { value: "BARTENDERS", label: "Bartenders & Beverage Staff" },
  { value: "SECURITY_BOUNCERS", label: "Security & Bouncers" },
  { value: "AV_LIGHTING_TECHNICIANS", label: "AV or Lighting Technicians" },
  { value: "SETUP_TEARDOWN", label: "Setup and Teardown Crew" },
  { value: "OTHER", label: "Other (Custom Role)" },
];

export const CREW_RATE_UNITS = [
  { value: "PER_PERSON_PER_HOUR", label: "Per person / per hour" },
  { value: "PER_PERSON_PER_DAY", label: "Per person / per day" },
];
