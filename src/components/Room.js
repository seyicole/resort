import React from 'react'
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import defaultImg from "../images/room-1.jpeg";

export default function Room({room}) {
    const {name, slug, images, price} = room;

    return (
        <article className="room">
            <div className="img-container">
                <img src={images[0] || defaultImg} alt="featured room" />
                <div className="price-top">
                    <h6>N{price}</h6>
                    <p>per Night</p>
                </div>
            
                <Link to={`/rooms/${slug}`} className="btn-primary room-link">
                    Features
                </Link>
            </div>
            <p className="room-info">{name}</p>
        </article>
    )
}

//using proptypes to check that we r rendering the correct props esl we should get an error from d console
Room.propTypes = {
    room:PropTypes.shape({
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        price: PropTypes.number.isRequired,
    })
}