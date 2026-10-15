// All site content lives here — edit this file to update papers, news, and links.

export const profile = {
  name: "Farrin Marouf Sofian",
  shortName: "Farrin Sofian",
  role: "Ph.D. Student in Computer Science",
  affiliation: "UC Irvine",
  email: "farrinsofian@gmail.com",
  cv: "/Farrin_CV.pdf",
  avatar: "/avatar.jpg",
  advisor: { name: "Stephan Mandt", url: "https://sites.uci.edu/mandt/" },
};

export const socials = {
  scholar: "https://scholar.google.com/citations?user=5tljxLMAAAAJ&hl=en",
  github: "https://github.com/farrinfedra",
  linkedin: "https://www.linkedin.com/in/farrin-marouf-sofian/",
  x: "https://x.com/farrinsofian",
};

export const navLinks = [
  { name: "About", id: "about" },
  { name: "News", id: "news" },
  { name: "Publications", id: "publications" },
  { name: "Contact", id: "contact" },
] as const;

// ---------------------------------------------------------------------------
// News
// kind: "paper" | "honor" | "career" — controls the small label next to each item.
// text supports light markup: **bold** and [link text](url).
// ---------------------------------------------------------------------------

export type NewsItem = {
  date: string;
  kind: "paper" | "honor" | "career";
  text: string;
  href?: string;
};

export const news: NewsItem[] = [
  {
    date: "Sep 2026",
    kind: "paper",
    text: "Two papers accepted to **NeurIPS 2026**: [Hierarchical Variational Policies for Reward-Guided Diffusion](https://arxiv.org/abs/2605.21661) and [Control-Augmented Autoregressive Diffusion for Data Assimilation](https://arxiv.org/abs/2510.06637).",
  },
  {
    date: "Jan 2026",
    kind: "paper",
    text: "[Parallel Token Prediction for Language Models](https://arxiv.org/abs/2512.21323) accepted to **ICLR 2026**.",
  },
  {
    date: "May 2025",
    kind: "paper",
    text: "[Variational Control for Guidance in Diffusion Models](https://arxiv.org/abs/2502.03686) accepted to **ICML 2025**.",
  },
  {
    date: "2025",
    kind: "honor",
    text: "Selected as an AI Resident at the Chan Zuckerberg Initiative.",
    href: "https://chanzuckerberg.com/",
  },
  {
    date: "Summer 2024",
    kind: "career",
    text: "Joined Adobe for the summer to work on LLMs.",
  },
  {
    date: "Sep 2023",
    kind: "career",
    text: "Started my Ph.D. in Computer Science at UC Irvine.",
  },
  {
    date: "2021–2023",
    kind: "honor",
    text: "Vehbi Koç Scholar at Koç University for outstanding academic performance.",
  },
];

// ---------------------------------------------------------------------------
// Publications
// Any link left out simply doesn't render. Set `arxivSoon: true` to show a
// greyed-out "arXiv soon" tag until the paper is posted.
// ---------------------------------------------------------------------------

export type Tag =
  | "Diffusion"
  | "LLMs"
  | "AI for Science"
  | "Inverse Problems";

export type Publication = {
  title: string;
  authors: string; // use * for equal contribution
  venue: string; // short label, e.g. "NeurIPS 2026"
  venueFull?: string;
  status: "published" | "preprint";
  oneLiner: string;
  abstract?: string;
  tags: Tag[];
  links: {
    arxiv?: string;
    arxivSoon?: boolean;
    github?: string;
    project?: string;
    blog?: string;
  };
};

export type PublicationGroup = {
  id: string;
  title: string;
  description: string;
  papers: Publication[];
};

export const publicationGroups: PublicationGroup[] = [
  {
    id: "foundation-models",
    title: "Foundation Model Training",
    description:
      "New model classes and training schemes for large diffusion and language models.",
    papers: [
      {
        title: "Representation-Augmented Diffusions",
        authors: "F. M. Sofian*, K. Pandey*, S. Mandt",
        venue: "Preprint 2026",
        status: "preprint",
        oneLiner:
          "A new class of diffusion models that are faster to train, faster to sample, and parameter-efficient, with a smooth latent space.",
        tags: ["Diffusion"],
        links: { arxivSoon: true },
      },
      {
        title: "Parallel Language Models via Variational Decoding",
        authors:
          "F. Draxler*, R. C. Geyer*, D. Geyfman*, F. M. Sofian*, J. Will*, et al.",
        venue: "Preprint 2026",
        status: "preprint",
        oneLiner:
          "Pre-training and post-training a large language model that decodes many tokens in parallel.",
        tags: ["LLMs"],
        links: { arxivSoon: true },
      },
      {
        title: "Parallel Token Prediction for Language Models",
        authors: "F. Draxler, J. Will, F. M. Sofian, T. Karaletsos, S. Mandt",
        venue: "ICLR 2026",
        venueFull: "International Conference on Learning Representations",
        status: "published",
        oneLiner:
          "Predicts several tokens in one forward pass by moving randomness into the model's inputs, giving a 2.4× speedup in speculative decoding.",
        abstract:
          "Autoregressive decoding in language models is inherently slow, generating only one token per forward pass. We propose Parallel Token Prediction (PTP), a general-purpose framework for predicting multiple tokens in a single model call. PTP moves the source of randomness from post-hoc sampling to random input variables, making future tokens deterministic functions of those inputs and thus jointly predictable in a single forward pass. We prove that a single PTP call can represent arbitrary dependencies between tokens. PTP is trained by distilling an existing model or through inverse autoregressive training without a teacher. Experimentally, PTP achieves a 2.4x speedup on a diverse-task speculative decoding benchmark.",
        tags: ["LLMs"],
        links: {
          arxiv: "https://arxiv.org/abs/2512.21323",
          github: "https://github.com/mandt-lab/ptp",
        },
      },
    ],
  },
  {
    id: "test-time-scaling",
    title: "Test-time Scaling & Reward Fine-tuning",
    description:
      "Steering pretrained diffusion models toward rewards and constraints — at inference time or through lightweight learned control.",
    papers: [
      {
        title: "Hierarchical Variational Policies for Reward-Guided Diffusion",
        authors: "K. Pandey*, F. M. Sofian*, J. Groeneveld, F. Draxler, S. Mandt",
        venue: "NeurIPS 2026",
        venueFull: "Neural Information Processing Systems",
        status: "published",
        oneLiner:
          "Amortizes test-time control into a lightweight stochastic policy, matching test-time scaling baselines at a fraction of the compute.",
        abstract:
          "Adapting pretrained diffusion models to downstream objectives such as inverse problems often requires expensive test-time guidance or optimization. We propose a principled framework for generating high-quality reward-aligned samples at substantially reduced inference cost. Our approach formulates test-time adaptation as a hierarchical variational model, where control is amortized into a lightweight yet expressive stochastic policy. This formulation naturally supports few-step diffusion sampling: large step sizes enable fast inference, while the learned policy maintains sample quality by providing structured per-step control. The resulting fully amortized sampler achieves a strong quality–speed tradeoff, matching or exceeding recent test-time scaling baselines while requiring significantly less compute. For example, on 4x super-resolution, our method achieves better perceptual quality with more than 5x faster inference compared to the best-performing baseline. We further extend our approach to a semi-amortized regime that combines cheap amortized proposals with limited test-time optimization, achieving state-of-the-art perceptual quality across several challenging inverse problems.",
        tags: ["Diffusion", "Inverse Problems"],
        links: { arxiv: "https://arxiv.org/abs/2605.21661" },
      },
      {
        title: "Control-Augmented Autoregressive Diffusion for Data Assimilation",
        authors: "P. Srivastava, F. M. Sofian, F. Immorlano, K. Pandey, S. Mandt",
        venue: "NeurIPS 2026",
        venueFull: "Neural Information Processing Systems",
        status: "published",
        oneLiner:
          "Adds an offline-trained controller to autoregressive diffusion models for fast, stable data assimilation in chaotic PDEs and weather.",
        abstract:
          "Despite advances in test-time scaling and diffusion finetuning, guidance for Auto-Regressive Diffusion Models (ARDMs) remains underexplored. We introduce an amortized framework that augments a pretrained ARDM with an offline-trained controller. By previewing future rollouts, the controller learns stepwise corrections that anticipate observations under a terminal-cost objective, yielding a reusable policy for guided generation. Motivated by a stochastic optimal control view of ARDM trajectories, our method injects small controls within each denoising sub-step while staying close to the pretrained dynamics. We study this approach for data assimilation (DA) in chaotic spatiotemporal partial differential equations (PDEs), where existing methods are often computationally expensive and susceptible to forecast drift under sparse observations. At inference, DA becomes a feed-forward rollout with on-the-fly corrections, achieving an order-of-magnitude speedup over strong diffusion-based baselines. Across two canonical PDEs and a compact ECMWF Reanalysis v5 (ERA5) pilot spanning six observation regimes, our method consistently improves stability and accuracy over state-of-the-art alternatives, with similar improvements observed in a larger-scale GenCast study.",
        tags: ["Diffusion", "AI for Science"],
        links: { arxiv: "https://arxiv.org/abs/2510.06637" },
      },
      {
        title: "Variational Test-time Optimization for Diffusion Synchronization",
        authors: "H. Lee*, F. M. Sofian*, K. Pandey, S. Mandt",
        venue: "Preprint 2026",
        status: "preprint",
        oneLiner:
          "Derives diffusion synchronization from optimal control to coordinate multiple diffusion trajectories at test time, with no extra training.",
        abstract:
          "Collaborative generation, which coordinates multiple diffusion trajectories to extend the capabilities of pretrained priors, has emerged as a powerful paradigm for extending the applicability of diffusion models. Among existing approaches, diffusion synchronization provides a scenario-agnostic solution by introducing general guidance mechanisms. However, current synchronization approaches rely heavily on heuristics and still require task-specific tailoring, which limits their generalizability and performance. In this work, we mathematically derive a synchronization framework based on optimal control, providing a principled explanation of diffusion synchronization. During sampling, we optimize control variables to guide multiple trajectories toward coherent solutions while remaining close to the underlying diffusion prior. Our method operates entirely at test-time without additional training, thereby enabling broad applicability across diverse generation scenarios when combined with strong pretrained priors. We demonstrate consistent improvements over baselines on three representative collaborative generation tasks, covering a wide range of modalities and applications.",
        tags: ["Diffusion"],
        links: { arxiv: "https://arxiv.org/pdf/2606.15614" },
      },
      {
        title: "Variational Control for Guidance in Diffusion Models",
        authors: "K. Pandey*, F. M. Sofian*, F. Draxler, T. Karaletsos, S. Mandt",
        venue: "ICML 2025",
        venueFull: "International Conference on Machine Learning",
        status: "published",
        oneLiner:
          "Unifies diffusion guidance as trajectory matching under variational control, reaching state of the art on inverse problems without retraining.",
        abstract:
          "Diffusion models exhibit excellent sample quality, but existing guidance methods often require additional model training or are limited to specific tasks. We revisit guidance in diffusion models from the perspective of variational inference and control, introducing Diffusion Trajectory Matching (DTM) that enables guiding pretrained diffusion trajectories to satisfy a terminal cost. DTM unifies a broad class of guidance methods and enables novel instantiations. We introduce a new method within this framework that achieves state-of-the-art results on several linear, non-linear, and blind inverse problems without requiring additional model training or specificity to pixel or latent space diffusion models.",
        tags: ["Diffusion", "Inverse Problems"],
        links: {
          arxiv: "https://arxiv.org/abs/2502.03686",
          github: "https://github.com/czi-ai/oc-guidance",
        },
      },
    ],
  },
  {
    id: "earlier-work",
    title: "Earlier Work",
    description: "Multimodal generation and NLP from my undergraduate research at Koç University.",
    papers: [
      {
        title:
          "SonicDiffusion: Audio-Driven Image Generation and Editing with Pretrained Diffusion Models",
        authors:
          "B. C. Biner, F. M. Sofian, U. B. Karakaş, D. Ceylan, E. Erdem, et al.",
        venue: "Preprint 2024",
        status: "preprint",
        oneLiner:
          "Conditions pretrained image diffusion models on audio, enabling sound-driven image generation and editing.",
        abstract:
          "We are witnessing a revolution in conditional image synthesis with the recent success of large scale text-to-image generation methods. This success also opens up new opportunities in controlling the generation and editing process using multi-modal input. While spatial control using cues such as depth, sketch, and other images has attracted a lot of research, we argue that another equally effective modality is audio since sound and sight are two main components of human perception. Hence, we propose a method to enable audio-conditioning in large scale image diffusion models. Our method first maps features obtained from audio clips to tokens that can be injected into the diffusion model in a fashion similar to text tokens. We introduce additional audio-image cross attention layers which we finetune while freezing the weights of the original layers of the diffusion model. In addition to audio conditioned image generation, our method can also be utilized in conjunction with diffusion based editing methods to enable audio conditioned image editing.",
        tags: ["Diffusion"],
        links: {
          arxiv: "https://arxiv.org/abs/2405.00878",
          github: "https://github.com/BurakCanBiner/SonicDiffusion",
        },
      },
      {
        title:
          "GECTurk: Grammatical Error Correction and Detection Dataset for Turkish",
        authors: "A. Kara, F. M. Sofian, A. Bond, G. G. Sahin",
        venue: "IJCNLP-AACL 2023",
        status: "published",
        oneLiner:
          "The first large-scale dataset and baselines for Turkish grammatical error correction and detection.",
        abstract:
          "Grammatical Error Detection and Correction (GEC) tools have proven useful for native speakers and second language learners. Developing such tools requires a large amount of parallel, annotated data, which is unavailable for most languages. Synthetic data generation is a common practice to overcome the scarcity of such data. However, it is not straightforward for morphologically rich languages like Turkish due to complex writing rules that require phonological, morphological, and syntactic information. In this work, we present a flexible and extensible synthetic data generation pipeline for Turkish covering more than 20 expert-curated grammar and spelling rules implemented through complex transformation functions. Using this pipeline, we derive 130,000 high-quality parallel sentences from professionally edited articles. Additionally, we create a more realistic test set by manually annotating a set of movie reviews. We implement three baselines formulating the task as neural machine translation, sequence tagging, and prefix tuning with a pretrained decoder-only model, achieving strong results.",
        tags: [],
        links: {
          arxiv: "https://arxiv.org/abs/2309.11346",
          github: "https://github.com/GGLAB-KU/gecturk",
        },
      },
    ],
  },
];
