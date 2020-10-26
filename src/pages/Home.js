import React from 'react'
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import {Link} from "react-router-dom";
import Services from "../components/Services";
import FeaturedRooms from "../components/Featuredrooms";


export default function Home() {
    return (
        <>
            <Hero>
                <Banner title="Luxurious Rooms" subtitle="
                Deluze rooms starting at N7000">
                    <Link to="/rooms" className="btn-primary">
                        Our rooms
                    </Link>
                </Banner>
            </Hero>
            <Services />
            <FeaturedRooms /> 
        </>
    )
}
