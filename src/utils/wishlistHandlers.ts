import toast from "react-hot-toast";
import { addToWishlist, removeFromWishlist } from "../api/sparkplugApi";

async function handleAddToWishlist(token: string, postingId: string) {
    try {
        await addToWishlist(token, postingId);
        toast.success("Added to wishlist");
    } catch(err: any) {
        console.error(err);
        toast.error(err.message || "Failed to add posting to wishlist");
    }
    
}


async function handleRemoveFromWishlist(token: string, postingId: string) {
    try {
        await removeFromWishlist(token, postingId);
        toast.success("Removed from wishlist");
    } catch(err: any) {
        console.error(err);
        toast.error(err.message || "Failed to remove from wishlist");
    }
    
}

export { handleAddToWishlist, handleRemoveFromWishlist };
