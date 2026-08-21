export default function Footer() {
  return (
    <footer className="border-t bg-muted/20">
      <div className="mx-auto max-w-6xl px-6 py-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Task Manager
          </p>

          <p className="text-sm text-muted-foreground">
            Simple. Focused. Productive.
          </p>
        </div>
      </div>
    </footer>
  );
}
