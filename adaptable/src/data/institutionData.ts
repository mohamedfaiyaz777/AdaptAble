import { InstitutionAnalytics } from '../types';

export const MOCK_INSTITUTION_DATA: InstitutionAnalytics = {
  totalLearners: 248,
  activeThisWeek: 194,
  completionRate: 86.4,
  avgCommunicationScore: 85.2,
  interviewReadinessPercentage: 88.9,
  departmentBreakdown: [
    { department: 'Vocational Rehabilitation Cohort A', learners: 64, avgScore: 87.5 },
    { department: 'Inclusive Engineering & Tech', learners: 82, avgScore: 89.1 },
    { department: 'Customer Success & Operations', learners: 58, avgScore: 83.4 },
    { department: 'College Transitions & Internship Prep', learners: 44, avgScore: 81.2 },
  ],
  disabilityDistribution: [
    { type: 'Visual Impairment', count: 62 },
    { type: 'Hearing Impairment', count: 54 },
    { type: 'Speech Impairment', count: 48 },
    { type: 'Cognitive / Neurodivergent', count: 84 },
  ],
};
