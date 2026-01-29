// src/components/layout/Footer.jsx

export function Footer() {
    return (
        <footer className="flex justify-center border-t bg-slate-50 mt-auto px-6">
            <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground text-center md:text-left">
                    © 2026 EnglishMaster
                </p>
                <div className="flex gap-4 text-sm text-muted-foreground">
                    <a href="#" className="hover:text-primary">
                        Điều khoản
                    </a>
                    <a href="#" className="hover:text-primary">
                        Quyền riêng tư
                    </a>
                    <a href="#" className="hover:text-primary">
                        Liên hệ
                    </a>
                </div>
            </div>
        </footer>
    );
}
