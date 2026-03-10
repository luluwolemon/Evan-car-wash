import "./globals.css";

export const metadata = {
  title: "FreshFlow Car Wash",
  description: "Modern car wash booking website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}