import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { recoilProblemIndex } from "@/global/atom"
import { useRecoilState } from "recoil"
import { useFetchPokemonData } from "@/hooks/useFetchPokemonData"
import { Loader } from "@mantine/core"

const Callback = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [problemIndex, setProblemIndex] =
    useRecoilState<number>(recoilProblemIndex)
  const [loading, setLoading] = useState<boolean>(true)

  const { fetchPokemonData, data } = useFetchPokemonData()

  const router = useRouter()

  useEffect(() => {
    fetchPokemonData().then(() => {
      setLoading(false)
      setProblemIndex(Math.floor(Math.random() * data.length))
      router.push("/game")
    })
  }, [])

  return (
    <div>
      <div>
        {loading ? (
          <Loader />
        ) : (
          <div>
            {data.map((item, index) => {
              return (
                <div key={index} className="flex flex-col items-center">
                  <p className="font-bold">{item.name}</p>
                  <img src={item.sprites.front_default} alt="Pokemon" />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Callback
