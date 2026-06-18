/**
 * Logo store (zustand).
 *
 * Migrated from React Context. Hooks `useLogo(type)` and `useLogos()` keep
 * the same signatures so consumers don't need updates. `LogoProvider` is a
 * pass-through that triggers an initial fetch on mount (preserving the old
 * Provider behaviour) but no longer owns the state.
 */
import React, { useEffect } from 'react';
import { create } from 'zustand';
import { API_BASE_URL } from '../constants/api';

export const useLogoStore = create((set) => ({
  logos: {},
  loaded: false,

  refresh: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/logos`);
      const json = await res.json();
      const list = Array.isArray(json?.data) ? json.data : [];
      const byType = {};
      for (const l of list) byType[l.type] = l;
      set({ logos: byType, loaded: true });
    } catch (e) {
      // Network errors are non-fatal — bundled assets remain as fallback.
      set({ loaded: true });
    }
  },
}));

/** Returns the imageUrl for a logo type (e.g. 'primary', 'mobile_splash'). */
export const useLogo = (type) =>
  useLogoStore((s) => (type ? s.logos[type]?.imageUrl : undefined));

/** Returns the full { logos, loaded, refresh } shape — same as before. */
export const useLogos = () => {
  const logos = useLogoStore((s) => s.logos);
  const loaded = useLogoStore((s) => s.loaded);
  const refresh = useLogoStore((s) => s.refresh);
  return { logos, loaded, refresh };
};

/**
 * Pass-through Provider. The old <LogoProvider> ran an initial fetch via
 * useEffect — we preserve that here so wrapping in App.js still seeds the
 * store on app boot, without re-introducing Context state.
 */
export const LogoProvider = ({ children }) => {
  const refresh = useLogoStore((s) => s.refresh);
  useEffect(() => {
    refresh();
  }, [refresh]);
  return children;
};

export default useLogoStore;
