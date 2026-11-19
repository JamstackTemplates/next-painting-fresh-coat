/** Ordered four-step decorating process shown on Home. */
export type ProcessStepId = 'survey' | 'quote' | 'paint' | 'walkround';

export interface ProcessStep {
  id: ProcessStepId;
  stepNumber: string;
  title: string;
  body: string;
}

export const processSteps: readonly ProcessStep[] = [
  {
    id: 'survey',
    stepNumber: '01',
    title: 'Quote visit',
    body: 'We measure, check the surfaces and talk colours.',
  },
  {
    id: 'quote',
    stepNumber: '02',
    title: 'Written quote',
    body: 'A fixed price, with prep and paint itemised.',
  },
  {
    id: 'paint',
    stepNumber: '03',
    title: 'Prep and paint',
    body: 'Dust sheets, masking, repairs, then two coats.',
  },
  {
    id: 'walkround',
    stepNumber: '04',
    title: 'Walk-round',
    body: 'A final check together, touch-ups, and the room handed back clean.',
  },
];
