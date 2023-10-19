import React, { useState, useEffect } from "react"
import { Button, Center, Text } from "@mantine/core"
import { Header } from "@/components/layout/header"
import { LEVEL } from "@/constants/level"
import { useRouter } from "next/router"
import { useRecoilValue } from "recoil"
import { recoilPokemonList, recoilProblemIndex } from "@/global/atom"

const FlashPokemonGame: React.FC = () => {
  const [countdown, setCountdown] = useState(3)
  const [showPokemons, setShowPokemons] = useState<boolean>(false)
  const problemPokemonLists = useRecoilValue(recoilPokemonList)
  const problemIndex = useRecoilValue(recoilProblemIndex)
  const [, setCurrentPokemonIndex] = useState<number[]>([])
  const [clickedPokemonIndex, setClickedPokemonIndex] = useState<number>(0)

  // 正解かどうかの判定
  const [isCorrect, setIsCorrect] = useState<boolean>(false)
  const [answer, setAnswer] = useState<boolean>(false)

  const router = useRouter()

  const clickedPokemon = problemPokemonLists[clickedPokemonIndex]

  useEffect(() => {
    // ページ遷移時に初期化
    setClickedPokemonIndex(0)
    setAnswer(false)
  }, [])

  useEffect(() => {
    if (countdown > 0) {
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1)
      }, 1000)

      return () => clearInterval(countdownInterval)
    } else {
      setShowPokemons(true)
    }
  }, [countdown])

  useEffect(() => {
    if (showPokemons) {
      let currentIndex = 0
      const showPokemonInterval = setInterval(() => {
        setCurrentPokemonIndex((prevCurrentPokemonIndex) => [
          ...prevCurrentPokemonIndex,
          currentIndex,
        ])
        currentIndex = Math.floor(Math.random() * 100)
      }, 200) // 0.3秒ごとに次のポケモンを表示

      setTimeout(() => {
        clearInterval(showPokemonInterval)
        setShowPokemons(false)
      }, 200 * 4)
    }
  }, [showPokemons])

  return (
    <div>
      <div className="absolute top-0">
        <Header />
      </div>
      <div className="min-h-screen flex flex-col items-center pt-20">
        {countdown > 0 ? (
          <Center>
            <h1>{countdown}</h1>
          </Center>
        ) : (
          <div>
            {!answer && (
              <div>
                {showPokemons ? (
                  <div>
                    {problemPokemonLists.map((item, index) => {
                      return (
                        <div key={index} className="flex flex-col items-center">
                          <p className="font-bold">{item.name}</p>
                          <img src={item.sprites.front_default} alt="Pokemon" />
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Text
                      weight="bold"
                      sx={{
                        fontSize: "32px",
                      }}
                    >
                      {`${
                        problemIndex + 1
                      }番目に出てきたポケモンはどれでしょう？`}
                    </Text>

                    <div className="flex flex-wrap justify-center items-center">
                      {problemPokemonLists.map((item, index) => (
                        <div
                          key={item.name}
                          className={`flex flex-col items-center cursor-pointer hover:opacity-70 border-2 border-gray-400 rounded-lg m-2 ${
                            clickedPokemonIndex === index &&
                            "border-green-600 bg-white"
                          }
                      }`}
                          onClick={() => {
                            setClickedPokemonIndex(index)
                            setAnswer(false)
                          }}
                        >
                          <img
                            src={item.sprites.front_default}
                            alt="Pokemon"
                            className="w-40 h-40"
                          />
                        </div>
                      ))}
                    </div>

                    <br />
                    <br />

                    <Text weight="bold" sx={{ fontSize: "24px" }}>
                      あなたの答え：
                      {clickedPokemon?.name}
                    </Text>

                    <br />
                    <br />

                    <Button
                      variant="outline"
                      color="dark"
                      size="xl"
                      bg="white"
                      sx={{
                        border: "2px solid #000",
                        borderRadius: "24px",
                        fontSize: "40px",
                        ":hover": {
                          backgroundColor: "#333",
                          color: "#fff",
                        },
                      }}
                      onClick={() => {
                        if (clickedPokemonIndex === problemIndex) {
                          setIsCorrect(true)
                          setAnswer(true)
                        } else {
                          setIsCorrect(false)
                          setAnswer(true)
                        }
                      }}
                    >
                      決定！
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {
          // 答え合わせ
          answer && (
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <Text weight="bold" sx={{ fontSize: "40px" }}>
                  {isCorrect ? "正解⭕️" : "不正解❌"}
                </Text>
                <div className="flex justify-center items-start gap-1">
                  {problemPokemonLists.map((item, index) => (
                    <div key={index}>
                      <div
                        className={`flex flex-col justify-center items-center ${
                          problemIndex === index &&
                          "border-4 border-green-600 rounded-xl"
                        }
                        ${
                          clickedPokemonIndex === index &&
                          !isCorrect &&
                          "border-4 border-red-600 rounded-xl"
                        }
                      `}
                      >
                        <img src={item.sprites.front_default} alt="Pokemon" />
                        <Text weight="bold" sx={{ fontSize: "16px" }}>
                          {index + 1}
                        </Text>
                      </div>
                      {
                        // 正解の場合、正解のポケモンの名前を表示
                        !isCorrect && problemIndex === index && (
                          <Text weight="bold" sx={{ fontSize: "16px" }}>
                            正解
                          </Text>
                        )
                      }
                      {clickedPokemonIndex === index && (
                        <Text weight="bold" sx={{ fontSize: "16px" }}>
                          あなたの答え
                        </Text>
                      )}
                    </div>
                  ))}
                </div>

                <br />
                <br />

                <Text weight="bold" sx={{ fontSize: "32px" }}>
                  {/* LEVELの配列の中から、適当に1つを選択 */}
                  {isCorrect ? (
                    // 正解の場合、LEVELの配列の5~9番目を選択
                    <>{LEVEL[Math.floor(Math.random() * 5) + 5]}</>
                  ) : (
                    // 不正解の場合、LEVELの配列の0~4番目を選択
                    <>{LEVEL[Math.floor(Math.random() * 5)]}</>
                  )}
                </Text>
              </div>

              <div className="flex flex-col justify-center items-center">
                <Button
                  variant="outline"
                  color="dark"
                  size="md"
                  bg="white"
                  sx={{
                    border: "2px solid #000",
                    borderRadius: "24px",
                    fontSize: "16px",
                    marginTop: "40px",
                    ":hover": {
                      backgroundColor: "#333",
                      color: "#fff",
                    },
                  }}
                  onClick={() => {
                    setAnswer(false)
                    setCountdown(3)
                    router.push("/")
                  }}
                >
                  もう一度
                </Button>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default FlashPokemonGame
