import Header from "../../components/Header/Header";
import CarList from "../../components/CarList/CarList";
import styles from "./Home.module.scss";

function Home() {
    return (
        <>
            <Header/>
            <div className={`container ${styles.listContainer}`}>
                <CarList/>
            </div>
        </>
    )
}

export default Home;