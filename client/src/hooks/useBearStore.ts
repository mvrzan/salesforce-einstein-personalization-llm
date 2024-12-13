import { create } from "zustand";

type BearStore = {
  bannerImage: string;
  setBannerImage: (image: string) => void;
  resetBannerImage: () => void;
};
const useBearStore = create<BearStore>((set) => ({
  bannerImage: "",
  setBannerImage: (image: string) => set({ bannerImage: image }),
  resetBannerImage: () => set({ bannerImage: "" }),
}));

export default useBearStore;
