'use client'

import { useForm } from "react-hook-form"
import { Box, Flex } from "@chakra-ui/react"
import { Button } from "../components/ui/button"
import TextComponent from "../components/componentUI/text"
import InputComponent from "../components/componentUI/input"
import ButtonComponent from "../components/componentUI/Button"
import TravelDialog from "../components/componentUI/TravelDialog"
import Mascotte from "../components/componentUI/Mascotte"
import FacebookLoginButton from "../components/componentUI/facebookLogin"

interface LoginFormInputComponents {
  lastName: string
  middleName : string
  firstName: string
    phoneNumber: string
  password: string
}

export default function RegisternForm() {
  const { handleSubmit, register } = useForm<LoginFormInputComponents>()

  const onSubmit = (data: LoginFormInputComponents) => {
    console.log("Form Data:", data)
  }

  return (
    <Box>
      <Box className="flex flex-row gap-12">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4 py-32 px-2 ml-20 bottom-16">
        <InputComponent
            {...register("lastName")}
            className="h-12 rounded-full bg-gray-100/80 border-0 px-6"
            placeholder="Nom"
          />
          <InputComponent
            {...register("middleName")}
            className="h-12 rounded-full bg-gray-100/80 border-0 px-6"
            placeholder="post-nom"
          />
          <InputComponent
            {...register("firstName")}
            className="h-12 rounded-full bg-gray-100/80 border-0 px-6"
            placeholder="premom"
          />
          <InputComponent
            {...register("phoneNumber")}
            className="h-12 rounded-full bg-gray-100/80 border-0 px-6"
            placeholder="phone number"
          />

          <Box className="relative">
            <InputComponent
              {...register("password")}
              type="password"
              className="h-12 rounded-full bg-gray-100/80 border-0 px-6"
              placeholder="Password"
            />
            <button
              type="button"
              className="absolute right-6 top-1/2 -translate-y-1/2 text-sm text-gray-400"
            >
              OUBLIÉ ?
            </button>
          </Box>

          <ButtonComponent
            type="submit"
            text="Connexion"
            color="bg-blue-500"
          />


          <Box className="grid grid-cols-2 gap-3 pt-4">
          <FacebookLoginButton />

            <Button
              variant="outline"
              className="h-12 rounded-full border-2 text-[#EA4335] hover:bg-[#EA4335] hover:text-white"
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#4285F4"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              GOOGLE
            </Button>

            <Button
              variant="outline"
              className="h-12 rounded-full border-2 text-black hover:bg-black hover:text-white"
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#00F2EA"
                  d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
                />
                <path
                  fill="#FF004F"
                  d="M12.53.02c0 4.02-.02 8.04.02 12.06-.01 1.79.03 3.58-.07 5.36-.01.39-.22.73-.41 1.06-.58.95-1.65 1.6-2.77 1.61-1.68.15-3.26-1.23-3.5-2.87-.01-.54-.07-1.1.14-1.61.25-.71.73-1.34 1.36-1.75.87-.6 2.03-.69 3.02-.37 0-1.48.06-2.96.04-4.44-2.17-.41-4.49.28-6.15 1.72-1.46 1.24-2.4 3.06-2.58 4.96-.02.49-.01.99.01 1.49.21 2.34 1.63 4.52 3.65 5.71 1.22.72 2.65 1.11 4.08 1.03 2.33-.04 4.6-1.29 5.91-3.21.81-1.15 1.27-2.54 1.35-3.94.03-2.91.01-5.83.02-8.75.52.34 1.05.67 1.62.93 1.31.62 2.76.92 4.2.97v-4.03c-1.54-.17-3.12-.68-4.24-1.79-1.12-1.08-1.67-2.64-1.75-4.17-1.3.01-2.6 0-3.91.02z"
                />
              </svg>
              TIKTOK
            </Button>

            <Button
              variant="outline"
              className="h-12 rounded-full border-2 text-[#E4405F] hover:bg-[#E4405F] hover:text-white"
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <linearGradient id="a" gradientTransform="matrix(1 0 0 -1 0 -22)" gradientUnits="userSpaceOnUse" x1="5.457" x2="18.543" y1="-34.457" y2="-47.543">
                  <stop offset="0" stopColor="#ffd600" />
                  <stop offset=".5" stopColor="#ff0100" />
                  <stop offset="1" stopColor="#d800b9" />
                </linearGradient>
                <path fill="url(#a)" d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
              </svg>
              INSTAGRAM
            </Button>
          </Box>

          <TextComponent className="text-center space-y-2 text-sm text-gray-400 pt-4"
            text=" En vous connectant à QuizWiz, vous acceptez nos conditions et notre politique de confidentialit            This site is protected by reCAPTCHA Enterprise and the Google Privacy Policy and Terms of Service apply."
          />
          
        </form>
{/* Section Droite avec la Mascotte et le Message */}
      <Box className="flex flex-col items-center justify-center w-full h-full gap-10">
        <TravelDialog description="Choisissez un cours et une matière, puis cliquez sur Commencer." imageSrc={"IMAGES/Whiskers_gentel.png"} alt="Whiskers" imagePosition="right" />
      </Box>      </Box>
    </Box>
  )
}

