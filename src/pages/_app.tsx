import React from "react"
import "@/styles/globals.css"
import "@/styles/reset.css"

import type { AppProps } from "next/app"
import { Providers } from "@/components/Providers"
import { Container } from "@mantine/core"
import { RecoilRoot } from "recoil"

export const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Providers>
        <RecoilRoot>
          <main className="bg-white">
            <Container size={"xs"} className="bg-yellow-300 min-h-screen">
              <Component {...pageProps} />
            </Container>
          </main>
        </RecoilRoot>
      </Providers>
    </>
  )
}

export default App
