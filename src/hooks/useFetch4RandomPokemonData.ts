import { recoilPokemonList } from "@/global/atom"
import { useRecoilState } from "recoil"

export const useFetch4RandomPokemonData = () => {
  const getPokemonData = async () => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
    const data = await res.json()
    // ランダムに4つを取得する
    return data
  }

  const eachPokemonData = async (url: string) => {
    const res = await fetch(url)
    const data = await res.json()
    return data
  }

  const [pokemon, setPokemon] = useRecoilState(recoilPokemonList)

  // ポケモンのデータをstateに格納する
  const fetchPokemonData = async (): Promise<void> => {
    const data = await getPokemonData()
    // dataの中のresultsのurlを再度、eachPokemonDataに渡して、fetchしたものをsetPokemonでstateに格納する
    const pokemonData = await Promise.all(
      // ここのmapの中で、100からランダムに4つを取得する
      data.results
        .map(async (pokemon: { url: string }) => {
          return await eachPokemonData(pokemon.url)
        })
        .sort(() => Math.random() - 0.5)
        .slice(0, 4),
    )
    setPokemon(pokemonData)
  }
  fetchPokemonData()

  return { fetchPokemonData, pokemon }
}
