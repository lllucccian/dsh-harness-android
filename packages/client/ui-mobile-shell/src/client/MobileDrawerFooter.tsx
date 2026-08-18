import type { PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type { SessionId } from '@deepseek-ai/dsh-client-runtime/client'
import { IconDownloadOutline16, IconNewChatOutline16 } from '@deepseek-ai/dsh-client-ui-primitives'
import { NS } from './locales.ts'

/** Full props for the sidebar footer action entry. */
export interface MobileDrawerFooterProps extends PropsRuntime<'sidebar.footer.action'>, PropsLocale<typeof NS> {
  /** Bound ctx.sessionLogDownload.download() for the current session. */
  downloadSessionLog: (sessionId: SessionId) => void
  /** Bound ctx.workspaces.startSession(): New Session from the drawer. */
  startSession: () => void
  /** Bound ctx.layout.toggleSidebar(): New Session closes the drawer. */
  toggleSidebar: () => void
}

/**
 * Mobile-only drawer footer actions, relocated from the session header to the
 * drawer footer (beside Settings):
 * - New Session: starts a fresh session (the header has no room on a phone).
 * - Session log: the official session-log-export controller, so the
 *   progress/result dialog is shared with the desktop flow.
 * Hidden entirely on wide screens (the injected stylesheet's desktop query).
 */
export function MobileDrawerFooter({ useSessions, downloadSessionLog, startSession, toggleSidebar, t }: MobileDrawerFooterProps) {
  const sessionId = useSessions((state) => state.current)
  const onNewSession = (): void => {
    startSession()
    toggleSidebar()
  }
  return (
    <div data-mobile-nav="drawer-actions">
      <button
        type="button"
        data-mobile-nav="new-session"
        aria-label={t('newSession')}
        title={t('newSession')}
        onClick={onNewSession}
      >
        <IconNewChatOutline16 size={14} />
        <span>{t('newSession')}</span>
      </button>
      <button
        type="button"
        data-mobile-nav="session-log"
        aria-label={t('sessionLog')}
        title={t('sessionLog')}
        disabled={sessionId === undefined}
        onClick={() => {
          if (sessionId !== undefined) downloadSessionLog(sessionId)
        }}
      >
        <IconDownloadOutline16 size={14} />
        <span>{t('sessionLog')}</span>
      </button>
    </div>
  )
}
