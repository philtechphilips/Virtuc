import { MdOutlineSupervisorAccount, MdQuiz } from "react-icons/md";
import { HiOutlineRefresh } from "react-icons/hi";
import { GiGraduateCap } from "react-icons/gi";
import { FaPlus, FaVideo, FaBook, FaClipboardList } from 'react-icons/fa';
import {
  FiBarChart,
} from "react-icons/fi";

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
        title: "View result",
        src: "/services/services3",
      }
    ],
  },

  { title: "Account Setting", src: "/administrator/account-settings", icon: 'ri-user-settings-line' },
  { title: "Logout", src: "/adminisstrator/logout", icon: 'ri-logout-box-r-line' },
];

export const analytics = [
  {
    icon: <MdOutlineSupervisorAccount />,
    amount: "39",
    title: "Parents",
    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
    pcColor: "red-600",
  },
  {
    icon: <FaPlus />,
    amount: "4",
    title: "Pending Application",
    iconColor: "rgb(255, 244, 229)",
    iconBg: "rgb(254, 201, 15)",
    pcColor: "green-600",
  },
  {
    icon: <FiBarChart />,
    amount: "4",
    title: "Completed Session",
    iconColor: "rgb(228, 106, 118)",
    iconBg: "rgb(255, 244, 229)",

    pcColor: "green-600",
  },
  {
    icon: <GiGraduateCap />,
    amount: "25",
    title: "Graduated Students",
    iconColor: "rgb(0, 194, 146)",
    iconBg: "rgb(235, 250, 242)",
    pcColor: "red-600",
  },
  {
    icon: <HiOutlineRefresh />,
    amount: "39",
    title: "Classes",
    iconColor: "rgb(0, 194, 146)",
    iconBg: "rgb(235, 250, 242)",
    pcColor: "red-600",
  },
  {
    icon: <MdOutlineSupervisorAccount />,
    amount: "39",
    title: "Withdrawn Students",
    iconColor: "rgb(0, 194, 146)",
    iconBg: "rgb(235, 250, 242)",
    pcColor: "red-600",
  },

];
