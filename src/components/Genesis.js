import React from 'react';
import { ScreenShell } from './common/ScreenShell';
import { BulletList } from './common/BulletList';

/** Static screen content (bundled with the app — no API). */
const GENESIS = {
  title: 'Genesis',
  background: require('../assets/BackgroundforGenesis.jpg'),
  items: [
    'Under the auspices of the XIIth Plan Scheme of the National Agricultural Innovation Fund (NAIF - Component II), ICAR established the Agri-Business Incubation (ABI) Centre.',
    'The activities of ABIs are coordinated and monitored by the Intellectual Property and Technology Management Unit at ICAR, New Delhi.',
    "The program's goal is to provide essential physical, technical, business, and networking support to foster emerging agri-businesses and entrepreneurship, and to incubate novel, commercially viable, and potentially transformative innovations.",
    'Additionally, the program offers services to help entrepreneurs refine their business ideas and validate their products before launching a full-scale business.',
    'A total of 49 ABIs are currently operational across various ICAR institutes and 1 at ICRISAT.',
    'The Agri-Business Incubation (ABI) Centre at ICAR-Central Citrus Research Institute was established in 2019 and branded as CitriHub in 2023.',
  ],
};

export default function Genesis() {
  return (
    <ScreenShell title={GENESIS.title} background={GENESIS.background} centered>
      <BulletList items={GENESIS.items} variant="plain" />
    </ScreenShell>
  );
}
