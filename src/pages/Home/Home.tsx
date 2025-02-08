import CarList from "../../components/CarList/CarList";
import FilterForm from "../../components/FilterForm/FilterForm";
import styles from './Home.module.scss';

function Home() {
    return (
        <>
            <div className={styles.filterContainer}>
                <FilterForm/>
            </div>
            <CarList/>
        </>
    )
}

export default Home;