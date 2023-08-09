import React, { useState } from "react"
import { Button, Center } from "@mantine/core"
import { Header } from "@/components/layout/header"
import { BookDialog } from "@/components/BookDialog"
import { useRouter } from "next/router"

const Home = () => {
  const [opened, setOpened] = useState(false)

  const router = useRouter()

  return (
    <div>
      <div className="absolute top-0">
        <Header />
      </div>
      <div className="min-h-screen flex flex-col justify-center items-center">
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
            router.push("/game")
          }}
        >
          スタート
        </Button>

        <Center>
          <div className="flex gap-14 absolute bottom-0 mb-20">
            <Button
              variant="outline"
              color="dark"
              size="lg"
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
                setOpened(true)
              }}
            >
              図鑑
            </Button>

            <Button
              variant="outline"
              color="dark"
              size="lg"
              bg="white"
              sx={{
                border: "2px solid #000",
                borderRadius: "24px",
                ":hover": {
                  backgroundColor: "#333",
                  color: "#fff",
                },
              }}
            >
              説明書
            </Button>
          </div>
        </Center>
      </div>

      <BookDialog
        opened={opened}
        onClose={() => {
          setOpened(false)
        }}
      />
    </div>
  )
}
export default Home
