import { useEffect, useState } from "react";
import { useWishlist } from "../../context/WishlistContext";
import styles from "./WishlistButton.module.scss";

interface props {
    postingId: string;
}

function WishlistButton( { postingId }: props) {
	const {addToWishlist, removeFromWishlist, isInWishlist} = useWishlist();
	const [inWishlist, setInWishlist] = useState<boolean>(false);

	useEffect(() => {
		setInWishlist(isInWishlist(postingId));
	}, []);


	const toggleInWishlist = async () => {
		let success: boolean;
		if (inWishlist) {
			success = await removeFromWishlist(postingId);
		} else {
			success = await addToWishlist(postingId);
		}

		if (success) {
			setInWishlist(!inWishlist);
		}
	}

  	return (
		<div className={styles.wishlistButtonContainer}>
			{inWishlist 
				? <button
					className={styles.wishlistButtonRemove}
					onClick={() => toggleInWishlist() }
				>❤</button>
				: <button
					className={styles.wishlistButtonAdd}
					onClick={() => toggleInWishlist() }
				>♡</button>
			}
		</div>
  	);
}

export default WishlistButton;