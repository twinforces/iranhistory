import type { Locale } from "./types.ts";

export interface SystemRow {
  bar: string;
  falls: string;
  spikes: string;
}

export interface SystemArticle {
  title: string;
  body: string;
}

const EN = {
  rows: [
    {
      bar: "IRGC",
      falls: "Purge check. Soft move under 35 is a funeral. Under 20 you die even on a hard move.",
      spikes: "They lock soft options. Enrichment and proxies become the only legal moves.",
    },
    {
      bar: "Leader",
      falls: "Withholds the veto, or picks a replacement. Two sidelines in a row is a loss.",
      spikes: "Blesses the hard line. Reform options vanish.",
    },
    {
      bar: "Street",
      falls: "Protest heat. Hijab and prices become next-card problems.",
      spikes: "Revolt check. You can crush it only by paying IRGC.",
    },
    {
      bar: "My party",
      falls: "Primary threat, then election loss.",
      spikes: "More rope and worse speeches.",
    },
    {
      bar: "Opposing",
      falls: "They are weak. You still own the war.",
      spikes: "They take the White House.",
    },
    {
      bar: "US media",
      falls: "Your version of the card dies in an hour.",
      spikes: "The card becomes the only story, usually the violent one.",
    },
    {
      bar: "CIA",
      falls: "Credibility falls. The archive raid is what egg on a face looks like.",
      spikes: "They get to overpromise again.",
    },
    {
      bar: "Saudis",
      falls: "They shop a different protector.",
      spikes: "Checks. Patriots. Not first.",
    },
    {
      bar: "Europeans",
      falls: "They run to a deal you cannot live with.",
      spikes: "They sell, delay, and issue a statement.",
    },
    {
      bar: "China",
      falls: "The swap looks expensive. Refill slows.",
      spikes: "Oil-for-parts ignores a slice of sanctions.",
    },
    {
      bar: "Venezuela",
      falls: "The western tap is not worth the headache.",
      spikes: "Caracas risks more barrels for Tehran.",
    },
  ] as const satisfies readonly SystemRow[],
  articles: [
    {
      title: "Urban liberals",
      body: "A clock, not a gun bar. White Revolution and the Tehran boom raise it. 1979 spends it. Feminists and National Front types can fill a square. They cannot hold a barracks. Khomeini uses them against the Shah, then kills them as a constituency. That is the point of tracking them.",
    },
    {
      title: "Two clocks, not one",
      body: "nuke_breakout_months is how long until a dash to a first device is a shop problem. missile_inventory_months is how long the cupboard lasts if you fire at the current card's rate. Zero on the nuke clock is a splat ending, not a weekly button.",
    },
    {
      title: "Hard currency",
      body: "Centrifuges do not take rials. They take dollars, yuan, and gold. Oil fills this bar. Sanctions drain it. Nuke accel drains it faster than missiles. When it is low, Street falls next card even if you won the volley.",
    },
    {
      title: "Iran grave",
      body: "You are not the IRGC. Soft move and IRGC under 35: they kill you. IRGC under 20 even on a hard move: you were already the wrong man. Leader under 25 with IRGC still standing: sidelined. Twice is also a loss.",
    },
    {
      title: "US grave",
      body: "Election years sit on the rail. If opposing is ahead by more than 10, you lose the chair. Tie goes to incumbency only if media is at least 45 and oil pain is not red. You can do the smart thing and still get sent home because the clip was a tanker on fire.",
    },
    {
      title: "Time travel",
      body: "Dead ends are mechanical. Back one card, or back to the last significant branch point off the golden path. The engine stores snapshots, not a forked universe. After a grave, rewind.",
    },
    {
      title: "Who is on stage in Tehran",
      body: "Proposed freeze, open for your cut. Leader owns legitimacy (Khomeini, then Khamenei). IRGC owns guns and later the economy. Artesh is the Shah leftover, distrusted, not a bar until we understand it. The president is the player, replaceable. Street is not a government-in-waiting. 1953 has no IRGC. That chair is Mossadegh.",
    },
  ] as const satisfies readonly SystemArticle[],
};

const FA = {
  rows: [
    {
      bar: "سپاه",
      falls: "چک تصفیه. حرکت نرم زیر ۳۵ تشییع است. زیر ۲۰ حتی روی حرکت سخت می‌میری.",
      spikes: "گزینه‌های نرم را قفل می‌کنند. غنی‌سازی و نیابتی تنها حرکت‌های قانونی می‌شوند.",
    },
    {
      bar: "رهبر",
      falls: "وتو را نگه می‌دارد، یا جایگزین برمی‌دارد. دو بار کنار گذاشتن پشت هم باخت است.",
      spikes: "خط سخت را تبرک می‌کند. گزینه‌های اصلاح ناپدید می‌شوند.",
    },
    {
      bar: "خیابان",
      falls: "حرارت اعتراض. حجاب و قیمت کارت بعد مسئله می‌شوند.",
      spikes: "چک شورش. فقط با پرداخت به سپاه می‌کوبی.",
    },
    {
      bar: "حزب من",
      falls: "تهدید درون‌حزبی، بعد باخت انتخابات.",
      spikes: "طناب بیشتر و نطق بدتر.",
    },
    {
      bar: "مخالف",
      falls: "ضعیف‌اند. جنگ هنوز مال توست.",
      spikes: "کاخ سفید را می‌گیرند.",
    },
    {
      bar: "رسانهٔ آمریکا",
      falls: "نسخهٔ تو از کارت در یک ساعت می‌میرد.",
      spikes: "کارت تنها داستان می‌شود، معمولاً نسخهٔ خشن.",
    },
    {
      bar: "سیا",
      falls: "اعتبار می‌افتد. یورش به بایگانی همان تخم‌مرغ روی صورت است.",
      spikes: "باز هم می‌توانند زیاد قول بدهند.",
    },
    {
      bar: "سعودی‌ها",
      falls: "محافظ دیگری می‌خرند.",
      spikes: "چک. وطن‌پرست. اول نمی‌روند.",
    },
    {
      bar: "اروپایی‌ها",
      falls: "به معامله‌ای می‌دوند که با آن زنده نمی‌مانی.",
      spikes: "می‌فروشند، تأخیر می‌کنند، بیانیه می‌دهند.",
    },
    {
      bar: "چین",
      falls: "معاوضه گران به نظر می‌رسد. پر کردن کند می‌شود.",
      spikes: "نفت در برابر قطعه بخشی از تحریم را نادیده می‌گیرد.",
    },
    {
      bar: "ونزوئلا",
      falls: "شیر غربی به دردسرش نمی‌ارزد.",
      spikes: "کاراکاس برای تهران بشکهٔ بیشتری ریسک می‌کند.",
    },
  ] as const satisfies readonly SystemRow[],
  articles: [
    {
      title: "لیبرال‌های شهری",
      body: "ساعت است، نه نوار تفنگ. انقلاب سفید و رونق تهران بالا می‌برد. ۱۳۵۷ خرجش می‌کند. فمینیست‌ها و جبهه ملی می‌توانند میدان را پر کنند. پادگان را نگه نمی‌دارند. خمینی از آنها علیه شاه استفاده می‌کند، بعد به‌عنوان حوزه می‌کشدشان. به همین خاطر ردشان می‌کنیم.",
    },
    {
      title: "دو ساعت، نه یکی",
      body: "nuke_breakout_months یعنی تا دویدن به سوی اولین دستگاه مسئلهٔ کارگاه شود چقدر مانده. missile_inventory_months یعنی اگر با نرخ این کارت شلیک کنی قفسه چقدر دوام می‌آورد. صفر روی ساعت هسته‌ای پایان است، دکمهٔ هفتگی نیست.",
    },
    {
      title: "ارز سخت",
      body: "سانتریفیوژ ریال نمی‌گیرد. دلار، یوان، طلا می‌گیرد. نفت این نوار را پر می‌کند. تحریم خالی می‌کند. شتاب هسته‌ای سریع‌تر از موشک خالی می‌کند. وقتی کم است، خیابان کارت بعد می‌افتد حتی اگر رگبار را برده باشی.",
    },
    {
      title: "گور ایران",
      body: "تو سپاه نیستی. حرکت نرم و سپاه زیر ۳۵: می‌کشندت. سپاه زیر ۲۰ حتی روی حرکت سخت: از قبل مرد غلط بودی. رهبر زیر ۲۵ با سپاه ایستاده: کنار گذاشته می‌شوی. دو بار هم باخت است.",
    },
    {
      title: "گور آمریکا",
      body: "سال‌های انتخابات روی ریل‌اند. اگر مخالف بیش از ۱۰ جلو باشد صندلی را می‌بازی. تساوی فقط اگر رسانه حداقل ۴۵ باشد و درد نفت قرمز نباشد به مستقر می‌رسد. می‌توانی کار هوشمند را بکنی و باز هم به خانه فرستاده شوی چون کلیپ نفتکش آتش است.",
    },
    {
      title: "سفر در زمان",
      body: "بن‌بست‌ها مکانیکی‌اند. یک کارت عقب، یا تا آخرین انشعاب مهم خارج از مسیر طلایی. موتور عکس فوری نگه می‌دارد، جهان شاخه‌دار نه. بعد از گور، برگرد.",
    },
    {
      title: "چه کسی روی صحنهٔ تهران است",
      body: "پیشنهاد فریز، برای برش تو باز است. رهبر مشروعیت را دارد (خمینی، بعد خامنه‌ای). سپاه تفنگ و بعداً اقتصاد را دارد. ارتش باقی‌ماندهٔ شاه است، بی‌اعتماد، تا وقتی نفهمیم‌اش نوار نیست. رئیس‌جمهور بازیکن است، قابل تعویض. خیابان دولت در انتظار نیست. ۱۳۳۲ سپاه ندارد. آن صندلی مصدق است.",
    },
  ] as const satisfies readonly SystemArticle[],
};

export function systemsCopy(locale: Locale) {
  return locale === "fa" ? FA : EN;
}
