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
          bullet: 'dot',
        }
      ]
    },
  };

  public get configs(): any {
    return this.defaults;
  }
}
