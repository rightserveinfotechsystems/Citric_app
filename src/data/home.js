/** Home (launcher) screen content — tiles, credits, footer link. */

export const homeScreen = {
  backgroundColor: 'rgb(233 219 206)',
  logos: [
    require('../assets/icar.png'),
    require('../assets/citriLogo.png'),
    require('../assets/iccri.png'),
  ],
  tiles: [
    { label: 'Genesis', route: 'Genesis', color: '#A02A92', icon: require('../assets/genesis.png') },
    { label: 'About CitriHub', route: 'About', color: '#074F6A', icon: require('../assets/citricIcon.png') },
    {
      label: 'Criteria for Selection',
      route: 'CriteriaForSelection',
      color: '#12501A',
      icon: require('../assets/selection.png'),
      iconStyle: { marginRight: 30 },
    },
    { label: 'Process of Incubation', route: 'ProcessOfIncubation', color: '#673301', icon: require('../assets/process.png') },
    { label: 'Incubation Models', route: 'IncubationModule', color: '#C10001', icon: require('../assets/models.png') },
    { label: 'Potential Ventures', route: 'PotencialVentures', color: '#001C7B', icon: require('../assets/ventures.png') },
    {
      label: 'Apply for Incubation',
      route: 'ApplyForIncubation',
      color: '#565781',
      icon: require('../assets/apply.png'),
      iconStyle: { marginLeft: 45 },
    },
    { label: 'Announcement', route: 'Announcement', color: '#67018A', icon: require('../assets/announcement.png') },
    { label: 'Reach Us', route: 'ReachUs', color: '#517A00', icon: require('../assets/reach.png') },
    { label: 'Important Links', route: 'ImportantLinks', color: '#595959', icon: require('../assets/links.png') },
  ],
  credits: {
    leadHeading: 'Lead Developers',
    lead: [
      { name: 'Dr. S. S. Roy', role: '(Principal Scientist)' },
      { name: 'Dr. D. K. Ghosh', role: '(Director)', nameFirst: true },
    ],
    coHeading: 'Co-Developers',
    coLines: [
      'Ms. S. Paliwal, Ms. M. Gurjar, Dr. S. Bhattacharyya',
      'Dr. K. K. Kommu, Dr. D. M. Kadam, Dr. A. Thirugnanavel',
      'Dr. S. Mondal, Dr. N. M. Meshram and Dr. A. K. Das',
    ],
    orgLines: ['ICAR-Central Citrus Research Institute', 'Amravati Road - 440033, Nagpur, Maharashtra'],
  },
  designedBy: { label: 'Designed by LIVEpro', url: 'https://liveprosolutions.com/' },
};
