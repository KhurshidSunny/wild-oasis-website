import { type PropsWithChildren } from "react";
import "@/app/styles/globals.css"
import {Josefin_Sans} from "next/font/google"
import Header from "./_components/Header";

const josifen = Josefin_Sans({
  subsets: ["latin"],
  display: "swap"
})

type PageContent = PropsWithChildren

export const metadata = {
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis"
  },
  description: "Luxurious cabin hotel, located in the heart of Naran, surrounded by beautiful mountains and dark forests"
}

export default function RootLayout({children
}: PageContent) {
  return (
    <html lang="en">
      <body className={`${josifen.className} bg-primary-900 text-primary-100 min-h-screen flex flex-col antialiased relative`}>
        <Header />
      <div className="flex-1 py-10 grid">
        <main className="bg-primary-900 max-w-6xl mx-auto w-full"  >
          {children}
        </main>
      </div>

      </body>
    </html>
  )
}