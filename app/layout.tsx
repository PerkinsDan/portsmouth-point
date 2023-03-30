import './globals.css'

export const metadata = {
  title: 'Portsmouth Point',
  description: 'The official website of Portsmouth Point magazine',
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
