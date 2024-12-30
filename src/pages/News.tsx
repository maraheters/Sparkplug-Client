import { useEffect, useState } from "react";
import NewsList from "../components/NewsList/NewsList";
import Header from "../components/Header/Header";

function News() {


    return (
        <>
            <Header/>
            <NewsList/>
        </>
    )
}

export default News;