import React, { Component } from 'react'
//calling this inport from data file "item" because thats what contentful uses
// import items from "./data";
import Client from './Contentful';



const RoomContext = React.createContext();

class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        //for filter components set default vals
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    }
    //get data from contentful

    getData = async () => {
        try {
            let res = await 
            Client.getEntries({
                content_type: 'beachResort',
                // order: 'fiels.price'
               order: '-sys.createdAt'
        })
            //the imported items n formaating d data
            let rooms = this.formatData(res.items)
            let featuredRooms = rooms.filter(room => room.featured ===  true)
            // for filter
            let maxPrice = Math.max(...rooms.map(item => item.price))
            let maxSize = Math.max(...rooms.map(item => item.size))
            this.setState({
                rooms,
                featuredRooms,
                sortedRooms:rooms, //added rooms coz the naming in sorted rooms r diff unlike d rest
                loading: false, //set to false for wen we strt getin data externally
                //for filter
                price:maxPrice,
                maxPrice,
                maxSize
            })
            
        } catch (error) {
          console.log(error);  
        }
    }

    componentDidMount(){
        this.getData()
    }

    //items is passed as just an argument in this case
    formatData(items){
        let tempItems = items.map(item => {
            let id = item.sys.id;
            let images = item.fields.images.map(image => 
                image.fields.file.url
            )
                //destructuring maped info from above statement n returned it
            let room = {...item.fields, images, id};
            return room;   
        })
        return tempItems
    }

    //function for single room page
    getRoom = slug => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find(room => room.slug === slug)
        return room;
    }

    //for filter compponent
    handleChange = event => {
        const target = event.target
        const name = event.target.name
        //for d checkbox
        const value = target.type === 'checkbox' ? 
        target.checked : target.value
        //console.log(type, value, name);
        this.setState({
            [name]:value //this is to get a return val for whateva u filter weather it money, type etc asfa as itws named as it is in state
        },this.filterRooms)//this is to display whatever changes is made in d filter forms. so once this.state is run d callback(this.filterrooms is trigered )
    }


    ///this is grabbing the values from d state
    filterRooms =() => {
        let{
        rooms,
        type,
        capacity,
        price,
        minPrice,
        maxPrice,
        minSize,
        maxSize,
        breakfast,
        pets
        } = this.state

        //all d rooms
        let tempRooms = [...rooms];

        //transform value for to int
        capacity = parseInt(capacity)
        price = parseInt(price)

        //filter by type
        if(type !== 'all'){
            tempRooms = tempRooms.filter(room => room.type === type)
        }
        //filter by capacity
        if(capacity !== 1){
            tempRooms = tempRooms.filter(room => room.capacity === capacity)
        }

        //filter by price
        tempRooms = tempRooms.filter(room => room.price <= price);

        //filter by size
        tempRooms = tempRooms.filter(room => room.size >= minSize
        &&
        room.size <= maxSize)

        //filter by breakfast
        if(breakfast){
            tempRooms = tempRooms.filter(room => room.breakfast === true)
        }

        //filter by pets
        if(breakfast){
            tempRooms = tempRooms.filter(room => room.pets === true)
        }


        //change state
        this.setState({
            sortedRooms: tempRooms
        })
    }

    render() {
        return (
            <RoomContext.Provider 
            value={{
                ...this.state,
                getRoom: this.getRoom,
                handleChange: this.handleChange //for d form
                }}>
             {this.props.children}   
            </RoomContext.Provider>
        )
    }
}

//Create the consumer to consume the data

const RoomConsumer = RoomContext.Consumer;

//using higher order component for roomContainer (alternative) to using normal function of class
export function withRoomConsumer(Component){
    return function ConsumerWrapper(props){
        return <RoomConsumer>
            {value => <Component {...props} context={value} />}
        </RoomConsumer>
    }
}
//incase you want to acces the contex, consumer or provider so export all of dem
//Also wrapped the Router n App in index.js with room Provider since its wr the router is located otherwise it can be done in App.js
export {RoomProvider, RoomContext, RoomConsumer}
