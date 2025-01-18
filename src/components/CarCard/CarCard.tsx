import styles from "./CarCard.module.scss";
import { Posting } from "../../api/sparkplugApi.ts";
import { formatPrice, formatMileageKm, formatDisplacement } from "../../utils/utils.ts";
import { Link } from "react-router-dom";
import fallbackImage from "../../images/car-svgrepo-com.svg";

type CarCardProps = {
    posting: Posting; 
    additionalComponents?: React.ReactNode[]; // New prop for additional components
};

function CarCard({ posting, additionalComponents = [] }: CarCardProps) {
    const { car, images } = posting;

    const coverImage: string = images.length > 0 ? images[0] : '';

    return (
        <div className={styles.card}>
            <Link to={`/postings/${posting.id}`} className={styles.link}>
                <figure>
                    <img src={coverImage} onError={(e) => (e.currentTarget.src = fallbackImage)} />
                </figure>
            </Link>
            <div className={styles.descriptionContainer}>
                <Link to={`/postings/${posting.id}`} className={styles.link}>
                    <h2 className={styles.heading}>{car.year} {car.manufacturer.name} {car.model}</h2>
                    <div style={{"display":"inline"}}>
                        {car.engine && <h3>{formatDisplacement(car.engine.displacement)} {car.engine.type}</h3>}
                        {car.transmission && <h3>, {car.transmission.gearboxType}</h3>}
                    </div>
                    <p>{formatPrice(car.price)}</p>
                    <p>{formatMileageKm(car.mileage)}</p>
                </Link>
                {/* Render additional components if provided */}
                <div className={styles.additionalComponentsContainer}>
                    {additionalComponents.map((Component, index) => (
                        <div key={index} className={styles.additionalComponent}>{Component}</div>
                    ))}
                </div>

            </div>
        </div>
        
    );
}

export default CarCard;