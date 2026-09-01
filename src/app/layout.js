import "./globals.css"
import { AppProvider } from "@/context/AppContext"

export const metadata = {
  title: "GLOBY Fun Quest - Học Tiếng Anh & Tiếng Trung Qua Cử Chỉ Đầu",
  description: "Trò chơi học từ vựng tiếng Anh (Cambridge) và tiếng Trung (HSK) thông minh, miễn phí cho trẻ em. Bé nghiêng đầu trái/phải để tương tác cùng webcam.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}

