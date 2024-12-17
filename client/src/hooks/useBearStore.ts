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
  setTheme: (product: string) => {
    const themes: { [key: string]: string } = {
      Camera: "dark",
      Headphones: "teal",
      Drone: "gray",
      Smartwatch: "green",
    };
    set({ theme: themes[product] || "" });
  },
}));

export default useBearStore;
