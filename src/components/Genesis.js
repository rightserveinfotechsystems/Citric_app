import React from 'react';
import { ScreenShell } from './common/ScreenShell';
import { BulletList } from './common/BulletList';
import { genesisScreen } from '../data/genesis';

export default function Genesis() {
  return (
    <ScreenShell title={genesisScreen.title} background={genesisScreen.background} centered>
      <BulletList items={genesisScreen.items} variant="plain" />
    </ScreenShell>
  );
}
