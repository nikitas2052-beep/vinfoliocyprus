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
  addItem: (wineId: string, quantity?: number) => void;
  removeItem: (wineId: string) => void;
  updateQuantity: (wineId: string, quantity: number) => void;
  clearCart: () => void;
  getQuantity: (wineId: string) => number;
  getTotalItems: () => number;
}

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
      addItem: (wineId, quantity = 1) =>
        set((s) => {
          const existing = s.items.find((i) => i.wineId === wineId);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.wineId === wineId
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ),
            };
          }
          return { items: [...s.items, { wineId, quantity }] };
        }),
      removeItem: (wineId) =>
        set((s) => ({ items: s.items.filter((i) => i.wineId !== wineId) })),
      updateQuantity: (wineId, quantity) =>
        set((s) => ({
          items:
            quantity <= 0
              ? s.items.filter((i) => i.wineId !== wineId)
              : s.items.map((i) =>
                  i.wineId === wineId ? { ...i, quantity } : i,
                ),
        })),
      clearCart: () => set({ items: [] }),
      getQuantity: (wineId) =>
        get().items.find((i) => i.wineId === wineId)?.quantity ?? 0,
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
