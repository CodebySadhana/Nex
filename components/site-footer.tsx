import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="text-muted-foreground mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm sm:flex-row sm:px-6">
        <p>Nex — open-source content engine for founders.</p>
        <nav className="flex items-center gap-4" aria-label="Footer navigation">
          <Link href="/about" className="hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="/generate" className="hover:text-foreground transition-colors">
            Generate
          </Link>
        </nav>
      </div>
    </footer>
  );
}
