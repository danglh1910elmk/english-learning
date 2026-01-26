// src/components/layout/Footer.jsx

export function Footer() {
    return (
        <footer className="border-t bg-slate-50 mt-auto">
            <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground text-center md:text-left">
                    © 2026 EnglishMaster. Build with ❤️ for English learners.
                </p>
                <div className="flex gap-4 text-sm text-muted-foreground">
                    <a href="#" className="hover:text-primary">
                        Terms
                    </a>
                    <a href="#" className="hover:text-primary">
                        Privacy
                    </a>
                    <a href="#" className="hover:text-primary">
                        Contact
                    </a>
                </div>
            </div>
        </footer>
    );
}
