export class MenuConfig {
  public defaults: any = {
    aside: {
      self: {},
      items: [
        {
          title: 'Dashboard',
          root: true,
          icon: 'flaticon2-architecture-and-city',
          page: '/dashboard',
          translate: 'MENU.DASHBOARD',
          bullet: 'dot'
        },
        {
          title: 'Quản lý bàn',
          root: true,
          icon: 'flaticon2-setup',
          page: '/desk-manager',
          translate: 'MENU.DESK_MANAGER'
        },
        {
          title: 'Quản lý thực đơn',
          root: true,
          icon: 'flaticon2-list-2',
          page: '/menu-manager',
          translate: 'MENU.MENU_MANAGER'
        },
        {
          title: 'Quản lý sự kiện',
          root: true,
          icon: 'flaticon2-gift-1',
          page: '/event-manager',
          translate: 'MENU.EVENT_MANAGER'
        },
        {
          title: 'User Management',
          root: true,
          bullet: 'dot',
          icon: 'flaticon2-user-outline-symbol',
          translate: 'MENU.USER_MANAGEMENT',
          submenu: [
            {
              title: 'Users',
              page: '/user-management/users'
            },
            {
              title: 'Roles',
              page: '/user-management/roles'
            }
          ]
        },
      ]
    },
  };

  public get configs(): any {
    return this.defaults;
  }
}
