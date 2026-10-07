import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedCounter } from "./AnimatedCounter";

type Day = { date: string; level: number; count: number };
type Calendar = { username: string; total: number; days: Day[] };

// Level 0-4 intensity, tinted with the green from the "Available for work" badge.
const levelColors = [
  "bg-white/[0.06]",
  "bg-[#0EC126]/25",
  "bg-[#0EC126]/50",
  "bg-[#0EC126]/75",
  "bg-[#0EC126]",
];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const formatDate = (iso: string) => {
  const d = new Date(`${iso}T00:00:00Z`);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
};

const GithubContributions = () => {
  const [data, setData] = useState<Calendar | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/github-contributions")
      .then((res) => (res.ok ? res.json() : null))
      .then((json: Calendar | null) => {
        if (!cancelled && json?.days?.length) setData(json);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  // Group days into week columns (Sunday-first), padding the first week so
  // each row lines up with its weekday.
  const weeks = useMemo(() => {
    if (!data) return [];
    const cols: (Day | null)[][] = [];
    const firstDow = new Date(`${data.days[0].date}T00:00:00Z`).getUTCDay();
    let week: (Day | null)[] = Array(firstDow).fill(null);
    for (const day of data.days) {
      week.push(day);
      if (week.length === 7) {
        cols.push(week);
        week = [];
      }
    }
    if (week.length) cols.push(week);
    return cols;
  }, [data]);

  // Label a column when its first real day starts a new month.
  const monthLabels = useMemo(
    () =>
      weeks.map((week, i) => {
        const first = week.find(Boolean);
        if (!first) return "";
        const month = Number(first.date.slice(5, 7)) - 1;
        const prev = weeks[i - 1]?.find(Boolean);
        const prevMonth = prev ? Number(prev.date.slice(5, 7)) - 1 : -1;
        return month !== prevMonth && i < weeks.length - 1 ? MONTHS[month] : "";
      }),
    [weeks],
  );

  // On narrow screens, start scrolled to the most recent weeks.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [weeks]);

  if (!data) return null;

  return (
    <section id="github" className="section bg-black text-white py-20">
      <div className="max-w-7xl mx-auto w-full space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="space-y-4">
            <h2 className="md:text-2xl lg:text-3xl font-consolas font-bold">
              GitHub Activity
            </h2>
            <p className="font-satoshi text-gray-400 leading-relaxed">
              <span className="text-white font-bold">
                <AnimatedCounter value={data.total.toLocaleString()} />
              </span>{" "}
              contributions in the last year
            </p>
          </div>
          <a
            href={`https://github.com/${data.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-consolas text-sm text-gray-500 uppercase tracking-widest transition-colors duration-300 hover:text-white"
          >
            @{data.username} ↗
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="group w-full bg-[#111111] border border-white/10 p-4 md:p-6 transition-colors duration-500 hover:border-[#0EC126]/30"
        >
          {/* Dimmed at rest on hover-capable screens; pops while hovered (see .gh-graph) */}
          <div className="gh-graph">
            <div ref={scrollRef} className="overflow-x-auto no-scrollbar">
              <div className="flex flex-col gap-2 min-w-[720px]">
                {/* Month labels */}
                <div className="flex gap-[3px] font-consolas text-[10px] text-gray-500">
                  {monthLabels.map((label, i) => (
                    <div key={i} className="flex-1 min-w-0 overflow-visible">
                      <span className="whitespace-nowrap">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Grid */}
                <div className="flex gap-[3px]">
                  {weeks.map((week, i) => (
                    <div key={i} className="flex-1 flex flex-col gap-[3px]">
                      {week.map((day, j) =>
                        day ? (
                          <div
                            key={day.date}
                            title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${formatDate(day.date)}`}
                            className={`w-full aspect-square rounded-[2px] ${levelColors[day.level] ?? levelColors[0]}`}
                          />
                        ) : (
                          <div
                            key={`pad-${j}`}
                            className="w-full aspect-square"
                          />
                        ),
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-2 pt-4 font-consolas text-[10px] text-gray-500">
              <span>Less</span>
              {levelColors.map((color, i) => (
                <div
                  key={i}
                  className={`w-[11px] h-[11px] rounded-[2px] ${color}`}
                />
              ))}
              <span>More</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GithubContributions;
