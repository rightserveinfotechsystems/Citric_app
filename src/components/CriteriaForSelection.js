import React from 'react';
import { ScreenShell } from './common/ScreenShell';
import { BulletList } from './common/BulletList';
import { criteriaScreen } from '../data/criteriaForSelection';

export default function CriteriaForSelection() {
  return (
    <ScreenShell title={criteriaScreen.title} background={criteriaScreen.background}>
      <BulletList items={criteriaScreen.items} variant="numbered" />
    </ScreenShell>
  );
}
