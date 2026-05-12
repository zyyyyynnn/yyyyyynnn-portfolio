const navItems = [
  ['01', 'Home', '#home'],
  ['02', 'Projects', '#projects'],
  ['03', 'Photos', '#photos'],
  ['04', 'Cats', '#cats'],
  ['05', 'About', '#about'],
  ['06', 'Contact', '#contact'],
]

export function SiteNav() {
  return (
    <nav className="site-nav" aria-label="Main navigation">
      <a className="brand" href="#home">
        yyyyyynnn
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
