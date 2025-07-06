import { type PropsWithChildren } from "react";
import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";
import "@/app/styles/globals.css"

type PageContent = PropsWithChildren

export const metadata = {
  title: "The Wild Oasis"
}

export default function RootLayout({children
}: PageContent) {
  return (
    <html lang="en">
      <body className="bg-primary-900 text-primary-100 min-h-screen">
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>
          {children}
        </main>

        <footer>Copyright by The Wild Oasis</footer>
      </body>
    </html>
  )
}