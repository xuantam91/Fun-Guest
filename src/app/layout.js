import "./globals.css"
import { AppProvider } from "@/context/AppContext"

export const metadata = {
  title: "GLOBY Fun Quest - Bé Học Ngoại Ngữ & Toán Vui Cùng AI",
  description: "Trò chơi học từ vựng tiếng Anh (Cambridge), tiếng Trung (HSK) và Toán học thông minh cho trẻ em. Bé tương tác vui nhộn bằng cử chỉ nghiêng đầu qua camera.",
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.svg" />
      </head>
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
