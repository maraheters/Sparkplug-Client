// CarInfo.tsx
import { Posting } from "../api/sparkplugApi.ts";
import ImageGallery from "./ImageGallery.tsx";
import styles from "../styles/CarInfo.module.scss"
import { formatDisplacement, formatMileageKm, formatPowerKwAndHp, formatPrice, formatTorqueNm } from "../utils/utils.ts";

type Props = {
    posting: Posting;
};

const CarInfo = ({ posting }: Props) => {
    const car = posting.car;
    const engine = car.engine;
    const transmission = car.transmission;

    return (
        <div className={`container ${styles.carInfo}`}>
            <div className={styles.galleryAndQuickInfo}>
                <div className={styles.gallery}>
                    <ImageGallery imageUrls={posting.images} />
                </div>
                <div className={styles.quickInfo}>
                    <div className={styles.headings}>
                        <h1 className={styles.mainHeading}>{car.year} {car.manufacturer.name} {car.model}</h1>
                        <h2 className={styles.price}>{formatPrice(car.price)}</h2>
                        <h2 className={styles.mileage}>{formatMileageKm(car.mileage)}</h2>
                    </div>
                    {car.color && <h3>{car.color}</h3>}
                    {car.category && <h3>{car.category}</h3>}
                    {engine && engine.displacement != null && <h3>{formatDisplacement(engine.displacement)} {engine.type}</h3>}
                    {engine && engine.fuelType && <h3>{engine.fuelType}</h3>}
                    {transmission && transmission.gearboxType && <h3>{transmission.gearboxType}</h3>}
                </div>
            </div>   

            <div className={styles.summary}>
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
            </div>

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
                        <dd>{formatPowerKwAndHp(engine.power)}</dd>

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
    );
}

export default CarInfo;