import React, { useState } from "react"
import { Button, Center } from "@mantine/core"
import { Header } from "@/components/layout/header"
import { BookDialog } from "@/components/BookDialog"
import { useRouter } from "next/router"
import Image from "next/image"
import AnimalIcon from "@/components/svg/animal"

const Home = () => {
  const [opened, setOpened] = useState(false)

  const router = useRouter()

  return (
    <div>
      <div className="absolute top-0">
        <Header />
      </div>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="absolute top-10">
          <Image src="/images/poke.png" width={500} height={200} alt="" />
        </div>
        <div className="flex flex-col gap-10">
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
              router.push("/callback")
            }}
          >
            レベル1
          </Button>
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
            disabled
          >
            レベル2
          </Button>
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
            disabled
          >
            レベル3
          </Button>
        </div>

        <Center>
          <div className="flex gap-14 absolute bottom-0 mb-20">
            <Button
              variant="outline"
              color="dark"
              size="xl"
              bg="white"
              sx={{
                border: "2px solid #000",
                borderRadius: "24px",
                fontSize: "32px",
                ":hover": {
                  backgroundColor: "#333",
                  color: "#fff",
                },
              }}
              onClick={() => {
                setOpened(true)
              }}
              leftIcon={<AnimalIcon />}
            >
              図鑑
            </Button>
          </div>
        </Center>
      </div>

      {opened && (
        <BookDialog
          opened={opened}
          onClose={() => {
            setOpened(false)
          }}
        />
      )}
    </div>
  )
}
export default Home
