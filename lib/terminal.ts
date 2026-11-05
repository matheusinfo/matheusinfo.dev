/** Tiny event bus so any component can open the terminal overlay (mounted once in _app). */
export const TERMINAL_OPEN_EVENT = "matheusinfo:terminal-open";

export const openTerminal = () => {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(TERMINAL_OPEN_EVENT));
};
