/**
 * Mobile-adaptive shell, browser half: injects the mobile stylesheet, then
 * contributes the directory toggle to the session header, the backdrop +
 * floating button to the shell overlay, and the New-Session / Session-log
 * actions to the drawer footer.
 */
import type { ClientContext, SessionId } from '@deepseek-ai/dsh-client-runtime/client'
// Type-only: pulls the layout / conversation / sidebar / session-log Context merges.
import type {} from '@deepseek-ai/dsh-client-ui-layout/client'
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type {} from '@deepseek-ai/dsh-session-log-export/client'
import { MobileNavToggle } from './MobileNavToggle.tsx'
import { MobileNavOverlay } from './MobileNavOverlay.tsx'
import { MobileDrawerFooter } from './MobileDrawerFooter.tsx'
import { MOBILE_CSS } from './mobile.css.ts'
import { NS, en, zh } from './locales.ts'
import type { MobileShellKey } from './locales.ts'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** Mobile drawer controls copy. */
    'mobileShell': MobileShellKey
  }
}

/** Services required by the mobile-shell plugin. */
export const inject = ['slots', 'layout', 'locale', 'workspaces', 'sessionLogDownload']

/**
 * Apply the mobile shell.
 * @param ctx - browser context carrying slots, layout, locale, workspaces, sessionLogDownload.
 */
export function apply(ctx: ClientContext): void {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'ui-mobile-shell: dictionaries')

  ctx.effect(() => {
    const tag = document.createElement('style')
    tag.dataset.plugin = '@deepseek-ai/dsh-client-ui-mobile-shell'
    tag.dataset.pluginCss = '@deepseek-ai/dsh-client-ui-mobile-shell/mobile.css'
    tag.textContent = MOBILE_CSS
    document.head.appendChild(tag)
    return () => {
      tag.remove()
    }
  }, 'ui-mobile-shell: styles')

  // Phone chrome: keep the system status bar and make it blend into the page.
  // On narrow screens the viewport meta gains viewport-fit=cover and a
  // theme-color meta tracks the shell background.
  ctx.effect(() => {
    const narrow = window.matchMedia('(max-width: 1023px)')
    const viewport = document.querySelector<HTMLMetaElement>('meta[name="viewport"]')
    const originalViewport = viewport?.content ?? ''
    const themeMeta = document.createElement('meta')
    themeMeta.name = 'theme-color'
    const bodyBg = (): string => getComputedStyle(document.body).backgroundColor

    const sync = (): void => {
      if (viewport !== null) viewport.content = 'width=device-width, initial-scale=1, viewport-fit=cover'
      themeMeta.content = bodyBg()
      if (themeMeta.parentElement === null) document.head.appendChild(themeMeta)
    }
    const restore = (): void => {
      if (viewport !== null) viewport.content = originalViewport
      themeMeta.remove()
    }
    const onGestureStart = (event: Event) => event.preventDefault()
    if (narrow.matches) sync()
    const onChange = (event: MediaQueryListEvent) => (event.matches ? sync() : restore())
    narrow.addEventListener('change', onChange)
    const observer = new MutationObserver(() => {
      if (narrow.matches) themeMeta.content = bodyBg()
    })
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-ds-dark-theme'] })
    document.addEventListener('gesturestart', onGestureStart)
    return () => {
      narrow.removeEventListener('change', onChange)
      observer.disconnect()
      document.removeEventListener('gesturestart', onGestureStart)
      restore()
    }
  }, 'ui-mobile-shell: status bar theme + viewport + zoom guard')

  // The conversation status row (turns / steps / LLM time / TTFT / cache) has
  // a hashed class, so the stylesheet cannot target it directly. Mark the row
  // on narrow screens by text, then fold the TPS readout into it so every
  // metric scrolls together in one horizontal line.
  ctx.effect(() => {
    const narrow = window.matchMedia('(max-width: 1023px)')
    if (!narrow.matches) return () => {}
    const moveTps = (stats: Element): void => {
      if ([...stats.children].some((c) => /^TPS\s+\d/.test((c.textContent ?? '').trim()))) return
      const stack = stats.closest('[class$="_composerStack"]')
      if (stack === null) return
      for (const el of stack.querySelectorAll('div')) {
        const text = (el.textContent ?? '').trim()
        if (!/^TPS\s+\d/.test(text)) continue
        if (el.children.length > 0) continue
        stats.appendChild(el)
        return
      }
    }
    const mark = (): void => {
      for (const root of document.querySelectorAll('[data-phase] [class$="_root"]')) {
        if (root.closest('[class$="_composerStack"]') === null) continue
        const text = root.textContent ?? ''
        if (!/(turns|steps|\bLLM\b|轮|步)/.test(text)) continue
        if (root.querySelector('textarea') !== null) continue
        root.setAttribute('data-mobile-nav', 'stats')
        moveTps(root)
        return
      }
    }
    const observer = new MutationObserver(mark)
    observer.observe(document.body, { childList: true, subtree: true })
    mark()
    return () => {
      observer.disconnect()
    }
  }, 'ui-mobile-shell: stats line marker')

  ctx.slots.inject('conversation.session.header.actions', () => ctx.slots.register({
    name: 'conversation.session.header.actions',
    id: 'mobile-nav-toggle',
    order: 10,
    locale: NS,
    inject: () => ({
      toggleSidebar: () => ctx.layout.toggleSidebar(),
    }),
  }, MobileNavToggle))

  ctx.slots.inject('shell.overlay', () => ctx.slots.register({
    name: 'shell.overlay',
    id: 'mobile-nav-overlay',
    order: 10,
    locale: NS,
    inject: () => ({
      toggleSidebar: () => ctx.layout.toggleSidebar(),
    }),
  }, MobileNavOverlay))

  ctx.slots.inject('sidebar.footer.action', () => ctx.slots.register({
    name: 'sidebar.footer.action',
    id: 'mobile-nav-drawer-footer',
    order: 10,
    locale: NS,
    inject: () => ({
      downloadSessionLog: (sessionId: SessionId) => ctx.sessionLogDownload.download(sessionId),
      startSession: () => { ctx.workspaces.startSession() },
      toggleSidebar: () => ctx.layout.toggleSidebar(),
    }),
  }, MobileDrawerFooter))
}
