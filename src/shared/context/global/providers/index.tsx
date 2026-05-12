import { Toaster } from "sonner"
import ReactQueryProvider from "./components/react-query-provider"
import NextAuthProvider from "./components/next-auth-provider"
import { ThemeProvider } from "@/shared/components/theme-provider"
import { TooltipProvider } from "@/shared/components/ui/tooltip"
import { DirectionProvider } from "@base-ui/react"


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

                    <DirectionProvider direction="rtl">
                        <TooltipProvider>{children}</TooltipProvider>
                    </DirectionProvider>

                    

                </ThemeProvider>
            </NextAuthProvider>
        </ReactQueryProvider>
    )
}