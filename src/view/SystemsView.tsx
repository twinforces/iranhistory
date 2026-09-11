import { systemsCopy } from "../i18n/systems.ts";
import { useLocale } from "./LocaleContext.tsx";

export function SystemsView() {
  const { locale, t } = useLocale();
  const copy = systemsCopy(locale);
  return (
    <div className="flex flex-col gap-8">
      <header>
        <p className="kicker">{t("systemsKicker")}</p>
        <h1 className="mt-1 font-serif text-3xl font-semibold text-fg">{t("systemsTitle")}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{t("systemsLead")}</p>
      </header>

      <div className="overflow-x-auto rounded-[var(--radius-lg)] bg-surface shadow-border">
        <table className="w-full min-w-[640px] text-start text-sm">
          <thead className="text-2xs uppercase tracking-wider text-muted">
            <tr className="border-b border-border">
              <th className="px-4 py-3 font-medium">{t("bar")}</th>
              <th className="px-4 py-3 font-medium">{t("ifFalls")}</th>
              <th className="px-4 py-3 font-medium">{t("ifSpikes")}</th>
            </tr>
          </thead>
          <tbody>
            {copy.rows.map((row) => (
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
        {copy.articles.slice(0, 5).map((article) => (
          <article key={article.title} className="rounded-[var(--radius-lg)] bg-surface p-5 shadow-border">
            <h2 className="font-serif text-lg text-fg">{article.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{article.body}</p>
          </article>
        ))}
      </section>

      {copy.articles.slice(5).map((article) => (
        <section key={article.title} className="rounded-[var(--radius-lg)] bg-surface p-5 shadow-border">
          <h2 className="font-serif text-lg text-fg">{article.title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{article.body}</p>
        </section>
      ))}
    </div>
  );
}
