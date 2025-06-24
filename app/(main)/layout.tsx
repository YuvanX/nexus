import { AppBar } from "@/components/app-bar";

export default function Mainlayout({ children }: { children: React.ReactNode }) {
    return <div>
        <AppBar />
        {children}
    </div>
}