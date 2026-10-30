/* ---------- sample galleries: data ----------
   ImageNet: curated class-conditional RAD samples (256x256, ODE 50 steps, CFG 3.0), assets/img/imagenet/gallery/<name>.jpg
   Text-to-image: per backbone, assets/img/t2i/<folder>/<src>.jpg. Add B/2 samples by filling T2I["B/2"].items. */
window.RAD_SAMPLES = {
  imagenet: ["macaw", "red_fox", "jellyfish", "tiger", "balloon", "tree_frog", "castle", "lesser_panda", "peacock", "space_shuttle", "leopard", "monarch", "great_grey_owl", "strawberry", "schooner", "koala", "anemone_fish", "geyser", "golden_retriever", "agaric", "zebra", "toucan", "steam_locomotive", "goldfinch", "king_penguin", "church", "bald_eagle", "pomegranate", "brown_bear", "giant_panda", "ladybug", "bee_eater"],
  t2i: {
    "XL/2": {
      folder: "xl2",
      blurb: "SiT-XL/2 · 400K iterations on ~9M image–caption pairs · ~37 h on one 8-GPU node",
      stats: { fid: 3.94, geneval: 0.266, repaFid: 4.31, repaGeneval: 0.258 },
      items: [
        {"src": "showcase_4.0_000058", "prompt": "A misty mountain lake at sunrise with pine trees reflected in the still water.", "cfg": 4.0},
        {"src": "showcase_4.0_000288", "prompt": "A close-up photo of a red fox sitting in fresh snow, soft morning light, shallow depth of field.", "cfg": 4.0},
        {"src": "compositional_3.0_000075", "prompt": "A white horse and a brown horse running side by side on a beach.", "cfg": 3.0},
        {"src": "showcase_4.0_000318", "prompt": "A stained glass window depicting a phoenix rising from flames, vivid red and gold.", "cfg": 4.0},
        {"src": "showcase_4.0_000195", "prompt": "A green tree frog on a wet leaf after the rain, covered in water droplets, vivid colors, macro shot.", "cfg": 4.0},
        {"src": "showcase_3.0_000307", "prompt": "A futuristic city skyline at night, glowing towers reflected in a calm river, cinematic lighting.", "cfg": 3.0},
        {"src": "showcase_4.0_000235", "prompt": "A majestic oil painting of a raccoon queen wearing a red French royal gown.", "cfg": 4.0},
        {"src": "compositional_3.0_000106", "prompt": "A blue vase with white tulips next to a yellow lemon.", "cfg": 3.0},
        {"src": "showcase_4.0_000314", "prompt": "A watercolor painting of a sailboat on a calm sea at sunset, soft pastel colors.", "cfg": 4.0},
        {"src": "showcase_4.0_000054", "prompt": "A glowing jellyfish drifting in the deep ocean, bioluminescent blue and purple light against a dark background.", "cfg": 4.0},
        {"src": "styles_3.0_000015", "prompt": "A stained glass window of a fox in a snowy forest.", "cfg": 3.0},
        {"src": "showcase_3.0_000349", "prompt": "A narrow cobblestone street in an old Italian village with flower pots on the balconies, afternoon light.", "cfg": 3.0},
        {"src": "showcase_4.0_000321", "prompt": "A surreal painting of a giant whale floating through the clouds above a sleeping city.", "cfg": 4.0},
        {"src": "compositional_3.0_000034", "prompt": "A black cat sitting to the left of a white dog.", "cfg": 3.0},
        {"src": "showcase_4.0_000306", "prompt": "A small wooden cabin in an autumn forest, orange and yellow leaves, smoke rising from the chimney.", "cfg": 4.0},
        {"src": "showcase_4.0_000020", "prompt": "A stack of fluffy pancakes topped with blueberries and dripping maple syrup, studio food photography.", "cfg": 4.0},
        {"src": "showcase_4.0_000268", "prompt": "A low-poly 3D render of a floating island with a waterfall and tiny trees, soft lighting.", "cfg": 4.0},
        {"src": "compositional_3.0_000076", "prompt": "A yellow umbrella above a purple bench in a park.", "cfg": 3.0},
        {"src": "showcase_3.0_000305", "prompt": "A cozy reading nook by a rainy window, warm lamp light, stacks of books and a cup of tea.", "cfg": 3.0},
        {"src": "showcase_4.0_000219", "prompt": "An impressionist oil painting of a cottage beside a river surrounded by blooming flowers.", "cfg": 4.0},
        {"src": "styles_3.0_000022", "prompt": "A Japanese ukiyo-e woodblock print of a fox in a snowy forest.", "cfg": 3.0},
        {"src": "showcase_4.0_000383", "prompt": "A teddy bear sitting on a skateboard in a busy city street.", "cfg": 4.0},
        {"src": "compositional_3.0_000078", "prompt": "A small wooden boat under a big red bridge.", "cfg": 3.0},
        {"src": "showcase_3.0_000108", "prompt": "A lavender field stretching to the horizon under a warm summer sunset.", "cfg": 3.0}
      ],
    },
    "B/2": {
      folder: "b2",
      blurb: "SiT-B/2 · 400K iterations on ~9M image–caption pairs",
      stats: { fid: 8.42, geneval: 0.166, repaFid: 10.77, repaGeneval: 0.138 },
      items: [],
    },
  },
};
