import { IconType } from "react-icons";
import { LuHouse, LuContact, LuSettings } from "react-icons/lu";

export type SidebarItem = {
  label: string;
  href: string;
  icon: IconType;
};

export const sidebarItems: SidebarItem[] = [
  {
    label: "Home",
    href: "/",
    icon: LuHouse,
  },
  {
    label: "Contact",
    href: "/MyPage",
    icon: LuContact,
  },
  {
    label: "Setting",
    href: "/Setting",
    icon: LuSettings,
  },
];
