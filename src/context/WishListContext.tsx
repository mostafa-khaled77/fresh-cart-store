"use client";
import { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";
import { getLoggedUserWishlist } from "@/app/_actions/wishlist.actions";
import { useSession } from "next-auth/react";

export interface WishListContextType {
  wishListCount: number;
  setWishListCount: Dispatch<SetStateAction<number>>;
  wishList: string[];
  setWishList: Dispatch<SetStateAction<string[]>>;
  isLoading: boolean; 
}

export const WishListContext = createContext<WishListContextType | undefined>(undefined);

export function WishListProvider({ children }: { children: ReactNode }) {
  const [wishListCount, setWishListCount] = useState(0);
  const [wishList, setWishList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      (async () => {
        setIsLoading(true); 
        try {
          const res = await getLoggedUserWishlist();
          if (res?.status === "success") {
            const actualCount = res.count ?? res.data?.length ?? 0;
            setWishListCount(actualCount);
            const ids = res.data?.map((item: any) => item._id) || [];
            setWishList(ids);
          }
        } catch (error) {
          setWishListCount(0);
          setWishList([]);
        } finally {
          setIsLoading(false); 
        }
      })();
    } else if (status === "unauthenticated") {
      setWishListCount(0);
      setWishList([]);
      setIsLoading(false);
    }
  }, [status]);

  return (
    <WishListContext.Provider value={{ wishListCount, setWishListCount, wishList, setWishList, isLoading }}>
      {children}
    </WishListContext.Provider>
  );
}