import React from "react"
import { MantineProvider, MantineThemeOverride } from "@mantine/core"
import { Noto_Sans_JP } from "next/font/google"

const customTheme: MantineThemeOverride = {
  headings: {
    sizes: {
      h1: { fontSize: "48px", lineHeight: "48px" },
      h2: { fontSize: "34px", lineHeight: "40px" },
      h3: { fontSize: "24px", lineHeight: "24px" },
      h4: { fontSize: "20px", lineHeight: "24px" },
      h5: { fontSize: "16px", lineHeight: "16px" },
      h6: { fontSize: "14px", lineHeight: "16px" },
    },
  },
  fontFamily: "'Noto Sans JP', sans-serif",
  fontSizes: {
    "body-xxl": "60px",
    "body-lg": "16px",
    "body-sm": "14px",
    "cap-lg": "12px",
  },
  colors: {
    primary: ["#FFF4E6", "#FFE8CC", "#FFA94D", "#FF922B", "#F76707"],
  },
  primaryShade: 4,
  primaryColor: "primary",
}

const noto_sans = Noto_Sans_JP({
  subsets: ["latin-ext"],
  style: ["normal"],
  display: "auto",
})

export type ProvidersProps = {
  children: React.ReactNode
}

export const Providers = ({ children }: ProvidersProps) => (
  <MantineProvider theme={customTheme} withNormalizeCSS withGlobalStyles>
    <div className={noto_sans.className}>{children}</div>
  </MantineProvider>
)
