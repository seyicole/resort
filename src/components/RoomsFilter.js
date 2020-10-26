import React from 'react';
import {useContext} from 'react'; //new: exporting context with hooks
import {RoomContext} from '../context';
import Title from './Title';

//get all unique values
//getting unique values for the select button from d api instead of writin it manually
const getUnique = (items, value) =>{
    //using set cause it only include unique val which is what we looking for
    //val will b a string which will b passed into item which checks what kind of val u v for type n if d val is not in d set it ll b included
    //if its in d set by default set will not include it 
    return [...new Set(items.map(item => item[value]))]
}

export default function RoomsFilter({rooms}) {
    //how to use use context with hooks
    const context = useContext(RoomContext);
    //destructing from d state
    const {
        handleChange,
        type,
        capacity,
        price,
        minPrice,
        maxPrice,
        minSize,
        maxSize,
        breakfast,
        pets
     } = context;
     //get unique types
     let types = getUnique(rooms, 'type'); 
     //add all
     types = ['all', ...types];
     //map to jsx
     types = types.map((item, index)=>{
     return <option value={item} key={index}>{item}</option>
     })
     
     //capacity
     let people = getUnique(rooms, 'capacity');
     people = people.map((item, index) =>{
        return <option value={item} key={index}>{item}</option>
     }) 
    return (
        <section className="filter-container">
            <Title title="search rooms" />
            <form className="filter-form">
                {/* select type */}
                <div className="form-group">
                    <label htmlFor="type">room type</label>
                    <select
                    name="type"
                    id="type"
                    value={type}
                    className="form-control"
                    onChange={handleChange}
                    >
                        {types}
                    </select>
                </div>
                {/* end select type */}
            {/* select guest */}
                <div className="form-group">
                    <label htmlFor="capacity">Guest</label>
                    <select
                    name="capacity"
                    id="capacity"
                    value={capacity}
                    className="form-control"
                    onChange={handleChange}
                    >
                        {people}
                    </select>
                </div>
                {/* end select guest */}
                {/* room price range */}
                <div className="form-group">
                    <label htmlFor="price">
                        room price ${price}
                    </label>
                    <input type="range" name="price" min={minPrice}
                    max={maxPrice} id="price" value={price} 
                    onChange={handleChange} className="form-control"/>
                </div>
                {/* end price range */}
                {/* size */}
                <div className="form-group">
                <label htmlFor="price">room size </label>
                <div className="size-inputs">
                    <input
                    type="number"
                    name="minSize"
                    value={minSize}
                    onChange={handleChange}
                    className="size-input"
                    />
                    <input
                    type="number"
                    name="maxSize"
                    value={maxSize}
                    onChange={handleChange}
                    className="size-input"
                    />
                </div>
                </div>
                {/* end of select type */}
                {/* extras */}
                <div className="form-group">
                <div className="single-extra">
                    <input
                    type="checkbox"
                    name="breakfast"
                    id="breakfast"
                    checked={breakfast}
                    onChange={handleChange}
                    />
                    <label htmlFor="breakfast">breakfast</label>
                </div>
                <div className="single-extra">
                    <input
                    type="checkbox"
                    name="pets"
                    checked={pets}
                    onChange={handleChange}
                    />
                    <label htmlFor="breakfast">pets</label>
                </div>
                </div>
                {/* end of extras type */}
            </form>
        </section>
    );
}
