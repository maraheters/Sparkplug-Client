import styles from "./CarCard.module.scss";
import {Posting} from "../../api/sparkplugApi.ts";
import { formatPrice, formatMileageKm, formatDisplacement } from "../../utils/utils.ts";
import { Link } from "react-router-dom";

type CarCardProps = {
    posting: Posting; 
};

function CarCard({posting}: CarCardProps) {
    const {car, images, creator, creatorId, creationDate } = posting;
    
    const coverImage: string = images.length > 0 ? images[0] : '';
    
    return (
        <Link to={`/postings/${posting.id}`} className={styles.link}>
            <div className={styles.card}>
                <figure><img src={coverImage} alt="../../public/car-svgrepo-com.svg"/></figure>
                <div className={styles.descriptionContainer}>
                    <h2 className={styles.heading}>{car.year} {car.manufacturer.name} {car.model}</h2>
                    {car.engine && <h3> {formatDisplacement(car.engine.displacement)} {car.engine.type}</h3>}
                    {car.transmission && <h3>, {car.transmission.gearboxType}</h3>}
                    <p>{formatPrice(car.price)}</p>
                    <p>{formatMileageKm(car.mileage)}</p>
                </div>
            </div>
        </Link>
    );
}

export default CarCard;