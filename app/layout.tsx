import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prometeo Studios | Automatiza tu clínica o inmobiliaria",
  description:
    "Automatiza tus citas, atención y ventas con IA. Resultados garantizados en 30 días. Más clientes, menos trabajo.",
  generator: "Next.js",
  icons: {
    icon: "/favicon-96x96-removebg-preview.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
