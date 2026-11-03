export type NavItem = { href: string; label: string }

export function getNavItems(showSeedRound: boolean): NavItem[] {
  return [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/business-model', label: 'Our Business Model' },
    ...(showSeedRound ? [{ href: '/seed-round-1', label: 'Seed Round 1' }] : []),
    { href: '/contact', label: 'Contact' },
  ]
}
