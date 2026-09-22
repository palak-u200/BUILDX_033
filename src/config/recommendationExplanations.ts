import type { Severity } from '../types/map.types';

/**
 * WHY THIS ACTION? — Explainable AI configuration layer.
 *
 * A pure-frontend mapping from existing recommendation keys (incident IDs such as
 * INC-001 / INC-002) to explanation content. It reuses the existing Severity system
 * from map.types.ts and does NOT introduce a new global context, state library,
 * or backend model. Anything not available from existing data is clearly labeled
 * as SIMULATED / DEMO data.
 */

export interface EvidenceItem {
  text: string;
  simulated?: boolean;
}

export interface ImpactItem {
  direction: 'up' | 'down';
  label: string;
}

export interface RequiredResources {
  team?: string;
  personnel?: number;
  vehicle?: string;
  equipment?: string;
  distance?: string;
}

export interface ActionExplanation {
  /** Short title of the recommendation, e.g. "Deploy Rescue Team RT-03" */
  title: string;
  /** Where the action applies, e.g. "Wardhaman Nagar" */
  location: string;
  /** Reuses the existing Severity system — no second priority scale */
  priority: Severity;
  /** 0–100 */
  confidence: number;
  evidence: EvidenceItem[];
  impact: ImpactItem[];
  resources: RequiredResources;
  /** Short officer-friendly explanation */
  explanation: string;
}

/**
 * Explanation registry keyed by the SAME identifiers the AI alerts already use
 * (selectedIncidentId values 'INC-001' / 'INC-002' / 'INC-003' / 'INC-004' / 'INC-005'
 * from the seeded MongoDB data). Fallback explanations can be generated dynamically
 * via buildFallbackExplanation.
 */
export const recommendationExplanations: Record<string, ActionExplanation> = {
  'INC-001': {
    title: 'Deploy Rescue Team RT-03, Open Shelter S-02, Restrict Road R-12',
    location: 'Wardhaman Nagar',
    priority: 'CRITICAL',
    confidence: 91,
    evidence: [
      { text: 'Water level is increasing rapidly (+0.18 m/hr at sensor WTR-024)' },
      { text: 'Water level 4.2 m exceeds the 4.0 m danger threshold' },
      { text: 'Population exposure is high — low-lying residential clusters nearby' },
      { text: 'Rescue coverage in the affected area is below threshold' },
      { text: 'Rescue Team RT-03 is staged closest to the incident zone' },
      { text: 'Shelter S-02 has limited remaining capacity (10 beds)', simulated: true },
      { text: 'Similar historical flood conditions observed in this ward', simulated: true },
    ],
    impact: [
      { direction: 'down', label: 'Response time' },
      { direction: 'down', label: 'Resource shortage' },
      { direction: 'up', label: 'Rescue coverage' },
      { direction: 'up', label: 'Emergency readiness' },
    ],
    resources: {
      team: 'RT-03 (SDRF Beta)',
      personnel: 18,
      vehicle: 'Rescue Van × 2',
      equipment: 'Flood Rescue Kit',
      distance: '0.4 km',
    },
    explanation:
      'Rescue Team RT-03 is recommended because it is already staged at the incident location, has flood-rescue capability, and water levels at nearby sensor WTR-024 are rising past the danger threshold. Opening Shelter S-02 and restricting Road R-12 pre-empts the predicted overflow within 2 hours.',
  },

  'INC-002': {
    title: 'Initiate ambulance reroute from Zone 2',
    location: 'Dharampeth',
    priority: 'HIGH',
    confidence: 87,
    evidence: [
      { text: 'Complete power outage affecting 2 hospitals in Zone 2' },
      { text: 'Life-support and critical-care equipment at risk' },
      { text: 'Mayo Hospital operating at CRITICAL_LOAD (4 emergency beds, 0 ICU)' },
      { text: 'GMC has available emergency capacity (18 beds, 5 ICU)' },
      { text: 'NDRF Battalion 3 (RT-01) already deployed in the affected zone', simulated: true },
    ],
    impact: [
      { direction: 'down', label: 'Patient transit time' },
      { direction: 'down', label: 'Hospital overload risk' },
      { direction: 'up', label: 'Critical care availability' },
      { direction: 'up', label: 'Patient survival outlook' },
    ],
    resources: {
      team: 'RT-01 (NDRF Battalion 3)',
      personnel: 24,
      vehicle: 'Advanced Life Support Ambulances',
      equipment: 'Portable generators',
      distance: '1.8 km',
    },
    explanation:
      'Ambulances are rerouted because the power outage in Dharampeth threatens hospitals operating at critical load, while Government Medical College has verified spare ICU and emergency-bed capacity. Rerouting keeps critical patients within safe care windows.',
  },

  'INC-003': {
    title: 'Deploy clearing crew',
    location: 'Kamptee Road',
    priority: 'MEDIUM',
    confidence: 78,
    evidence: [
      { text: 'Fallen trees blocking a main arterial road' },
      { text: 'Incident already marked UNDER_CONTROL' },
      { text: 'Fire Emergency Unit 4 is EN ROUTE to the area' },
      { text: 'Traffic disruption affecting evacuation route capacity', simulated: true },
    ],
    impact: [
      { direction: 'down', label: 'Route clearance time' },
      { direction: 'up', label: 'Evacuation route capacity' },
      { direction: 'up', label: 'Logistics mobility' },
    ],
    resources: {
      team: 'RT-04 (Fire Emergency Unit 4)',
      personnel: 12,
      vehicle: 'Heavy Earth Movers (JCB)',
      equipment: 'Chainsaw & debris kit',
      distance: '3.1 km',
    },
    explanation:
      'A clearing crew is recommended because Kamptee Road is a primary arterial route and its blockage reduces evacuation and logistics capacity. The incident is under control, so a medium-priority crew deployment restores full route availability.',
  },

  'INC-004': {
    title: 'Dispatch structural engineer, Deploy RT-02, Cordon off area',
    location: 'Nandanvan Layout',
    priority: 'HIGH',
    confidence: 83,
    evidence: [
      { text: 'Partial structural collapse after continuous rainfall' },
      { text: 'Search and rescue currently underway' },
      { text: 'SDRF Alpha (RT-02) is AVAILABLE with 15 personnel' },
      { text: 'Secondary collapse risk in adjacent old structures', simulated: true },
    ],
    impact: [
      { direction: 'down', label: 'Search & rescue latency' },
      { direction: 'down', label: 'Casualty risk' },
      { direction: 'up', label: 'Site safety' },
    ],
    resources: {
      team: 'RT-02 (SDRF Alpha)',
      personnel: 15,
      vehicle: 'Rescue Van + JCB',
      equipment: 'Concrete cutter, thermal camera',
      distance: '2.4 km',
    },
    explanation:
      'RT-02 is recommended because it is the nearest available team with urban search-and-rescue equipment. Cordoning the area mitigates secondary collapse risk while a structural engineer assesses adjacent buildings.',
  },

  'INC-005': {
    title: 'Deploy traffic marshals, Monitor water level hourly',
    location: 'Wardha Road Junction',
    priority: 'LOW',
    confidence: 72,
    evidence: [
      { text: 'Knee-deep water accumulating at the underpass' },
      { text: 'Traffic slowed but remains passable' },
      { text: 'Nearby sensor WTR-027 reads NORMAL (1.2 m of 3.5 m threshold)' },
      { text: 'Rain forecast suggests continued accumulation', simulated: true },
    ],
    impact: [
      { direction: 'down', label: 'Traffic congestion' },
      { direction: 'up', label: 'Situational awareness' },
      { direction: 'up', label: 'Commuter safety' },
    ],
    resources: {
      team: 'RT-05 (Civil Defense Team C)',
      personnel: 6,
      vehicle: 'Traffic control units',
      equipment: 'Barriers, warning signage',
      distance: '1.2 km',
    },
    explanation:
      'Traffic marshals are recommended as a low-cost precaution: the underpass remains passable but water is accumulating. Hourly monitoring of sensor WTR-027 escalates the response only if levels approach the danger threshold.',
  },
};

/**
 * Dynamically builds a reasonable explanation for incidents that do not yet have a
 * curated entry, so the drawer works for ANY recommendation without hardcoding.
 */
export const buildFallbackExplanation = (
  incidentId: string,
  type: string,
  location: string,
  severity: Severity,
  recommendedAction?: string
): ActionExplanation => ({
  title: recommendedAction || `Respond to ${type}`,
  location,
  priority: severity,
  confidence: severity === 'CRITICAL' ? 85 : severity === 'HIGH' ? 80 : 74,
  evidence: [
    { text: `${type} reported at ${location}` },
    { text: `Incident severity assessed as ${severity}` },
    { text: 'Nearest available response unit identified', simulated: true },
    { text: 'Historical response patterns for this incident type reviewed', simulated: true },
  ],
  impact: [
    { direction: 'down', label: 'Response time' },
    { direction: 'up', label: 'Situational control' },
  ],
  resources: {
    team: 'Nearest available unit',
    equipment: 'Standard response kit',
  },
  explanation: `${type} at ${location} is rated ${severity}. The recommended response matches the standard operating procedure for this incident type and severity. Requires officer approval before execution. (Demo explanation — no curated AI analysis available for ${incidentId}.)`,
});
