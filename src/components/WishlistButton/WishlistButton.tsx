import { handleAddToWishlist } from "../../utils/wishlistHandlers";
import styles from "./WishlistButton.module.scss";

interface props {
    token:string;
    postingId: string;
}

function wishlistButton( {token, postingId}: props) {
  return (
    <button
        className={styles.wishlistButton}
        onClick={() => handleAddToWishlist(token, postingId) }
    >❤</button>
  );
}

export default wishlistButton;