export class MenuConfig {
  public defaults: any = {
    header: {
      self: {},
      items: [
        {
          title: 'Dashboards',
          root: true,
          alignment: 'left',
          page: '/dashboard',
          translate: 'MENU.DASHBOARD',
        },
        {
          title: 'Applications',
          root: true,
          alignment: 'left',
          toggle: 'click',
          submenu: [
            {
              title: 'eCommerce',
              bullet: 'dot',
              icon: 'flaticon-business',
              permission: 'accessToECommerceModule',
              submenu: [
                {
                  title: 'Customers',
                  page: '/ecommerce/customers'
                },
                {
                  title: 'Products',
                  page: '/ecommerce/products'
                },
              ]
            }
          ]
        }
      ]
    },
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
        },
        {section: 'Applications'},
        {
          title: 'eCommerce',
          bullet: 'dot',
          icon: 'flaticon2-list-2',
          root: true,
          permission: 'accessToECommerceModule',
          submenu: [
            {
              title: 'Customers',
              page: '/ecommerce/customers'
            },
            {
              title: 'Products',
              page: '/ecommerce/products'
            },
          ]
        }
      ]
    },
  };

  public get configs(): any {
    return this.defaults;
  }
}
