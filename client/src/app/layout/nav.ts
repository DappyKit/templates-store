import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'My templates',
    url: '/templates',
    iconComponent: { name: '' },
    badge: {
      color: 'info',
      text: ''
    }
  },
  {
    name: 'My apps',
    url: '/apps',
    iconComponent: { name: '' },
    badge: {
      color: 'info',
      text: ''
    }
  },

  {
    name: 'Docs',
    url: 'https://github.com/DappyKit/templates-store',
    iconComponent: { name: 'cil-description' },
    attributes: { target: '_blank' }
  }
];
