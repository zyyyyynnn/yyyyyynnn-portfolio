import React, { useEffect, useMemo, useRef, useState } from "react";

const terminalLines = [
  "yyyyyynnn@archive:~$ pnpm run boot:portfolio",
  "> initializing paper archive...",
  "> loading project metadata...",
  "> indexing landscape captures...",
  "> pinning cat stickers...",
  "> composing hero layout...",
  "> syncing terminal to device...",
  "done.",
  "yyyyyynnn@archive:~$ open home",
];

const projects = [
  {
    id: "01",
    title: "Immersive Interview System",
    cn: "沉浸式模拟面试系统",
    desc: "基于大语言模型的模拟面试与简历诊断系统，覆盖简历解析、岗位匹配、阶段化问答、会话回放、报告生成和能力分析。",
    stack: ["Vue 3", "TypeScript", "Vite", "Spring Boot", "MySQL", "SSE", "LLM API", "ECharts"],
    repo: "github.com/zyyyyynnn/graduation-project",
    image: "/assets/projects/project-01-interview.png",
    note: "Code shapes logic.",
  },
  {
    id: "02",
    title: "Meeting Room Reservation System",
    cn: "会议室预约与资源协调系统",
    desc: "面向会议室资源协调的预约管理系统，包含运营看板、会议预约、会议室管理、审批、通知抽屉和用户管理等界面。",
    stack: ["Vue 3", "TypeScript", "Vite", "Element Plus", "FullCalendar", "Axios"],
    repo: "github.com/zyyyyynnn/meeting-room-system",
    image: "/assets/projects/project-02-meeting-room.png",
    note: "Pinned workflow.",
  },
  {
    id: "03",
    title: "AI Procurement Platform",
    cn: "AI 采购与供应商准入平台",
    desc: "基于 AI 智能体的企业采购与供应商准入协同平台，覆盖采购申请、审批流转、AI 辅助审核、通知留痕与统计看板。",
    stack: ["Vue 3", "TypeScript", "Vite", "Spring Boot", "JWT", "MyBatis-Plus", "MySQL", "Redis"],
    repo: "github.com/zyyyyynnn/ai-procurement-platform",
    image: "/assets/projects/project-03-procurement.png",
    note: "Archived system.",
  },
];

const landscapes = [
  ["01", "厦门 Xiamen", "/assets/photos/landscapes/landscape-01-xiamen.jpg", "24.47°N"],
  ["02", "重庆 Chongqing", "/assets/photos/landscapes/landscape-02-chongqing.jpg", "mountain city"],
  ["03", "长沙 Changsha", "/assets/photos/landscapes/landscape-03-changsha.jpg", "neon rain"],
  ["04", "广州 Guangzhou", "/assets/photos/landscapes/landscape-04-guangzhou.jpg", "tower line"],
  ["05", "南京 Nanjing", "/assets/photos/landscapes/landscape-05-nanjing.jpg", "quiet wall"],
  ["06", "南昌 Nanchang", "/assets/photos/landscapes/landscape-06-nanchang.jpg", "rose note"],
  ["07", "丽江 Lijiang", "/assets/photos/landscapes/landscape-07-lijiang.jpg", "blue lake"],
  ["08", "武汉 Wuhan", "/assets/photos/landscapes/landscape-08-wuhan.jpg", "night tower"],
  ["09", "青岛 Qingdao", "/assets/photos/landscapes/landscape-09-qingdao.jpg", "sea frame"],
];

const cats = Array.from({ length: 6 }, (_, index) => ({
  id: `${index + 1}`.padStart(2, "0"),
  image: `/assets/photos/cats/cat-${String(index + 1).padStart(2, "0")}.png`,
  note: ["猫猫出没", "archived cat", "quiet visitor", "found frame", "take a rest", "daily companion"][index],
}));

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function useReveal() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll("[data-reveal]"));
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.14 }
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function useProjectScroll(total) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const update = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrollable = Math.max(ref.current.offsetHeight - window.innerHeight, 1);
      setProgress(clamp(-rect.top / scrollable, 0, 1));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [total]);

  return { ref, progress };
}

function ImageWithFallback({ src, alt, className = "", label = "image pending" }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className={`image-fallback ${className}`} aria-label={alt}>{label}</div>;
  return <img className={className} src={src} alt={alt} onError={() => setFailed(true)} />;
}

function Stamp({ children, className = "" }) {
  return <span className={`stamp ${className}`}>{children}</span>;
}

function TerminalText({ compact = false }) {
  const visibleLines = compact ? terminalLines.slice(-4) : terminalLines;
  return (
    <div className={compact ? "terminal-mini-lines" : "terminal-lines"}>
      {visibleLines.map((line, index) => (
        <div key={`${line}-${index}`} style={{ animationDelay: compact ? "0ms" : `${index * 185}ms` }}>
          {line}
          {index === visibleLines.length - 1 ? <span className="cursor" /> : null}
        </div>
      ))}
    </div>
  );
}

function OpeningTerminal({ targetRef, phase, setPhase }) {
  const windowRef = useRef(null);
  const [dockTransform, setDockTransform] = useState("translate3d(0, 0, 0) scale(1)");

  const startDocking = () => {
    const terminalRect = windowRef.current?.getBoundingClientRect();
    const targetRect = targetRef.current?.getBoundingClientRect();

    if (!terminalRect || !targetRect) {
      setPhase("skipped");
      return;
    }

    const scale = Math.min(targetRect.width / terminalRect.width, targetRect.height / terminalRect.height);
    const terminalCenterX = terminalRect.left + terminalRect.width / 2;
    const terminalCenterY = terminalRect.top + terminalRect.height / 2;
    const targetCenterX = targetRect.left + targetRect.width / 2;
    const targetCenterY = targetRect.top + targetRect.height / 2;

    setDockTransform(`translate3d(${targetCenterX - terminalCenterX}px, ${targetCenterY - terminalCenterY}px, 0) scale(${scale})`);
    setPhase("docking");
    window.setTimeout(() => setPhase("docked"), 1120);
  };

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setPhase("skipped");
      return;
    }

    const timer = window.setTimeout(startDocking, 3550);
    return () => window.clearTimeout(timer);
  }, []);

  const skip = () => setPhase("skipped");

  return (
    <div className={`terminal-cover ${phase}`} aria-hidden={phase === "docked" || phase === "skipped"}>
      <button className="skip" onClick={skip}>Skip</button>
      <div
        ref={windowRef}
        className="terminal-window"
        style={phase === "docking" ? { transform: dockTransform } : undefined}
      >
        <div className="terminal-titlebar">
          <div className="terminal-controls"><span /><span /><span /></div>
          <span className="terminal-title">portfolio — archive boot</span>
        </div>
        <TerminalText />
      </div>
    </div>
  );
}

function SectionHeader({ number, title, subtitle, note }) {
  return (
    <div className="section-header" data-reveal>
      <div className="section-index">{number}</div>
      <div>
        <p className="eyebrow">Paper Archive / {number}</p>
        <h2>{title}</h2>
        <p className="section-subtitle">{subtitle}</p>
      </div>
      {note && <p className="hand-note header-note">{note}</p>}
    </div>
  );
}

function SiteNav() {
  const nav = [
    ["01", "Home", "#home"],
    ["02", "Projects", "#projects"],
    ["03", "Photos", "#photos"],
    ["04", "Cats", "#cats"],
    ["05", "About", "#about"],
    ["06", "Contact", "#contact"],
  ];

  return (
    <nav className="site-nav" aria-label="Main navigation">
      <a className="brand" href="#home">yyyyyynnn</a>
      <div className="nav-links">
        {nav.map(([id, label, href]) => (
          <a href={href} key={id}><span>{id}</span>{label}</a>
        ))}
      </div>
    </nav>
  );
}

function RetroComputerDock({ screenRef, docked }) {
  return (
    <div className="retro-computer-wrap">
      <div className="retro-computer">
        <ImageWithFallback
          src="/assets/hero/retro-computer-terminal-dock.png"
          alt="Retro computer and keyboard terminal dock"
          className="retro-computer-img"
          label="retro computer"
        />
        <div ref={screenRef} className={`retro-screen ${docked ? "screen-live" : ""}`} id="terminal-dock">
          {docked ? <TerminalText compact /> : null}
        </div>
      </div>
      <p className="hand-note computer-note">terminal docks here</p>
    </div>
  );
}

function Hero({ screenRef, terminalPhase }) {
  const docked = terminalPhase === "docked" || terminalPhase === "skipped";

  return (
    <section className={`hero ${docked ? "hero-ready" : ""}`} id="home">
      <div className="hero-copy" data-reveal>
        <p className="eyebrow">01 Home / Clean Light Paper Archive</p>
        <h1><span>I ship code,</span><br /><span>I catch light.</span></h1>
        <p className="hero-subtitle">写代码，也记录光线落下来的方式。</p>
        <p className="identity">yyyyyynnn</p>
        <p className="hand-note hero-note">paper archive / light notes</p>
      </div>
      <div className="hero-stack" data-reveal>
        <div className="kraft-slab" />
        <RetroComputerDock screenRef={screenRef} docked={docked} />
      </div>
    </section>
  );
}

function ProjectCard({ project, index, activeRaw }) {
  const distance = index - activeRaw;
  const isPast = distance < 0;
  const y = isPast ? distance * 116 : distance * 42;
  const rotate = isPast ? clamp(distance * 4, -7, 0) : clamp(distance * -1.8, -2.5, 0);
  const scale = 1 - Math.min(Math.abs(distance), 1.4) * 0.038;
  const opacity = distance < -0.75 ? Math.max(0, 1.45 + distance) : distance > 1.25 ? Math.max(0, 1.7 - distance) : 1;
  const blur = Math.abs(distance) > 0.8 ? Math.min(Math.abs(distance) * 1.4, 2.2) : 0;

  return (
    <article
      className="paper-card project-scroll-card"
      style={{
        zIndex: 20 - Math.round(Math.abs(distance) * 4) + index,
        opacity,
        filter: `blur(${blur}px)`,
        transform: `translate3d(0, ${y}%, 0) rotate(${rotate}deg) scale(${scale})`,
      }}
    >
      <div className="project-ruler" />
      <Stamp>{project.id}</Stamp>
      <div className="project-scroll-copy">
        <p className="eyebrow">Project Archive / {project.id}</p>
        <h3>{project.title}</h3>
        <p className="project-cn">{project.cn}</p>
        <p className="project-desc">{project.desc}</p>
        <div className="stack-tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <a href={`https://${project.repo}`} aria-label={`Open ${project.title} GitHub`}>{project.repo} ↗</a>
      </div>
      <div className="project-visual-wrap">
        <ImageWithFallback src={project.image} alt={project.title} label="project screenshot pending" className="project-scroll-shot" />
        <div className="project-screen-lines" />
      </div>
      <p className="hand-note project-note">{project.note}</p>
    </article>
  );
}

function Projects() {
  const { ref, progress } = useProjectScroll(projects.length);
  const activeRaw = progress * (projects.length - 1);
  const activeIndex = Math.round(activeRaw);

  return (
    <section className="section projects-section" id="projects">
      <SectionHeader number="02" title="Projects" subtitle="精选项目" note="scroll cards / project archive" />
      <div className="project-scroll-shell" ref={ref} data-reveal>
        <div className="project-scroll-stage">
          <aside className="project-index-panel">
            <p className="eyebrow">Current Project</p>
            <div className="project-counter">{String(activeIndex + 1).padStart(2, "0")}</div>
            <div className="project-track">
              {projects.map((project, index) => (
                <div className={`project-track-item ${Math.round(activeRaw) === index ? "active" : ""}`} key={project.id}>
                  <span>{project.id}</span>
                  <strong>{project.title}</strong>
                </div>
              ))}
            </div>
            <p className="hand-note">previous card pulls away,<br />next archive appears.</p>
          </aside>
          <div className="project-card-stage" aria-live="polite">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} activeRaw={activeRaw} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Landscapes() {
  const rotations = [-3, 1.8, -1.5, 2.6, -2.4, 1.2, 3.2, -1, 2];

  return (
    <section className="section photos-section" id="photos">
      <SectionHeader number="03" title="Landscape Photography" subtitle="风景摄影 · 光线记录" note="pinned / stray light / 随手拍" />
      <div className="photo-board" data-reveal>
        {landscapes.map(([id, city, image, note], index) => (
          <article className="polaroid" key={id} style={{ "--r": `${rotations[index]}deg` }}>
            <span className="clip" />
            <ImageWithFallback src={image} alt={city} label={city} />
            <div className="polaroid-caption">
              <strong>{city}</strong>
              <span>{note}</span>
            </div>
          </article>
        ))}
        <p className="hand-note board-note">光线记录<br />time pinned</p>
      </div>
    </section>
  );
}

function Cats() {
  const rotations = [-5, 4, -2, 6, -4, 2];

  return (
    <section className="section cats-section" id="cats">
      <SectionHeader number="04" title="Cats" subtitle="猫猫出没，注意温柔。" note="archived cat / quiet visitor" />
      <div className="cats-board" data-reveal>
        {cats.map((cat, index) => (
          <article className="cat-piece" key={cat.id} style={{ "--r": `${rotations[index]}deg` }}>
            <ImageWithFallback src={cat.image} alt={`Cat ${cat.id}`} label={`cat-${cat.id}`} />
            <Stamp>{cat.id}</Stamp>
            <p className="hand-note">{cat.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AboutContact() {
  const [copied, setCopied] = useState("");

  const copy = async (label, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => setCopied(""), 1400);
    } catch {
      setCopied("failed");
    }
  };

  return (
    <section className="section about-contact" id="about">
      <SectionHeader number="05" title="About" subtitle="关于我" note="one page, two traces" />
      <div className="about-grid" data-reveal>
        <article className="paper-card about-card">
          <Stamp>05</Stamp>
          <h3>About</h3>
          <p>在校生，写代码，也用手机记录一些光线和猫。喜欢把系统设计和取景角度同等认真地对待：一边整理逻辑，一边收集日常的形状。</p>
          <div className="paper-tags">
            {["Student", "Frontend", "System Design", "Mobile Photography", "Cats"].map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </article>
        <article className="paper-card contact-card" id="contact">
          <Stamp>06</Stamp>
          <h3>Contact</h3>
          <a className="contact-line primary" href="mailto:ww7296298@gmail.com">ww7296298@gmail.com</a>
          <a className="contact-line" href="https://github.com/zyyyyynnn">github.com/zyyyyynnn ↗</a>
          <p className="contact-line">Douyin: ynzhang0118</p>
          <div className="copy-row">
            <button onClick={() => copy("qq", "1974447317@qq.com")}>{copied === "qq" ? "Copied" : "Copy QQ Email"}</button>
            <button onClick={() => copy("wechat", "13312244867")}>{copied === "wechat" ? "Copied" : "Copy WeChat"}</button>
          </div>
          <p className="hand-note">let's build something quiet.</p>
        </article>
      </div>
    </section>
  );
}

export default function PaperArchiveRetroDockPortfolio() {
  useReveal();

  const screenRef = useRef(null);
  const [terminalPhase, setTerminalPhase] = useState("typing");
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <main>
      <OpeningTerminal targetRef={screenRef} phase={terminalPhase} setPhase={setTerminalPhase} />
      <SiteNav />
      <Hero screenRef={screenRef} terminalPhase={terminalPhase} />
      <Projects />
      <Landscapes />
      <Cats />
      <AboutContact />
      <footer>© {year} yyyyyynnn. Design with calm. Code with care.</footer>
      <style>{css}</style>
    </main>
  );
}

const css = `
:root {
  --paper-bg: #f4eddf;
  --paper-bg-soft: #fbf6eb;
  --paper: #f1e8d3;
  --paper-card: #eee3ca;
  --paper-warm: #e5d5b7;
  --paper-aged: #d2bf9b;
  --paper-shadow: rgba(49, 38, 26, 0.075);
  --paper-edge: rgba(48, 38, 27, 0.16);

  --kraft: #876f56;
  --kraft-soft: #9e8564;
  --kraft-muted: #6d5843;
  --kraft-deep: #6f5943;

  --ink: #15110e;
  --ink-soft: #3f3429;
  --bg-black: #0b0b0a;
  --bg-charcoal: #141311;
  --muted: #806f5b;
  --muted-light: #a08f78;

  --stamp-red: #7e1b22;
  --stamp-red-deep: #5d151a;
  --note-blue: #456da4;
  --note-blue-soft: rgba(69, 109, 164, .72);

  --tape: rgba(188, 149, 82, 0.34);
  --line-paper: rgba(22, 18, 15, 0.13);
  --line-soft: rgba(22, 18, 15, 0.07);
  --display-serif: "Palatino Linotype", "Book Antiqua", Palatino, Georgia, "Times New Roman", serif;

  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", "PingFang SC", sans-serif;
  color: var(--ink);
  background: var(--paper-bg);
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; background: var(--paper-bg); }
a { color: inherit; text-decoration: none; }
button { font: inherit; }

main {
  min-height: 100vh;
  position: relative;
  background-image:
    linear-gradient(rgba(244, 237, 223, .72), rgba(244, 237, 223, .72)),
    url("/assets/textures/paper-clean.jpg");
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
}

main::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: .12;
  mix-blend-mode: multiply;
  background:
    radial-gradient(ellipse at 12% 28%, rgba(0,0,0,.035) 0 .55px, transparent .7px),
    radial-gradient(ellipse at 78% 62%, rgba(0,0,0,.028) 0 .5px, transparent .65px),
    repeating-linear-gradient(92deg, rgba(65,54,42,.018) 0 1px, transparent 1px 8px);
  background-size: 24px 24px, 31px 31px, 220px 100%;
}

main::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  box-shadow: inset 0 0 130px rgba(61, 49, 35, .045), inset 0 0 16px rgba(61,49,35,.035);
}

.site-nav {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  padding: 18px clamp(22px, 5vw, 72px);
  background: rgba(251,246,235,.78);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--line-soft);
}

.brand { font-family: var(--display-serif); letter-spacing: 5px; font-size: 18px; }
.nav-links { display: flex; gap: clamp(14px, 3vw, 38px); overflow-x: auto; scrollbar-width: none; }
.nav-links a { white-space: nowrap; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--muted); }
.nav-links span { color: var(--ink); margin-right: 6px; }

.terminal-cover {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  background: radial-gradient(circle at 20% 12%, #1f1b16, transparent 38%), linear-gradient(135deg, var(--bg-black), var(--bg-charcoal));
  transition: opacity .55s ease, visibility .55s ease, background .55s ease;
}

.terminal-cover::after {
  content: "";
  position: absolute;
  inset: 0;
  opacity: .055;
  background-image: repeating-linear-gradient(0deg, rgba(255,255,255,.16) 0 1px, transparent 1px 4px);
  mix-blend-mode: overlay;
  pointer-events: none;
}

.terminal-cover.docking {
  background: transparent;
  pointer-events: none;
}

.terminal-cover.docked,
.terminal-cover.skipped {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.skip {
  position: absolute;
  right: 34px;
  top: 28px;
  z-index: 3;
  border: 1px solid rgba(244,234,210,.25);
  background: rgba(11,11,10,.32);
  color: var(--paper-bg-soft);
  border-radius: 999px;
  padding: 10px 18px;
  cursor: pointer;
}

.terminal-window {
  width: min(1120px, 92vw);
  min-height: min(720px, 78vh);
  border: 1px solid rgba(244,234,210,.18);
  border-radius: 18px;
  background:
    radial-gradient(circle at 20% 0%, rgba(255,255,255,.035), transparent 34%),
    linear-gradient(135deg, #0b0b0a, #171512);
  box-shadow:
    0 40px 120px rgba(0,0,0,.46),
    inset 0 0 0 1px rgba(255,255,255,.035),
    inset 0 0 60px rgba(0,0,0,.36);
  color: var(--paper-bg-soft);
  font-family: "SFMono-Regular", Consolas, "Cascadia Mono", monospace;
  position: relative;
  z-index: 2;
  overflow: hidden;
  transform-origin: center center;
  transition: transform 1.08s cubic-bezier(.68, 0, .2, 1), opacity .35s ease;
}

.terminal-window::after {
  content: "";
  position: absolute;
  inset: 44px 0 0;
  pointer-events: none;
  opacity: .045;
  background-image: repeating-linear-gradient(0deg, rgba(255,255,255,.4) 0 1px, transparent 1px 5px);
}

.terminal-titlebar {
  height: 42px;
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 0 18px;
  border-bottom: 1px solid rgba(244,234,210,.11);
  background: rgba(255,255,255,.035);
}

.terminal-controls { display: flex; gap: 9px; }
.terminal-controls span { width: 11px; height: 11px; border-radius: 50%; background: #7f2b2d; }
.terminal-controls span:nth-child(2) { background: #9b7746; }
.terminal-controls span:nth-child(3) { background: #6b7359; }
.terminal-title { color: rgba(251,246,235,.46); font-size: 12px; letter-spacing: .04em; }

.terminal-lines {
  padding: clamp(22px, 4vw, 54px);
  font-size: clamp(15px, 2vw, 25px);
  line-height: 1.9;
}

.terminal-lines div { opacity: 0; transform: translateY(8px); animation: typeLine .36s ease forwards; }
@keyframes typeLine { to { opacity: 1; transform: translateY(0); } }

.cursor {
  display: inline-block;
  width: .58em;
  height: 1.05em;
  margin-left: .35em;
  vertical-align: -0.18em;
  background: rgba(251,246,235,.8);
  animation: cursorBlink .95s steps(2, start) infinite;
}
@keyframes cursorBlink { 50% { opacity: 0; } }

.hero,
.section {
  max-width: 1180px;
  margin: 0 auto;
  padding: clamp(78px, 10vw, 132px) 24px;
  position: relative;
  z-index: 2;
}

.hero {
  min-height: calc(100vh - 74px);
  display: grid;
  grid-template-columns: 1.03fr .97fr;
  align-items: center;
  gap: clamp(36px, 6vw, 76px);
}

.eyebrow {
  margin: 0;
  color: var(--muted);
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 2.4px;
  font-family: "Courier New", Courier, monospace;
}

.hero h1 {
  font-family: var(--display-serif);
  font-size: clamp(60px, 9vw, 126px);
  line-height: .88;
  letter-spacing: -4.2px;
  margin: 20px 0 0;
  color: var(--ink);
  font-weight: 700;
  text-shadow: .7px 0 rgba(21,17,14,.18), -.45px 0 rgba(21,17,14,.08), 0 .6px rgba(21,17,14,.08);
}

.hero h1 span:first-child::before { content: "*"; font-size: .28em; vertical-align: top; margin-right: .12em; }
.hero-subtitle { font-size: clamp(18px, 2vw, 24px); color: var(--ink-soft); margin: 28px 0 0; }
.identity { font-family: "Courier New", Courier, monospace; letter-spacing: 8px; color: var(--muted); margin-top: 28px; }
.hero-note { margin-top: 22px; width: max-content; max-width: 280px; }

.hero-stack {
  position: relative;
  min-height: 590px;
  display: grid;
  place-items: center;
}

.kraft-slab {
  position: absolute;
  right: 20px;
  top: 82px;
  width: 82%;
  height: 312px;
  background-image:
    linear-gradient(rgba(111, 89, 67, .14), rgba(111, 89, 67, .14)),
    url("/assets/textures/kraft-clean.jpg");
  background-size: cover;
  background-position: center;
  border-radius: 3px;
  transform: rotate(-2.2deg);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.08), 0 8px 22px rgba(76,58,40,.08);
}

.retro-computer-wrap {
  position: relative;
  width: min(560px, 96%);
  margin-left: auto;
  transform: rotate(1.2deg);
  filter: drop-shadow(0 16px 22px rgba(49,38,26,.11));
}

.retro-computer {
  position: relative;
  width: 100%;
}

.retro-computer-img {
  width: 100%;
  display: block;
  position: relative;
  z-index: 1;
}

.retro-screen {
  position: absolute;
  left: 28.2%;
  top: 19.7%;
  width: 45.8%;
  height: 31%;
  z-index: 2;
  border-radius: 5% / 7%;
  overflow: hidden;
  background: rgba(12, 12, 11, .1);
  pointer-events: none;
}

.retro-screen.screen-live {
  background:
    radial-gradient(circle at 30% 0%, rgba(255,255,255,.06), transparent 34%),
    linear-gradient(135deg, #0b0b0a, #171512);
  box-shadow:
    inset 0 0 20px rgba(0,0,0,.62),
    inset 0 0 0 1px rgba(255,255,255,.05);
}

.terminal-mini-lines {
  padding: 7.5% 8%;
  color: rgba(251,246,235,.82);
  font-family: "SFMono-Regular", Consolas, "Cascadia Mono", monospace;
  font-size: clamp(7px, .72vw, 11px);
  line-height: 1.45;
  white-space: nowrap;
}

.computer-note {
  position: absolute;
  right: 9%;
  bottom: -8px;
  z-index: 3;
  font-size: 14px;
  opacity: .72;
}

.paper-card {
  position: relative;
  background: linear-gradient(180deg, rgba(255,255,255,.22), transparent 18%), var(--paper-card);
  border: 1px solid var(--paper-edge);
  border-radius: 2px;
  box-shadow: 0 1px 0 rgba(255,255,255,.3) inset, 0 6px 16px var(--paper-shadow);
  overflow: hidden;
}

.paper-card::before,
.polaroid::before,
.cat-piece::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: .14;
  mix-blend-mode: multiply;
  background:
    linear-gradient(90deg, rgba(0,0,0,.018), rgba(0,0,0,0) 18%, rgba(0,0,0,.012) 56%, rgba(0,0,0,0)),
    radial-gradient(circle at 18% 24%, rgba(0,0,0,.04) 0 .65px, transparent .75px),
    radial-gradient(circle at 76% 72%, rgba(0,0,0,.03) 0 .6px, transparent .7px),
    repeating-linear-gradient(88deg, rgba(70,58,44,.018) 0 1px, transparent 1px 9px);
  background-size: 100% 100%, 24px 24px, 29px 29px, 210px 100%;
}

.stamp {
  position: relative;
  display: inline-grid;
  place-items: center;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background:
    radial-gradient(circle at 35% 42%, rgba(255,255,255,.12) 0 1px, transparent 1.4px),
    radial-gradient(circle at 68% 22%, rgba(255,255,255,.18) 0 .8px, transparent 1.2px),
    radial-gradient(circle at 58% 78%, rgba(0,0,0,.16) 0 1px, transparent 1.4px),
    linear-gradient(135deg, var(--stamp-red), var(--stamp-red-deep));
  background-size: 11px 11px, 17px 17px, 13px 13px, 100% 100%;
  color: var(--paper-bg-soft);
  font-family: var(--display-serif);
  font-size: 20px;
  letter-spacing: 1px;
  transform: rotate(-6deg);
  box-shadow: 0 7px 14px rgba(110,25,25,.12);
}

.stamp::after {
  content: "";
  position: absolute;
  inset: 5px;
  border: 1px solid rgba(255,255,255,.18);
  border-radius: inherit;
  opacity: .62;
}

.project-scroll-card .stamp,
.about-card .stamp,
.contact-card .stamp {
  position: absolute;
  right: 24px;
  top: 22px;
}

.hand-note {
  color: var(--note-blue-soft);
  font-family: "Segoe Print", "Kaiti SC", "STKaiti", "KaiTi", cursive;
  transform: rotate(-2.4deg);
  letter-spacing: .01em;
  line-height: 1.35;
  text-shadow: 0 .35px rgba(69,109,164,.14);
}

[data-reveal] { opacity: 0; transform: translateY(18px); transition: opacity .55s ease, transform .55s ease; }
[data-reveal].is-visible { opacity: 1; transform: translateY(0); }

.section-header {
  display: grid;
  grid-template-columns: 90px 1fr auto;
  gap: 22px;
  align-items: start;
  margin-bottom: 44px;
}

.section-index { font-family: var(--display-serif); font-size: 64px; color: var(--kraft-muted); line-height: .9; }
.section-header h2 { font-family: var(--display-serif); font-size: clamp(44px, 6vw, 74px); line-height: .92; margin: 8px 0 12px; letter-spacing: -1.2px; text-shadow: .4px 0 rgba(21,17,14,.12); }
.section-subtitle { color: var(--ink-soft); font-size: 17px; margin: 0; }
.header-note { align-self: end; font-size: 14px; max-width: 210px; }

.projects-section { max-width: none; padding-left: 0; padding-right: 0; }
.projects-section > .section-header { max-width: 1180px; margin-left: auto; margin-right: auto; padding: 0 24px; }

.project-scroll-shell {
  height: 330vh;
  position: relative;
  background-image:
    linear-gradient(rgba(158, 133, 100, .26), rgba(158, 133, 100, .11)),
    url("/assets/textures/kraft-clean.jpg");
  background-size: cover;
  background-position: center;
  border-top: 1px solid var(--line-soft);
  border-bottom: 1px solid var(--line-soft);
}

.project-scroll-stage {
  position: sticky;
  top: 72px;
  height: calc(100vh - 72px);
  max-width: 1180px;
  margin: 0 auto;
  padding: clamp(24px, 4vw, 42px) 24px;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 34px;
  align-items: center;
}

.project-index-panel {
  align-self: stretch;
  border: 1px solid var(--line-paper);
  background: rgba(251,247,239,.58);
  padding: 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.project-index-panel::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent 0 48%, rgba(69,109,164,.08) 49% 50%, transparent 51% 100%);
  pointer-events: none;
}

.project-counter {
  font-family: var(--display-serif);
  font-size: clamp(88px, 10vw, 140px);
  line-height: .85;
  color: var(--kraft-muted);
  margin: 18px 0 28px;
}

.project-track { display: grid; gap: 18px; }
.project-track-item { display: grid; grid-template-columns: 34px 1fr; gap: 12px; align-items: baseline; color: var(--muted); font-size: 12px; letter-spacing: .04em; opacity: .54; transition: opacity .25s ease, color .25s ease, transform .25s ease; }
.project-track-item.active { opacity: 1; color: var(--ink); transform: translateX(4px); }
.project-track-item span { font-family: var(--display-serif); font-size: 18px; color: var(--stamp-red); }
.project-track-item strong { font-family: var(--display-serif); font-size: 15px; line-height: 1.1; }
.project-index-panel .hand-note { font-size: 13px; max-width: 180px; }

.project-card-stage { position: relative; height: min(680px, calc(100vh - 150px)); min-height: 560px; perspective: 1200px; }

.project-scroll-card {
  position: absolute;
  inset: 0;
  padding: clamp(28px, 4vw, 52px);
  min-height: 100%;
  will-change: transform, opacity, filter;
  transition: transform .08s linear, opacity .08s linear, filter .08s linear;
}

.project-ruler { position: absolute; left: 24px; top: 24px; bottom: 24px; width: 1px; background: linear-gradient(var(--line-paper), transparent 20%, var(--line-soft)); }
.project-scroll-copy { width: min(58%, 620px); position: relative; z-index: 2; }
.project-scroll-card h3 { font-family: var(--display-serif); font-size: clamp(42px, 5.6vw, 76px); line-height: .92; letter-spacing: -2.4px; margin: 18px 0 16px; text-shadow: .5px 0 rgba(21,17,14,.14); }
.project-cn { font-size: 20px; color: var(--ink); margin: 0 0 22px; }
.project-desc { color: var(--ink-soft); line-height: 1.9; font-size: 16px; }
.stack-tags { display: flex; flex-wrap: wrap; gap: 8px; margin: 22px 0; max-width: 680px; }
.stack-tags span { border: 1px solid var(--line-paper); padding: 7px 10px; font-size: 11px; color: var(--ink-soft); background: rgba(255,255,255,.18); }
.project-scroll-card a { display: inline-block; color: var(--ink); font-size: 13px; margin-top: 18px; max-width: 100%; word-break: break-all; background: rgba(241,232,211,.72); padding: 6px 8px; border: 1px solid var(--line-soft); }

.project-visual-wrap {
  position: absolute;
  right: clamp(28px, 5vw, 64px);
  bottom: clamp(36px, 6vw, 74px);
  width: min(34%, 360px);
  transform: rotate(2deg);
  background: #f4efe4;
  padding: 12px 12px 34px;
  border: 1px solid var(--line-paper);
  box-shadow: 0 8px 18px rgba(49,38,26,.08);
}

.project-visual-wrap::after { content: ""; position: absolute; top: -12px; left: 34%; width: 86px; height: 22px; background: var(--tape); transform: rotate(-3deg); }
.project-scroll-shot { width: 100%; aspect-ratio: 4 / 3.05; object-fit: cover; background: var(--paper-aged); border: 1px solid rgba(22,18,15,.12); }
.project-screen-lines { position: absolute; inset: 12px 12px 34px; border: 1px solid rgba(69,109,164,.14); pointer-events: none; }
.project-note { position: absolute; left: clamp(36px, 5vw, 70px); bottom: 26px; font-size: 14px; max-width: 210px; opacity: .82; pointer-events: none; }

.image-fallback { display: grid; place-items: center; color: var(--muted); font-size: 12px; text-transform: uppercase; letter-spacing: 1.4px; background: linear-gradient(135deg, var(--paper-warm), var(--paper-aged)); }

.photo-board {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 34px 28px;
  padding: 34px;
  border-radius: 4px;
  background-image:
    linear-gradient(rgba(158,133,100,.22), rgba(158,133,100,.22)),
    url("/assets/textures/kraft-clean.jpg");
  background-size: cover;
  background-position: center;
  border: 1px solid var(--line-paper);
  position: relative;
}

.polaroid { position: relative; padding: 12px 12px 38px; background: #f4efe4; border: 1px solid rgba(60,52,42,.12); box-shadow: 0 3px 8px rgba(49,38,26,.06), 0 10px 18px rgba(49,38,26,.06); transform: rotate(var(--r)); transition: transform .25s ease, box-shadow .25s ease; }
.polaroid:hover { transform: rotate(var(--r)) scale(1.035); box-shadow: 0 12px 24px rgba(49,38,26,.1); }
.polaroid img, .polaroid .image-fallback { width: 100%; aspect-ratio: 4/5; object-fit: cover; display: block; }
.polaroid-caption { display: flex; justify-content: space-between; gap: 10px; align-items: center; margin-top: 12px; font-family: var(--display-serif); color: var(--ink-soft); font-size: 14px; }
.polaroid-caption span { color: var(--muted); font-size: 11px; }
.clip { position: absolute; width: 26px; height: 56px; border: 3px solid rgba(60,55,48,.42); border-radius: 16px; top: -22px; left: 47%; transform: rotate(7deg); z-index: 2; }
.polaroid:nth-child(2n)::after { content: ""; position: absolute; top: -10px; left: 36%; width: 82px; height: 22px; background: var(--tape); transform: rotate(-2deg); }
.board-note { position: absolute; right: 44px; bottom: 20px; }

.cats-section { overflow: hidden; }
.cats-board { position: relative; min-height: 720px; padding: 18px; }
.cat-piece { position: absolute; width: clamp(170px, 22vw, 280px); padding: 10px; background: transparent; filter: drop-shadow(0 6px 14px rgba(49,38,26,.08)); transform: rotate(var(--r)); transition: transform .25s ease; }
.cat-piece:hover { transform: rotate(calc(var(--r) + 2deg)) scale(1.04); }
.cat-piece:nth-child(1) { left: 8%; top: 20px; }
.cat-piece:nth-child(2) { left: 42%; top: 0; width: clamp(210px, 26vw, 340px); }
.cat-piece:nth-child(3) { right: 5%; top: 70px; }
.cat-piece:nth-child(4) { left: 2%; top: 330px; }
.cat-piece:nth-child(5) { left: 35%; top: 300px; width: clamp(240px, 31vw, 390px); }
.cat-piece:nth-child(6) { right: 6%; top: 410px; }
.cat-piece img, .cat-piece .image-fallback { width: 100%; aspect-ratio: 1/1.05; object-fit: contain; display: block; background: transparent; }
.cat-piece .stamp { position: absolute; right: 8px; top: 8px; width: 42px; height: 42px; font-size: 15px; }
.cat-piece .hand-note { font-size: 13px; margin: 8px 0 0; }

.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
.about-card, .contact-card { padding: 44px; min-height: 380px; }
.about-card h3, .contact-card h3 { font-family: var(--display-serif); font-size: 46px; margin: 0 0 28px; }
.about-card p { line-height: 2; color: var(--ink-soft); max-width: 620px; }
.paper-tags { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 30px; }
.paper-tags span { background: var(--kraft-soft); color: var(--ink); padding: 11px 18px; border: 1px solid var(--line-paper); box-shadow: 0 8px 18px rgba(75,59,39,.1); }
.contact-line { display: block; padding: 16px 0; border-bottom: 1px dashed var(--line-paper); color: var(--ink-soft); }
.contact-line.primary { font-family: var(--display-serif); color: var(--ink); font-size: 22px; }
.copy-row { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 26px; }
.copy-row button { border: 1px solid var(--line-paper); background: var(--paper-warm); color: var(--ink); padding: 12px 18px; border-radius: 0; cursor: pointer; box-shadow: 0 8px 18px rgba(75,59,39,.08); }
.copy-row button:hover { transform: translateY(-1px); }
.contact-card .hand-note { margin-top: 30px; }

footer { position: relative; z-index: 2; padding: 42px 24px; text-align: center; color: var(--muted); font-size: 13px; border-top: 1px solid var(--line-soft); }

@media (max-width: 900px) {
  main { background-attachment: scroll; }
  .site-nav { align-items: flex-start; flex-direction: column; }
  .hero, .about-grid { grid-template-columns: 1fr; }
  .hero { padding-top: 64px; }
  .hero h1 { letter-spacing: -2px; }
  .hero-stack { min-height: 520px; }
  .retro-computer-wrap { margin: 0 auto; }
  .section-header { grid-template-columns: 1fr; }
  .projects-section { padding-left: 24px; padding-right: 24px; }
  .project-scroll-shell { height: auto; background: transparent; border: 0; }
  .project-scroll-stage { position: relative; top: auto; height: auto; padding: 0; grid-template-columns: 1fr; }
  .project-index-panel { display: none; }
  .project-card-stage { height: auto; min-height: 0; display: grid; gap: 22px; }
  .project-scroll-card { position: relative; inset: auto; transform: none !important; opacity: 1 !important; filter: none !important; min-height: auto; }
  .project-scroll-copy { width: 100%; }
  .project-scroll-card h3, .project-desc, .project-cn { max-width: 100%; }
  .project-visual-wrap { position: relative; right: auto; bottom: auto; width: 100%; margin-top: 24px; transform: rotate(1deg); }
  .photo-board { grid-template-columns: 1fr; gap: 22px; }
  .polaroid { transform: rotate(0deg); }
  .cats-board { min-height: auto; display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .cat-piece, .cat-piece:nth-child(n) { position: relative; left: auto; right: auto; top: auto; width: auto; transform: rotate(var(--r)); }
}

@media (max-width: 540px) {
  .hero, .section { padding-left: 16px; padding-right: 16px; }
  .hero h1 { font-size: clamp(52px, 15vw, 78px); }
  .cats-board { grid-template-columns: 1fr; }
  .terminal-window { width: 92vw; min-height: 74vh; }
  .terminal-lines { padding: 22px; font-size: 13px; }
  .retro-computer-wrap { width: min(430px, 100%); }
  .terminal-mini-lines { font-size: 6px; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
  [data-reveal] { opacity: 1; transform: none; }
  .terminal-cover { display: none; }
  .project-scroll-shell { height: auto; }
  .project-scroll-stage { position: relative; top: auto; height: auto; grid-template-columns: 1fr; }
  .project-index-panel { display: none; }
  .project-card-stage { height: auto; min-height: 0; display: grid; gap: 22px; }
  .project-scroll-card { position: relative; transform: none !important; opacity: 1 !important; filter: none !important; }
}
`;

