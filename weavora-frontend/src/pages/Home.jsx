import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import ProductCard from '../components/ProductCard';

/* ─── Google Fonts injected once ─────────────────────────────────────────── */
const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);
  return null;
};

/* ─── Floating 3-D fabric thread decoration ──────────────────────────────── */
const FloatingThreads = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    style={{ zIndex: 1 }}
    viewBox="0 0 1440 900"
    preserveAspectRatio="xMidYMid slice"
  >
    {[...Array(6)].map((_, i) => (
      <path
        key={i}
        d={`M${-100 + i * 280},${50 + i * 60} Q${300 + i * 120},${400 + i * 30} ${700 + i * 100},${200 + i * 80} T${1500 + i * 50},${300 + i * 40}`}
        fill="none"
        stroke={`rgba(180,140,220,${0.06 + i * 0.015})`}
        strokeWidth={i % 2 === 0 ? '1.5' : '0.8'}
        style={{
          animation: `threadFloat ${7 + i * 1.5}s ease-in-out infinite alternate`,
          animationDelay: `${i * 0.6}s`,
        }}
      />
    ))}
    <style>{`
      @keyframes threadFloat {
        from { transform: translateY(0px) scaleX(1); }
        to   { transform: translateY(18px) scaleX(1.02); }
      }
    `}</style>
  </svg>
);

/* ─── Animated counter ───────────────────────────────────────────────────── */
const Counter = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = target / 60;
          const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(start));
          }, 22);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

/* ─── 3-D Tilt card wrapper ──────────────────────────────────────────────── */
const TiltCard = ({ children, className = '' }) => {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
    el.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) scale(1.03)`;
  };

  const handleLeave = () => {
    if (ref.current)
      ref.current.style.transform =
        'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: 'transform 0.25s ease', willChange: 'transform' }}
    >
      {children}
    </div>
  );
};

/* ─── Data ───────────────────────────────────────────────────────────────── */
const featuredProducts = [
  { _id: 'w46', name: 'Bridal Lehenga',       price: 18999, subcategory: 'Lehengas',      imageUrl: 'https://i.pinimg.com/736x/2b/c5/da/2bc5da3e642c9edfaa63e062621d3119.jpg' },
  { _id: 'm11', name: 'Royal Suit',            price: 15000, subcategory: "Men's Ethnic",  imageUrl: 'https://i.pinimg.com/1200x/e7/e4/ce/e7e4ce8dbf199beb8a9fe698330edf45.jpg' },
  { _id: 'g3',  name: 'Pink Grunge Tee',       price: 2500,  subcategory: 'T-Shirts',      imageUrl: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1743585224_4414304.jpg?w=480&dpr=2' },
  { _id: 'w5',  name: 'Paithani Saree',        price: 50000, subcategory: 'Sarees',        imageUrl: 'https://i.pinimg.com/1200x/57/d8/23/57d823a5940b238880f25a6c7af2e96a.jpg' },
];

const categoryCards = [
  {
    label: 'Women',
    to: '/category/women',
    accent: '#c084fc',
    description: 'Sarees · Lehengas · Kurtis · Dresses',
    image: 'https://i.pinimg.com/1200x/57/d8/23/57d823a5940b238880f25a6c7af2e96a.jpg',
  },
  {
    label: 'Men',
    to: '/category/men',
    accent: '#818cf8',
    description: 'Kurtas · Sherwanis · Blazers · Suits',
    image: 'https://i.pinimg.com/1200x/e7/e4/ce/e7e4ce8dbf199beb8a9fe698330edf45.jpg',
  },
  {
    label: 'Gen‑Z',
    to: '/category/genz',
    accent: '#f472b6',
    description: 'T‑Shirts · Jeans · Streetwear',
    image: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1743585224_4414304.jpg?w=480&dpr=2',
  },
  {
    label: 'Kids',
    to: '/category/kids',
    accent: '#34d399',
    description: 'Frocks · Sherwanis · Ethnic Sets',
    image: 'https://images.meesho.com/images/products/469449459/q2fd7_512.webp?width=512',
  },
];

const editorialRows = [
  {
    tag: 'Wedding Season',
    title: 'Dressed for\nthe Mandap',
    body: 'From silk Banarasi drapes to embroidered sherwanis — every thread tells a story. Explore our bridal and groom collections crafted for your most memorable day.',
    cta: 'Shop Bridal',
    to: '/category/women',
    image: 'https://i.pinimg.com/736x/2b/c5/da/2bc5da3e642c9edfaa63e062621d3119.jpg',
    reverse: false,
  },
  {
    tag: 'Street & Soul',
    title: 'Own the\nSidewalk',
    body: 'Graphic tees, baggy fits, and statement denim for the generation that writes its own rules. Unapologetically loud, always on‑brand.',
    cta: 'Shop Gen‑Z',
    to: '/category/genz',
    image: 'https://pbs.twimg.com/media/F8lD2nuWEAAYPQ1.jpg',
    reverse: true,
  },
];

const stats = [
  { value: 5000, suffix: '+', label: 'Happy Customers' },
  { value: 200,  suffix: '+', label: 'Styles In Stock' },
  { value: 98,   suffix: '%', label: 'Satisfaction Rate' },
  { value: 12,   suffix: '',  label: 'Years of Craft' },
];

/* ══════════════════════════════════════════════════════════════════════════ */
const Home = () => {
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <FontLoader />

      {/* ── CSS custom props + keyframes ────────────────────────────────── */}
      <style>{`
        :root {
          --weavora-dark: #1e0a36;
          --weavora-mid:  #3b1a6b;
          --weavora-light:#c084fc;
          --weavora-gold: #e9c46a;
          --ff-display: 'Cormorant Garamond', Georgia, serif;
          --ff-body:    'DM Sans', sans-serif;
        }

        .font-display { font-family: var(--ff-display); }
        .font-body    { font-family: var(--ff-body);    }

        @keyframes heroReveal {
          from { opacity:0; transform: translateY(40px); }
          to   { opacity:1; transform: translateY(0);    }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes floatY {
          0%,100% { transform: translateY(0px);   }
          50%      { transform: translateY(-14px); }
        }
        @keyframes scaleIn {
          from { opacity:0; transform: scale(0.88); }
          to   { opacity:1; transform: scale(1);    }
        }
        @keyframes slideUp {
          from { opacity:0; transform: translateY(50px); }
          to   { opacity:1; transform: translateY(0);    }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }

        .hero-text-reveal { animation: heroReveal 1s cubic-bezier(.22,1,.36,1) both; }
        .shimmer-text {
          background: linear-gradient(90deg,
            #fff 0%, #c084fc 40%, #fff 60%, #e9c46a 80%, #fff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        .float-anim { animation: floatY 6s ease-in-out infinite; }
        .scale-in   { animation: scaleIn .7s cubic-bezier(.22,1,.36,1) both; }
        .slide-up   { animation: slideUp .8s cubic-bezier(.22,1,.36,1) both; }

        /* 3-D card glass */
        .glass-card {
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow:
            0 8px 32px rgba(0,0,0,0.35),
            inset 0 1px 0 rgba(255,255,255,0.15);
        }

        /* Category hover shimmer ring */
        .cat-card::after {
          content:'';
          position:absolute;
          inset:-2px;
          border-radius:inherit;
          background: conic-gradient(from 0deg, transparent 0%, var(--accent) 30%, transparent 60%);
          opacity:0;
          transition: opacity .4s;
          z-index:-1;
          animation: spinSlow 3s linear infinite;
        }
        .cat-card:hover::after { opacity:1; }

        /* Scroll-fade utility */
        .scroll-fade {
          opacity:0;
          transform: translateY(40px);
          transition: opacity .8s ease, transform .8s ease;
        }
        .scroll-fade.visible {
          opacity:1;
          transform: translateY(0);
        }

        /* Marquee */
        @keyframes marquee {
          from { transform: translateX(0);       }
          to   { transform: translateX(-50%);    }
        }
        .marquee-track { animation: marquee 28s linear infinite; }

        /* Dotted texture overlay */
        .dot-texture {
          background-image: radial-gradient(circle, rgba(192,132,252,0.08) 1px, transparent 1px);
          background-size: 28px 28px;
        }
      `}</style>

      <div className="pb-20 overflow-x-hidden" style={{ fontFamily: 'var(--ff-body)', background: '#faf8ff' }}>

        {/* ══════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════ */}
        <section className="relative h-[92vh] w-full overflow-hidden flex items-center justify-center"
  style={{ background: 'var(--weavora-dark)' }}>

  {/* Background video - Opacity increased to 100% for maximum clarity */}
  <video autoPlay loop muted playsInline
    className="absolute inset-0 w-full h-full object-cover z-0">
    <source src="/hero.MP4" type="video/mp4" />
  </video>

  {/* REMOVED: The white/purple gradient layers that were here 
    This allows the video to be seen without any color tint.
  */}

  {/* Floating threads */}
  <FloatingThreads />

  {/* Pulsing orbs - Kept these as they add depth without covering the video */}
  <div className="absolute top-16 right-16 w-72 h-72 rounded-full z-10 float-anim"
    style={{ background: 'radial-gradient(circle, rgba(192,132,252,0.18), transparent 70%)', filter: 'blur(20px)' }} />
  <div className="absolute bottom-24 left-8 w-56 h-56 rounded-full z-10"
    style={{ background: 'radial-gradient(circle, rgba(233,196,106,0.12), transparent 70%)', filter: 'blur(24px)', animation: 'floatY 8s ease-in-out infinite reverse' }} />

  {/* Hero content */}

</section>
        {/* ══════════════════════════════════════════════════════
            MARQUEE BAND
        ══════════════════════════════════════════════════════ */}
        <div className="py-4 overflow-hidden" style={{ background: 'var(--weavora-mid)' }}>
          <div className="flex marquee-track whitespace-nowrap">
            {[...Array(2)].map((_, ri) => (
              <div key={ri} className="flex items-center shrink-0">
                {['Ethnic Wear', 'Bridal Lehengas', 'Gen-Z Drops', 'Handloom Sarees', 'Kids Fashion', 'Blazers & Suits', 'Chikankari', 'Street Style'].map((t, i) => (
                  <span key={i} className="flex items-center gap-4 px-6 font-display text-sm tracking-widest"
                    style={{ color: 'rgba(233,213,255,0.7)' }}>
                    <span className="text-lg" style={{ color: 'var(--weavora-gold)' }}>✦</span>
                    {t.toUpperCase()}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            CATEGORY CARDS  (4-column 3-D grid)
        ══════════════════════════════════════════════════════ */}
        <section className="relative py-28 dot-texture" style={{ background: '#faf8ff' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-16">
              <p className="font-body text-xs tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--weavora-mid)' }}>Browse by</p>
              <h2 className="font-display font-bold" style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', color: 'var(--weavora-dark)' }}>
                Shop Your <em>World</em>
              </h2>
              <div className="w-16 h-0.5 mx-auto mt-4 rounded-full" style={{ background: 'var(--weavora-light)' }} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryCards.map((cat, i) => (
                <TiltCard key={cat.label}
                  className="cat-card relative rounded-2xl overflow-hidden group cursor-pointer"
                  style={{ '--accent': cat.accent, animationDelay: `${i * 0.1}s` }}>
                  <Link to={cat.to} className="block">
                    {/* Image */}
                    <div className="relative h-72 overflow-hidden">
                      <img src={cat.image} alt={cat.label}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-70"
                        style={{ background: `linear-gradient(to top, var(--weavora-dark) 0%, transparent 60%)` }} />
                      {/* Accent ring on hover */}
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ boxShadow: `inset 0 0 0 2px ${cat.accent}` }} />
                    </div>

                    {/* Text overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="inline-block text-xs font-body tracking-[0.2em] uppercase mb-1 px-2 py-0.5 rounded-full"
                        style={{ color: cat.accent, background: `${cat.accent}22`, border: `1px solid ${cat.accent}44` }}>
                        {cat.description.split(' · ')[0]}
                      </span>
                      <h3 className="font-display font-bold text-white text-3xl mt-1 leading-tight">{cat.label}</h3>
                      <p className="font-body text-xs mt-1" style={{ color: 'rgba(255,255,255,0.55)' }}>{cat.description}</p>
                      <div className="mt-4 flex items-center gap-2 text-xs font-body font-semibold transition-all duration-300 group-hover:gap-3"
                        style={{ color: cat.accent }}>
                        Explore →
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            TRENDING NOW  (featured products)
        ══════════════════════════════════════════════════════ */}
        <section className="py-24" style={{ background: 'var(--weavora-dark)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="flex justify-between items-end mb-14">
              <div>
                <p className="font-body text-xs tracking-[0.3em] uppercase mb-3" style={{ color: 'rgba(192,132,252,0.6)' }}>Curated Picks</p>
                <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(2.2rem,4vw,3.5rem)' }}>
                  Trending <em style={{ color: 'var(--weavora-light)' }}>Now</em>
                </h2>
              </div>
              <Link to="/category/women"
                className="font-body text-sm font-semibold transition-colors hidden sm:block"
                style={{ color: 'var(--weavora-gold)' }}>
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product, i) => (
                <div key={product._id}
                  className="scale-in"
                  style={{ animationDelay: `${i * 0.12}s` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            <div className="text-center mt-10 sm:hidden">
              <Link to="/category/women"
                className="font-body text-sm font-semibold"
                style={{ color: 'var(--weavora-gold)' }}>
                View All →
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            EDITORIAL SPLIT SECTIONS
        ══════════════════════════════════════════════════════ */}
        {editorialRows.map((row, i) => (
          <section key={i} className="relative overflow-hidden" style={{ background: i % 2 === 0 ? '#f5f0ff' : '#fff' }}>
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col ${row.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16`}>

              {/* Image side */}
              <TiltCard className="w-full lg:w-1/2 shrink-0">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: '4/5' }}>
                  <img src={row.image} alt={row.title}
                    className="w-full h-full object-cover" />
                  {/* Glass badge */}
                  <div className="absolute top-6 left-6 glass-card rounded-2xl px-4 py-2"
                    style={{ background: 'rgba(30,10,54,0.6)', border: '1px solid rgba(192,132,252,0.25)' }}>
                    <span className="font-body text-xs tracking-widest uppercase"
                      style={{ color: 'var(--weavora-light)' }}>✦ {row.tag}</span>
                  </div>
                  {/* Price watermark */}
                  <div className="absolute bottom-6 right-6 font-display text-5xl font-bold"
                    style={{ color: 'rgba(255,255,255,0.08)', letterSpacing: '-0.03em' }}>
                    {i === 0 ? '₹18,999' : '₹3,700'}
                  </div>
                </div>
              </TiltCard>

              {/* Text side */}
              <div className="w-full lg:w-1/2">
                <p className="font-body text-xs tracking-[0.3em] uppercase mb-4"
                  style={{ color: 'var(--weavora-light)' }}>
                  {row.tag}
                </p>
                <h2 className="font-display font-bold leading-[1.05] mb-6"
                  style={{ fontSize: 'clamp(2.8rem,5vw,4.5rem)', color: 'var(--weavora-dark)', whiteSpace: 'pre-line' }}>
                  {row.title}
                </h2>
                <div className="w-12 h-0.5 mb-6 rounded-full" style={{ background: 'var(--weavora-gold)' }} />
                <p className="font-body font-light mb-10 leading-relaxed"
                  style={{ color: 'rgba(30,10,54,0.65)', fontSize: '1.05rem', maxWidth: '42ch' }}>
                  {row.body}
                </p>
                <Link to={row.to}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-body font-semibold text-sm tracking-wide transition-all hover:scale-105"
                  style={{ background: 'var(--weavora-dark)', color: '#fff', boxShadow: '0 8px 24px rgba(30,10,54,0.25)' }}
                  onMouseEnter={e => { e.currentTarget.style.background='var(--weavora-mid)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='var(--weavora-dark)'; }}
                >
                  {row.cta}
                  <span style={{ color: 'var(--weavora-light)' }}>→</span>
                </Link>
              </div>
            </div>
          </section>
        ))}

        {/* ══════════════════════════════════════════════════════
            STATS BAND
        ══════════════════════════════════════════════════════ */}
        <section className="py-20" style={{ background: 'var(--weavora-mid)' }}>
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            {stats.map((s, i) => (
              <div key={i}>
                <p className="font-display font-bold mb-1"
                  style={{ fontSize: 'clamp(2.5rem,4vw,4rem)', color: '#fff' }}>
                  <Counter target={s.value} suffix={s.suffix} />
                </p>
                <p className="font-body text-xs tracking-widest uppercase"
                  style={{ color: 'rgba(233,213,255,0.55)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            KIDS SPOTLIGHT
        ══════════════════════════════════════════════════════ */}
        <section className="py-24 relative overflow-hidden dot-texture" style={{ background: '#fdf9ff' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl overflow-hidden relative"
              style={{ background: 'linear-gradient(135deg, #1e0a36 0%, #3b1a6b 50%, #5b1d8a 100%)', minHeight: '340px' }}>

              {/* Decorative circles */}
              <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full opacity-10"
                style={{ background: 'var(--weavora-light)' }} />
              <div className="absolute -left-8 -bottom-8 w-48 h-48 rounded-full opacity-10"
                style={{ background: 'var(--weavora-gold)' }} />

              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 px-10 py-14">
                <div>
                  <p className="font-body text-xs tracking-[0.3em] uppercase mb-3"
                    style={{ color: 'var(--weavora-gold)' }}>Little Ones</p>
                  <h2 className="font-display font-bold text-white leading-tight mb-4"
                    style={{ fontSize: 'clamp(2.5rem,4vw,3.8rem)' }}>
                    Adorable styles<br /><em>for kids too.</em>
                  </h2>
                  <p className="font-body font-light mb-8"
                    style={{ color: 'rgba(233,213,255,0.65)', maxWidth: '38ch' }}>
                    Frocks, ethnic sets, sherwanis and more — thoughtfully crafted for the little fashionistas.
                  </p>
                  <Link to="/category/kids"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-body font-semibold text-sm transition-all hover:scale-105"
                    style={{ background: 'var(--weavora-gold)', color: 'var(--weavora-dark)' }}>
                    Shop Kids →
                  </Link>
                </div>

                {/* Product preview strip */}
                <div className="flex gap-4 shrink-0">
                  {[
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSibz2PKn5KdduG5pg2UY4XJ5IGd3d954w7pA&s',
                    'https://images.meesho.com/images/products/469449459/q2fd7_512.webp?width=512',
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvNlHz8sx71QPykdHoqS-z0YqPQsZCKuWK3A&s',
                  ].map((src, idx) => (
                    <div key={idx}
                      className="w-28 h-36 rounded-2xl overflow-hidden shadow-xl flex-shrink-0"
                      style={{
                        transform: `rotate(${[-4, 0, 4][idx]}deg) translateY(${[8, 0, 12][idx]}px)`,
                        border: '2px solid rgba(255,255,255,0.12)',
                        animationDelay: `${idx * 0.2}s`,
                      }}>
                      <img src={src} alt="kids" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            NEWSLETTER / CLOSING CTA
        ══════════════════════════════════════════════════════ */}
        <section className="py-24" style={{ background: '#fff' }}>
          <div className="max-w-2xl mx-auto px-4 text-center">
            <span className="font-body text-xs tracking-[0.3em] uppercase mb-4 inline-block"
              style={{ color: 'var(--weavora-light)' }}>Stay in the loop</span>
            <h2 className="font-display font-bold mb-4 leading-tight"
              style={{ fontSize: 'clamp(2.2rem,4vw,3.5rem)', color: 'var(--weavora-dark)' }}>
              First looks. Exclusive drops.<br /><em>Only for you.</em>
            </h2>
            <p className="font-body font-light mb-10"
              style={{ color: 'rgba(30,10,54,0.5)', fontSize: '1rem' }}>
              Join thousands of style lovers who get new arrivals before anyone else.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-5 py-3.5 rounded-full font-body text-sm outline-none"
                style={{
                  border: '1.5px solid rgba(30,10,54,0.15)',
                  background: '#faf8ff',
                  color: 'var(--weavora-dark)',
                }}
              />
              <button
                type="submit"
                className="px-8 py-3.5 rounded-full font-body font-semibold text-sm transition-all hover:scale-105 shrink-0"
                style={{
                  background: 'var(--weavora-dark)',
                  color: '#fff',
                  boxShadow: '0 8px 24px rgba(30,10,54,0.2)',
                }}
              >
                Subscribe ✦
              </button>
            </form>
          </div>
        </section>

      </div>
    </>
  );
};

export default Home;