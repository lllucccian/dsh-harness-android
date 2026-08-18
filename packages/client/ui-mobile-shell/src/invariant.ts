/**
 * Package-owned invariant companion for `@deepseek-ai/dsh-client-ui-mobile-shell`.
 * @module @deepseek-ai/dsh-client-ui-mobile-shell/invariant
 */

/* jscpd:ignore-start */
import type { Context } from '@deepseek-ai/cordis'
import type { InvariantInstaller } from '@deepseek-ai/dsh-invariants'

const PACKAGE_NAME = '@deepseek-ai/dsh-client-ui-mobile-shell'

/** Cordis companion plugin name. */
export const name = 'client-ui-mobile-shell-invariant'
/** Service required before the companion can reserve package ownership. */
export const inject = ['invariants']

/**
 * No runtime invariant: a pure-consumer plugin that only injects a stylesheet
 * and shell-overlay/header controls through the slot system. It emits no
 * cordis events and owns no cross-plugin mutable state.
 */
const install: InvariantInstaller = () => {}

/**
 * Register this package's invariant companion.
 * @param ctx - Cordis context carrying the invariant service.
 * @returns the installed registration's disposer after setup succeeds.
 */
export const apply = (ctx: Context): Promise<() => void> =>
  Promise.resolve(ctx.invariants.register(PACKAGE_NAME, install))
/* jscpd:ignore-end */
