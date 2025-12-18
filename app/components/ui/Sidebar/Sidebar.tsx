"use client";

import { Box, VStack, HStack, Text } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { LuPanelLeft } from "react-icons/lu";
import SidebarItem from "./SidebarItem";
import { sidebarItems } from "./sidebarItems";
import { Icon } from "@chakra-ui/react";
import { useState } from "react";


export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Box
            as="aside"
            w={collapsed ? "72px" : "240px"}
            h="100vh"
            px="12px"
            bg="brand.secondary"
            position="sticky"
            transition="width 200ms ease"
            top="0"
        >
            <VStack align="stretch" gap={0}>
                {/* Logo */}
                <Box h="80px">
                    <HStack px="12px" h="100%" justify="space-between" align="center">
                        {!collapsed && (
                            <Text fontWeight="medium">Astra</Text>
                        )}
                        <Icon
                            as={LuPanelLeft}
                            boxSize={5}
                            color="text.secondary"
                            strokeWidth={1}
                            onClick={() => setCollapsed((v) => !v)}
                        />
                    </HStack>
                </Box>

                {/* Navigation */}
                <VStack align="stretch" gap={8}>
                    {/* ページのリンク */}
                    <VStack align="stretch" gap={0}>
                        {sidebarItems.map((item) => (
                            <SidebarItem
                                key={item.href}
                                label={item.label}
                                icon={item.icon}
                                collapsed={collapsed}
                                active={pathname === item.href}
                                onClick={() => router.push(item.href)}
                            />
                        ))}
                    </VStack>
                    {/* レビューを書いたアニメ */}
                    <VStack
                        align="stretch"
                        gap={3}
                        px="12px"
                        opacity={collapsed ? 0 : 1}
                        pointerEvents={collapsed ? "none" : "auto"}
                    >
                        <Text textStyle="xs" fontWeight="light" color="text.secondary" whiteSpace="nowrap" >
                            レビューを書いたアニメ
                        </Text>

                        <VStack px="12px" align="stretch" gap={3}>
                            <Text textStyle="sm" fontWeight="light" whiteSpace="nowrap" >ブルーロック</Text>
                        </VStack>
                    </VStack>
                </VStack>
            </VStack>

        </Box>
    );
}
