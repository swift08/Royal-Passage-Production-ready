import { Link, useRouter } from "@tanstack/react-router";
import { Home, LogOut, Menu, UserRound } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import logoUrl from "@/assets/logo/logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuthUser } from "@/lib/auth-user";
import { getSupabaseBrowser } from "@/lib/supabase/browser";

export function Header() {
  const [elevated, setElevated] = useState(false);
  const { displayName, user } = useAuthUser();
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await getSupabaseBrowser().auth.signOut();
      await router.invalidate();
      void router.navigate({ to: "/" });
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 w-full border-b border-[oklch(0.88_0.08_86_/_0.22)]"
      initial={false}
      animate={{
        backgroundColor: elevated ? "oklch(0.17 0.08 22 / 0.88)" : "oklch(0.15 0.07 22 / 0.58)",
        backdropFilter: elevated ? "blur(22px) saturate(1.35)" : "blur(16px) saturate(1.15)",
        boxShadow: elevated
          ? "0 1px 0 oklch(0.78 0.1 78 / 0.18), inset 0 1px 0 oklch(0.92 0.05 82 / 0.08), 0 20px 50px -24px oklch(0.05 0.04 18 / 0.55)"
          : "0 0 0 transparent",
        borderColor: elevated ? "oklch(0.76 0.1 78 / 0.38)" : "oklch(0.72 0.09 78 / 0.18)",
      }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container-page flex h-[var(--header-height)] items-center justify-between gap-3 sm:gap-6">
        <Link
          to="/"
          className="flex shrink-0 items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember/60"
        >
          <img
            src={logoUrl}
            alt="The Royal Passage"
            width={320}
            height={110}
            decoding="async"
            fetchPriority="high"
            className="h-9 w-auto object-contain object-left drop-shadow-[0_0_28px_oklch(0.75_0.12_86_/_0.45)] sm:h-12 md:h-16 lg:h-20"
          />
        </Link>
        <nav className="hidden items-center gap-5 text-sm md:flex md:gap-7">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "inline-flex items-center gap-1.5 text-ember" }}
            title="Home"
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <Link
            to="/experiences"
            className="text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "text-ember" }}
          >
            Experiences
          </Link>
          <Link
            to="/hosts"
            className="hidden text-muted-foreground transition-colors hover:text-foreground sm:inline"
            activeProps={{ className: "text-ember" }}
          >
            For Hosts
          </Link>
          <Link
            to="/journal"
            className="hidden text-muted-foreground transition-colors hover:text-foreground md:inline"
            activeProps={{ className: "text-ember" }}
          >
            Journal
          </Link>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="glass glass-hover glass-hover-active inline-flex items-center gap-2 rounded-sm border border-[oklch(0.88_0.08_86_/_0.35)] px-4 py-2.5 text-sm text-foreground transition-colors hover:border-ember/50 hover:text-ember"
                >
                  <UserRound className="h-4 w-4" />
                  <span className="max-w-28 truncate">{displayName ?? "Account"}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem asChild>
                  <Link to="/sign-in" className="cursor-pointer">
                    <UserRound className="h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => {
                    void handleLogout();
                  }}
                  disabled={loggingOut}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  {loggingOut ? "Logging out..." : "Logout"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to="/sign-in"
              className="glass glass-hover glass-hover-active inline-flex items-center rounded-sm border border-[oklch(0.88_0.08_86_/_0.35)] px-4 py-2.5 text-sm text-foreground transition-colors hover:border-ember/50 hover:text-ember"
            >
              Sign in
            </Link>
          )}
        </nav>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                className="glass glass-hover inline-flex items-center justify-center rounded-sm border border-[oklch(0.88_0.08_86_/_0.35)] p-2.5 text-foreground"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[88vw] border-[oklch(0.72_0.09_78_/_0.22)] bg-[oklch(0.14_0.05_22)] text-foreground"
            >
              <SheetHeader>
                <SheetTitle className="font-display text-xl">The Royal Passage</SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-2">
                <SheetClose asChild>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 rounded-sm px-3 py-2.5 text-base hover:bg-white/5"
                  >
                    <Home className="h-4 w-4" />
                    Home
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to="/experiences"
                    className="rounded-sm px-3 py-2.5 text-base hover:bg-white/5"
                  >
                    Experiences
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/hosts" className="rounded-sm px-3 py-2.5 text-base hover:bg-white/5">
                    For Hosts
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/journal" className="rounded-sm px-3 py-2.5 text-base hover:bg-white/5">
                    Journal
                  </Link>
                </SheetClose>

                <div className="my-3 h-px bg-border/60" />

                {user ? (
                  <>
                    <SheetClose asChild>
                      <Link
                        to="/sign-in"
                        className="inline-flex items-center gap-2 rounded-sm px-3 py-2.5 text-base hover:bg-white/5"
                      >
                        <UserRound className="h-4 w-4" />
                        {displayName ?? "Profile"}
                      </Link>
                    </SheetClose>
                    <button
                      type="button"
                      onClick={() => {
                        void handleLogout();
                      }}
                      disabled={loggingOut}
                      className="inline-flex items-center gap-2 rounded-sm px-3 py-2.5 text-left text-base text-destructive hover:bg-white/5 disabled:opacity-70"
                    >
                      <LogOut className="h-4 w-4" />
                      {loggingOut ? "Logging out..." : "Logout"}
                    </button>
                  </>
                ) : (
                  <SheetClose asChild>
                    <Link
                      to="/sign-in"
                      className="rounded-sm px-3 py-2.5 text-base hover:bg-white/5"
                    >
                      Sign in
                    </Link>
                  </SheetClose>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
