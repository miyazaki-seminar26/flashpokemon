import React from "react"
import Image from "next/image"
import Link from "next/link"

export const Header = () => {
  return (
    <Link href={"/"}>
      <Image src="/logo.png" width={100} height={100} alt="FlashPokemon" />
    </Link>
  )
}
