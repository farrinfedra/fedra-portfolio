import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-4 pb-10 pt-6 sm:px-6">
      <div className="flex flex-col gap-2 border-t border-line pt-6 font-mono text-xs text-faint sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>Irvine, California</p>
      </div>
    </footer>
  );
}
