import { useState, useEffect, FormEvent } from "react";
import { toast } from "sonner";
import {
  Menu, X, ArrowUpRight, Image as ImageIcon, Film, Users, Instagram, LayoutTemplate, Megaphone, Sparkles,
  MessageCircle, Heart, Play, Wand2, Target, Layers, TrendingUp, Camera,
} from "lucide-react";
import FadeInSection from "@/components/FadeInSection";
import workVideo from "@/assets/work-video.jpg";
import workProduct from "@/assets/work-product.jpg";
import workReel from "@/assets/work-reel.jpg";
import workPromo from "@/assets/work-promo.jpg";
import brandLogo from "@/assets/logo.png";
import logoEmblem from "@/assets/logo-emblem.png";
import kudratPortrait from "@/assets/kudrat-portrait.jpg";

const WHATSAPP = "https://wa.me/919653723630";

const PORTRAIT: string = kudratPortrait;

const nav = [
  ["Home", "#home"], ["About", "#about"], ["Skills", "#skills"],
  ["Services", "#services"], ["Portfolio", "#portfolio"], ["Contact", "#contact"],
];

const Portrait = ({ className = "" }: { className?: string }) => (
  <div className={`relative overflow-hidden rounded-[2.5rem] border border-border/80 shadow-soft group bg-muted ${className}`}>
    <img
      src={kudratPortrait}
      alt="Kudrat Kaur"
      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink)/0.7)] via-transparent to-transparent pointer-events-none" />
    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-ink-foreground">
      <div>
        <p className="font-display text-lg font-semibold leading-tight">Kudrat Kaur</p>
        <p className="text-[11px] text-accent font-medium uppercase tracking-wider">Photo & Video Editor</p>
      </div>
      <div className="w-8 h-8 rounded-full bg-white/95 p-1 shadow-sm shrink-0 border border-white/40 flex items-center justify-center">
        <img src={logoEmblem} alt="Logo" className="w-full h-full object-contain" />
      </div>
    </div>
  </div>
);

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-4">{children}</p>
);

const Btn = ({ href, children, variant = "solid" }: { href: string; children: React.ReactNode; variant?: "solid" | "ghost" | "light" }) => {
  const styles = {
    solid: "bg-primary text-primary-foreground hover:shadow-soft",
    ghost: "border border-foreground/20 hover:border-primary hover:text-primary",
    light: "bg-background text-foreground hover:bg-secondary",
  }[variant];
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
      className={`group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${styles}`}>
      {children}
      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
    </a>
  );
};

const Header = () => {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // Calculate total page scroll progress percentage
      const totalDocHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalDocHeight > 0) {
        setScrollProgress((scrollY / totalDocHeight) * 100);
      }

      // Track active section for scrollspy
      const sectionIds = ["home", "about", "skills", "services", "portfolio", "contact"];
      const scrollPosition = scrollY + 160;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-primary/25 shadow-lg shadow-primary/5 py-2.5 sm:py-3"
          : "bg-background/50 backdrop-blur-md border-b border-border/40 py-3 sm:py-4 lg:py-5"
      }`}
    >
      {/* Scroll progress highlight indicator */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-brand transition-all duration-150 ease-out opacity-90"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="container flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5 sm:gap-3 group">
          <div className="relative flex items-center justify-center rounded-full bg-gradient-to-br from-amber-500/15 via-background to-amber-600/20 border-2 border-amber-600/40 p-1.5 shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:border-primary shrink-0">
            <img
              src={logoEmblem}
              alt="Kudrat Kaur Logo"
              className={`object-contain transition-all duration-300 ${
                isScrolled ? "h-8 w-8 sm:h-9 sm:w-9" : "h-9 w-9 sm:h-10 sm:w-10"
              }`}
            />
          </div>
          <div className="text-left flex flex-col justify-center">
            <span className="font-display text-base sm:text-lg font-bold tracking-[0.14em] block leading-tight text-foreground group-hover:text-primary transition-colors">
              KUDRAT KAUR
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.26em] text-primary uppercase block leading-none mt-1">
              MODERN ELEGANCE
            </span>
          </div>
        </a>

        {/* Desktop Navigation with active pill scrollspy */}
        <nav className="hidden lg:flex items-center gap-1 text-sm bg-card/70 backdrop-blur-md p-1.5 rounded-full border border-border/70 shadow-sm">
          {nav.map(([l, h]) => {
            const id = h.replace("#", "");
            const isActive = activeSection === id;
            return (
              <a
                key={h}
                href={h}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25 scale-[1.02]"
                    : "text-muted-foreground hover:text-primary hover:bg-secondary/70"
                }`}
              >
                {l}
              </a>
            );
          })}
        </nav>

        <a
          href="#contact"
          className={`hidden lg:inline-flex rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
            isScrolled
              ? "bg-primary text-primary-foreground px-5 py-2 shadow-soft hover:shadow-lg"
              : "bg-primary/95 text-primary-foreground px-5 py-2.5 hover:bg-primary shadow-sm"
          }`}
        >
          Let's Work Together
        </a>

        <button
          className="lg:hidden p-2 rounded-xl text-foreground hover:bg-secondary/80 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-[520px] border-b border-border/80 bg-background/95 backdrop-blur-xl mt-2" : "max-h-0"
        }`}
      >
        <div className="container pt-3 pb-3 border-b border-border/60 flex items-center gap-3">
          <img src={kudratPortrait} alt="Kudrat Kaur" className="h-11 w-11 rounded-full object-cover object-top border-2 border-primary/25 shadow-xs shrink-0" />
          <div className="text-left">
            <p className="font-display font-bold tracking-wider text-sm text-foreground">KUDRAT KAUR</p>
            <p className="text-[10px] tracking-widest text-primary font-bold uppercase">Modern Elegance</p>
          </div>
        </div>

        <nav className="container flex flex-col gap-1 py-4">
          {nav.map(([l, h]) => {
            const id = h.replace("#", "");
            const isActive = activeSection === id;
            return (
              <a
                key={h}
                href={h}
                onClick={() => setOpen(false)}
                className={`font-display text-xl py-2.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-between ${
                  isActive
                    ? "bg-primary/10 text-primary font-semibold border-l-4 border-primary pl-3.5"
                    : "text-foreground/80 hover:text-primary hover:bg-secondary/40"
                }`}
              >
                <span>{l}</span>
                {isActive && <span className="w-2 h-2 rounded-full bg-primary" />}
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-3 text-center rounded-full bg-primary text-primary-foreground py-3 font-semibold shadow-soft"
          >
            Let's Work Together
          </a>
        </nav>
      </div>
    </header>
  );
};

const Hero = () => (
  <section id="home" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 overflow-hidden">
    <div className="absolute -top-32 -right-32 w-[320px] sm:w-[520px] h-[320px] sm:h-[520px] rounded-full bg-brand opacity-20 blur-3xl pointer-events-none" />
    <div className="container grid lg:grid-cols-12 gap-10 lg:gap-12 items-center relative">
      <div className="lg:col-span-7 animate-rise text-center lg:text-left">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card/85 py-1.5 pl-2 pr-4 text-xs font-medium mb-6 sm:mb-8 shadow-xs">
          <img src={logoEmblem} alt="Logo" className="w-5 h-5 rounded-full object-contain shrink-0" />
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span>1+ Year Experience • Modern Elegance</span>
        </div>
        <h1 className="text-4xl sm:text-6xl xl:text-7xl font-light leading-[1.08] tracking-tight">
          Creative Visuals.<br /><em className="text-brand font-normal">Powerful</em> Digital Presence.
        </h1>
        <p className="mt-6 sm:mt-8 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-muted-foreground leading-relaxed">
          Hi, I'm Kudrat Kaur — a creative photo & video editor and social media creator helping brands and individuals turn ideas into engaging visual content.
        </p>
        <div className="mt-8 sm:mt-10 flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
          <Btn href="#portfolio">View My Work</Btn>
          <Btn href="#contact" variant="ghost">WhatsApp Inquiry</Btn>
        </div>
      </div>
      <div className="lg:col-span-5 relative h-[380px] sm:h-[480px] lg:h-[540px] max-w-sm sm:max-w-md lg:max-w-none mx-auto w-full">
        <Portrait className="w-full h-full rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500" />
      </div>
    </div>
  </section>
);

const Marquee = () => {
  const items = ["Photo Editing", "Video Editing", "Reels", "Thumbnails", "Social Media", "Promotional Content", "Digital Branding"];
  return (
    <div className="bg-ink text-ink-foreground py-4 sm:py-5 overflow-hidden">
      <div className="flex w-max animate-marquee">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="font-display italic text-lg sm:text-2xl px-6 sm:px-8 flex items-center gap-4 sm:gap-8">{t} <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" /></span>
        ))}
      </div>
    </div>
  );
};

const About = () => (
  <section id="about" className="py-20 lg:py-32">
    <div className="container grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <FadeInSection>
        <Portrait className="w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-[2rem] mx-auto shadow-soft" />
      </FadeInSection>
      <FadeInSection delay={150} className="text-center lg:text-left">
        <Eyebrow>About Me</Eyebrow>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light leading-tight">A Creative Mind Behind the <em className="text-brand">Content</em></h2>
        <p className="mt-6 text-muted-foreground leading-relaxed text-sm sm:text-base">
          I'm Kudrat — a young digital creator who loves turning raw footage and simple photos into visuals people stop scrolling for. Over around 12 months with iDigitalPreneur, I've built hands-on experience in photo editing, video editing, reels, promotional content and visual storytelling.
        </p>
        <p className="mt-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
          Today I'm growing into social media handling and content creation — helping people present themselves consistently and beautifully online.
        </p>
        <blockquote className="mt-8 border-l-2 border-accent pl-5 font-display italic text-lg sm:text-xl text-left">
          "From editing visuals to building complete social-media content experiences."
        </blockquote>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-left">
          {[["01+", "Year Experience"], ["✦", "Creative Editing"], ["✦", "Social Media"], ["✦", "Content Creation"]].map(([n, l]) => (
            <div key={l} className="rounded-2xl bg-card border border-border p-4 shadow-sm">
              <p className="font-display text-2xl text-primary">{n}</p>
              <p className="text-xs text-muted-foreground mt-1">{l}</p>
            </div>
          ))}
        </div>
      </FadeInSection>
    </div>
  </section>
);

const skills = ["Photo Editing", "Video Editing", "Reels Editing", "Social Media Handling", "Social Media Content Creation", "Instagram Content", "Promotional Videos", "Thumbnail Design", "Creative Retouching", "Visual Storytelling", "Content Planning", "Basic Branding", "Digital Content Strategy"];

const Skills = () => (
  <section id="skills" className="py-20 lg:py-28 bg-secondary/50">
    <div className="container text-center">
      <FadeInSection>
        <Eyebrow>Skills</Eyebrow>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light">What I Bring to <em className="text-brand">Every Frame</em></h2>
      </FadeInSection>
      <div className="mt-10 sm:mt-14 flex flex-wrap justify-center gap-2.5 sm:gap-3 max-w-4xl mx-auto">
        {skills.map((s, i) => (
          <FadeInSection key={s} delay={i * 30}>
            <span className="inline-block rounded-full border border-primary/20 bg-card px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:-translate-y-1 active:scale-95 cursor-default shadow-xs">{s}</span>
          </FadeInSection>
        ))}
      </div>
    </div>
  </section>
);

const services = [
  [ImageIcon, "Photo Editing", "Professional image enhancement, retouching, creative editing, social-media visuals, and promotional imagery."],
  [Film, "Video Editing", "Short-form videos, reels, promotional videos, transitions, pacing, text overlays, and engaging visual storytelling."],
  [Users, "Social Media Management", "Content organization, creative posting, visuals, reels, captions, and a consistent online presence."],
  [Instagram, "Instagram & Reels", "Scroll-stopping reels, visual hooks, transitions, and platform-friendly creative content."],
  [LayoutTemplate, "Thumbnail & Creative Design", "Attractive thumbnails and promotional graphics designed to improve visual appeal."],
  [Megaphone, "Promotional Content", "Creative visuals for businesses, products, services, offers, events, and personal brands."],
  [Sparkles, "Content Creation", "Complete creative support combining editing, design, storytelling, and social presentation."],
] as const;

const Services = () => (
  <section id="services" className="py-20 lg:py-32">
    <div className="container">
      <FadeInSection className="max-w-2xl text-center sm:text-left">
        <Eyebrow>Services</Eyebrow>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light leading-tight">Creative Editing. Powerful Content. <em className="text-brand">Stronger Social Presence.</em></h2>
      </FadeInSection>
      <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map(([Icon, t, d], i) => (
          <FadeInSection key={t} delay={i * 50} className={i === 6 ? "sm:col-span-2 lg:col-span-3" : ""}>
            <div className={`group h-full rounded-3xl border border-border bg-card p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-soft ${i === 6 ? "bg-ink text-ink-foreground border-transparent" : ""}`}>
              <span className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center transition-colors group-hover:bg-brand">
                <Icon className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
              </span>
              <h3 className="mt-6 text-xl sm:text-2xl">{t}</h3>
              <p className={`mt-3 text-sm leading-relaxed ${i === 6 ? "opacity-70" : "text-muted-foreground"}`}>{d}</p>
            </div>
          </FadeInSection>
        ))}
      </div>
    </div>
  </section>
);

const Experience = () => (
  <section className="py-20 lg:py-28 bg-ink text-ink-foreground">
    <div className="container grid lg:grid-cols-3 gap-10 lg:gap-12">
      <FadeInSection>
        <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">Experience</p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light">The Journey <em className="text-accent">So Far</em></h2>
      </FadeInSection>
      <div className="lg:col-span-2 relative border-l border-ink-foreground/20 pl-6 sm:pl-8 space-y-12">
        {[
          ["~12 months", "iDigitalPreneur", "Creative Editing & Digital Content", ["Photo editing", "Video editing", "Digital content creation", "Creative visual development"]],
          ["Now", "Current Development", "Social Media Handling & Content Creation", ["Social media handling", "Content planning", "Reels & short-form", "Consistent brand presence"]],
        ].map(([when, title, sub, list], i) => (
          <FadeInSection key={title as string} delay={i * 120} className="relative">
            <span className="absolute -left-[31px] sm:-left-[39px] top-1 w-3.5 sm:w-4 h-3.5 sm:h-4 rounded-full bg-accent ring-4 ring-[hsl(var(--ink))]" />
            <p className="text-xs uppercase tracking-widest text-accent font-semibold">{when}</p>
            <h3 className="text-2xl sm:text-3xl mt-2">{title}</h3>
            <p className="opacity-70 mt-1 text-sm sm:text-base">{sub}</p>
            <div className="mt-4 sm:mt-5 flex flex-wrap gap-2">
              {(list as string[]).map((l) => <span key={l} className="text-xs rounded-full border border-ink-foreground/20 px-3 py-1.5">{l}</span>)}
            </div>
          </FadeInSection>
        ))}
      </div>
    </div>
  </section>
);

// Sample projects with WhatsApp-enabled direct inquiries
const projects = [
  { title: "Social Media Reel", cat: "Reels", img: workReel, desc: "Short-form fashion reel with hooks, pacing and text overlays.", tall: true },
  { title: "Product Visual", cat: "Photo Editing", img: workProduct, desc: "Clean product retouching and presentation for a demo brand." },
  { title: "Promotional Campaign", cat: "Promotional Content", img: workPromo, desc: "Moody colour-graded promo visual for a fictional café." },
  { title: "Video Edit Project", cat: "Video Editing", img: workVideo, desc: "Timeline-based edit with transitions and colour work.", tall: true },
  { title: "Instagram Content", cat: "Social Media", img: workReel, desc: "A coordinated post and reel design system." },
  { title: "Thumbnail Design", cat: "Thumbnails", img: workPromo, desc: "High-impact thumbnail concept built to get clicks." },
];
const cats = ["All", "Photo Editing", "Video Editing", "Reels", "Social Media", "Promotional Content", "Thumbnails"];

const Portfolio = () => {
  const [cat, setCat] = useState("All");
  const shown = projects.filter((p) => cat === "All" || p.cat === cat);
  return (
    <section id="portfolio" className="py-20 lg:py-32">
      <div className="container">
        <FadeInSection className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <Eyebrow>Selected Work</Eyebrow>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light">Turning Ideas Into <em className="text-brand">Visual Content.</em></h2>
            <p className="mt-3 text-sm text-muted-foreground">Sample projects showing the styles I work in. Inquire for customized edits.</p>
          </div>
        </FadeInSection>

        {/* Horizontal scrollable category pill bar for smooth touch swipe */}
        <div className="mt-8 flex gap-2.5 overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar touch-pan-x">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 active:scale-95 ${
                cat === c
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 scale-[1.02]"
                  : "bg-card border border-border/80 text-muted-foreground hover:text-foreground hover:bg-secondary/70"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Responsive, generously-sized CSS Grid (replaces broken columns-3) */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {shown.map((p) => (
            <article
              key={p.title}
              className="group relative overflow-hidden rounded-3xl bg-card border border-border/70 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink)/0.92)] via-[hsl(var(--ink)/0.3)] to-transparent" />
                <span className="absolute top-4 left-4 rounded-full bg-background/85 backdrop-blur-md border border-border/60 px-3.5 py-1 text-[11px] uppercase tracking-wider font-semibold text-primary shadow-xs">
                  {p.cat}
                </span>

                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-ink-foreground">
                  <h3 className="text-2xl font-display leading-tight">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-ink-foreground/85 mt-1.5 line-clamp-2 leading-relaxed">
                    {p.desc}
                  </p>
                  <a
                    href={`${WHATSAPP}?text=${encodeURIComponent(`Hi Kudrat! I saw your "${p.title}" project (${p.cat}) and would love to work with you on something similar.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent/90 hover:bg-accent text-ink px-4 py-2 text-xs font-semibold shadow-sm transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>Inquire on WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => (
  <section className="py-20 lg:py-28 bg-secondary/50">
    <div className="container">
      <FadeInSection className="text-center">
        <Eyebrow>Creative Process</Eyebrow>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light">How We'll <em className="text-brand">Work Together</em></h2>
      </FadeInSection>
      <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[["01", "Understand", "Understand the brand, idea, audience, and objective."], ["02", "Create", "Develop the visual concept and editing direction."], ["03", "Refine", "Polish the visuals, timing, composition, and details."], ["04", "Deliver", "Deliver professional, platform-ready content."]].map(([n, t, d], i) => (
          <FadeInSection key={n} delay={i * 80}>
            <div className="h-full rounded-3xl bg-card p-6 sm:p-8 border border-border hover:shadow-soft transition-shadow">
              <p className="font-display text-5xl sm:text-6xl text-brand font-light">{n}</p>
              <h3 className="text-xl sm:text-2xl mt-4 sm:mt-6">{t}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">{d}</p>
            </div>
          </FadeInSection>
        ))}
      </div>
    </div>
  </section>
);

const Social = () => (
  <section className="py-20 lg:py-32 overflow-hidden">
    <div className="container grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <FadeInSection className="text-center lg:text-left">
        <Eyebrow>Social Media & Content</Eyebrow>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light leading-tight">Content That Belongs on <em className="text-brand">Your Feed</em></h2>
        <ul className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 text-xs sm:text-sm text-left max-w-md mx-auto lg:mx-0">
          {["Instagram posts", "Reels", "Stories", "Promotional graphics", "Video thumbnails", "Before/after edits"].map((x) => (
            <li key={x} className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-accent fill-current shrink-0" />
              <span>{x}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 sm:mt-10 font-display text-xl sm:text-2xl">Need Content for Your Social Media? <em className="text-primary">Let's Create It.</em></p>
        <div className="mt-6 flex justify-center lg:justify-start">
          <Btn href={WHATSAPP}>Chat on WhatsApp</Btn>
        </div>
      </FadeInSection>
      <FadeInSection delay={150} className="relative flex justify-center">
        <div className="w-60 sm:w-72 rounded-[2.5rem] bg-ink p-3 shadow-soft rotate-[-3deg] mx-auto">
          <div className="rounded-[2rem] bg-background overflow-hidden">
            <div className="flex items-center gap-2.5 p-3 border-b border-border/40">
              <img src={kudratPortrait} alt="Kudrat Kaur" className="w-8 h-8 rounded-full object-cover object-top border-2 border-primary/30 shrink-0" />
              <div>
                <span className="text-xs font-semibold block leading-tight">kudratkaur.edits</span>
                <span className="text-[10px] text-muted-foreground block">Creator • 12K</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-0.5">
              {[workReel, workProduct, workPromo, workVideo, workPromo, workReel, workProduct, workVideo, workReel].map((s, i) => (
                <img key={i} src={s} alt="" loading="lazy" className="aspect-square object-cover" />
              ))}
            </div>
          </div>
        </div>
        <div className="absolute right-4 sm:right-8 top-8 w-26 sm:w-32 rounded-2xl overflow-hidden border-4 border-background shadow-soft rotate-6 animate-float">
          <img src={workReel} alt="" loading="lazy" className="aspect-[9/16] object-cover" />
        </div>
      </FadeInSection>
    </div>
  </section>
);

const Why = () => (
  <section className="py-20 lg:py-28 bg-secondary/50">
    <div className="container">
      <FadeInSection className="text-center sm:text-left">
        <Eyebrow>Why Work With Me</Eyebrow>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light max-w-2xl">Thoughtful, polished and <em className="text-brand">made for today's platforms.</em></h2>
      </FadeInSection>
      <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-5">
        {[[Wand2, "Creative Approach", "Every project receives a thoughtful visual direction."], [Film, "Modern Editing", "Designed around current digital and social formats."], [Target, "Attention to Detail", "Clean, polished, professional visuals."], [Layers, "Multi-Skill Support", "Photo, video, social media and content in one place."], [TrendingUp, "Growing Expertise", "Continuously developing across editing and content."]].map(([Icon, t, d], i) => {
          const I = Icon as typeof Wand2;
          return (
            <FadeInSection key={t as string} delay={i * 70}>
              <div className="h-full rounded-2xl bg-card/60 sm:bg-transparent p-5 sm:p-0 border border-border/40 sm:border-transparent">
                <I className="w-6 h-6 text-primary" />
                <h3 className="text-lg sm:text-xl mt-3 sm:mt-4 font-semibold">{t as string}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 sm:mt-2 leading-relaxed">{d as string}</p>
              </div>
            </FadeInSection>
          );
        })}
      </div>
    </div>
  </section>
);

const CTA = () => (
  <section className="py-16 sm:py-24">
    <div className="container">
      <FadeInSection>
        <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-brand px-6 py-14 sm:px-8 sm:py-20 text-center text-primary-foreground shadow-xl">
          <div className="absolute -top-20 -left-20 w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-background/10 blur-2xl animate-float pointer-events-none" />
          <h2 className="relative text-3xl sm:text-4xl lg:text-6xl font-light max-w-3xl mx-auto leading-tight">
            Have an Idea? <em>Let's Turn It Into Content.</em>
          </h2>
          <p className="relative mt-4 sm:mt-6 max-w-2xl mx-auto text-sm sm:text-base opacity-90 leading-relaxed">
            Whether you need a polished photo, engaging video, social-media content, or a complete creative package, let's create something that stands out.
          </p>
          <div className="relative mt-8 sm:mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
            <Btn href="#contact" variant="light">Send Project Inquiry</Btn>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/50 px-6 sm:px-7 py-3 sm:py-3.5 text-sm font-semibold hover:bg-primary-foreground/10 transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-current" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </FadeInSection>
    </div>
  </section>
);

const Contact = () => {
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = f.get("name") || "";
    const phone = f.get("phone") || "";
    const service = f.get("service") || "";
    const details = f.get("details") || "";

    const text = `👋 Hello Kudrat! I'd like to make a project inquiry.\n\n👤 *Name:* ${name}\n📱 *WhatsApp/Phone:* ${phone}\n🎯 *Service Required:* ${service}\n\n📝 *Project Details:*\n${details}`;
    const url = `https://wa.me/919653723630?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    toast.success("Opening WhatsApp with your project inquiry...");
  };

  const field = "w-full rounded-2xl border border-input bg-card px-4 sm:px-5 py-3.5 text-base sm:text-sm outline-none focus:border-primary transition-colors";
  return (
    <section id="contact" className="py-20 lg:py-32">
      <div className="container grid lg:grid-cols-2 gap-12 lg:gap-16">
        <FadeInSection className="text-center sm:text-left">
          <Eyebrow>WhatsApp Inquiries</Eyebrow>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light">Let's Create Something <em className="text-brand">Great</em></h2>
          <p className="mt-4 sm:mt-6 text-muted-foreground text-sm sm:text-base leading-relaxed">
            All project inquiries, bookings, and collaborations are handled exclusively via WhatsApp for fast and personal communication. Reach out directly or fill in the details.
          </p>

          <div className="mt-8 sm:mt-10 space-y-4 text-left">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-4 rounded-3xl border border-primary/20 bg-card p-5 sm:p-6 hover:border-primary hover:shadow-soft transition-all duration-300"
            >
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="relative shrink-0">
                  <img
                    src={kudratPortrait}
                    alt="Kudrat Kaur"
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover object-top border-2 border-primary/30 shadow-md group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-card flex items-center justify-center text-white">
                    <MessageCircle className="w-3 h-3 fill-current" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-[11px] sm:text-xs uppercase tracking-wider text-muted-foreground font-semibold">Direct with Kudrat</p>
                    <span className="text-[10px] rounded-full bg-emerald-500/10 text-emerald-600 font-semibold px-2 py-0.5">Online</span>
                  </div>
                  <p className="font-display text-lg sm:text-2xl font-semibold text-primary mt-0.5">+91 96537 23630</p>
                  <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">WhatsApp for quotes, edits & collabs</p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" />
            </a>

            <div className="rounded-2xl border border-border/80 bg-secondary/30 p-4 sm:p-5 text-xs text-muted-foreground space-y-1.5">
              <p className="font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" /> Why WhatsApp Only?
              </p>
              <p>Quick file sharing, direct review of reels and photo samples, instant quotes, and active project updates without email delays.</p>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={150}>
          <form onSubmit={submit} className="space-y-4 rounded-[2rem] bg-secondary/50 p-5 sm:p-8 lg:p-10 border border-border/60">
            <div>
              <p className="font-display text-xl sm:text-2xl">Send Project Details</p>
              <p className="text-xs text-muted-foreground mt-1">Fills your inquiry into a ready-to-send WhatsApp message.</p>
            </div>

            <input required name="name" maxLength={100} placeholder="Your name" className={field} />
            <input required name="phone" type="tel" maxLength={30} placeholder="Your WhatsApp or Phone number" className={field} />
            <select required name="service" defaultValue="" className={field}>
              <option value="" disabled>Service required</option>
              {services.map(([, t]) => <option key={t}>{t}</option>)}
            </select>
            <textarea required name="details" rows={4} maxLength={1500} placeholder="Tell me about your project, timeline, and requirements..." className={field} />

            <button
              type="submit"
              className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground py-3.5 sm:py-4 font-semibold hover:shadow-soft transition-all duration-300 hover:-translate-y-0.5 active:scale-98"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Send Inquiry via WhatsApp</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </form>
        </FadeInSection>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-ink text-ink-foreground pt-16 pb-8">
    <div className="container grid md:grid-cols-3 gap-10 items-center">
      <div>
        <div className="inline-flex items-center gap-3 p-2.5 rounded-2xl bg-white/95 backdrop-blur-md mb-4 shadow-sm border border-white/20">
          <img src={logoEmblem} alt="Kudrat Kaur Logo" className="h-9 w-9 object-contain" />
          <div className="pr-2 text-left">
            <span className="font-display text-sm font-bold tracking-wider text-ink block leading-tight">KUDRAT KAUR</span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-primary block">Modern Elegance</span>
          </div>
        </div>
        <p className="text-sm opacity-80">Photo Editor • Video Editor • Social Media Creator</p>
      </div>
      <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
        {nav.filter(([l]) => l !== "Skills").map(([l, h]) => <a key={h} href={h} className="opacity-80 hover:text-accent transition-colors">{l}</a>)}
      </nav>
      <div className="text-sm space-y-1 md:text-right">
        <p className="text-xs uppercase tracking-widest text-accent font-semibold">Inquiries via WhatsApp Only</p>
        <a href={WHATSAPP} target="_blank" rel="noreferrer" className="block text-lg font-semibold hover:text-accent transition-colors">
          +91 96537 23630
        </a>
        <p className="text-xs opacity-60">Instant response for new projects</p>
      </div>
    </div>
    <p className="container mt-12 pt-6 border-t border-ink-foreground/15 text-xs opacity-60">© 2026 Kudrat Kaur. All Rights Reserved.</p>
  </footer>
);

const Index = () => (
  <main>
    <Header />
    <Hero />
    <Marquee />
    <About />
    <Skills />
    <Services />
    <Experience />
    <Portfolio />
    <Process />
    <Social />
    <Why />
    <CTA />
    <Contact />
    <Footer />
    <a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="WhatsApp"
      className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-soft hover:scale-110 transition-transform">
      <MessageCircle className="w-6 h-6" />
    </a>
  </main>
);

export default Index;
