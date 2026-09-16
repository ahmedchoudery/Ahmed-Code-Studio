import type { Metadata } from 'next';
import ClientHome from '@/components/ClientHome';

export const metadata: Metadata = {
  title: 'Recruiter & Engineering Portfolio — Ahmed Code Studio',
  description: 'Interactive HUD portfolio showcasing full stack MERN, Next.js, and TypeScript architecture by Muhammad Ahmed Raza.',
  alternates: {
    canonical: 'https://ahmed-code-studio.vercel.app/recruiter',
  },
};

export default function RecruiterPage() {
  return <ClientHome />;
}
