import { QueryProvider } from "@/providers/query-provider"
import { ThemeProvider } from "@/providers/theme-provider"

export const Provider = ({ children }: { children: React.ReactNode }) => {
    return <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <QueryProvider>
            {children}
        </QueryProvider>
    </ThemeProvider>
}