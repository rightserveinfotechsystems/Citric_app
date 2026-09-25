import React from 'react';
import { ScreenShell } from './common/ScreenShell';
import { BulletList } from './common/BulletList';

/** Static screen content (bundled with the app — no API). */
const CRITERIA = {
  title: 'Criteria For Selection',
  background: require('../assets/AppBackground.jpg'),
  items: [
    {
      heading: 'Relevance and Alignment with Citrus Domain',
      body: "The applicant's focus must be aligned with citriculture such as citrus nursery management, commercial citrus production, or citrus processing, ensuring that their goals fit within the citrus value chain.",
    },
    {
      heading: 'Commitment to Learning and Adoption',
      body: 'For applicants who seek citripreneurship development on ICAR-CCRI technologies, a strong commitment to learning, adopting, and implementing these technologies in their entrepreneurial ventures is crucial.',
    },
    {
      heading: 'Innovativeness and Originality',
      body: 'Applicants bringing new business ideas or prototypes should demonstrate a high degree of innovation and originality, with the potential to introduce new products, services, or methods that can benefit the citrus industry.',
    },
    {
      heading: 'Feasibility and Market Potential',
      body: 'The business idea or prototype must be feasible with a well-defined business plan, addressing a clear market need within the citrus sector, and showing potential for market acceptance and growth.',
    },
    {
      heading: 'Social Impact and Community Development',
      body: 'For self-help groups and farmer producer companies, the business venture should aim to generate positive social impact, such as empowering local communities, creating employment opportunities, or enhancing the livelihoods of citrus growers.',
    },
    {
      heading: 'Sustainability and Environmental Responsibility',
      body: 'The applicant’s business idea should incorporate sustainable practices that contribute to environmental conservation, efficient resource use, and long-term viability in the citrus industry.',
    },
    {
      heading: 'Incubation Readiness',
      body: 'The applicant should be ready to start the incubation process, with any necessary groundwork already in place. Preference may be given to applicants with relevant experience or expertise in agriculture, horticulture, or related fields, especially those with basic knowledge of citriculture.',
    },
    {
      heading: 'Technical and Financial Readiness',
      body: 'Applicants should demonstrate readiness in terms of technical know-how or a clear plan to acquire it through training, as well as financial readiness, including a funding strategy and understanding of the financial requirements.',
    },
    {
      heading: 'Potential for Scale-Up and Replication',
      body: 'The business venture should have the potential for scaling up or being replicated, which can further contribute to the growth and development of the citrus industry.',
    },
    {
      heading: 'Commitment and Vision',
      body: 'Applicants should show a strong commitment to their agri-business, with a clear long-term vision for growth and contribution to the citrus industry.',
    },
  ],
};

export default function CriteriaForSelection() {
  return (
    <ScreenShell title={CRITERIA.title} background={CRITERIA.background}>
      <BulletList items={CRITERIA.items} variant="numbered" />
    </ScreenShell>
  );
}
