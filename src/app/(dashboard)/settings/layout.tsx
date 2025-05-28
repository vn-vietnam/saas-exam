import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account settings",
}

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 