export function Navbar() {
  return (
    <header className="h-16 border-b bg-card px-6 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Buenos días, Dr. León</h2>
        <p className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString("es-MX", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </header>
  )
}
