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

export const notification = [
  {
    title: 'You have new mail',
    body: 'sent from Ajala Oladayo'
  },
  {
    title: 'You have new mail',
    body: 'sent from Ajala Oladayo'
  },
  {
    title: 'You have new mail',
    body: 'sent from Ajala Oladayo'
  },
  {
    title: 'You have new mail',
    body: 'sent from Ajala Oladayo'
  },
  {
    title: 'You have new mail',
    body: 'sent from Ajala Oladayo'
  },
  {
    title: 'You have new mail',
    body: 'sent from Ajala Oladayo'
  },
  {
    title: 'You have new mail',
    body: 'sent from Ajala Oladayo'
  },
  {
    title: 'You have new mail',
    body: 'sent from Ajala Oladayo'
  },
]


export const Menus = [
  {
    title: "Dashboard",
    src: "/dashboard",
    icon: "ri-dashboard-line",
  },
  {
    title: "Accounts",
    icon: "ri-user-add-line",
    subMenus: [
      {
        title: "Administrators",
        src: "/administrator/admin-users",
        cName: "sub-nav",
      },
      {
        title: "Users",
        src: "/administrator/parent",
        cName: "sub-nav",
      }
    ],
  },
  {
    title: "Manage Vote",
    gap: true,
    icon: "ri-graduation-cap-line",
    subMenus: [
      {
        title: "Create Category",
        src: "/administrator/sections",

        cName: "sub-nav",
      },
      {
        title: "Create Vote",
        src: "/administrator/class",

        cName: "sub-nav",
      },
      {
        title: "View result",
        src: "/services/services3",
      }
    ],
  },

  { title: "Account Setting", src: "/administrator/account-settings", icon: 'ri-user-settings-line' },
  { title: "Logout", src: "/adminisstrator/logout", icon: 'ri-logout-box-r-line' },
];