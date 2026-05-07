import logoUrl from "@/assets/logo/logo.png";

export function Footer() {
  return (
    <footer className="glass-strong mt-32 border-t border-[oklch(0.88_0.08_86_/_0.18)]">
      <div className="container-page grid gap-12 py-16 md:grid-cols-4 md:gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img
              src={logoUrl}
              alt=""
              width={140}
              height={42}
              className="h-10 w-auto object-contain drop-shadow-[0_0_18px_oklch(0.72_0.12_86_/_0.35)]"
            />
            <span className="font-display text-xl tracking-tight text-foreground">The Royal Passage</span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            A curated marketplace of premium, time-bound experiences hosted by verified artisans,
            chefs, and guides — glass, gold, and intention.
          </p>
        </div>
        <div className="text-sm">
          <div className="eyebrow mb-3 text-ember/90">Discover</div>
          <ul className="space-y-2.5 text-muted-foreground">
            <li className="transition-colors hover:text-ember">Experiences</li>
            <li className="transition-colors hover:text-ember">Cities</li>
            <li className="transition-colors hover:text-ember">Gift cards</li>
          </ul>
        </div>
        <div className="text-sm">
          <div className="eyebrow mb-3 text-ember/90">Company</div>
          <ul className="space-y-2.5 text-muted-foreground">
            <li className="transition-colors hover:text-ember">About</li>
            <li className="transition-colors hover:text-ember">For hosts</li>
            <li className="transition-colors hover:text-ember">Contact</li>
          </ul>
        </div>
      </div>
      <div className="container-page flex flex-wrap items-center justify-between gap-4 border-t border-[oklch(0.88_0.08_86_/_0.12)] pb-10 pt-8 text-xs text-muted-foreground">
        <span>© 2026 The Royal Passage</span>
        <span className="text-ember/80">Crafted with intention.</span>
      </div>
    </footer>
  );
}
