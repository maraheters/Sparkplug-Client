// CarInfo.tsx
import { Posting } from "../../api/sparkplugModels.ts";

import ImageGallery from "../ImageGallery/ImageGallery";
import styles from "./CarInfo.module.scss"
import { capitalize, formatDisplacement, formatMileageKm, formatPowerHpAndKw, formatPrice } from "../../utils/utils.ts";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext.tsx";
import { useState } from "react";
import MessageWindow from "../MessageWindow/MessageWindow.tsx";

type Props = {
    posting: Posting;
};

const CarInfo = ({ posting }: Props) => {
    const { addToWishlist} = useWishlist();
    const [isMsgWindowVisible, setIsMsgWindowVisible] = useState(false);

    const handleMsgWindowToggle = () => {
        setIsMsgWindowVisible(!isMsgWindowVisible);
    }

    const car = posting.car;
    const engine = car.engine;
    const transmission = car.transmission;


    return (
        <>
        <div className={`box-shadow ${styles.carInfoContainer}`}>
            <div className={styles.galleryAndQuickInfo}>
                <div className={styles.gallery}>
                    <ImageGallery imageUrls={posting.images} />
                </div>
                <div className={styles.quickInfo}>
                    <div className={styles.headingsContainer}>
                        <h1 className={styles.mainHeading}>{car.year} {car.manufacturer.name} {car.model}</h1>
                        <h2 className={styles.price}>{formatPrice(car.price)}</h2>
                        <h2 className={styles.mileage}>{formatMileageKm(car.mileage)}</h2>
                        <h2 className={styles.owner}>Owner: <Link to={`/users/${posting.creatorId}`}>{posting.creator}</Link></h2>
                    </div>

                    <div className={styles.contactAndWishlistContainer}>
                        <button 
                            className={styles.contactButton}
                            onClick={() => {handleMsgWindowToggle()}}
                            >Contact owner</button>
                        <button className={styles.wishlistButton}
                            onClick={async () => await addToWishlist(posting.id)}>Add to Wishlist</button>
                    </div>

                    <div className={styles.carDetailsContainer}>
                        {car.color && <h3>{capitalize(car.color)}</h3>}
                        {car.categoryName && <h3>{capitalize(car.categoryName)}</h3>}
                        {engine && engine.displacement != null && <h3>{formatDisplacement(engine.displacement)} {engine.type}</h3>}
                        {engine && engine.fuelType && <h3>{capitalize(engine.fuelType)}</h3>}
                        {transmission && transmission.gearboxType && <h3>{capitalize(transmission.gearboxType)}</h3>}
                    </div>

                </div>
            </div>   

            {/* <div className={styles.summary}>
                <div className={styles.summaryElement}>
                    <figure></figure>
                    <p>fsd</p>
                    <p>fsd</p>
                </div>
                <div className={styles.summaryElement}>
                    <figure></figure>
                    <p>fsd</p>
                    <p>fsd</p>
                </div>
                <div className={styles.summaryElement}>
                    <figure></figure>
                    <p>fsd</p>
                    <p>fsd</p>
                </div>
            </div> */}

            <div className={styles.detailedInfo}>
                {engine && 
                <div className={styles.detailedInfoSection}>
                    <h3>Engine</h3>
                    <dl>
                        <dt>Displacement</dt>
                        <dd>{formatDisplacement(engine.displacement)}</dd>

                        <dt>Type</dt>
                        <dd>{engine.type}</dd>

                        <dt>Fuel Type</dt>
                        <dd>{engine.fuelType}</dd>

                        <dt>Max Power</dt>
                        <dd>{formatPowerHpAndKw(engine.power)}</dd>

                        <dt>Max Torque</dt>
                        <dd>{engine.torque} Nm</dd>
                    </dl>
                </div>}

                {transmission  &&
                <div className={styles.detailedInfoSection}>
                    <h3>Gearbox</h3>

                    <dl>
                        <dt>Type</dt>
                        <dd>{transmission.gearboxType}</dd>

                        {transmission.numberOfGears > 0 && 
                        <>
                            <dt>Gears</dt>
                            <dd>{transmission.numberOfGears}</dd> 
                        </>}
                    </dl>
                </div>}  

                
            </div>
        </div>
        
        {isMsgWindowVisible && ( //создать отдельный компонент, также создать отдельный компонент для формы отправки сообщения
            <MessageWindow posting={posting} onClose={handleMsgWindowToggle}/>
        )}

        </>
    );
}

export default CarInfo;