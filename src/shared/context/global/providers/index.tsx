import { Toaster } from "sonner"
import ReactQueryProvider from "./components/react-query-provider"
import NextAuthProvider from "./components/next-auth-provider"
import { ThemeProvider } from "@/shared/components/theme-provider"


export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ReactQueryProvider>
            <NextAuthProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                        <Toaster position="top-right" richColors />

                        {children}
                </ThemeProvider>
            </NextAuthProvider>
        </ReactQueryProvider>
    )
}