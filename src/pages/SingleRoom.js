import React, { Component } from 'react';
import defaultBcg from "../images/room-1.jpeg";
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
import {RoomContext} from '../context';
import StyledHero from '../components/StyledHero';

export default class SingleRoom extends Component {
    // is not like d prop for single room is been passed in appJs
    //the prop here is been somehow passed by react-router
    constructor(props){
        super(props);
       
       this.state = {
           slug: this.props.match.params.slug,
           defaultBcg
       };
    }
    //to access context
    static contextType = RoomContext;

    render() {
        const {getRoom} = this.context;
        const room = getRoom(this.state.slug);
        console.log(room)

        if(!room){
            return (
                <div className="error">
                    <h3>No such room could be found...</h3>
                    <Link to="/rooms" className="btn-primary">
                        back to rooms
                    </Link>
                </div>
            )
        }

        const {name, 
            capacity, 
            description, 
            size, 
            price, 
            extras, 
            pets, 
            images, 
            breakfast
        } = room;

        const [mainImg, ...defaultImg] = images;

        return  (
            
             <>
            <StyledHero img={mainImg || this.state.defaultBcg }>
                <Banner title={`${name} room`}>
                    <Link to="/rooms"
                    className="btn-primary">
                        back to rooms
                    </Link>
                </Banner>
            </StyledHero>

            <section className="single-room">
            <div className="single-room-images">
                {defaultImg.map((item, i)=> (
                    <img key={i} src={item} alt={name} />
                ))}
            </div>
            <div className="single-room-info">
                    <article className="desc">
                        <h3>details</h3>
                        <p>{description}</p>
                    </article>
                    <article className="info">
                        <h3>info</h3>
                        <h6>peice : ${price}</h6>
                        <h6>size : ${size} SQFT</h6>
                        <h6>
                            max capacity : {" "}
                            {capacity > 1 ? `${capacity} people`
                            : `${capacity} person`}
                        </h6>
                        <h6>
                            {pets ? 'pets allowed': 'no pets allowed'}
                        </h6>
                        <h6>
                            {breakfast && 'free breakfast included'}
                        </h6>
                    </article>
            </div>
            </section>
            <section className="room-extras">
                    <h6>extras</h6>
                    <ul className="extras">
                        {extras.map((item, i)=> {
                            return <li key={i}>- {item}</li>
                        })}
                    </ul>
            </section>
            </>
        )
        
    }
}
