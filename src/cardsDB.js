import React from "react";
import { db } from "./firebase";
import "./css.css";
import { onValue, ref } from "firebase/database";
import {SearchComponent} from "./SearchComponent";
 
  class CardsClient extends React.Component {



    constructor (){
        super();
        this.state = {
            cards: []
        };
    };
    componentDidMount() {
        const dbRef = ref(db, 'executors');
        onValue(dbRef, (snapShot) => {
            let records = [];
            snapShot.forEach(childSnapshot => {
                let keyName = childSnapshot.key;
                let data =  childSnapshot.val();
                records.push({"key": keyName, "data": data});
                console.log({data});
            });
                this.setState({cards: records});
        });
    }
    render(){
        return(
                 <div>
                     <SearchComponent items={this.state.cards}/>
                    {this.state.cards.map((card, index) => {
                        return(
                    
                     <div className="card_container">
                      <h2>{card.data.name}</h2>   
                      <h2>График: {card.data.workTime}</h2>                
                        <img 
                        className="card_image"
                        src={card.data.image}
                         alt={""}
                        />   
                       <button className="card_btn">
                       Позвонить
                       </button>

                     </div>
                   )})};
                 </div>
        );
    };

};
export default CardsClient;