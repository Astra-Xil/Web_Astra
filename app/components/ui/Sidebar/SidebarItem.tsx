"use client";

import { HStack, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

type Props = {
    label: string;
    icon: IconType;
    collapsed?: boolean;
    active?: boolean;
    onClick?: () => void;
};

export default function SidebarItem({
    label,
    icon: Icon,
    onClick,
    collapsed
}: Props) {
    return (
        <HStack
            px="12px"
            gap={2}
            py="8px"
            borderRadius="md"
            cursor="pointer"
            color="text.primary"
            _hover={{
                bg: "bg.base",
            }}
            onClick={onClick}
        >
            <Icon size={20} strokeWidth={1} />
            {!collapsed && (
                <Text textStyle="sm" fontWeight="light">
                    {label}
                </Text>
            )}
        </HStack>
    );
}
