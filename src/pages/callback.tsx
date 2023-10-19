import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { recoilProblemIndex } from "@/global/atom"
import { useRecoilState } from "recoil"
import { useFetch4RandomPokemonData } from "@/hooks/useFetch4RandomPokemonData"
import { Center, Loader, Text } from "@mantine/core"

const Callback = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [problemIndex, setProblemIndex] =
    useRecoilState<number>(recoilProblemIndex)
  const [loading, setLoading] = useState<boolean>(true)

  const { fetchPokemonData } = useFetch4RandomPokemonData()

  const router = useRouter()

  useEffect(() => {
    fetchPokemonData()
      .then(() => {
        setProblemIndex(Math.floor(Math.random() * 4))
      })
      .then(() => {
        setLoading(false)
        router.push("/game")
      })
  }, [])

  return (
    <div>
      <Center className="min-h-screen">
        {loading && (
          <div className="flex flex-col justify-center items-center gap-5">
            <Text size={40} weight={700}>
              少し待ってね
            </Text>
            <Loader />
          </div>
        )}
      </Center>
    </div>
  )
}

export default Callback
