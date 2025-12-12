import { Menu } from "@/types/Menu";

export const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    newTab: false,
    path: "/",
  },
  {
    id: 12,
    title: "Packages",
    newTab: false,
    path: "/packages",
  },
  {
    id: 0,
    title: "Admin",
    newTab: false,
    path: "/admin",
  },
  {
    id: 2,
    title: "About Us",
    newTab: false,
    path: "/about-us",
  },
  {
    id: 3,
    title: "Amenities",
    newTab: false,
    path: "/about-us",
    submenu: [
      {
        id: 30,
        title: "Swimming Pool",
        newTab: false,
        path: "/shop-with-sidebar",
      },
      {
        id: 31,
        title: "Fishing Zone",
        newTab: false,
        path: "/shop-with-sidebar",
      },
      {
        id: 32,
        title: "Garden & Park",
        newTab: false,
        path: "/shop-with-sidebar",
      },
      {
        id: 33,
        title: "Photo Shooting Spots",
        newTab: false,
        path: "/shop-with-sidebar",
      },
    ],
  },
  {
    id: 4,
    title: "Experience",
    newTab: false,
    path: "/about-us",
    submenu: [
      {
        id: 40,
        title: "Village Experience",
        newTab: false,
        path: "/shop-with-sidebar",
      },
      {
        id: 41,
        title: "Nature Walk",
        newTab: false,
        path: "/shop-with-sidebar",
      },
      {
        id: 42,
        title: "Fishing Experience",
        newTab: false,
        path: "/shop-with-sidebar",
      },
      {
        id: 43,
        title: "Photo Shooting Spots",
        newTab: false,
        path: "/shop-with-sidebar",
      },
    ],
  },
  {
    id: 6,
    title: "Packages",
    newTab: false,
    path: "/rooms",
    
  },
  {
    id: 5,
    title: "Contact",
    newTab: false,
    path: "/contact",
  },
];
