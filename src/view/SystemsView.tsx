const ROWS: { bar: string; falls: string; spikes: string }[] = [
  { bar: "IRGC", falls: "Purge check. Soft move under 35 is a funeral. Under 20 you die even on a hard move.", spikes: "They lock soft options. Enrichment and proxies become the only legal moves." },
  { bar: "Leader", falls: "Withholds the veto, or picks a replacement. Two sidelines in a row is a loss.", spikes: "Blesses the hard line. Reform options vanish." },
  { bar: "Street", falls: "Protest heat. Hijab and prices become next-card problems.", spikes: "Revolt check. You can crush it only by paying IRGC." },
  { bar: "My party", falls: "Primary threat, then election loss.", spikes: "More rope and worse speeches." },
  { bar: "Opposing", falls: "They are weak. You still own the war.", spikes: "They take the White House." },
  { bar: "US media", falls: "Your version of the card dies in an hour.", spikes: "The card becomes the only story, usually the violent one." },
  { bar: "CIA", falls: "Credibility falls. The archive raid is what egg on a face looks like.", spikes: "They get to overpromise again." },
  { bar: "Saudis", falls: "They shop a different protector.", spikes: "Checks. Patriots. Not first." },
  { bar: "Europeans", falls: "They run to a deal you cannot live with.", spikes: "They sell, delay, and issue a statement." },
  { bar: "China", falls: "The swap looks expensive. Refill slows.", spikes: "Oil-for-parts ignores a slice of sanctions." },
  { bar: "Venezuela", falls: "The western tap is not worth the headache.", spikes: "Caracas risks more barrels for Tehran." },
];

export function SystemsView() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <p className="font-mono text-2xs uppercase tracking-[0.18em] text-muted">Systems</p>
        <h1 className="mt-1 font-serif text-3xl font-semibold text-fg">Bars, clocks, graves</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          50 means this faction will live with you for one more round. The number is how much they
          will tolerate you, not how much they like America or Islam. Sentiment decides who is
          allowed to touch the clocks. The hidden map decides whether the touch works.
        </p>
      </header>

      <div className="overflow-x-auto rounded-[var(--radius-lg)] bg-surface shadow-border">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="text-2xs uppercase tracking-wider text-muted">
            <tr className="border-b border-border">
              <th className="px-4 py-3 font-medium">Bar</th>
              <th className="px-4 py-3 font-medium">If it falls</th>
              <th className="px-4 py-3 font-medium">If it spikes</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.bar} className="border-b border-border/70 align-top last:border-0">
                <td className="px-4 py-3 font-mono text-xs text-fg">{row.bar}</td>
                <td className="px-4 py-3 text-muted">{row.falls}</td>
                <td className="px-4 py-3 text-muted">{row.spikes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-[var(--radius-lg)] bg-surface p-5 shadow-border">
          <h2 className="font-serif text-lg text-fg">Urban liberals</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            A clock, not a gun bar. White Revolution and the Tehran boom raise it. 1979 spends it.
            Feminists and National Front types can fill a square. They cannot hold a barracks.
            Khomeini uses them against the Shah, then kills them as a constituency. That is the
            point of tracking them.
          </p>
        </article>
        <article className="rounded-[var(--radius-lg)] bg-surface p-5 shadow-border">
          <h2 className="font-serif text-lg text-fg">Two clocks, not one</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            <span className="text-fg">nuke_breakout_months</span> is how long until a dash to a first
            device is a shop problem. <span className="text-fg">missile_inventory_months</span> is how
            long the cupboard lasts if you fire at the current card's rate. Zero on the nuke clock is
            a splat ending, not a weekly button.
          </p>
        </article>
        <article className="rounded-[var(--radius-lg)] bg-surface p-5 shadow-border">
          <h2 className="font-serif text-lg text-fg">Hard currency</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Centrifuges do not take rials. They take dollars, yuan, and gold. Oil fills this bar.
            Sanctions drain it. Nuke accel drains it faster than missiles. When it is low, Street
            falls next card even if you won the volley.
          </p>
        </article>
        <article className="rounded-[var(--radius-lg)] bg-surface p-5 shadow-border">
          <h2 className="font-serif text-lg text-fg">Iran grave</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            You are not the IRGC. Soft move and IRGC under 35: they kill you. IRGC under 20 even on a
            hard move: you were already the wrong man. Leader under 25 with IRGC still standing:
            sidelined. Twice is also a loss.
          </p>
        </article>
        <article className="rounded-[var(--radius-lg)] bg-surface p-5 shadow-border">
          <h2 className="font-serif text-lg text-fg">US grave</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Election years sit on the rail. If opposing is ahead by more than 10, you lose the chair.
            Tie goes to incumbency only if media is at least 45 and oil pain is not red. You can do
            the smart thing and still get sent home because the clip was a tanker on fire.
          </p>
        </article>
      </section>

      <section className="rounded-[var(--radius-lg)] bg-surface p-5 shadow-border">
        <h2 className="font-serif text-lg text-fg">Time travel</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Dead ends are mechanical. Back one card, or back to the last significant branch point off
          the golden path. The engine stores snapshots, not a forked universe. After a grave, rewind.
        </p>
      </section>

      <section className="rounded-[var(--radius-lg)] bg-surface p-5 shadow-border">
        <h2 className="font-serif text-lg text-fg">Who is on stage in Tehran</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Proposed freeze, open for your cut. Leader owns legitimacy (Khomeini, then Khamenei). IRGC
          owns guns and later the economy. Artesh is the Shah leftover, distrusted, not a bar until
          we understand it. The president is the player, replaceable. Street is not a
          government-in-waiting. 1953 has no IRGC. That chair is Mossadegh.
        </p>
      </section>
    </div>
  );
}
