import { Button } from "@/components/ui/button";

function App() {
    return (
        <div className="flex h-screen items-center justify-center bg-slate-50">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-primary">
                    English Learning App 🚀
                </h1>
                <p className="text-muted-foreground">Ready to learn with AI?</p>
                <div className="flex gap-2 justify-center">
                    <Button>Get Started</Button>
                    <Button variant="outline">Learn More</Button>
                </div>
            </div>
        </div>
    );
}

export default App;
