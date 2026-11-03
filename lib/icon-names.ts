export const ICON_NAMES = [
  'landmark', 'settings', 'shield-check', 'trending-up', 'layers', 'coins', 'sprout', 'scale',
  'building', 'database', 'briefcase', 'users', 'cpu', 'file-text', 'eye', 'graduation-cap',
  'lock', 'network', 'compass', 'target', 'wallet', 'clipboard-check', 'server',
] as const
export type IconName = (typeof ICON_NAMES)[number]
