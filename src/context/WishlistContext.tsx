import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { 
    fetchWishlist as fetchWishlistApi, 
    addToWishlist as addToWishlistApi,
    removeFromWishlist as removeFromWishlistApi
} from "../api/sparkplugApi";

import toast from "react-hot-toast";


type WishlistContextType = {
    wishlist: string[];
    addToWishlist: (postingId: string) => Promise<boolean>;
    removeFromWishlist: (postingId: string) => Promise<boolean>;
    isInWishlist: (postingId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType>({} as WishlistContextType);

type Props = { children: React.ReactNode };

export const WishlistProvider = ( {children}: Props) => {
    const [wishlist, setWishlist] = useState<string[]>([]);
    const {userAuth} = useAuth();
    const errorMsg = "Something went wrong.";

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const initialWishlist = await fetchWishlistApi(userAuth?.authToken!);
                const ids = initialWishlist.map( p => (p.id) );
                setWishlist(ids);
            } catch(e) {
                console.error("Error fetching wishlist: " + e);
            }
        }
        
        fetchWishlist();
    }, []);

    const addToWishlist = async (postingId: string) => {
        try {
            await addToWishlistApi(userAuth?.authToken!, postingId);
            setWishlist([...wishlist, postingId]);
            toast.success("Added to wishlist!");
            return true;
        } catch (e) {
            console.error("Error adding to wishlist: " + e);
            toast.error(errorMsg);
            return false;
        }
        
    };

    const removeFromWishlist = async (postingId: string) => {
        try {
            await removeFromWishlistApi(userAuth?.authToken!, postingId);
            setWishlist(wishlist.filter((id) => id !== postingId));
            toast.success("Removed from wishlist!");
            return true;
        } catch (e) {
            console.error("Error removing from wishlist: " + e);
            toast.error(errorMsg);
            return false;
        }
    };

    const isInWishlist = (postingId: string) => {
        return wishlist.includes(postingId);
    };

    return (
        <WishlistContext.Provider value={{wishlist, addToWishlist, removeFromWishlist, isInWishlist}}>
            {children}
        </WishlistContext.Provider>
    );
}

export const useWishlist = () => useContext(WishlistContext);