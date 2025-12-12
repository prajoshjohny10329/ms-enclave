import { Menu } from "@/types/Menu";

export const menuData: Menu[] = [
  {
    id: 1,
    title: "Admin",
    newTab: false,
    path: "/admin",
  },
  {
    id: 2,
    title: "Messages",
    newTab: false,
    path: "/admin/messages",
  },
  {
    id: 3,
    title: "Calendar",
    newTab: false,
    path: "/admin/calendar",
  },
  {
    id: 4,
    title: "bookings",
    newTab: false,
    path: "/admin/bookings",
  },
  {
    id: 5,
    title: "Home",
    newTab: false,
    path: "/",
  },
  
  {
    id: 6,
    title: "View Package",
    newTab: false,
    path: "/admin/packages/",
    submenu: [
      {
        id: 61,
      title: "Add Package",
      newTab: false,
      path: "/admin/packages/add",
      },
    ],
  },
];
