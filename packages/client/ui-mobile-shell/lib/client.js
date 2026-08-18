window.__ModuleLoader__.load({
	id: "@deepseek-ai/dsh-client-ui-mobile-shell",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let react = require("react");
		//#region lib/types/client/MobileNavToggle.js
		/**
		* Mobile-only directory toggle beside the session title. Hidden entirely on
		* wide screens (the injected stylesheet's desktop media query).
		*/
		function MobileNavToggle({ toggleSidebar, t }) {
			return (0, react_jsx_runtime.jsx)("button", {
				type: "button",
				"data-mobile-nav": "toggle",
				"aria-label": t("open"),
				title: t("open"),
				onClick: () => toggleSidebar(),
				children: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconPanelLeftOutline16, { size: 16 })
			});
		}
		//#endregion
		//#region lib/types/client/MobileNavOverlay.js
		/** Same breakpoint as the shell's SIDEBAR_AUTO_COLLAPSE (viewport < 1024). */
		const MOBILE_QUERY = "(max-width: 1023px)";
		/** Live matchMedia hook for the narrow breakpoint. */
		function useMobile() {
			const [mobile, setMobile] = (0, react.useState)(() => window.matchMedia(MOBILE_QUERY).matches);
			(0, react.useEffect)(() => {
				const query = window.matchMedia(MOBILE_QUERY);
				const onChange = (event) => setMobile(event.matches);
				query.addEventListener("change", onChange);
				return () => query.removeEventListener("change", onChange);
			}, []);
			return mobile;
		}
		/** The AppFrame element: direct parent of the shell overlay layer. */
		function findFrame() {
			return document.querySelector("[data-shell-overlay]")?.parentElement ?? null;
		}
		/**
		* Mobile shell overlay: owns the `data-mobile-nav` marker on the AppFrame
		* element (the injected stylesheet restructures off it), mirrors the frame's
		* collapsed state into React state, and renders the dimmed backdrop plus a
		* floating directory button for the hero/blank phases that have no header.
		*/
		function MobileNavOverlay({ toggleSidebar, t }) {
			const mobile = useMobile();
			const [open, setOpen] = (0, react.useState)(false);
			const [fabVisible, setFabVisible] = (0, react.useState)(false);
			(0, react.useLayoutEffect)(() => {
				if (!mobile) {
					setOpen(false);
					return;
				}
				const frame = findFrame();
				if (frame === null) return;
				frame.setAttribute("data-mobile-nav", "frame");
				const sync = () => setOpen(!frame.hasAttribute("data-sidebar-collapsed"));
				sync();
				const observer = new MutationObserver(sync);
				observer.observe(frame, {
					attributes: true,
					attributeFilter: ["data-sidebar-collapsed"]
				});
				return () => {
					observer.disconnect();
					frame.removeAttribute("data-mobile-nav");
				};
			}, [mobile]);
			(0, react.useEffect)(() => {
				if (!mobile) {
					setFabVisible(false);
					return;
				}
				const sync = () => setFabVisible(document.querySelector("[data-phase=\"active\"]") === null);
				sync();
				const observer = new MutationObserver(sync);
				observer.observe(document.documentElement, {
					subtree: true,
					childList: true,
					attributes: true,
					attributeFilter: ["data-phase"]
				});
				return () => observer.disconnect();
			}, [mobile]);
			(0, react.useEffect)(() => {
				if (!mobile || !open) return;
				const onKeyDown = (event) => {
					if (event.key === "Escape" && document.querySelector("[aria-modal=\"true\"]") === null) toggleSidebar();
				};
				document.addEventListener("keydown", onKeyDown, true);
				return () => document.removeEventListener("keydown", onKeyDown, true);
			}, [
				mobile,
				open,
				toggleSidebar
			]);
			(0, react.useEffect)(() => {
				if (!mobile || !open) return;
				const onDrawerClick = (event) => {
					if (document.querySelector("[aria-modal=\"true\"]") !== null) return;
					const target = event.target;
					if (target === null) return;
					const drawer = document.querySelector("[data-mobile-nav=\"frame\"] > :first-child");
					if (drawer === null || !drawer.contains(target)) return;
					if (target.closest("[class*=\"sessionRow\"] button") !== null) return;
					if (target.closest("[class*=\"newSession\"], [class*=\"sessionRow\"], [class*=\"searchResultRow\"], [class*=\"searchResultWorkspace\"]") !== null) toggleSidebar();
				};
				document.addEventListener("click", onDrawerClick, true);
				return () => document.removeEventListener("click", onDrawerClick, true);
			}, [
				mobile,
				open,
				toggleSidebar
			]);
			if (!mobile) return null;
			return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [open && (0, react_jsx_runtime.jsx)("div", {
				"data-mobile-nav": "backdrop",
				role: "button",
				"aria-label": t("backdrop"),
				onClick: () => toggleSidebar()
			}), fabVisible && !open && (0, react_jsx_runtime.jsx)("button", {
				type: "button",
				"data-mobile-nav": "fab",
				"aria-label": t("open"),
				title: t("open"),
				onClick: () => toggleSidebar(),
				children: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconPanelLeftOutline16, { size: 18 })
			})] });
		}
		//#endregion
		//#region lib/types/client/MobileDrawerFooter.js
		/**
		* Mobile-only drawer footer actions, relocated from the session header to the
		* drawer footer (beside Settings):
		* - New Session: starts a fresh session (the header has no room on a phone).
		* - Session log: the official session-log-export controller, so the
		*   progress/result dialog is shared with the desktop flow.
		* Hidden entirely on wide screens (the injected stylesheet's desktop query).
		*/
		function MobileDrawerFooter({ useSessions, downloadSessionLog, startSession, toggleSidebar, t }) {
			const sessionId = useSessions((state) => state.current);
			const onNewSession = () => {
				startSession();
				toggleSidebar();
			};
			return (0, react_jsx_runtime.jsxs)("div", {
				"data-mobile-nav": "drawer-actions",
				children: [(0, react_jsx_runtime.jsxs)("button", {
					type: "button",
					"data-mobile-nav": "new-session",
					"aria-label": t("newSession"),
					title: t("newSession"),
					onClick: onNewSession,
					children: [(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconNewChatOutline16, { size: 14 }), (0, react_jsx_runtime.jsx)("span", { children: t("newSession") })]
				}), (0, react_jsx_runtime.jsxs)("button", {
					type: "button",
					"data-mobile-nav": "session-log",
					"aria-label": t("sessionLog"),
					title: t("sessionLog"),
					disabled: sessionId === void 0,
					onClick: () => {
						if (sessionId !== void 0) downloadSessionLog(sessionId);
					},
					children: [(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconDownloadOutline16, { size: 14 }), (0, react_jsx_runtime.jsx)("span", { children: t("sessionLog") })]
				})]
			});
		}
		//#endregion
		//#region lib/types/client/mobile.css.js
		/**
		* Mobile stylesheet for the DSH web shell (ported from dsh-pocket's
		* dsh-web-mobile, MIT).
		*
		* Hooks are the stable framework attributes only — no hashed classes:
		* - `[data-mobile-nav="frame"]`     our marker on the AppFrame element
		* - `[data-sidebar-collapsed]`      AppFrame: sidebar is in the compact rail state
		* - `[data-side="sidebar"|"details"]` AppFrame drag handles
		* - `[data-shell-overlay]`          AppFrame overlay layer (used to locate the frame)
		* - `[data-phase]`                  conversation root phase (hero|active|settling)
		*
		* Below the official auto-collapse breakpoint (1024px) the rail is removed
		* from the grid entirely; the sidebar column becomes an overlay drawer that
		* slides in when the frame leaves the collapsed state (narrowExpanded).
		*/
		const MOBILE_CSS = `
/* ---------- base control styles (rendered at any width, hidden where unused) ---------- */

[data-mobile-nav="toggle"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  flex: none;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--dsw-alias-label-secondary, inherit);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
[data-mobile-nav="toggle"]:hover {
  background: var(--dsw-alias-interactive-bg-hover, rgba(0, 0, 0, .06));
}
[data-mobile-nav="toggle"]:focus-visible {
  outline: 2px solid var(--dsw-alias-state-business-primary, #4f6ef7);
  outline-offset: 1px;
}

/* Drawer footer actions: New Session plus the relocated Session log download. */
[data-mobile-nav="drawer-actions"] {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
[data-mobile-nav="new-session"],
[data-mobile-nav="session-log"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 34px;
  padding: 0 12px;
  border: 1px solid var(--dsw-alias-border-l1, rgba(0, 0, 0, .12));
  border-radius: 12px;
  background: transparent;
  color: var(--dsw-alias-label-primary, inherit);
  font-family: inherit;
  font-size: 13px;
  line-height: 20px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
[data-mobile-nav="new-session"]:hover,
[data-mobile-nav="session-log"]:hover:not(:disabled) {
  background: var(--dsw-alias-interactive-bg-hover, rgba(0, 0, 0, .06));
}
[data-mobile-nav="session-log"]:disabled {
  color: var(--dsw-alias-label-dimmed, rgba(0, 0, 0, .35));
  cursor: default;
}

/* Floating fallback button (hero / blank phases without a session header). */
[data-mobile-nav="fab"] {
  position: absolute;
  top: calc(env(safe-area-inset-top, 0px) + 72px);
  left: 10px;
  z-index: 21;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  padding: 0;
  border: 1px solid var(--dsw-alias-border-l1, rgba(0, 0, 0, .12));
  border-radius: 50%;
  background: var(--dsw-alias-button-floating-fill, #ffffff);
  color: var(--dsw-alias-label-primary, inherit);
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(0, 0, 0, .18);
  -webkit-tap-highlight-color: transparent;
}
[data-mobile-nav="fab"]:hover {
  background: var(--dsw-alias-button-floating-hover, rgba(0, 0, 0, .08));
}
[data-mobile-nav="fab"]:focus-visible {
  outline: 2px solid var(--dsw-alias-state-business-primary, #4f6ef7);
  outline-offset: 2px;
}

/* Dimmed backdrop under the open drawer; above every column, below the drawer. */
[data-mobile-nav="backdrop"] {
  position: absolute;
  inset: 0;
  z-index: 30;
  background: rgba(0, 0, 0, .45);
  cursor: pointer;
  animation: dsh-mobile-nav-fade .2s var(--ds-ease-in-out, ease-in-out);
  -webkit-tap-highlight-color: transparent;
}
@keyframes dsh-mobile-nav-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
/* Settings sheet entrance. */
@keyframes dsh-mobile-nav-sheet-in {
  from {
    opacity: 0;
    transform: translateY(14px) scale(.98);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

/* ---------- mobile-only layout ---------- */

@media (max-width: 1023px) {
  /* --- Phone chrome --- */
  html,
  body {
    touch-action: manipulation !important;
  }

  /* AppFrame: the drawer takes the sidebar column out of grid flow, so the
     remaining in-flow items (center, details) land in tracks 1..2: give the
     center every pixel and keep the details track at zero. */
  [data-mobile-nav="frame"] {
    position: relative !important;
    grid-template-columns: minmax(0, 1fr) 0 0 !important;
    padding-top: env(safe-area-inset-top, 0px) !important;
  }

  /* Main content column (2nd grid child) carries an explicit grid-column: 2 in
     the official style — after the grid compresses to [1fr, 0, 0] it would land
     in the 0px track 2 and vanish. Pull it back to track 1 explicitly. */
  [data-mobile-nav="frame"] > :nth-child(2) {
    grid-column: 1 !important;
    grid-row: 1 !important;
    min-width: 0 !important;
  }

  /* The sidebar column (first grid child) becomes a left drawer. */
  [data-mobile-nav="frame"] > :first-child {
    position: absolute !important;
    inset: 0 auto 0 0 !important;
    width: max-content !important;
    max-width: 92vw !important;
    z-index: 40 !important;
    transform: translateX(-110%);
    transition: transform .28s var(--ds-ease-in-out, ease-in-out);
    background: var(--dsw-alias-bg-base, #ffffff);
    padding-top: env(safe-area-inset-top, 0px) !important;
    border-right: none !important;
  }

  /* Expanded state (frame without data-sidebar-collapsed) slides the drawer in.
     The open state is transform:none — NOT translateX(0): an identity
     transform still makes the drawer the containing block for fixed-position
     descendants (the settings dialog is portaled into the sidebar DOM). */
  [data-mobile-nav="frame"]:not([data-sidebar-collapsed]) > :first-child {
    transform: none !important;
  }

  /* Drag handles are useless on touch and would float over the drawer. */
  [data-side="sidebar"],
  [data-side="details"] {
    display: none !important;
  }

  /* --- Conversation text on mobile --- */
  [data-phase] [class$="_scrollBody"] {
    scrollbar-gutter: auto !important;
    scrollbar-width: none !important;
  }
  [data-phase] [class$="_scrollBody"]::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }
  [data-phase] [class$="_actions"] {
    overflow: hidden !important;
  }
  [data-phase] [class$="_actions"] [class$="_timeEnd"] {
    flex: 0 1 auto !important;
    min-width: 0 !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
  }

  [data-phase] [class$="_scroll"]:has(p) {
    padding-left: 20px !important;
    padding-right: 20px !important;
    font-size: 15px !important;
  }
  [data-phase] [class$="_scroll"]:has(p) p,
  [data-phase] [class$="_scroll"]:has(p) li,
  [data-phase] [class$="_scroll"]:has(p) [class*="_text_"] {
    font-size: 15px !important;
  }

  /* --- Composer bottom row on mobile --- */
  [data-phase] [class*="_card"]:has(textarea) > :last-child {
    gap: 8px !important;
  }
  [data-phase] [class*="_card"]:has(textarea) > :last-child > :first-child {
    gap: 8px !important;
  }
  [data-phase] [class*="_card"]:has(textarea) > :last-child > :first-child > :nth-child(2) {
    flex: 0 0 auto !important;
  }
  [data-phase] [class*="_card"]:has(textarea) > :last-child > :last-child {
    flex: 1 1 auto !important;
    min-width: 0 !important;
  }

  /* --- Session header on mobile ---
     Layout goal: [toggle] [session title] in a row, with the Session log
     capsule removed from the header (relocated to the drawer footer). */
  [data-phase] header {
    padding-right: 12px !important;
  }
  /* Give the title row a lane clear of the absolutely-placed toggle. */
  [data-phase] header > :first-child {
    padding-left: 20px !important;
  }
  /* The directory toggle sits at the far left of the header. */
  [data-mobile-nav="toggle"] {
    position: absolute !important;
    left: 8px !important;
    top: 12px !important;
    z-index: 2 !important;
  }
  /* Session log download: gone from the header row on mobile. */
  [data-phase] header > :first-child > :last-child {
    display: none !important;
  }

  /* --- Settings dialog on mobile --- */
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])) {
    position: absolute !important;
    left: 8px !important;
    top: calc(env(safe-area-inset-top, 0px) + 12px) !important;
    width: calc(100vw - 16px) !important;
    max-width: calc(100vw - 16px) !important;
    height: auto !important;
    max-height: min(800px, calc(100vh - 24px - env(safe-area-inset-top, 0px))) !important;
    max-height: min(800px, calc(100dvh - 24px - env(safe-area-inset-top, 0px))) !important;
    flex-direction: column !important;
    border-radius: 14px !important;
    animation: dsh-mobile-nav-sheet-in .22s var(--ds-ease-out, ease-in-out);
  }
  :has(> [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"]))) > :first-child {
    animation: dsh-mobile-nav-fade .18s var(--ds-ease-out, ease-in-out);
  }
  @media (prefers-reduced-motion: reduce) {
    [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])),
    :has(> [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"]))) > :first-child {
      animation: none !important;
    }
  }
  [aria-modal="true"]:not(:has(> :first-child > :last-child > button)) {
    max-width: calc(100vw - 32px) !important;
  }
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])) > :first-child {
    width: 100% !important;
    flex-direction: row !important;
    align-items: center !important;
    gap: 6px !important;
    padding: 10px 12px 8px !important;
  }
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])) > :first-child > :first-child {
    display: none !important;
  }
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])) > :first-child > :last-child {
    flex-direction: row !important;
    flex-wrap: wrap !important;
    width: 100% !important;
    gap: 6px !important;
    overflow: visible !important;
  }
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])) > :last-child > :first-child {
    justify-content: space-between !important;
    align-items: center !important;
    padding: 0 12px !important;
    min-height: 40px !important;
  }
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])) > :last-child > :first-child > * {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])) > :last-child > :first-child > :last-child {
    width: 32px !important;
    height: 32px !important;
    border-radius: 50% !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    background: var(--dsw-alias-interactive-bg-hover, rgba(0, 0, 0, .06)) !important;
  }
  [aria-modal="true"] [class$="_cubeRow"] {
    gap: 6px !important;
  }
  [aria-modal="true"] [class$="_cubeRow"] > * {
    flex: 1 1 0 !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 6px !important;
    padding: 10px 8px !important;
    min-height: 0 !important;
  }
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])) > :last-child {
    flex: 1 1 auto !important;
    min-height: 0 !important;
  }
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])) > :last-child > :last-child {
    padding: 0 12px 24px !important;
  }

  /* --- settings sheet: nav tabs + rows --- */
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])) > :first-child > :last-child {
    display: grid !important;
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 6px !important;
  }
  [aria-modal="true"] [class$="_navCell"] {
    padding: 6px 8px !important;
    gap: 6px !important;
    font-size: 13px !important;
    justify-content: flex-start !important;
  }
  [aria-modal="true"] [class$="_navCell"] svg {
    width: 14px !important;
    height: 14px !important;
    flex: none !important;
  }
  [aria-modal="true"] [class$="_section"] [class$="_row"] {
    flex-direction: column !important;
    align-items: stretch !important;
    gap: 8px !important;
  }
  [aria-modal="true"] [class$="_section"] [class$="_row"] > :first-child {
    width: 100% !important;
    max-width: none !important;
  }
  [aria-modal="true"] [class$="_section"] [class$="_row"] > :last-child {
    width: 100% !important;
    max-width: none !important;
  }
  [aria-modal="true"] [class$="_cubeRow"] > * {
    border: 1px solid var(--dsw-alias-border-l1, rgba(0, 0, 0, .12)) !important;
  }

  /* --- drawer footer --- */
  [data-mobile-nav="frame"] [class$="_footerActions"] {
    flex-wrap: wrap !important;
    gap: 6px !important;
  }
  [data-mobile-nav="drawer-actions"] {
    width: 100% !important;
  }
  [data-mobile-nav="drawer-actions"] > button {
    flex: 1 1 0 !important;
    padding: 0 8px !important;
    white-space: nowrap !important;
  }

  /* --- conversation stats line ---
     The session-status row (turns / steps / LLM time / TTFT / cache) is long.
     The client marks the exact row with [data-mobile-nav="stats"]. Layout: ONE
     fixed-height (28px) flex strip that scrolls horizontally. */
  [data-mobile-nav="stats"] {
    display: flex !important;
    flex-flow: row nowrap !important;
    align-items: center !important;
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    height: 28px !important;
    min-height: 28px !important;
    max-height: 28px !important;
    box-sizing: border-box !important;
    white-space: nowrap !important;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-x: contain;
    scrollbar-width: thin !important;
    scrollbar-color: var(--dsw-alias-border-l1, rgba(0, 0, 0, .28)) transparent !important;
    padding: 0 0 4px !important;
    line-height: 20px !important;
    font-size: 12px !important;
  }
  [data-mobile-nav="stats"]::-webkit-scrollbar {
    height: 2px !important;
  }
  [data-mobile-nav="stats"]::-webkit-scrollbar-thumb {
    background: var(--dsw-alias-label-tertiary, rgba(0, 0, 0, .3)) !important;
    border-radius: 2px !important;
  }
  [data-mobile-nav="stats"]::-webkit-scrollbar-track {
    background: transparent !important;
  }
  [data-mobile-nav="stats"] > * {
    display: flex !important;
    flex: 0 0 auto !important;
    flex-flow: row nowrap !important;
    align-items: center !important;
    width: max-content !important;
    min-width: max-content !important;
    max-width: none !important;
    white-space: nowrap !important;
    margin-right: 12px !important;
    padding: 0 !important;
  }
  [data-mobile-nav="stats"] > *:last-child {
    margin-right: 0 !important;
  }
  [data-mobile-nav="stats"] * {
    white-space: nowrap !important;
  }

  /* --- hero composer on mobile --- */
  [data-phase="hero"] [class$="_card"]:has(textarea) {
    padding-top: 6px !important;
    gap: 8px !important;
  }
  [data-phase="hero"] textarea:placeholder-shown {
    height: 28px !important;
  }
  [data-phase="hero"] [class$="_card"]:has(textarea:placeholder-shown) > [class$="_scroll"],
  [data-phase="hero"] [class$="_card"]:has(textarea:placeholder-shown) [class$="_grow"] {
    height: 28px !important;
  }
  [data-phase="hero"] [class$="_card"]:has(textarea) > [class$="_row"] {
    padding-top: 2px !important;
  }
  [data-phase="hero"] [class$="_headline"] {
    line-height: 1.15 !important;
    margin-bottom: 0 !important;
  }
  [data-phase="hero"] [class$="_stack"] {
    gap: 0 !important;
  }
}

/* ---------- desktop: the mobile controls must never appear ---------- */

@media (min-width: 1024px) {
  [data-mobile-nav="toggle"],
  [data-mobile-nav="fab"],
  [data-mobile-nav="backdrop"],
  [data-mobile-nav="new-session"],
  [data-mobile-nav="session-log"],
  [data-mobile-nav="drawer-actions"] {
    display: none !important;
  }
}
`;
		//#endregion
		//#region lib/types/client/locales.js
		/** `mobileShell` namespace dictionaries: drawer controls. */
		const NS = "mobileShell";
		/** Simplified Chinese dictionary (the key-set source of truth). */
		const zh = {
			"open": "打开目录",
			"close": "收起目录",
			"backdrop": "点击关闭目录",
			"sessionLog": "导出会话日志",
			"newSession": "新对话"
		};
		/** English dictionary, key-identical to the Chinese source of truth. */
		const en = {
			"open": "Open directory",
			"close": "Close directory",
			"backdrop": "Click to close directory",
			"sessionLog": "Session log",
			"newSession": "New session"
		};
		//#endregion
		//#region lib/types/client/index.js
		/** Services required by the mobile-shell plugin. */
		const inject = [
			"slots",
			"layout",
			"locale",
			"workspaces",
			"sessionLogDownload"
		];
		/**
		* Apply the mobile shell.
		* @param ctx - browser context carrying slots, layout, locale, workspaces, sessionLogDownload.
		*/
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), "ui-mobile-shell: dictionaries");
			ctx.effect(() => {
				const tag = document.createElement("style");
				tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-mobile-shell";
				tag.dataset.pluginCss = "@deepseek-ai/dsh-client-ui-mobile-shell/mobile.css";
				tag.textContent = MOBILE_CSS;
				document.head.appendChild(tag);
				return () => {
					tag.remove();
				};
			}, "ui-mobile-shell: styles");
			ctx.effect(() => {
				const narrow = window.matchMedia("(max-width: 1023px)");
				const viewport = document.querySelector("meta[name=\"viewport\"]");
				const originalViewport = viewport?.content ?? "";
				const themeMeta = document.createElement("meta");
				themeMeta.name = "theme-color";
				const bodyBg = () => getComputedStyle(document.body).backgroundColor;
				const sync = () => {
					if (viewport !== null) viewport.content = "width=device-width, initial-scale=1, viewport-fit=cover";
					themeMeta.content = bodyBg();
					if (themeMeta.parentElement === null) document.head.appendChild(themeMeta);
				};
				const restore = () => {
					if (viewport !== null) viewport.content = originalViewport;
					themeMeta.remove();
				};
				const onGestureStart = (event) => event.preventDefault();
				if (narrow.matches) sync();
				const onChange = (event) => event.matches ? sync() : restore();
				narrow.addEventListener("change", onChange);
				const observer = new MutationObserver(() => {
					if (narrow.matches) themeMeta.content = bodyBg();
				});
				observer.observe(document.body, {
					attributes: true,
					attributeFilter: ["data-ds-dark-theme"]
				});
				document.addEventListener("gesturestart", onGestureStart);
				return () => {
					narrow.removeEventListener("change", onChange);
					observer.disconnect();
					document.removeEventListener("gesturestart", onGestureStart);
					restore();
				};
			}, "ui-mobile-shell: status bar theme + viewport + zoom guard");
			ctx.effect(() => {
				if (!window.matchMedia("(max-width: 1023px)").matches) return () => {};
				const moveTps = (stats) => {
					if ([...stats.children].some((c) => /^TPS\s+\d/.test((c.textContent ?? "").trim()))) return;
					const stack = stats.closest("[class$=\"_composerStack\"]");
					if (stack === null) return;
					for (const el of stack.querySelectorAll("div")) {
						const text = (el.textContent ?? "").trim();
						if (!/^TPS\s+\d/.test(text)) continue;
						if (el.children.length > 0) continue;
						stats.appendChild(el);
						return;
					}
				};
				const mark = () => {
					for (const root of document.querySelectorAll("[data-phase] [class$=\"_root\"]")) {
						if (root.closest("[class$=\"_composerStack\"]") === null) continue;
						const text = root.textContent ?? "";
						if (!/(turns|steps|\bLLM\b|轮|步)/.test(text)) continue;
						if (root.querySelector("textarea") !== null) continue;
						root.setAttribute("data-mobile-nav", "stats");
						moveTps(root);
						return;
					}
				};
				const observer = new MutationObserver(mark);
				observer.observe(document.body, {
					childList: true,
					subtree: true
				});
				mark();
				return () => {
					observer.disconnect();
				};
			}, "ui-mobile-shell: stats line marker");
			ctx.slots.inject("conversation.session.header.actions", () => ctx.slots.register({
				name: "conversation.session.header.actions",
				id: "mobile-nav-toggle",
				order: 10,
				locale: NS,
				inject: () => ({ toggleSidebar: () => ctx.layout.toggleSidebar() })
			}, MobileNavToggle));
			ctx.slots.inject("shell.overlay", () => ctx.slots.register({
				name: "shell.overlay",
				id: "mobile-nav-overlay",
				order: 10,
				locale: NS,
				inject: () => ({ toggleSidebar: () => ctx.layout.toggleSidebar() })
			}, MobileNavOverlay));
			ctx.slots.inject("sidebar.footer.action", () => ctx.slots.register({
				name: "sidebar.footer.action",
				id: "mobile-nav-drawer-footer",
				order: 10,
				locale: NS,
				inject: () => ({
					downloadSessionLog: (sessionId) => ctx.sessionLogDownload.download(sessionId),
					startSession: () => {
						ctx.workspaces.startSession();
					},
					toggleSidebar: () => ctx.layout.toggleSidebar()
				})
			}, MobileDrawerFooter));
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map