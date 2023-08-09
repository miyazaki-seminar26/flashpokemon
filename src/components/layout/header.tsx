import React from "react"
import Image from "next/image"

export const Header = () => {
  return (
    <div className="">
      <Image src="/logo.png" width={100} height={100} alt="FlashPokemon" />
    </div>
  )
}
