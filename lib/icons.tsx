import {
  Landmark, Settings, ShieldCheck, TrendingUp, Layers, Coins, Sprout, Scale, Building2, Database,
  Briefcase, Users, Cpu, FileText, Eye, GraduationCap, Lock, Network, Compass, Target, Wallet,
  ClipboardCheck, Server, type LucideIcon,
} from 'lucide-react'
import type { IconName } from './icon-names'

export const ICONS: Record<IconName, LucideIcon> = {
  landmark: Landmark, settings: Settings, 'shield-check': ShieldCheck, 'trending-up': TrendingUp,
  layers: Layers, coins: Coins, sprout: Sprout, scale: Scale, building: Building2, database: Database,
  briefcase: Briefcase, users: Users, cpu: Cpu, 'file-text': FileText, eye: Eye,
  'graduation-cap': GraduationCap, lock: Lock, network: Network, compass: Compass, target: Target,
  wallet: Wallet, 'clipboard-check': ClipboardCheck, server: Server,
}

export function Icon({ name, className, strokeWidth = 1.5 }: { name?: string; className?: string; strokeWidth?: number }) {
  const Cmp = ICONS[(name as IconName) ?? 'landmark'] ?? Landmark
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />
}
