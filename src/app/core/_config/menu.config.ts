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
        { section: 'Quản lý' },
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
          title: 'Quản lý event',
          root: true,
          icon: 'flaticon2-gift-1',
          page: '/event-manager',
          translate: 'MENU.EVENT_MANAGER'
        },
        {
          title: 'Quản lý nhân sự',
          root: true,
          icon: 'flaticon2-avatar',
          page: '/human-resoucer-manager',
          translate: 'MENU.PERSONNEL'
        },
      ]
    },
  };

  public get configs(): any {
    return this.defaults;
  }
}
