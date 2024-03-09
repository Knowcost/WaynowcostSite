import React, {useEffect, useState} from 'react';
import {onValue, ref} from "firebase/database";
import {db} from "./firebase";
import "./css.css";
import {SearchComponent} from "./SearchComponent";

export const CardsClientF = (props) => {

    const [cards, setCards] = useState([])
    const [filtered, setFiltered] = useState([])

    useEffect(() => {
        const dbRef = ref(db, 'executors');
        onValue(dbRef, (snapShot) => {
            let records = [];
            snapShot.forEach(childSnapshot => {
                let keyName = childSnapshot.key;
                let data = childSnapshot.val();
                records.push({"key": keyName, "data": data});
                // console.log({data});
            });
            setCards(records);
        });
    }, []);

    useEffect(() => {
        setFiltered(cards)
    }, [cards])

    console.log({filtered})
    return (
        <>
            <SearchComponent items={cards} setFilteredItems={setFiltered}/>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {filtered.map((card, index) => {
                    return (

                        <div key={card.key} className="card_container">
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
                    )
                })}
            </div>
        </>
    );
}