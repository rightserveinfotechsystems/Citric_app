/** About screen content — banner sections, numbered objectives, dot-heading groups. */

export const aboutScreen = {
  title: 'About',
  background: require('../assets/AppBackground.jpg'),
  photo: require('../assets/aboutPhoto.png'),
  intro:
    'CitriHub, the Agri-business Incubation Centre of ICAR-Central Citrus Research Institute, Nagpur is dedicated to fostering innovation and agripreneurship in the citrus domain. Our goal is to support startups and entrepreneurs in transforming their ideas into successful agri-businesses that contribute to the growth and sustainability of the citrus sector.',
  sections: [
    {
      banner: 'Vision',
      text: 'To become a leading hub for innovation and agripreneurship in citriculture, driving sustainable growth and global competitiveness in the citrus industry through cutting-edge technology and incubation support.',
    },
    {
      banner: 'Mission',
      text: 'To Improve the well-being of the citrus stakeholders with improved and innovative citrus-based products and services through technology commercialization and agripreneurship development to realize the larger goal of fostering agri-business and innovation in the field of citriculture by creating entrepreneurial ecosystems for current and future citripreneurs. ',
    },
    {
      banner: 'Objectives',
      numbered: [
        'Foster innovation and commercialization of citrus technologies.',
        'Support the development of scalable citrus-based enterprises.',
        'Enhance the skills and capabilities of citripreneurs.',
        'Make citripreneurs more competitive and prosperous for sustainable and inclusive growth.',
        'Create more opportunities for self-employment and agri-business in the citrus domain',
      ],
    },
    {
      banner: 'What We Offer',
      items: [
        {
          heading: 'Business Incubation',
          body: 'Offering mentorship, business planning, brand building and technical advisory to turn innovative ideas or prototype into viable businesses.',
        },
        {
          heading: 'Technical Support',
          body: 'Providing access to advanced technology, and expertise in citrus nursery, cultivation, processing and allied aspects for successful agribusiness venture.',
        },
        {
          heading: 'Training and Workshops',
          body: 'Conducting regular capacity building programs, workshops, entrepreneurship development programmes on the latest technologies and practices in citriculture.',
        },
        {
          heading: 'Infrastructure',
          body: 'State-of-the-art facilities, including pilot processing plants, to support product development and business operations.',
        },
        {
          heading: 'Funding Facilitation',
          body: 'Assisting the incubates in the development and/or improvement of business plans, pitch preparation, and project presentation to attract grants, seed funders, angel investors, or venture capitalists.',
        },
        {
          heading: 'IP Management',
          body: 'Helping incubates in the protection of intellectual property issues if any arise during the period of incubation at ICAR-CCRI.',
        },
      ],
    },
    {
      banner: 'Why CitriHub',
      items: [
        { heading: 'Expert Guidance', body: 'Leverage the knowledge and experience of scientists and experts.' },
        { heading: 'Cutting-edge Technology', body: 'Access to the latest research and innovations in citriculture.' },
        {
          heading: 'Comprehensive Support',
          body: 'From idea validation to commercialization, receive end-to-end support throughout your citripreneurial journey.',
        },
        {
          heading: 'Networking Opportunities',
          body: 'Connect with a vibrant community of citripreneurs, other incubators, investors, and industry stakeholders.',
        },
      ],
    },
    {
      banner: 'Who Can Apply',
      last: true,
      items: [
        {
          heading: 'Startups and Agripreneurs',
          body: 'Those with innovative business ideas or prototypes looking to scale up their existing ventures or enter the citrus-based agribusiness sector.',
        },
        {
          heading: 'Aspiring Citripreneurs',
          body: 'Individuals seeking to adopt modern technologies in citrus nursery management, cultivation, processing, and value addition to launch a citrus-based business.',
        },
        {
          heading: 'SHGs and FPOs/FPCs',
          body: 'Groups interested in developing social entrepreneurship initiatives centered around citrus-based products and services.',
        },
      ],
    },
  ],
};
