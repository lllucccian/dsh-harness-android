/** `mobileShell` namespace dictionaries: drawer controls. */
export const NS = 'mobileShell'

/** Simplified Chinese dictionary (the key-set source of truth). */
export const zh = {
  'open': '打开目录',
  'close': '收起目录',
  'backdrop': '点击关闭目录',
  'sessionLog': '导出会话日志',
  'newSession': '新对话',
} as const

/** English dictionary, key-identical to the Chinese source of truth. */
export const en: Record<MobileShellKey, string> = {
  'open': 'Open directory',
  'close': 'Close directory',
  'backdrop': 'Click to close directory',
  'sessionLog': 'Session log',
  'newSession': 'New session',
}

/** Key domain of the `mobileShell` namespace (zh is the source of truth). */
export type MobileShellKey = keyof typeof zh
