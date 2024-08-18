import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.sass";

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: "GitHub Repo Finder",
    description: "GitHub repositories finder",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <body className={roboto.className}>{children}</body>
        </html>
    );
}
