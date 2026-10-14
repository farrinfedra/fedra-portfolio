import Hero from "@/components/hero";
import GlassTrio from "@/components/glass-trio";
import News from "@/components/news";
import Publications from "@/components/publications";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Hero board={<GlassTrio />} />
      <News />
      <Publications />
      <Contact />
      <Footer />
    </main>
  );
}
