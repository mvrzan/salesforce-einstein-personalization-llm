import { create } from "zustand";
import { ProductType } from "@/utils/types";

type BearStore = {
  bannerImage: string;
  setBannerImage: (image: string) => void;
  resetBannerImage: () => void;
  epRecommendedProducts: ProductType[];
  updateRecommendedProducts: (products: ProductType[]) => void;
  theme: string;
  setTheme: (product: string) => void;
};

const useBearStore = create<BearStore>((set) => ({
  bannerImage: "",
  setBannerImage: (image: string) => set({ bannerImage: image }),
  resetBannerImage: () => set({ bannerImage: "" }),

  epRecommendedProducts: [],
  updateRecommendedProducts: (products: ProductType[]) => set({ epRecommendedProducts: products }),

  theme: "",
  setTheme: (product: string) =>
    set((state) => {
      if (state.theme === product) {
        return { theme: product };
      }

      if (product === "Camera") {
        return { theme: "dark" };
      }

      if (product === "Headphones") {
        return { theme: "yellow" };
      }
      if (product === "Drone") {
        return { theme: "teal" };
      }
      if (product === "Smartwatch") {
        return { theme: "blue" };
      }

      return { theme: "" };
    }),
}));

export default useBearStore;
