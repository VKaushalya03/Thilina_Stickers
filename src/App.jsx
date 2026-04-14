import { useState, useEffect, useCallback, useRef } from "react";

// --- Local Image Imports ---
import tsLogo from "./assets/TS_Logo.png";
import servicePpf from "./assets/service-ppf.jpg";
import serviceLed from "./assets/service-led.jpg";
import serviceBrand from "./assets/service-brand.jpg";
import serviceCnc from "./assets/service-cnc.jpeg";
import gallery1 from "./assets/gallery-1.png";
import gallery2 from "./assets/gallery-2.jpg";
import gallery3 from "./assets/gallery-3.jpg";
import gallery4 from "./assets/gallery-4.jpg";
import gallery5 from "./assets/gallery-5.jpg";
import gallery6 from "./assets/gallery-6.jpg";
import gallery7 from "./assets/gallery-7.jpg";
import gallery8 from "./assets/gallery-8.jpg";

// --- Local Video Imports ---
import heroVideo1 from "./videos/hero-video-1.mov";
import heroVideo2 from "./videos/hero-video-2.mov";

/* ─── COLOR PALETTE — extracted directly from the TS logo ─────────────────
   Primary Blue  #1E7FD8   (main blue square)
   Cyan          #0f86c6   (cyan stripe / "Thilina" text in light logo)
   Purple        #8B6BB1   (purple corner accent)
   Grey text     #A0A0B0   (SINCE 1996 and "Stickers" wordmark)
   ───────────────────────────────────────────────────────────────────────── */

const T = {
  dark: {
    bg: "#0B0D14",
    bgS: "#11141E",
    bgC: "#161A28",
    bgH: "#1C2135",
    txt: "#EEF0F8",
    muted: "#848AA4",
    faint: "#3E4560",
    border: "rgba(255,255,255,0.07)",
    borderM: "rgba(255,255,255,0.13)",
    nav: "rgba(11,13,20,0.94)",
    blue: "#1E7FD8",
    cyan: "#0f86c6",
    purple: "#8B6BB1",
    blueDim: "rgba(30,127,216,0.12)",
    cyanDim: "rgba(15,134,198,0.13)",
    purpleDim: "rgba(139,107,177,0.11)",
    sh: "rgba(0,0,0,0.55)",
    isDark: true,
  },
  light: {
    bg: "#F2F5FB",
    bgS: "#FFFFFF",
    bgC: "#FFFFFF",
    bgH: "#E8EEF8",
    txt: "#0D1120",
    muted: "#586080",
    faint: "#B0B8CC",
    border: "rgba(0,0,0,0.08)",
    borderM: "rgba(0,0,0,0.14)",
    nav: "rgba(242,245,251,0.96)",
    blue: "#155BA0",
    cyan: "#0f86c6",
    purple: "#6845A0",
    blueDim: "rgba(21,91,160,0.09)",
    cyanDim: "rgba(15,134,198,0.11)",
    purpleDim: "rgba(104,69,160,0.09)",
    sh: "rgba(0,0,0,0.08)",
    isDark: false,
  },
};

//sasasas
const NAV = ["Home", "About", "Services", "Gallery", "Contact"];

const SERVICES = [
  {
    key: "ppf",
    color: "cyan",
    title: "Vehicle Protection & Styling",
    sub: "PPF · Ceramic Tint · Vinyl Wraps · Graphics",
    desc: "Self-healing Paint Protection Film (PPF), Nano-Ceramic & Carbon window tinting optimised for Sri Lanka's tropical climate, full or partial vinyl wraps and custom racing graphics.",
    tags: ["PPF Film", "Ceramic Tint", "Vinyl Wraps", "Custom Graphics"],
    img: servicePpf,
  },
  {
    key: "led",
    color: "purple",
    title: "Light Boards & Signage",
    sub: "Neon Flex · 3D LED · Programmable Displays",
    desc: "Neon Flex signs for cafés and showrooms, premium 3D illuminated channel lettering, slim custom light boxes and programmable LED boards with T8000 controller animations.",
    tags: ["Neon Flex", "3D LED Letters", "Light Boxes", "LED Displays"],
    img: serviceLed,
  },
  {
    key: "brand",
    color: "blue",
    title: "Advertising & Branding",
    sub: "Number Plates · Fleet Wraps · Corporate",
    desc: "Sri Lanka's best-selling custom number plates, corporate office wall graphics, frosted glass films, promotional banners and commercial vehicle fleet branding.",
    tags: ["Number Plates", "Fleet Branding", "Wall Graphics", "Banners"],
    img: serviceBrand,
  },
  {
    key: "cnc",
    color: "cyan",
    title: "Industrial Fabrication",
    sub: "Laser · CNC · 3D Printing · UV Print",
    desc: "Precision laser and CNC cutting for acrylic, wood and metal. Custom 3D-printed parts and prototypes. UV direct-to-material printing for weather-resistant, long-lasting output.",
    tags: ["Laser Cutting", "CNC Routing", "3D Printing", "UV Printing"],
    img: serviceCnc,
  },
];

const GALLERY = [
  {
    id: 1,
    cat: "Vehicles",
    label: "Full Vinyl Wrap",
    img: gallery1,
  },
  {
    id: 2,
    cat: "Signs",
    label: "Neon Signs",
    img: gallery2,
  },
  {
    id: 3,
    cat: "CNC",
    label: "Laser Cutting",
    img: gallery3,
  },
  {
    id: 4,
    cat: "Vehicles",
    label: "Motorcycles",
    img: gallery4,
  },
  {
    id: 5,
    cat: "Signs",
    label: "Light Boards",
    img: gallery5,
  },
  {
    id: 6,
    cat: "CNC",
    label: "Laser Cutting",
    img: gallery6,
  },
  {
    id: 7,
    cat: "Signs",
    label: "Programmed Light Boards",
    img: gallery7,
  },
  {
    id: 8,
    cat: "Vehicles",
    label: "Fleet Designing & Printing",
    img: gallery8,
  },
];

const TICKER_ITEMS = [
  "PPF FILM",
  "VINYL WRAPS",
  "CERAMIC TINT",
  "NEON FLEX",
  "3D LED",
  "CNC CUTTING",
  "UV PRINT",
  "NUMBER PLATES",
  "FLEET BRANDING",
  "LASER CUT",
];

/* ─── SVG Logo ─── */
function TSMark({ size = 44 }) {
  return (
    <img
      src={tsLogo}
      alt="Thilina Stickers Logo"
      width={size}
      height={size}
      className="shrink-0 object-contain"
    />
  );
}

/* ─── Wordmark ─── */
function WordMark({ t, size = 16 }) {
  return (
    <span
      style={{
        fontWeight: 800,
        fontSize: size,
        letterSpacing: 0.2,
        lineHeight: 1,
      }}
    >
      <span style={{ color: t.cyan }}>Thilina</span>
      <span style={{ color: t.muted }}>Stickers</span>
    </span>
  );
}

/* ─── Section label pill ─── */
function Pill({ t, children }) {
  return (
    <span
      className="inline-block px-3 py-1 text-xs font-extrabold tracking-widest uppercase rounded mb-3"
      style={{
        background: t.cyanDim,
        color: t.cyan,
        border: `1px solid ${t.cyan}30`,
      }}
    >
      {children}
    </span>
  );
}

/* ─── Heading ─── */
function SectionH2({ t, first, accent }) {
  const col =
    { cyan: t.cyan, blue: t.blue, purple: t.purple }[accent] || t.cyan;
  const parts = first.split(" ");
  const last = parts.pop();
  return (
    <h2
      className="font-extrabold uppercase leading-tight tracking-tighter m-0"
      style={{
        fontFamily: "'Outfit',sans-serif",
        fontSize: "clamp(30px,4.2vw,52px)",
        color: t.txt,
      }}
    >
      {parts.length > 0 && <>{parts.join(" ")} </>}
      <span style={{ color: col }}>{last}</span>
    </h2>
  );
}

/* ─── Info row in contact ─── */
function InfoRow({ t, label, value, svgPath }) {
  return (
    <div
      className="flex gap-4 p-4 rounded-lg mb-3 border items-center"
      style={{ background: t.bgC, borderColor: t.border }}
    >
      <div
        className="w-10 h-10 rounded flex items-center justify-center shrink-0"
        style={{ background: t.cyanDim }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke={t.cyan}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {svgPath}
        </svg>
      </div>
      <div>
        <div
          className="text-[10px] font-extrabold tracking-widest uppercase mb-1"
          style={{ color: t.cyan }}
        >
          {label}
        </div>
        <div className="text-sm leading-snug" style={{ color: t.txt }}>
          {value}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState("dark");
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [galleryParallax, setGalleryParallax] = useState(0);
  const [menu, setMenu] = useState(false);
  const [galCat, setGalCat] = useState("All");
  const [shown, setShown] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  // Stat Counters
  const [stats, setStats] = useState([0, 0, 0, 0]);
  const [counted, setCounted] = useState(false);

  // Video Player State
  const [activeVideo, setActiveVideo] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const videos = [heroVideo1, heroVideo2];

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    msg: "",
    sent: false,
    loading: false,
  });

  const t = T[mode];

  // ==========================================
  // SEO Meta Tags & JSON-LD Injection
  // ==========================================
  useEffect(() => {
    document.title =
      "Thilina Stickers | Vehicle Wraps, PPF, LED Signs & CNC Fabrication in Horana, Sri Lanka";

    const metaTags = {
      description:
        "Sri Lanka's premier vehicle modification and signage studio since 1996. PPF film, vinyl wraps, ceramic tint, neon flex signs, 3D LED lettering, CNC cutting and UV printing in Horana.",
      keywords:
        "vehicle wraps Sri Lanka, PPF film Horana, vinyl wrap Sri Lanka, LED signs Sri Lanka, neon sign Sri Lanka, CNC cutting Horana, number plates Sri Lanka, Thilina Stickers, ceramic tint Sri Lanka, 3D LED letters",
      "og:title":
        "Thilina Stickers — Horana's Premier Vehicle & Signage Studio",
      "og:description":
        "Custom PPF, vinyl wraps, neon signs, CNC fabrication and more. Serving Sri Lanka since 1996.",
      "og:type": "website",
      "og:url": "https://www.thilinastickers.lk",
      robots: "index, follow",
      "geo.region": "LK-1",
      "geo.placename": "Horana, Western Province, Sri Lanka",
    };

    Object.entries(metaTags).forEach(([name, content]) => {
      let tag =
        document.querySelector(`meta[name="${name}"]`) ||
        document.querySelector(`meta[property="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        if (name.startsWith("og:")) tag.setAttribute("property", name);
        else tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    });

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://www.thilinastickers.lk");

    let jsonLdScript = document.querySelector("#json-ld");
    if (!jsonLdScript) {
      jsonLdScript = document.createElement("script");
      jsonLdScript.id = "json-ld";
      jsonLdScript.type = "application/ld+json";
      document.head.appendChild(jsonLdScript);
    }
    jsonLdScript.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Thilina Stickers",
      image: "https://www.thilinastickers.lk/og-image.jpg",
      url: "https://www.thilinastickers.lk",
      telephone: ["+94342265114", "+94778618584"],
      email: "thilinastickers@live.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "No: 270/13G, Royal Garden",
        addressLocality: "Horana",
        addressRegion: "Western Province",
        addressCountry: "LK",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 6.7153,
        longitude: 80.0607,
      },
      openingHours: "Mo-Sa 08:00-18:00",
      priceRange: "$$",
      foundingDate: "1996",
      sameAs: [
        "https://www.facebook.com/thilinastickers/",
        "https://www.instagram.com/thilinastickers/",
      ],
    });
  }, []);

  const animateStats = useCallback(() => {
    const targets = [28, 5000, 15, 1];
    const duration = 2000;
    const start = performance.now();

    const step = (timestamp) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      setStats(targets.map((t) => Math.floor(ease * t)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, []);

  // Video Controls Handlers
  const handleVideoEnd = () => {
    setActiveVideo((prev) => (prev === 0 ? 1 : 0));
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(progress || 0);
    }
  };

  const switchVideo = (index) => {
    if (activeVideo !== index) {
      setActiveVideo(index);
      setVideoProgress(0);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current
        .play()
        .catch((e) => console.log("Autoplay prevented", e));
    }
  }, [activeVideo]);

  useEffect(() => {
    const t2 = setTimeout(() => setShown(true), 180);

    const handleScroll = () => {
      setScrolled(window.scrollY > 55);
      setScrollY(window.scrollY);

      // Gallery Parallax calculation
      const galEl = document.getElementById("gallery");
      if (galEl) {
        const rect = galEl.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setGalleryParallax((window.innerHeight - rect.top) * 0.3);
        }
      }
    };

    const handleMouseMove = (e) => {
      if (mode === "dark") {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            if (entry.target.id === "stats-container" && !counted) {
              setCounted(true);
              animateStats();
            }
          }
        });
      },
      { threshold: 0.15 },
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => {
      clearTimeout(t2);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, [counted, mode, animateStats]);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenu(false);
  };

  const colOf = (k) =>
    ({ cyan: t.cyan, blue: t.blue, purple: t.purple })[k] || t.cyan;
  const dimOf = (k) =>
    ({ cyan: t.cyanDim, blue: t.blueDim, purple: t.purpleDim })[k] || t.cyanDim;

  const gals =
    galCat === "All" ? GALLERY : GALLERY.filter((g) => g.cat === galCat);

  const inp = {
    width: "100%",
    background: t.bgS,
    border: `1px solid ${t.border}`,
    color: t.txt,
    padding: "12px 15px",
    borderRadius: 6,
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const send = async () => {
    if (!form.name || !form.phone) return;
    setForm((p) => ({ ...p, loading: true }));

    try {
      const response = await fetch("https://formspree.io/f/xreowynp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          service: form.service,
          message: form.msg,
        }),
      });

      if (response.ok) {
        setForm((p) => ({ ...p, loading: false, sent: true }));
      } else {
        setForm((p) => ({ ...p, loading: false }));
        alert("Oops! There was a problem submitting your form.");
      }
    } catch (error) {
      setForm((p) => ({ ...p, loading: false }));
      alert("Oops! Network error. Please try again.");
      console.error("Form submission error:", error);
    }
  };

  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const progressWidth = scrollHeight > 0 ? (scrollY / scrollHeight) * 100 : 0;

  return (
    <div
      style={{
        fontFamily: "'Outfit','Nunito',sans-serif",
        background: t.bg,
        color: t.txt,
      }}
      className="min-h-screen w-full overflow-x-hidden transition-colors duration-300 relative flex flex-col"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; max-width: 100%; overflow-x: hidden; scroll-behavior: smooth; }
        ::selection { background: #0f86c6; color: #fff; }
        .nb { background: none; border: none; cursor: pointer; font-family: inherit; }
        
        .hw { overflow: hidden; }
        .hwi { transform: translateY(105%); opacity: 0; transition: transform .8s cubic-bezier(.16,1,.3,1), opacity .8s; }
        .hwi.in { transform: translateY(0); opacity: 1; }
        
        .reveal { opacity: 0; transform: translateY(40px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal.is-visible { opacity: 1; transform: translateY(0); }

        .scard { transition: all .35s ease; }
        .scard:hover { transform: translateY(-8px); }
        .scard .card-img { transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        .scard:hover .card-img { transform: scale(1.08); }
        
        .wafloat { position: fixed; bottom: 26px; right: 26px; z-index: 300; width: 52px; height: 52px; border-radius: 50%; background: #25D366; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 26px rgba(37,211,102,.44); text-decoration: none; transition: transform .2s; }
        .wafloat:hover { transform: scale(1.1); }
        .pbtn { border: none; padding: 13px 30px; font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 800; letter-spacing: 1.8px; text-transform: uppercase; cursor: pointer; border-radius: 6px; transition: opacity .2s, transform .15s; white-space: nowrap; }
        .pbtn:hover { opacity: .85; transform: translateY(-1px); }
        .obtn { background: transparent; padding: 12px 28px; border: 1.5px solid; font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 800; letter-spacing: 1.8px; text-transform: uppercase; cursor: pointer; border-radius: 6px; transition: background .2s; white-space: nowrap; }
        
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 30s linear infinite; display: flex; width: max-content; }
        
        .bg-noise { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"); opacity: ${t.isDark ? 0.05 : 0.03}; pointer-events: none; }

        .scan-line { position: absolute; top: 0; left: 0; right: 0; height: 100%; background: linear-gradient(to bottom, transparent, rgba(15, 134, 198, 0.3), transparent); background-size: 100% 4px; animation: scan 6s linear infinite; pointer-events: none; z-index: 10; opacity: 0.04; }
        @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }

        /* ABOUT & GALLERY REDESIGN CSS */
        .bg-blueprint-dark { background-color: #0D1020; background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 24px 24px; }
        .bg-blueprint-light { background-color: #F0F4FF; background-image: linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px); background-size: 24px 24px; }
        
        .feature-row { transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94); cursor: default; }
        .feature-row:hover { transform: translateX(6px); }

        .masonry-grid { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 240px; gap: 16px; }
        .masonry-grid > :nth-child(1) { grid-column: span 2; grid-row: span 2; }
        .masonry-grid > :nth-child(2) { grid-column: span 1; grid-row: span 1; }
        .masonry-grid > :nth-child(3) { grid-column: span 1; grid-row: span 1; }
        .masonry-grid > :nth-child(4) { grid-column: span 2; grid-row: span 1; }
        .masonry-grid > :nth-child(5) { grid-column: span 1; grid-row: span 2; }
        .masonry-grid > :nth-child(6) { grid-column: span 1; grid-row: span 1; }
        .masonry-grid > :nth-child(7) { grid-column: span 2; grid-row: span 1; }
        .masonry-grid > :nth-child(8) { grid-column: span 1; grid-row: span 1; }

        .btn-ig { position: relative; padding: 14px 34px; border-radius: 40px; text-transform: uppercase; font-weight: 800; letter-spacing: 1.5px; z-index: 1; transition: transform 0.2s; font-family: 'Outfit', sans-serif; font-size: 12px; }
        .btn-ig::before { content: ''; position: absolute; inset: -2px; border-radius: 40px; background: linear-gradient(45deg, #8B6BB1, #F58529, #FEDA77); z-index: -1; transition: filter 0.3s; }
        .btn-ig:hover::before { filter: blur(8px); }
        .btn-ig:hover { transform: translateY(-2px); }
        .btn-ig::after { content: ''; position: absolute; inset: 0; background: ${t.bgC}; border-radius: 40px; z-index: -1; transition: background 0.3s; }

        .fast-pulse { animation: fast-pulse 0.4s infinite alternate; }
        @keyframes fast-pulse { 0% { opacity: 1; } 100% { opacity: 0.3; } }

        @media (prefers-reduced-motion: reduce) {
          .animate-marquee, .scan-line, .fast-pulse { animation: none; }
          .reveal { transition: none; opacity: 1; transform: none; }
          .feature-row:hover { transform: none; }
        }
        @media (max-width: 768px) {
          .dnav { display: none !important; }
          .mtoggle { display: flex !important; }
          .masonry-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; grid-auto-rows: auto; }
          .masonry-grid > * { grid-column: span 1 !important; grid-row: span 1 !important; aspect-ratio: 1; }
        }
        @media (max-width: 480px) {
           .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
           .animate-marquee { animation: marquee 45s linear infinite; }
        }
      `}</style>

      {/* Cursor Spotlight */}
      {mode === "dark" && (
        <div
          className="fixed inset-0 pointer-events-none z-50 transition-opacity duration-300"
          style={{
            background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(15,134,198,0.07), transparent 50%)`,
          }}
        />
      )}

      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 z-[9999] transition-all duration-150 ease-out"
        style={{
          width: `${progressWidth}%`,
          background: t.cyan,
          boxShadow: `0 0 10px rgba(15,134,198,0.7)`,
        }}
      />

      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-300 px-[5%] ${scrolled ? "backdrop-blur-xl border-b" : "bg-transparent border-none"}`}
        style={{
          background: scrolled ? t.nav : "transparent",
          borderColor: t.border,
        }}
      >
        <div className="max-w-[1300px] mx-auto flex items-center justify-between h-[68px]">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => go("home")}
          >
            <TSMark size={40} />
            <div>
              <WordMark t={t} size={15} />
              <div
                className="text-[9px] tracking-widest uppercase mt-[1px]"
                style={{ color: t.faint }}
              >
                Est. 1996
              </div>
            </div>
          </div>

          <div className="dnav flex gap-8 items-center">
            {NAV.map((n) => (
              <button
                key={n}
                className="nb text-xs font-bold tracking-[1.5px] uppercase transition-colors"
                style={{ color: t.muted }}
                onMouseEnter={(e) => (e.currentTarget.style.color = t.cyan)}
                onMouseLeave={(e) => (e.currentTarget.style.color = t.muted)}
                onClick={() => go(n.toLowerCase())}
              >
                {n}
              </button>
            ))}
            <button
              className="flex items-center gap-2 px-3 py-1.5 border-[1.5px] rounded-full text-[11px] font-extrabold tracking-widest transition-all"
              style={{ borderColor: t.border, color: t.muted }}
              onClick={() => setMode((m) => (m === "dark" ? "light" : "dark"))}
            >
              {mode === "dark" ? "Light" : "Dark"}
            </button>
            <button
              className="pbtn"
              style={{
                background: t.cyan,
                color: "#fff",
              }}
              onClick={() => go("contact")}
            >
              Get a Quote
            </button>
          </div>

          <div className="mtoggle hidden gap-2 items-center">
            <button
              className="flex items-center px-3 py-1 border-[1.5px] rounded-full text-[10px] font-extrabold tracking-widest"
              style={{ borderColor: t.border, color: t.muted }}
              onClick={() => setMode((m) => (m === "dark" ? "light" : "dark"))}
            >
              {mode === "dark" ? "Light" : "Dark"}
            </button>
            <button
              className="nb border p-2 rounded flex flex-col gap-1"
              style={{ borderColor: t.border }}
              onClick={() => setMenu(!menu)}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block w-5 h-0.5 rounded-sm"
                  style={{ background: t.txt }}
                />
              ))}
            </button>
          </div>
        </div>

        {menu && (
          <div
            className="md:hidden border-t py-4 px-[5%]"
            style={{ background: t.nav, borderColor: t.border }}
          >
            {NAV.map((n) => (
              <div
                key={n}
                className="border-b"
                style={{ borderColor: t.border }}
              >
                <button
                  className="nb w-full text-left py-3 text-[13px] font-bold tracking-[1.5px] uppercase"
                  style={{ color: t.muted }}
                  onClick={() => go(n.toLowerCase())}
                >
                  {n}
                </button>
              </div>
            ))}
            <button
              className="pbtn w-full mt-4"
              style={{
                background: t.cyan,
                color: "#fff",
              }}
              onClick={() => {
                go("contact");
                setMenu(false);
              }}
            >
              Get a Quote
            </button>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section
        id="home"
        className="relative flex flex-col justify-center min-h-screen px-[5%] overflow-hidden pt-24 pb-16"
      >
        <div className="absolute inset-0 bg-noise mix-blend-overlay z-10" />
        <div className="scan-line" />

        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        >
          <div
            className="absolute top-[10%] right-[-5%] w-[520px] h-[520px] rounded-full blur-[80px]"
            style={{
              background: `radial-gradient(circle, rgba(15,134,198,0.25) 0%, transparent 70%)`,
            }}
          />
          <div
            className="absolute bottom-[5%] left-[-5%] w-[400px] h-[400px] rounded-full blur-[80px]"
            style={{
              background: `radial-gradient(circle, rgba(139,107,177,0.22) 0%, transparent 70%)`,
            }}
          />
          <div
            className="absolute top-[45%] left-[30%] w-[300px] h-[300px] rounded-full blur-[70px]"
            style={{
              background: `radial-gradient(circle, rgba(30,127,216,0.18) 0%, transparent 70%)`,
            }}
          />
        </div>

        {/* Theme-matching translucent glass overlay over the orbs */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: t.isDark
              ? "rgba(11,13,20,0.65)"
              : "rgba(242,245,251,0.65)",
            backdropFilter: "blur(60px)",
            WebkitBackdropFilter: "blur(60px)",
          }}
        />

        <div className="max-w-[1300px] mx-auto w-full relative z-20 flex flex-col flex-grow justify-center mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch w-full">
            <div className="max-w-[600px] pt-4 md:pt-0 flex flex-col justify-center py-6">
              {/* Refined Humanized Badge */}
              <div className="flex items-center gap-3 mb-8 self-start">
                <div
                  className="w-[3px] h-[14px] rounded-full"
                  style={{ background: t.cyan }}
                />
                <p
                  className="text-[13px] font-medium tracking-[0.5px] m-0"
                  style={{ color: t.muted }}
                >
                  Established{" "}
                  <span style={{ color: t.txt, fontWeight: 700 }}>1996</span>
                  <span className="mx-2.5 opacity-40">|</span>
                  Horana, Sri Lanka <span className="ml-0.5">🇱🇰</span>
                </p>
              </div>

              <div className="hw">
                <div
                  className={`hwi${shown ? " in" : ""} font-black uppercase tracking-tighter leading-none`}
                  style={{
                    transitionDelay: ".05s",
                    fontFamily: "'Outfit',sans-serif",
                    fontSize: "clamp(48px,9vw,110px)",
                    color: t.txt,
                    textShadow: t.isDark
                      ? `0 0 40px rgba(15,134,198,0.15)`
                      : "none",
                  }}
                >
                  THILINA
                </div>
              </div>
              <div className="hw mb-2">
                <div
                  className={`hwi${shown ? " in" : ""} font-black uppercase tracking-tighter leading-none`}
                  style={{
                    transitionDelay: ".18s",
                    fontFamily: "'Outfit',sans-serif",
                    fontSize: "clamp(48px,9vw,110px)",
                    color: t.cyan,
                    textShadow: t.isDark
                      ? `0 0 60px rgba(15,134,198,0.35)`
                      : "none",
                  }}
                >
                  STICKERS
                </div>
              </div>

              <div className="hw mt-5 mb-10">
                <p
                  className={`hwi${shown ? " in" : ""} text-base md:text-lg font-light leading-relaxed`}
                  style={{ transitionDelay: ".32s", color: t.muted }}
                >
                  Sri Lanka's premier vehicle modification, custom signage and
                  industrial fabrication studio — crafting excellence since
                  1996.
                </p>
              </div>

              <div
                className={`hwi${shown ? " in" : ""} flex gap-4 flex-wrap`}
                style={{ transitionDelay: ".46s" }}
              >
                <button
                  className="pbtn shadow-lg"
                  style={{
                    background: t.cyan,
                    color: "#fff",
                    boxShadow: `0 8px 20px rgba(15,134,198,0.3)`,
                  }}
                  onClick={() => go("services")}
                >
                  Explore Services
                </button>
                <button
                  className="obtn hover:bg-opacity-10"
                  style={{ borderColor: t.cyan, color: t.cyan }}
                  onClick={() => go("gallery")}
                >
                  View Our Work
                </button>
              </div>
            </div>

            {/* Premium Edge-to-Edge Video Showcase Panel */}
            <div
              className={`hwi${shown ? " in" : ""} w-full flex items-center justify-center md:justify-end self-stretch relative`}
              style={{ transitionDelay: ".55s" }}
            >
              {/* Subtle integration glow behind the card */}
              <div className="absolute -inset-4 bg-[#0f86c6] opacity-10 blur-2xl rounded-full pointer-events-none hidden md:block" />

              <div
                className="w-full relative overflow-hidden group aspect-video md:aspect-auto md:h-full flex flex-col"
                style={{
                  borderRadius: "12px",
                  background: "#000",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderLeft: "4px solid #0f86c6",
                  boxShadow: `0 20px 40px rgba(0,0,0,0.5), 0 0 40px rgba(15,134,198,0.1)`,
                }}
              >
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover flex-1 min-h-0"
                  playsInline
                  muted={isMuted}
                  autoPlay
                  onEnded={handleVideoEnd}
                  onTimeUpdate={handleTimeUpdate}
                >
                  <source src={videos[activeVideo]} />
                </video>

                {/* Overlays for depth and text legibility */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/70 via-transparent to-transparent h-24" />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0B0D14] via-black/40 to-transparent top-auto h-32" />

                {/* Top HUD Area */}
                <div className="absolute top-0 left-0 right-0 p-5 flex justify-between items-center z-20">
                  <span className="text-[9px] font-extrabold tracking-[3px] uppercase text-white/50">
                    TS · STUDIO PREVIEW
                  </span>
                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span
                      className="w-1.5 h-1.5 rounded-full fast-pulse"
                      style={{
                        background: "#0f86c6",
                        boxShadow: `0 0 6px #0f86c6`,
                      }}
                    />
                    <span
                      className="text-[9px] font-extrabold tracking-[3px] uppercase"
                      style={{ color: "#0f86c6" }}
                    >
                      LIVE PREVIEW
                    </span>
                  </div>
                </div>

                {/* Bottom Controls HUD */}
                <div className="absolute bottom-0 left-0 right-0 p-5 pb-6 flex justify-between items-end z-20">
                  <div className="flex gap-5">
                    <button
                      onClick={() => switchVideo(0)}
                      className="text-[11px] font-extrabold tracking-[1.5px] uppercase transition-colors pb-1"
                      style={{
                        color:
                          activeVideo === 0 ? "#fff" : "rgba(255,255,255,0.4)",
                        borderBottom:
                          activeVideo === 0
                            ? `2px solid #0f86c6`
                            : "2px solid transparent",
                      }}
                    >
                      Vehicle Styling
                    </button>
                    <button
                      onClick={() => switchVideo(1)}
                      className="text-[11px] font-extrabold tracking-[1.5px] uppercase transition-colors pb-1"
                      style={{
                        color:
                          activeVideo === 1 ? "#fff" : "rgba(255,255,255,0.4)",
                        borderBottom:
                          activeVideo === 1
                            ? `2px solid #0f86c6`
                            : "2px solid transparent",
                      }}
                    >
                      Our Workshop
                    </button>
                  </div>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="transition-colors"
                    style={{
                      color: isMuted ? "rgba(255,255,255,0.4)" : "#0f86c6",
                    }}
                  >
                    {isMuted ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <line x1="23" y1="9" x2="17" y2="15"></line>
                        <line x1="17" y1="9" x2="23" y2="15"></line>
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                      </svg>
                    )}
                  </button>
                </div>

                {/* Progress Line */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-30">
                  <div
                    className="h-full transition-all duration-100 ease-linear"
                    style={{
                      width: `${videoProgress}%`,
                      background: "#0f86c6",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            id="stats-container"
            className="reveal mt-12 md:mt-20 w-full grid grid-cols-2 md:grid-cols-4 border rounded-xl overflow-hidden backdrop-blur-md relative z-20 shadow-xl"
            style={{
              borderColor: t.border,
              background: t.isDark
                ? "rgba(22, 26, 40, 0.7)"
                : "rgba(255, 255, 255, 0.9)",
            }}
          >
            {[
              { v: `${stats[0]}+`, l: "Years of Excellence" },
              { v: `${stats[1].toLocaleString()}+`, l: "Projects Completed" },
              { v: `${stats[2]}+`, l: "Service Types" },
              { v: `#${stats[3]}`, l: "In Horana, Sri Lanka" },
            ].map((s, i) => (
              <div
                key={s.l}
                className={`py-6 px-4 text-center ${i < 3 ? "md:border-r border-b md:border-b-0" : ""}`}
                style={{ borderColor: t.border }}
              >
                <div
                  className="font-black text-4xl leading-none mb-1"
                  style={{ fontFamily: "'Outfit',sans-serif", color: t.cyan }}
                >
                  {s.v}
                </div>
                <div
                  className="text-[11px] tracking-wide"
                  style={{ color: t.muted }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE TICKER */}
      <div
        className="w-full overflow-hidden py-3 border-y flex select-none"
        style={{
          background: t.isDark ? "#06070B" : "#E8EEF8",
          borderColor: t.border,
        }}
      >
        <div className="animate-marquee flex gap-10 items-center">
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map(
            (item, idx) => (
              <div key={idx} className="flex items-center gap-10">
                <span
                  className="text-xs font-black tracking-[3px] whitespace-nowrap"
                  style={{ color: t.muted }}
                >
                  {item}
                </span>
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: t.cyanDim }}
                />
              </div>
            ),
          )}
        </div>
      </div>

      {/* ABOUT - OUR LEGACY (REDESIGNED) */}
      <section
        id="about"
        className={`py-24 px-[5%] border-b relative ${t.isDark ? "bg-blueprint-dark" : "bg-blueprint-light"}`}
        style={{ borderColor: t.border }}
      >
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="reveal">
            <span
              className="inline-block px-3 py-1 text-[11px] font-extrabold tracking-widest uppercase rounded mb-4"
              style={{
                background: t.cyanDim,
                color: t.cyan,
                border: `1px solid transparent`,
                borderLeft: `3px solid ${t.cyan}`,
                boxShadow: `-3px 0 15px rgba(15,134,198,0.4)`,
              }}
            >
              Our Legacy
            </span>

            <h2
              className="font-extrabold uppercase leading-tight tracking-tighter m-0 mb-6"
              style={{
                fontFamily: "'Outfit',sans-serif",
                fontSize: "clamp(30px,4.2vw,52px)",
                color: t.txt,
              }}
            >
              TRUSTED SINCE{" "}
              <span
                style={{
                  color: t.cyan,
                  textShadow: t.isDark
                    ? `0 0 15px rgba(15,134,198,0.8)`
                    : "none",
                }}
              >
                1996
              </span>
            </h2>

            <div className="flex">
              <div className="hidden sm:flex flex-col relative w-6 mr-6 shrink-0 pt-2 items-center">
                <div
                  className="w-[2px] h-full absolute left-[11px] top-4 rounded-full"
                  style={{
                    background: `linear-gradient(to bottom, rgba(15,134,198,0.8), rgba(30,127,216,0.8), rgba(139,107,177,0.8), transparent)`,
                  }}
                />

                <div
                  className="relative z-10 w-3 h-3 rounded-full animate-pulse mb-[75px]"
                  style={{
                    background: t.cyan,
                    boxShadow: `0 0 10px ${t.cyan}`,
                  }}
                />
                <div
                  className="relative z-10 w-3 h-3 rounded-full animate-pulse mb-[75px]"
                  style={{
                    background: t.blue,
                    boxShadow: `0 0 10px ${t.blue}`,
                  }}
                />
                <div
                  className="relative z-10 w-3 h-3 rounded-full animate-pulse"
                  style={{
                    background: t.purple,
                    boxShadow: `0 0 10px ${t.purple}`,
                  }}
                />
              </div>

              <div>
                <p
                  className="text-[14.5px] leading-relaxed mb-6"
                  style={{ color: t.muted }}
                >
                  <strong style={{ color: t.txt, fontWeight: 700 }}>
                    1996 —
                  </strong>{" "}
                  For nearly three decades, Thilina Stickers has been the
                  heartbeat of vehicle customisation and creative fabrication in
                  Horana. What started as a small sticker shop has grown into a
                  full-service studio.
                </p>
                <p
                  className="text-[14.5px] leading-relaxed mb-6"
                  style={{ color: t.muted }}
                >
                  <strong style={{ color: t.txt, fontWeight: 700 }}>
                    2010 —
                  </strong>{" "}
                  As trends evolved, we expanded our horizons, introducing
                  advanced LED signage, precise CNC routing, and
                  industrial-grade fabrication to our local market.
                </p>
                <p
                  className="text-[14.5px] leading-relaxed"
                  style={{ color: t.muted }}
                >
                  <strong style={{ color: t.txt, fontWeight: 700 }}>
                    2024 —
                  </strong>{" "}
                  Today, we source the latest machinery from international
                  exhibitions, offering global-standard craftsmanship including
                  UV flatbed printing and 3D prototyping right here in Sri
                  Lanka.
                </p>
              </div>
            </div>

            <div
              className="mt-8 pt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] font-bold tracking-wide border-t"
              style={{ borderColor: t.borderM, color: t.muted }}
            >
              <span>
                <span style={{ color: t.cyan, fontSize: "14px" }}>500+</span>{" "}
                Vehicles Wrapped
              </span>
              <span className="opacity-40 hidden sm:inline">·</span>
              <span>
                <span style={{ color: t.cyan, fontSize: "14px" }}>1,000+</span>{" "}
                Signs Built
              </span>
              <span className="opacity-40 hidden md:inline">·</span>
              <span>
                <span style={{ color: t.cyan, fontSize: "14px" }}>200+</span>{" "}
                CNC Projects
              </span>
              <span className="opacity-40 hidden sm:inline">·</span>
              <span>
                <span style={{ color: t.cyan, fontSize: "14px" }}>15+</span>{" "}
                Service Types
              </span>
            </div>
          </div>

          <div
            className="reveal flex flex-col gap-4"
            style={{ transitionDelay: "0.2s" }}
          >
            {[
              {
                title: "28 Years Track Record",
                sub: "Consistent excellence since 1996",
                color: t.cyan,
                path: (
                  <>
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </>
                ),
              },
              {
                title: "Premium Materials",
                sub: "International-grade supplies",
                color: t.blue,
                path: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
              },
              {
                title: "Advanced Machinery",
                sub: "Laser, CNC, 3D & UV tech",
                color: t.purple,
                path: (
                  <>
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </>
                ),
              },
              {
                title: "Expert Team",
                sub: "Skilled & passionate craftsmen",
                color: t.cyan,
                path: (
                  <>
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </>
                ),
              },
            ].map((c) => (
              <div
                key={c.title}
                className="feature-row flex items-center gap-5 p-5 rounded-r-xl border"
                style={{
                  background: t.bgC,
                  borderColor: t.border,
                  borderLeft: `4px solid ${c.color}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `inset 40px 0 60px -40px ${c.color}40, 0 8px 24px ${t.sh}`;
                  e.currentTarget.style.borderColor = `${c.color}60`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `none`;
                  e.currentTarget.style.borderColor = t.border;
                }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: `${c.color}15`,
                    boxShadow: `0 0 20px ${c.color}20`,
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={c.color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {c.path}
                  </svg>
                </div>
                <div className="flex-grow">
                  <div
                    className="font-bold text-[14.5px] mb-1"
                    style={{ color: t.txt }}
                  >
                    {c.title}
                  </div>
                  <div
                    className="text-[12.5px] leading-snug"
                    style={{ color: t.muted }}
                  >
                    {c.sub}
                  </div>
                </div>
                <div
                  className="w-1 h-8 rounded-full opacity-40 shrink-0"
                  style={{ background: c.color }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className="py-24 px-[5%]"
        style={{ background: t.bg }}
      >
        <div className="max-w-[1300px] mx-auto">
          <div className="text-center mb-14 reveal">
            <Pill t={t}>What We Do</Pill>
            <SectionH2 t={t} first="Our Services" accent="blue" />
            <p
              className="mt-4 text-[14.5px] max-w-[460px] mx-auto"
              style={{ color: t.muted }}
            >
              A complete studio for vehicles, signage and industrial
              fabrication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((s, idx) => {
              const ac = colOf(s.color);
              const dm = dimOf(s.color);
              return (
                <div
                  key={s.key}
                  className="scard reveal border rounded-xl overflow-hidden shadow-lg relative bg-clip-padding"
                  style={{
                    background: t.bgC,
                    borderColor: t.border,
                    transitionDelay: `${idx * 0.1}s`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 30px ${ac}30`;
                    e.currentTarget.style.borderColor = ac;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 2px 16px ${t.sh}`;
                    e.currentTarget.style.borderColor = t.border;
                  }}
                >
                  <div className="h-[220px] overflow-hidden relative">
                    <img
                      src={s.img}
                      alt={s.title}
                      className="card-img w-full h-full object-cover block"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to top,${t.bgC} 0%,transparent 70%)`,
                      }}
                    />
                    <span
                      className="absolute bottom-3 left-4 px-2.5 py-1 text-[10px] font-extrabold tracking-widest uppercase rounded"
                      style={{ color: ac, background: dm }}
                    >
                      {s.sub}
                    </span>
                  </div>
                  <div className="p-6">
                    <div
                      className="w-8 h-1 rounded-full mb-4"
                      style={{ background: ac }}
                    />
                    <h3
                      className="font-extrabold text-lg mb-2"
                      style={{ color: t.txt }}
                    >
                      {s.title}
                    </h3>
                    <p
                      className="text-[13.5px] leading-relaxed mb-5"
                      style={{ color: t.muted }}
                    >
                      {s.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {s.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-[10.5px] font-bold border rounded"
                          style={{
                            background: dm,
                            color: ac,
                            borderColor: `${ac}22`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GALLERY - OUR WORK (REDESIGNED) */}
      <section
        id="gallery"
        className={`py-24 px-[5%] relative overflow-hidden ${t.isDark ? "bg-blueprint-dark" : "bg-blueprint-light"}`}
      >
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none flex justify-center opacity-5 select-none"
          style={{ transform: `translateY(${galleryParallax}px)`, zIndex: 0 }}
        >
          <h2
            className="font-black"
            style={{
              fontSize: "25vw",
              color: t.txt,
              fontFamily: "'Outfit', sans-serif",
              lineHeight: "0.9",
            }}
          >
            OUR
            <br />
            WORK
          </h2>
        </div>

        <div className="max-w-[1300px] mx-auto relative z-10">
          <div className="reveal flex flex-wrap items-end justify-between gap-8 mb-12">
            <div>
              <Pill t={t}>Portfolio</Pill>
              <SectionH2 t={t} first="Our Work" accent="cyan" />
            </div>
            <div className="flex gap-3 flex-wrap">
              {["All", "Vehicles", "Signs", "CNC"].map((cat) => {
                const isActive = galCat === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setGalCat(cat)}
                    className="px-5 py-2.5 text-[11px] font-extrabold tracking-[1.5px] uppercase rounded-full transition-all duration-300"
                    style={{
                      background: isActive ? t.cyan : t.bgC,
                      color: isActive ? "#ffffff" : t.muted,
                      border: `1px solid ${isActive ? t.cyan : t.border}`,
                      boxShadow: isActive
                        ? "0 0 20px rgba(15,134,198,0.4)"
                        : "none",
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="masonry-grid w-full">
            {gals.map((g, idx) => {
              const getCatColor = (c) => {
                if (c === "Vehicles") return t.blue;
                if (c === "Signs") return t.purple;
                if (c === "CNC") return t.cyan;
                return t.cyan;
              };
              const badgeColor = getCatColor(g.cat);

              return (
                <div
                  key={`${galCat}-${g.id}`}
                  className="gcrd group relative bg-cover bg-center overflow-hidden rounded-xl shadow-lg reveal"
                  style={{
                    background: t.bgC,
                    transitionDelay: `${(idx % 6) * 0.1}s`,
                  }}
                >
                  <img
                    src={g.img}
                    alt={g.label}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />

                  <div
                    className="absolute top-4 left-4 px-3 py-1 text-[9px] font-extrabold tracking-[2px] uppercase rounded backdrop-blur-md z-20 transition-transform duration-300 group-hover:-translate-y-1"
                    style={{
                      background: `${badgeColor}C0`,
                      color: "#fff",
                      border: `1px solid ${badgeColor}`,
                    }}
                  >
                    {g.cat}
                  </div>

                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 z-10 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(135deg, transparent 30%, ${t.cyan}40 100%)`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D14] via-transparent to-transparent opacity-70 z-10" />

                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 z-20">
                    <div className="text-[15px] font-bold text-white tracking-wide">
                      {g.label}
                    </div>
                    <div
                      className="text-[10px] font-extrabold tracking-[2px] uppercase mt-1"
                      style={{ color: t.cyan }}
                    >
                      {g.cat}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center reveal">
            <a
              href="https://www.instagram.com/thilinastickers/"
              target="_blank"
              rel="noreferrer"
              className="btn-ig inline-flex items-center gap-3 text-[12px]"
              style={{ color: t.isDark ? "#fff" : t.txt }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              View More on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section
        className="reveal py-20 px-[5%] relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #0f86c6 0%, #1E7FD8 100%)`,
        }}
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 1px, transparent 10px)",
          }}
        />
        <div className="max-w-[1300px] mx-auto flex flex-wrap items-center justify-between gap-6 relative z-10">
          <div>
            <h3
              className="font-black text-white uppercase leading-tight tracking-tighter"
              style={{
                fontFamily: "'Outfit',sans-serif",
                fontSize: "clamp(24px,3.5vw,44px)",
              }}
            >
              Ready to Transform Your Vehicle?
            </h3>
            <p className="text-white text-opacity-80 mt-2 text-[15px]">
              From number plates to full PPF wraps — we make it happen.
            </p>
          </div>
          <button
            className="bg-white px-8 py-3.5 rounded text-[12px] font-extrabold tracking-[1.8px] uppercase transition-opacity hover:opacity-90 shrink-0"
            style={{ color: t.blue, fontFamily: "'Outfit',sans-serif" }}
            onClick={() => go("contact")}
          >
            Get a Free Quote
          </button>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="py-24 px-[5%]"
        style={{ background: t.bg }}
      >
        <div className="max-w-[1300px] mx-auto">
          <div className="reveal mb-12">
            <Pill t={t}>Get In Touch</Pill>
            <SectionH2 t={t} first="Contact Us" accent="cyan" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
            <div className="reveal">
              <p
                className="text-[14.5px] leading-relaxed mb-8"
                style={{ color: t.muted }}
              >
                Visit the shop in Horana, give us a call, or fill in the quote
                form and we'll respond promptly. We're happy to discuss any
                project — small or large.
              </p>
              <InfoRow
                t={t}
                label="Address"
                value="No: 270/13G, Royal Garden, Horana, Sri Lanka 🇱🇰"
                svgPath={
                  <>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </>
                }
              />
              <InfoRow
                t={t}
                label="Phone"
                value="+94 342 265 114   ·   +94 77 861 8584"
                svgPath={
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 13 19.79 19.79 0 0 1 1.93 4.38 2 2 0 0 1 3.92 2.2H6.9a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                }
              />
              <InfoRow
                t={t}
                label="Email"
                value="thilinastickers@live.com"
                svgPath={
                  <>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </>
                }
              />

              <div className="flex gap-3 mt-6">
                {[
                  {
                    href: "https://www.facebook.com/thilinastickers/",
                    color: t.blue,
                    path: (
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    ),
                  },
                  {
                    href: "https://www.instagram.com/thilinastickers/",
                    color: t.purple,
                    path: (
                      <>
                        <rect x="2" y="2" width="20" height="20" rx="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </>
                    ),
                  },
                  {
                    href: "https://wa.me/94778618584",
                    color: "#25D366",
                    path: (
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    ),
                  },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-11 h-11 border rounded-lg flex items-center justify-center transition-colors duration-200"
                    style={{ background: t.bgC, borderColor: t.border }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = s.color)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = t.border)
                    }
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={s.color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {s.path}
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div
              className="reveal border rounded-xl p-8 shadow-xl relative z-10"
              style={{
                background: t.bgC,
                borderColor: t.border,
                transitionDelay: "0.2s",
              }}
            >
              {form.sent ? (
                <div className="text-center py-10">
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center"
                    style={{ background: t.cyanDim }}
                  >
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={t.cyan}
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3
                    className="font-bold text-xl mb-2"
                    style={{ color: t.txt }}
                  >
                    Message Received!
                  </h3>
                  <p
                    className="text-[13.5px] leading-relaxed mb-6"
                    style={{ color: t.muted }}
                  >
                    Thank you. We'll contact you via WhatsApp or phone within a
                    few hours.
                  </p>
                  <button
                    className="obtn"
                    style={{ borderColor: t.cyan, color: t.cyan }}
                    onClick={() =>
                      setForm({
                        name: "",
                        phone: "",
                        email: "",
                        service: "",
                        msg: "",
                        sent: false,
                        loading: false,
                      })
                    }
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <>
                  <h3
                    className="font-extrabold text-xl mb-1"
                    style={{ color: t.txt }}
                  >
                    Request a Quote
                  </h3>
                  <p className="text-[13px] mb-6" style={{ color: t.muted }}>
                    Fill in the form and we'll respond via WhatsApp or phone.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <input
                      style={inp}
                      type="text"
                      placeholder="Full Name *"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      onFocus={(e) => (e.target.style.borderColor = t.cyan)}
                      onBlur={(e) => (e.target.style.borderColor = t.border)}
                    />
                    <input
                      style={inp}
                      type="tel"
                      placeholder="Phone Number *"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, phone: e.target.value }))
                      }
                      onFocus={(e) => (e.target.style.borderColor = t.cyan)}
                      onBlur={(e) => (e.target.style.borderColor = t.border)}
                    />
                  </div>
                  <input
                    style={{ ...inp, marginBottom: 12 }}
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    onFocus={(e) => (e.target.style.borderColor = t.cyan)}
                    onBlur={(e) => (e.target.style.borderColor = t.border)}
                  />
                  <select
                    style={{
                      ...inp,
                      marginBottom: 12,
                      cursor: "pointer",
                      color: form.service ? t.txt : t.muted,
                    }}
                    value={form.service}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, service: e.target.value }))
                    }
                  >
                    <option value="" style={{ background: t.bgC }}>
                      Select a Service
                    </option>
                    <option style={{ background: t.bgC }}>
                      Vehicle Protection &amp; Styling
                    </option>
                    <option style={{ background: t.bgC }}>
                      Light Boards &amp; Signage
                    </option>
                    <option style={{ background: t.bgC }}>
                      Advertising &amp; Branding
                    </option>
                    <option style={{ background: t.bgC }}>
                      Industrial Fabrication
                    </option>
                    <option style={{ background: t.bgC }}>
                      Other / Not Sure
                    </option>
                  </select>
                  <textarea
                    style={{ ...inp, marginBottom: 20, resize: "none" }}
                    rows={4}
                    placeholder="Tell us about your project..."
                    value={form.msg}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, msg: e.target.value }))
                    }
                    onFocus={(e) => (e.target.style.borderColor = t.cyan)}
                    onBlur={(e) => (e.target.style.borderColor = t.border)}
                  />

                  <button
                    className="pbtn w-full text-[13px] py-4"
                    style={{
                      background: t.cyan,
                      color: "#fff",
                      opacity: form.loading ? 0.7 : 1,
                    }}
                    onClick={send}
                    disabled={form.loading}
                  >
                    {form.loading ? "Sending…" : "Send Message"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="border-t py-8 px-[5%]"
        style={{ borderTopColor: t.border, background: t.bgS }}
      >
        <div className="max-w-[1300px] mx-auto flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <TSMark size={32} />
            <div>
              <WordMark t={t} size={13} />
              <div
                className="text-[9px] tracking-[3px] uppercase mt-0.5"
                style={{ color: t.faint }}
              >
                Horana · Est. 1996
              </div>
            </div>
          </div>
          <div className="text-[11.5px]" style={{ color: t.faint }}>
            © 2025 Thilina Stickers, Horana.
          </div>
          <div className="flex flex-wrap gap-5">
            {NAV.map((n) => (
              <button
                key={n}
                className="nb text-[10.5px] font-bold tracking-[1.2px] uppercase transition-colors"
                style={{ color: t.faint }}
                onMouseEnter={(e) => (e.target.style.color = t.cyan)}
                onMouseLeave={(e) => (e.target.style.color = t.faint)}
                onClick={() => go(n.toLowerCase())}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <a
        href="https://wa.me/94778618584"
        target="_blank"
        rel="noreferrer"
        className="wafloat"
      >
        <svg width="25" height="25" viewBox="0 0 24 24" fill="#fff">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
