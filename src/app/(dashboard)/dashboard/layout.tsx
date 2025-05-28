import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your personal dashboard",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 