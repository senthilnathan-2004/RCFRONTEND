import { Inter, Geist_Mono } from "next/font/google"
import { AuthProvider } from "@/contexts/auth-context"
import { ClubSettingsProvider } from "@/contexts/club-settings-context"
import { DynamicTitle } from "@/components/dynamic-title"
import "./globals.css"


const inter = Inter({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata = {
  title: "Rotaract Club Management System",
  description: "Complete club management system for Rotaract clubs - manage members, expenses, events, and more.",
  generator: 'v0.app'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        <AuthProvider>
          <ClubSettingsProvider>
            <DynamicTitle />
            {children}
          </ClubSettingsProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
