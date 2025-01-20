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
  chatSelector: string;
  setChatSelector: (switchState: boolean) => void;
};

const useBearStore = create<BearStore>((set) => ({
  // banner image
  bannerImage: "",
  setBannerImage: (image: string) => set({ bannerImage: image }),
  resetBannerImage: () => set({ bannerImage: "" }),

  // Salesforce Personalization
  epRecommendedProducts: [],
  updateRecommendedProducts: (products: ProductType[]) => set({ epRecommendedProducts: products }),

  // website theme
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

  // agentforce vs external chat
  chatSelector: "external",
  setChatSelector: (switchState: boolean) => {
    set({ chatSelector: switchState ? "agentforce" : "external" });
  },
}));

export default useBearStore;
