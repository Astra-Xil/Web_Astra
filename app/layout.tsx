import { Providers } from "./components/providers";
import localFont from "next/font/local";
import Header from "./components/ui/Header/Header";
import Sidebar from "./components/ui/Sidebar/Sidebar";
import { Toaster } from "@/app/components/ui/toaster";
import { Box, HStack, VStack } from "@chakra-ui/react";

export const mplus = localFont({
  src: [
    {
      path: "../fonts/MPLUS1-VariableFont_wght.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  display: "swap",
});

export const metadata = {
  title: "Astra",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body
        className={mplus.className}
        style={{
          background: "white",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        <Providers>
          <HStack align="start" minH="100vh">
            <Box ml="240px">
              <Sidebar />
            </Box>
            <VStack align="stretch" flex="1" minW={0}>
              <Header />
                {children}
            </VStack>
          </HStack>

          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
