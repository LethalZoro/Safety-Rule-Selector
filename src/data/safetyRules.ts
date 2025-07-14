export interface SafetyRule {
  id: number;
  title: string;
  description: string;
  category: 'Personal Protection' | 'Equipment Safety' | 'Environmental' | 'Emergency' | 'Operations' | 'Communication';
  priority: 'Critical' | 'High' | 'Medium';
  discussionPoints: string[];
}

export const safetyRules: SafetyRule[] = [
  {
    id: 1,
    title: "Stop Work Authority",
    description: "Every employee has the authority and responsibility to stop work when they observe an unsafe condition or act.",
    category: "Operations",
    priority: "Critical",
    discussionPoints: [
      "When would you exercise stop work authority?",
      "How do you communicate a stop work situation?",
      "What are the steps after stopping work?",
      "Who needs to be notified immediately?"
    ]
  },
  {
    id: 2,
    title: "Personal Protective Equipment (PPE)",
    description: "All personnel must wear appropriate PPE including hard hat, safety glasses, steel-toed boots, and high-visibility clothing.",
    category: "Personal Protection",
    priority: "Critical",
    discussionPoints: [
      "What PPE is required in your current work area?",
      "How often should PPE be inspected?",
      "What do you do if PPE is damaged?",
      "When might additional PPE be required?"
    ]
  },
  {
    id: 3,
    title: "Gas Detection and Monitoring",
    description: "Continuous gas monitoring must be maintained in all work areas. Never ignore gas alarms.",
    category: "Environmental",
    priority: "Critical",
    discussionPoints: [
      "What gases are monitored on this rig?",
      "What are the alarm levels and responses?",
      "How often are gas detectors calibrated?",
      "What actions do you take during a gas alarm?"
    ]
  },
  {
    id: 4,
    title: "Hot Work Permits",
    description: "All hot work including welding, cutting, and grinding requires a valid permit and fire watch.",
    category: "Operations",
    priority: "High",
    discussionPoints: [
      "What constitutes hot work?",
      "Who can authorize hot work permits?",
      "What safety measures are required during hot work?",
      "How long is a hot work permit valid?"
    ]
  },
  {
    id: 5,
    title: "Lockout/Tagout (LOTO)",
    description: "All energy sources must be properly locked and tagged out before maintenance or repair work begins.",
    category: "Equipment Safety",
    priority: "Critical",
    discussionPoints: [
      "What energy sources need to be locked out?",
      "Who can remove lockout devices?",
      "What information must be on tags?",
      "How do you verify complete isolation?"
    ]
  },
  {
    id: 6,
    title: "Emergency Assembly Points",
    description: "All personnel must know their designated emergency assembly points and evacuation routes.",
    category: "Emergency",
    priority: "Critical",
    discussionPoints: [
      "Where are your emergency assembly points?",
      "What are the different alarm signals?",
      "Who are your emergency response team members?",
      "How do you account for all personnel?"
    ]
  },
  {
    id: 7,
    title: "Lifting Operations",
    description: "All lifting operations must be planned, supervised, and executed by qualified personnel with proper equipment inspection.",
    category: "Operations",
    priority: "High",
    discussionPoints: [
      "What pre-lift inspections are required?",
      "Who can act as a signalman?",
      "What is the maximum safe working load?",
      "How do you communicate during lifting operations?"
    ]
  },
  {
    id: 8,
    title: "Confined Space Entry",
    description: "Entry into confined spaces requires permits, atmospheric testing, and continuous monitoring with standby personnel.",
    category: "Environmental",
    priority: "Critical",
    discussionPoints: [
      "What defines a confined space?",
      "What atmospheric tests are required?",
      "Who must be present during confined space entry?",
      "What communication is required?"
    ]
  },
  {
    id: 9,
    title: "Two-Way Communication",
    description: "Maintain constant two-way communication during all critical operations and emergency situations.",
    category: "Communication",
    priority: "High",
    discussionPoints: [
      "What are your primary communication methods?",
      "How do you verify messages are understood?",
      "What is the backup communication plan?",
      "When is radio silence required?"
    ]
  },
  {
    id: 10,
    title: "Weather Awareness",
    description: "Monitor weather and environmental conditions continuously and suspend operations when conditions become unsafe.",
    category: "Environmental",
    priority: "High",
    discussionPoints: [
      "What weather conditions stop operations?",
      "How often are environmental updates received?",
      "What preparations are made for severe weather?",
      "Who makes environment-related decisions?"
    ]
  },
  {
    id: 11,
    title: "Hand and Power Tool Safety",
    description: "All tools must be inspected before use, properly maintained, and appropriate for the specific task.",
    category: "Equipment Safety",
    priority: "Medium",
    discussionPoints: [
      "What tool inspections are required daily?",
      "How do you report defective tools?",
      "What PPE is required for power tools?",
      "How are tools properly stored?"
    ]
  },
  {
    id: 12,
    title: "Fire Prevention and Response",
    description: "Maintain fire prevention measures and know the location and operation of all fire suppression equipment.",
    category: "Emergency",
    priority: "Critical",
    discussionPoints: [
      "Where are fire extinguishers located?",
      "What types of fires can occur in your area?",
      "How do you report a fire emergency?",
      "What is your evacuation procedure?"
    ]
  }
];