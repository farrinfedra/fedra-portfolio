import Reveal from "./reveal";

export default function SectionHeading({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="mb-3 font-mono text-base font-bold tracking-[0.2em] text-accent">
          {index}
        </p>
        <h2 className="display text-5xl text-ink sm:text-6xl">
          {title}
        </h2>
      </div>
      {children}
    </Reveal>
  );
}
