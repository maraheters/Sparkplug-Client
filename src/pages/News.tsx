import { useEffect, useState } from "react";
import NewsList from "../components/NewsList";
import Header from "../components/Header";

function News() {


    return (
        <>
            <Header/>
            <NewsList/>
        </>
    )
}

export default News;