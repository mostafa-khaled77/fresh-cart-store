import { getLoggedUserWishlist } from "@/app/_actions/wishlist.actions";
import { useSession } from "next-auth/react";
import { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";
export interface WishListContextType {
  wishListCount: number;
  setWishListCount: Dispatch<SetStateAction<number>>;
}

export const WishListContext = createContext<WishListContextType | undefined>(undefined);;

export function WishListProvider({ children }: { children: ReactNode }) {
  const [wishListCount, setWishListCount] = useState(0);
  const { status } = useSession(); 

async function updateInitialCount() {
    if (status !== "authenticated") {
        setWishListCount(0);
        return;
    }

    try {
        const res = await getLoggedUserWishlist();
        if (res && res.status === "success") {
            const actualCount = res.count ?? res.data?.length ?? 0;
            setWishListCount(actualCount);
        } else {
            setWishListCount(0); 
        }
    } catch (error) {
        setWishListCount(0);
    }
}

  useEffect(() => {
    updateInitialCount();
  }, [status]);  

  return (
    <WishListContext.Provider value={{ wishListCount, setWishListCount }}>
      {children}
    </WishListContext.Provider>
  );
}