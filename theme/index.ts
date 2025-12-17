// theme/index.ts
import { createSystem, defaultConfig } from "@chakra-ui/react";
import { colors } from "./colors";
import { textStyles } from "./typography";

const theme = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors,
    },
    textStyles,
  },
});

export default theme;
