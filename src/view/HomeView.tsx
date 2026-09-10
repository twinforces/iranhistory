import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { GITHUB_REPO } from "../model/constants.ts";
import { CHAIR_ART } from "./portraits.ts";

export function HomeView() {
  return (
    <div className="flex flex-col gap-8">
      <section className="dossier px-5 py-6 sm:px-8 sm:py-8">
        <p className="font-mono text-2xs uppercase tracking-[0.18em] text-ink/55">
          A time travel simulation
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Two regimes, one rail, no solve button.
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink/80">
          What people think this is about: a morality play. Either theocratic psychos racing for a
          bomb, or Washington and Tel Aviv never let Iran be a normal country.
        </p>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink/80">
          What the machinery is actually doing: two regimes optimizing for survival under bad maps.
          The buttons look simple. Sitting the chair is not.
        </p>
        <p className="mt-4 font-serif text-sm italic text-ink/70">
          You sit the chair in 1953. Ajax is still a cable. The rail is not a recap.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Link
          to="/play"
          search={{ chair: "iran" }}
          className="chair-card chair-card-iran no-underline"
        >
          <img src={CHAIR_ART.iran} alt="" className="chair-card-art" />
          <span className="chair-card-body">
            <span className="kicker text-ink/55">Tehran</span>
            <span className="mt-1 block font-serif text-2xl font-semibold text-ink">Play as Iran</span>
            <span className="mt-2 block text-sm leading-relaxed text-ink/75">
              Mossadegh has the oil. London wants it back.
            </span>
          </span>
        </Link>
        <Link to="/play" search={{ chair: "us" }} className="chair-card chair-card-us no-underline">
          <img src={CHAIR_ART.us} alt="" className="chair-card-art" />
          <span className="chair-card-body">
            <span className="kicker">Washington</span>
            <span className="mt-1 block font-serif text-2xl font-semibold text-fg">Play as US</span>
            <span className="mt-2 block text-sm leading-relaxed text-muted">
              Eisenhower has not decided. CIA and MI6 would like a coup.
            </span>
          </span>
        </Link>
      </section>

      <section className="flex flex-col gap-3 sm:flex-row">
        <Button asChild variant="secondary">
          <Link to="/systems">Read the systems</Link>
        </Button>
        <Button asChild variant="ghost">
          <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer">
            GitHub repo
          </a>
        </Button>
      </section>
    </div>
  );
}
