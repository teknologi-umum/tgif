import createStore from "zustand/vanilla";
import createStoreHook from "zustand";

export const counter = createStore((set: any) => ({
  count: 0,
  add: () => set((state) => ({ count: state.count + 1 })),
  subtract: () => set((state) => ({ count: state.count - 1 }))
}));

export const useStore = createStoreHook(counter);
