export const COLORS = {
  offWhite: "#F9FAFB",
  white: "#ffffff",
  lightDark: "#212B36",
  grey: "#EDEFF1",
  primary: "#4784FF",
  warning: "#FFC107",
  danger: "#FF6862",
  success: "#54D62C",
  dangerDark: "#e04f4a",
  primaryDark: "#004ce5",
  warningDark: "#e5ac00",
  succesDark: "#4aba25",
};


export const Menus = [
  {
    title: "Dashboard",
    src: "/dashboard",
    icon: "ri-dashboard-line",
  },
  {
    title: "Accounts",
    icon: "ri-user-add-line",
    src: "/users",
    subMenus: [
      {
        title: "Administrators",
        src: "/administrators",
        cName: "sub-nav",
      },
      {
        title: "Users",
        src: "/users",
        cName: "sub-nav",
      }
    ],
  },
  {
    title: "Manage Home page",
    gap: true,
    icon: "ri-home-line",
    src: "/add-cta",
    subMenus: [
      {
        title: "Header Bar",
        src: "/add-cta",

        cName: "sub-nav",
      },
      {
        title: "Categories",
        src: "/categories",
        cName: "sub-nav",
      },
      {
        title: "Banner",
        src: "/banners",
        cName: "sub-nav",
      },
      {
        title: "Featured Product",
        src: "/featured-product",
        cName: "sub-nav",
      }
    ],
  },

  {
    title: "Product",
    icon: "ri-home-line",
    src: "/add-product",
    subMenus: [
      {
        title: "Add Product",
        src: "/add-product",
        cName: "sub-nav",
      },
    ],
  },

  {
    title: "Orders",
    icon: "ri-home-line",
    src: "/orders",
    subMenus: [
      {
        title: "All Orders",
        src: "/orders",
        cName: "sub-nav",
      },
    ],
  },

  { title: "Account Setting", src: "/account-settings", icon: 'ri-user-settings-line' },
  { title: "Logout", src: "/logout", icon: 'ri-logout-box-r-line' },
];

