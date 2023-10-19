// callbackでの処理のfetchしたポケモン

import { atom } from "recoil"

type Pokemon = {
  name: string
  sprites: {
    front_default: string
  }
}

export const recoilPokemonList = atom({
  key: "recoilPokemonList",
  default: [] as Pokemon[],
})

export const recoilProblemIndex = atom({
  key: "problemIndex",
  default: 0,
})
