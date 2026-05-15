const navItems = [
  ['01', 'Home', '#home'],
  ['02', 'Projects', '#projects'],
  ['03', 'Photos', '#photos'],
  ['04', 'About', '#about'],
  ['05', 'Contact', '#contact'],
]

export function SiteNav() {
  return (
    <nav className="site-nav" aria-label="Main navigation">
      <a className="brand" href="#home">
        <img
          className="brand-avatar"
          src="/assets/brand/nav-avatar-master.png"
          alt="yyyyyynnn avatar"
          width="34"
          height="34"
        />
        <span>yyyyyynnn</span>
      </a>
      <div className="nav-links">
        {navItems.map(([id, label, href]) => (
          <a href={href} key={id}>
            <span>{id}</span>
            {label}
          </a>
        ))}
      </div>
    </nav>
  )
}
