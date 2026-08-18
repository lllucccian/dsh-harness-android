import type { PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import { IconPanelLeftOutline16 } from '@deepseek-ai/dsh-client-ui-primitives'
import { NS } from './locales.ts'

/** Full props for the session-header directory toggle. */
export interface MobileNavToggleProps extends PropsRuntime<'conversation.session.header.actions'>, PropsLocale<typeof NS> {
  /** Bound ctx.layout.toggleSidebar(). */
  toggleSidebar: () => void
}

/**
 * Mobile-only directory toggle beside the session title. Hidden entirely on
 * wide screens (the injected stylesheet's desktop media query).
 */
export function MobileNavToggle({ toggleSidebar, t }: MobileNavToggleProps) {
  return (
    <button
      type="button"
      data-mobile-nav="toggle"
      aria-label={t('open')}
      title={t('open')}
      onClick={() => toggleSidebar()}
    >
      <IconPanelLeftOutline16 size={16} />
    </button>
  )
}
