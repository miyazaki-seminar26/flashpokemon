import React from "react"
import { createGetInitialProps } from "@mantine/next"
import Document, { Head, Html, Main, NextScript } from "next/document"

const getInitialProps = createGetInitialProps()

export default class _Document extends Document {
  static override getInitialProps = getInitialProps

  override render() {
    return (
      <Html lang="ja">
        <Head>
          <title>FlashPokemon</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
