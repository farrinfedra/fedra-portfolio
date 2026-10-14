import katex from "katex";
import "katex/dist/katex.min.css";
import DiffusionField from "./diffusion-field";
import Float from "./float";
import Trajectory from "./trajectory";

// Rendered on the server, so KaTeX never ships to the browser.
const tex = (src: string) =>
  katex.renderToString(src, {
    throwOnError: false,
    macros: { "\\bm": "\\boldsymbol{#1}", "\\x": "\\mathbf{x}", "\\u": "\\mathbf{u}" },
  });

// Equations taken from the papers, positioned in % of the board.
const equations = [
  {
    src: "\\u_t^{*} = g(t)\\,w_T\\,\\nabla_{\\x_t}\\log \\mathbb{E}_{p(\\x_0\\mid\\x_t)}\\big[e^{-\\Phi(\\x_0)}\\big]",
    caption: "Variational Control · ICML ’25",
    pos: { top: "1%", left: "0%" },
  },
  {
    src: "q(\\x_{t-1}\\mid\\x_t,\\u_t) = p(\\x_{t-1}\\mid\\x_t+\\gamma\\u_t)",
    caption: "Hierarchical Variational Policies · NeurIPS ’26",
    pos: { top: "13%", right: "0%" },
    align: "right",
  },
  {
    src: "\\mathcal{P}^{*}\\propto\\mathcal{Q}\\cdot\\exp\\!\\Big(-\\tfrac{1}{\\beta}\\textstyle\\sum_{\\tau}\\Phi(\\x_\\tau;\\mathbf{y}_\\tau)\\Big)",
    caption: "Data Assimilation · NeurIPS ’26",
    pos: { bottom: "12%", left: "0%" },
  },
  {
    src: "t_k = f_P(t_{<i};\\,u_i,\\dots,u_k)",
    caption: "Parallel Token Prediction · ICLR ’26",
    pos: { bottom: "0%", right: "0%" },
    align: "right",
  },
] as const;

const labels = [
  { src: "\\x_T\\sim\\mathcal{N}(\\mathbf{0},\\mathbf{I})", pos: { top: "22%", left: "4%" }, accent: true },
  { src: "\\x_0", pos: { top: "48%", left: "79%" }, accent: false },
  { src: "\\u_t", pos: { top: "57%", left: "70%" }, accent: false },
];

export default function ResearchBoard() {
  return (
    <div aria-hidden className="relative aspect-square w-full select-none">
      {/* graph paper, fading out toward the edges */}
      <div
        className="absolute -inset-6 rounded-[2rem]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(var(--ink) / 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--ink) / 0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse at center, black 35%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 35%, transparent 72%)",
        }}
      />

      <DiffusionField className="absolute left-[27%] top-[29%] h-[46%] w-[46%]" />
      <Trajectory className="absolute inset-0 h-full w-full" />

      {labels.map((l, i) => (
        <Float
          key={l.src}
          delay={0.9 + i * 0.15}
          drift={2}
          duration={6 + i}
          className={`absolute text-[0.85rem] ${l.accent ? "text-accent" : "text-ink/60"}`}
          style={l.pos}
        >
          <span dangerouslySetInnerHTML={{ __html: tex(l.src) }} />
        </Float>
      ))}

      {equations.map((eq, i) => (
        <Float
          key={eq.caption}
          delay={0.3 + i * 0.12}
          duration={7 + i * 0.8}
          className={`absolute max-w-[75%] ${"align" in eq ? "text-right" : ""}`}
          style={eq.pos}
        >
          <div
            className="text-[0.95rem] leading-none text-ink/80"
            dangerouslySetInnerHTML={{ __html: tex(eq.src) }}
          />
          <p className="mt-2 font-mono text-[0.62rem] tracking-normal text-faint">{eq.caption}</p>
        </Float>
      ))}
    </div>
  );
}
