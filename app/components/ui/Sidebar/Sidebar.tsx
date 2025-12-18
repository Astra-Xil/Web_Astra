"use client";

import { Box, VStack, HStack, Text } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { LuPanelLeft } from "react-icons/lu";
import SidebarItem from "./SidebarItem";
import { sidebarItems } from "./sidebarItems";
import { Icon } from "@chakra-ui/react";

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <Box
            position="fixed"
            top="0"
            left="0"
            as="aside"
            w="240px"
            h="100vh"
            px="24px"
            bg="brand.secondary"
        >
            <VStack align="stretch" gap={6}>
                {/* Logo */}
                <Box h="80px">
                    <HStack h="100%" justify="space-between" align="center">
                        <Text fontWeight="medium">Astra</Text>
                        <Icon
                            as={LuPanelLeft}
                            boxSize={5}
                            color="text.secondary"
                            strokeWidth={1}
                        />
                    </HStack>
                </Box>

                {/* Navigation */}
                <VStack align="stretch" gap={8}>
                    {/* ページのリンク */}
                    <VStack align="stretch" gap={3}>
                        {sidebarItems.map((item) => (
                            <SidebarItem
                                key={item.href}
                                label={item.label}
                                icon={item.icon}
                                active={pathname === item.href}
                                onClick={() => router.push(item.href)}
                            />
                        ))}
                    </VStack>
                    {/* レビューを書いたアニメ */}
                    <VStack align="stretch" gap={3}>
                        <Text textStyle="xs" fontWeight="light" color="text.secondary">
                            レビューを書いたアニメ
                        </Text>
                        <VStack px="12px" align="stretch" gap={3}>
                            <Text textStyle="sm" fontWeight="light">ブルーロック</Text>
                        </VStack>
                    </VStack>
                </VStack>
            </VStack>

        </Box>
    );
}
