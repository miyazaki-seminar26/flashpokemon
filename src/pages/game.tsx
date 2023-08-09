import React, { useState, useEffect } from "react"
import { Button, Center, Text } from "@mantine/core"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { LEVEL } from "@/constants/level"

const FlashPokemonGame: React.FC = () => {
  const [countdown, setCountdown] = useState(3)
  const [showPokemons, setShowPokemons] = useState<boolean>(false)
  const [currentPokemonIndex, setCurrentPokemonIndex] = useState<number[]>([])
  const [clickedPokemonIndex, setClickedPokemonIndex] = useState<number>(0)

  const [answer, setAnswer] = useState<boolean>(false)

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
      setCurrentPokemonIndex([])
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
        currentIndex = Math.floor(Math.random() * 40)
      }, 200) // 0.3秒ごとに次のポケモンを表示

      setTimeout(() => {
        clearInterval(showPokemonInterval)
        setShowPokemons(false)
      }, 200 * 4) // ケモン画像をすべて表示後に終了
    }
  }, [showPokemons])

  return (
    <div>
      <div className="absolute top-0">
        <Header />
      </div>
      <div className="min-h-screen flex flex-col justify-center items-center">
        {countdown > 0 ? (
          <Center>
            <h1>{countdown}</h1>
          </Center>
        ) : (
          <div>
            {showPokemons ? (
              <div>
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    currentPokemonIndex[currentPokemonIndex.length - 1] + 1
                  }.png`}
                  alt="Pokemon"
                  width={400}
                  height={400}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Text
                  weight="bold"
                  sx={{
                    fontSize: "24px",
                  }}
                >
                  {`出てきたものの中で${
                    currentPokemonIndex.length - 1
                  }番目に出てきたポケモンは何でしょう？`}
                </Text>

                <div className="flex flex-wrap justify-center items-center">
                  {currentPokemonIndex.map((item, index) => (
                    <div
                      key={item}
                      className={`flex flex-col items-center cursor-pointer hover:opacity-70 border-2 border-gray-400 rounded-full m-2 ${
                        clickedPokemonIndex === index &&
                        "border-green-600 bg-white"
                      }
                      }`}
                      onClick={() => {
                        setClickedPokemonIndex(index)
                      }}
                    >
                      <Image
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                          index + 1
                        }.png`}
                        alt="Pokemon"
                        width={180}
                        height={180}
                      />
                      <Text
                        weight="bold"
                        sx={{
                          fontSize: "24px",
                        }}
                      ></Text>
                    </div>
                  ))}
                </div>

                <br />
                <br />
                <br />

                <Text weight="bold" sx={{ fontSize: "24px" }}>
                  あなたの答え：
                  {clickedPokemonIndex != null && clickedPokemonIndex + 1}
                </Text>

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
                    // 答え合わせをする
                    setAnswer(true)
                  }}
                >
                  決定
                </Button>
              </div>
            )}
          </div>
        )}

        <br />
        <br />
        <br />

        {
          // 答え合わせ
          answer && (
            <div>
              <Text weight="bold" sx={{ fontSize: "24px" }}>
                正解は：
                {currentPokemonIndex.length}
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    currentPokemonIndex[currentPokemonIndex.length - 1] + 1
                  }.png`}
                  alt="Pokemon"
                  width={180}
                  height={180}
                />
              </Text>
              <Text sx={{ fontSize: "16px" }}>
                {/* LEVELの配列の中から、適当に1つを選択 */}
                {LEVEL[Math.floor(Math.random() * LEVEL.length)]}
              </Text>

              <Button
                variant="outline"
                color="dark"
                size="md"
                bg="white"
                sx={{
                  border: "2px solid #000",
                  borderRadius: "24px",
                  ":hover": {
                    backgroundColor: "#333",
                    color: "#fff",
                  },
                }}
                onClick={() => {
                  setAnswer(false)
                  setCountdown(3)
                }}
              >
                もう一度
              </Button>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default FlashPokemonGame
