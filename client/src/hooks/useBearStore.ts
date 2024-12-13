import { create } from "zustand";
import { ProductType } from "@/utils/types";

type BearStore = {
  bannerImage: string;
  epRecommendedProducts: ProductType[];
  updateRecommendedProducts: (products: ProductType[]) => void;
  setBannerImage: (image: string) => void;
  resetBannerImage: () => void;
};

const useBearStore = create<BearStore>((set) => ({
  bannerImage: "",
  setBannerImage: (image: string) => set({ bannerImage: image }),
  resetBannerImage: () => set({ bannerImage: "" }),

  epRecommendedProducts: [],
  updateRecommendedProducts: (products: ProductType[]) => set({ epRecommendedProducts: products }),
}));

export default useBearStore;
