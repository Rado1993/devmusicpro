import { MenuItemType } from '@paljs/ui/types';

const items: MenuItemType[] = [
    {
        title: 'Home',
        link: { href: '/' },
        icon: { name: 'home-outline' },
      },
      {
        title: 'CLIENTE',
        group: true
      },
      {
        title: 'Productos',
        icon: { name: 'search-outline' },
        link: { href: '/cliente/gestionproductos' },
      },
      {
        title: 'VENDEDOR',
        group: true
      },
      {
        title: 'Test',
        icon: { name: 'search-outline' },
        link: { href: '/busqueda' },
      },
      {
        title: 'ADMINISTRADOR',
        group: true,
      },
      {
        title: 'Test',
        icon: { name: 'people-outline' },
        link: { href: '/administracion/usuarios' },
      },
];

export default items;