import React, { useEffect } from "react"
import { Modal } from "@mantine/core"
import Image from "next/image"
import { useFetchPokemonData } from "@/hooks/useFetchPokemonData"

type Props = {
  opened: boolean
  onClose: () => void
}

export const BookDialog = ({ opened, onClose }: Props) => {
  const { fetchPokemonData, pokemon } = useFetchPokemonData()

  useEffect(() => {
    if (opened) {
      fetchPokemonData()
    }
  }, [opened])

  return (
    <Modal
      title="ポケモン図鑑"
      opened={opened}
      onClose={onClose}
      size="lg"
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
