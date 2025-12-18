"use client";

import { HStack, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

type Props = {
  label: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
};

export default function SidebarItem({
  label,
  icon: Icon,
  onClick,
}: Props) {
  return (
    <HStack
      gap={2}
      borderRadius="lg"
      cursor="pointer"
      color="text.primary"
      _hover={{
        bg: "bg.subtle",
      }}
      onClick={onClick}
    >
      <Icon size={20} strokeWidth={1}/>
      <Text textStyle="sm" fontWeight="light">
        {label}
      </Text>
    </HStack>
  );
}
