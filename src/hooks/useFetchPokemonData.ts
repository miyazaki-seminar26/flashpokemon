import { recoilPokemonList } from "@/global/atom"
import PokeAPI, { INamedApiResource, IPokemon } from "pokeapi-typescript"
import { useState } from "react"
import { useRecoilState } from "recoil"

type Pokemon = {
  name: string
  sprites: {
    front_default: string
  }
}

export const useFetchPokemonData = () => {
  const [urlList, setUrlList] = useState<INamedApiResource<IPokemon>[]>([])
  const [data, setData] = useRecoilState<Pokemon[]>(recoilPokemonList)

  const getPokemonData = async () => {
    // ポケモンのリストを取得して、ランダムに4つを選ぶ
    PokeAPI.Pokemon.list(100).then((res) => {
      const list = res.results
      const newList = []
      for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * list.length)
        newList.push(list[randomIndex])
        list.splice(randomIndex, 1)
      }
      setUrlList(newList)
    })
  }

  const eachPokemonData = async (url: string) => {
    const res = await fetch(url)
    const data = await res.json()
    return data
  }

  // ポケモンのデータをstateに格納する
  async function fetchPokemonData(): Promise<void> {
    await getPokemonData().then(() => {
      Promise.all(
        urlList.map(async (pokemon: { url: string }) => {
          return await eachPokemonData(pokemon.url)
        }),
      ).then((res) => {
        setData(
          res.map((item) => ({
            name: item.name,
            sprites: item.sprites,
          })),
        )
      })
    })
  }

  return { fetchPokemonData, data }
}
