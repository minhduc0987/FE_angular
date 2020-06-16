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
