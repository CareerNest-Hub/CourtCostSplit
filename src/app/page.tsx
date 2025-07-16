import CourtCostSplitter from "@/components/court-cost-splitter";
import { LogoIcon } from "@/components/icons/logo-icon";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-start p-4 sm:p-8 md:p-12 bg-background">
       <div className="w-full max-w-4xl">
        <header className="mb-8 flex items-center gap-4">
          <div className="flex-shrink-0">
            <LogoIcon className="h-12 w-12 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-headline font-bold text-foreground">
              CourtCostSplit
            </h1>
            <p className="text-muted-foreground">
              Calculate and share badminton expenses with ease.
            </p>
          </div>
        </header>
        <CourtCostSplitter />
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CourtCostSplit. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
