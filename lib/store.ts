"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem } from "./types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  hydrated: boolean;
  setHydrated: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (wineId: string, quantity?: number, sizeMl?: number) => void;
  removeItem: (wineId: string, sizeMl?: number) => void;
  updateQuantity: (wineId: string, quantity: number, sizeMl?: number) => void;
  clearCart: () => void;
  getQuantity: (wineId: string, sizeMl?: number) => number;
  getTotalItems: () => number;
}

// Two cart lines are the same only when both the wine AND the chosen size
// match (a wine can be requested in more than one bottle size).
const sameLine = (i: CartItem, wineId: string, sizeMl?: number) =>
  i.wineId === wineId && i.sizeMl === sizeMl;

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
      addItem: (wineId, quantity = 1, sizeMl) =>
        set((s) => {
          const existing = s.items.find((i) => sameLine(i, wineId, sizeMl));
          if (existing) {
            return {
              items: s.items.map((i) =>
                sameLine(i, wineId, sizeMl)
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ),
            };
          }
          return { items: [...s.items, { wineId, quantity, sizeMl }] };
        }),
      removeItem: (wineId, sizeMl) =>
        set((s) => ({
          items: s.items.filter((i) => !sameLine(i, wineId, sizeMl)),
        })),
      updateQuantity: (wineId, quantity, sizeMl) =>
        set((s) => ({
          items:
            quantity <= 0
              ? s.items.filter((i) => !sameLine(i, wineId, sizeMl))
              : s.items.map((i) =>
                  sameLine(i, wineId, sizeMl) ? { ...i, quantity } : i,
                ),
        })),
      clearCart: () => set({ items: [] }),
      getQuantity: (wineId, sizeMl) =>
        get().items.find((i) => sameLine(i, wineId, sizeMl))?.quantity ?? 0,
      getTotalItems: () =>
        get().items.reduce((acc, i) => acc + i.quantity, 0),
    }),
    {
      name: "vinfolio-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);

interface AgeGateState {
  verified: boolean;
  hydrated: boolean;
  verify: () => void;
  setHydrated: () => void;
}

export const useAgeGate = create<AgeGateState>()(
  persist(
    (set) => ({
      verified: false,
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),
      verify: () => set({ verified: true }),
    }),
    {
      name: "vinfolio-age",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ verified: s.verified }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
