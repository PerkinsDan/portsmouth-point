import '@/styles/globals.css'

export const metadata = {
  title: 'Portsmouth Point - Admin',
  description: 'Admin panel for Portsmouth Point magazine',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
