import "./globals.css";
import { Toaster } from "sonner";

export const metadata = {
  title: "गणेश मंडळ वेब पोर्टल जनरेटर | Ganesh Mandal Web Portal",
  description: "आपल्या गणेशोत्सवासाठी स्वतःचे अधिकृत वेब पोर्टल तयार करा. गणपती बाप्पा मोरया!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="mr">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@300;400;500;600;700;800;900&family=Tiro+Devanagari+Marathi:italic@0;1&family=Rozha+One&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-screen bg-[#FFFDF9] text-gray-900 antialiased selection:bg-amber-200 selection:text-amber-900 font-marathi">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
