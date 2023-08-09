import React, { useState } from "react"
import { Modal } from "@mantine/core"
import Image from "next/image"

type Props = {
  opened: boolean
  onClose: () => void
}

type Pokemon = {
  name: string
  sprites: {
    front_default: string
  }
}

export const BookDialog = ({ opened, onClose }: Props) => {
  // pokemonのデータをpokeapiから取得する
  const getPokemonData = async () => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=40")
    const data = await res.json()
    return data
  }

  const eachPokemonData = async (url: string) => {
    const res = await fetch(url)
    const data = await res.json()
    return data
  }

  const [pokemon, setPokemon] = useState([] as Pokemon[])

  // ポケモンのデータをstateに格納する
  const fetchPokemonData = async (): Promise<void> => {
    const data = await getPokemonData()
    // dataの中のresultsのurlを再度、eachPokemonDataに渡して、fetchしたものをsetPokemonでstateに格納する
    const pokemonData = await Promise.all(
      data.results.map(async (pokemon: { url: string }) => {
        return await eachPokemonData(pokemon.url)
      }),
    )
    setPokemon(pokemonData)
  }
  fetchPokemonData()

  return (
    <Modal
      title="ポケモン図鑑"
      opened={opened}
      onClose={onClose}
      size="md"
      styles={{
        content: {
          border: "8px solid #333",
          borderRadius: "24px",
        },
      }}
    >
      <div className="flex flex-wrap justify-center">
        {pokemon.map((item, index) => {
          return (
            <div key={index} className="flex flex-col items-center">
              <Image
                src={item.sprites.front_default}
                alt={item.name}
                width={120}
                height={120}
              />
              <p>{item.name}</p>
            </div>
          )
        })}
      </div>
    </Modal>
  )
}
