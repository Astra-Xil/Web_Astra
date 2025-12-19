import { IconType } from "react-icons";
import { LuHouse, LuContact, LuSettings } from "react-icons/lu";

export type SidebarItem = {
  label: string;
  href: string;
  icon: IconType;
};

export const sidebarItems: SidebarItem[] = [
  {
    label: "ホーム",
    href: "/",
    icon: LuHouse,
  },
  {
    label: "マイページ",
    href: "/MyPage",
    icon: LuContact,
  },
  {
    label: "設定",
    href: "/Setting",
    icon: LuSettings,
  },
];
