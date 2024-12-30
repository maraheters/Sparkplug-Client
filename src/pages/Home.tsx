import Header from "../components/Header/Header";
import CarList from "../components/CarList/CarList";

function Home() {
    return (
        <>
            <Header/>
            {/* <p style={{fontSize: 2 + "rem", marginTop: 60 +"px"}}>
                TODO: LOGOUT, WISHLIST
            </p> */}
            <CarList/>
        </>
    )
}

export default Home;