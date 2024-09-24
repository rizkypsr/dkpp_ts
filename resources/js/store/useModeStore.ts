import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ModeState {
    mode: "create" | "edit";
    setMode: (mode: "create" | "edit") => void;
}

export const useModeStore = create<ModeState>()((set) => ({
    mode: "create",
    setMode: (mode) => set({ mode }),
}));
