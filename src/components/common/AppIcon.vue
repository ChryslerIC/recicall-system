<template>
  <component
    :is="iconComponent"
    :size="size"
    :stroke-width="strokeWidth"
    aria-hidden="true"
    focusable="false"
  />
</template>

<script setup>
import { computed } from 'vue'
import {
  Archive,
  ArrowLeft,
  ArrowRightLeft,
  Atom,
  Badge,
  Bell,
  BookOpenText,
  ChartNoAxesCombined,
  ChevronDown,
  Copy,
  Download,
  EllipsisVertical,
  Eye,
  EyeOff,
  FlaskConical,
  GraduationCap,
  LayoutGrid,
  Lock,
  LockOpen,
  LogOut,
  Mail,
  Menu,
  MessageCircle,
  Minus,
  Monitor,
  Palette,
  Pencil,
  Plus,
  QrCode,
  RefreshCw,
  RotateCcw,
  ScanQrCode,
  Settings,
  Sigma,
  Sparkles,
  Trophy,
  UserRound,
  Users,
  X,
} from 'lucide-vue-next'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: [Number, String],
    default: 24,
  },
  strokeWidth: {
    type: [Number, String],
    default: 2.2,
  },
})

const iconMap = {
  archive: Archive,
  back: ArrowLeft,
  'pick-next': ArrowRightLeft,
  atom: Atom,
  badge: Badge,
  bell: Bell,
  'book-open': BookOpenText,
  'chevron-down': ChevronDown,
  insights: ChartNoAxesCombined,
  copy: Copy,
  download: Download,
  more: EllipsisVertical,
  eye: Eye,
  'eye-off': EyeOff,
  flask: FlaskConical,
  cap: GraduationCap,
  classes: LayoutGrid,
  lock: Lock,
  unlock: LockOpen,
  logout: LogOut,
  mail: Mail,
  menu: Menu,
  message: MessageCircle,
  minus: Minus,
  monitor: Monitor,
  palette: Palette,
  pencil: Pencil,
  plus: Plus,
  qr: QrCode,
  refresh: RefreshCw,
  reset: RotateCcw,
  scan: ScanQrCode,
  settings: Settings,
  sigma: Sigma,
  sparkles: Sparkles,
  trophy: Trophy,
  profile: UserRound,
  users: Users,
  x: X,
}

const iconComponent = computed(() => iconMap[props.name] || Sparkles)
</script>
