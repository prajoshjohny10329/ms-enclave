import { Menu } from "@/types/Menu";

export const menuData: Menu[] = [
  {
    id: 0,
    title: "Admin",
    newTab: false,
    path: "/admin",
  },
  {
    id: 1,
    title: "Home",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "About Us",
    newTab: false,
    path: "/about-us",
    submenu: [
      {
        id: 21,
        title: "Explore Near",
        newTab: false,
        path: "/amenities",
      }
    ]
  },
  {
    id: 12,
    title: "Packages",
    newTab: false,
    path: "/packages",
  },
  {
    id: 3,
    title: "Amenities",
    newTab: false,
    path: "/amenities",
    submenu: [
      {
        id: 31,
        title: "A/C Rooms",
        newTab: false,
        path: "/amenities/rooms",
      },
      {
        id: 36,
        title: "Party hall",
        newTab: false,
        path: "/amenities",
      },
      {
        id: 39,
        title: "Swimming Pool",
        newTab: false,
        path: "/amenities",
      },
      {
        id: 32,
        title: "Photo shooting locations",
        newTab: false,
        path: "/amenities",
      },
      {
        id: 33,
        title: "Dining area",
        newTab: false,
        path: "/amenities",
      },
      {
        id: 34,
        title: "Play area",
        newTab: false,
        path: "/amenities",
      },
      {
        id: 35,
        title: "Fishing zone",
        newTab: false,
        path: "/amenities",
      },
      
      {
        id: 37,
        title: "Balcony views",
        newTab: false,
        path: "/amenities",
      },
      {
        id: 38,
        title: "Indoor games",
        newTab: false,
        path: "/amenities",
      },
    ],
  },
  {
    id: 5,
    title: "Contact",
    newTab: false,
    path: "/contact",
  },
];
