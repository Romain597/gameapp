import React from 'react';
import './GameList.css';

class GameList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {datas:[
            {title:"Tenet",releaseDate:new Date(2020,7,26),poster:"poster-tenet.png",description:"Muni d'un seul mot – Tenet – et décidé à se battre pour sauver le monde, notre protagoniste sillonne l'univers crépusculaire de l'espionnage international. Sa mission le projettera dans une dimension qui dépasse le temps. Pourtant, il ne s'agit pas d'un voyage dans le temps, mais d'un renversement temporel…"},
            {title:"Greenland - Le dernier refuge",releaseDate:new Date(2020,7,5),poster:"poster-greenland.png",description:"Une comète est sur le point de s’écraser sur la Terre et de provoquer un cataclysme sans précédent. John Garrity décide de se lancer dans un périlleux voyage avec son ex-épouse Allison et leur fils Nathan pour rejoindre le dernier refuge sur Terre à l’abri du désastre. Alors que l’urgence devient absolue et que les catastrophes s’enchainent de façon effrénée, les Garrity vont être témoin du meilleur comme du pire de la part d’une humanité paniquée au milieu de ce chaos."},
            {title:"Forrest Gump",releaseDate:new Date(1995,9,5),poster:"poster-forrest-gump.png",description:" Quelques décennies d'histoire américaine, des années 1940 à la fin du XXème siècle, à travers le regard et l'étrange odyssée d'un homme simple et pur, Forrest Gump."}
        ]};
        console.log(this.state.sortType);
        switch(this.state.sortType) {
            case "alpha-asc":
                this.state.sort((a,b)=>{
                    if(a.title > b.title) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
            break;
            case "alpha-desc":
                this.state.sort((a,b)=>{
                    if(a.title < b.title) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
            break;
            case "date-asc":
                this.state.sort((a,b)=>{
                    if(a.releaseDate > b.releaseDate) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
            break;
            case "date-desc":
                this.state.sort((a,b)=>{
                    if(a.releaseDate < b.releaseDate) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
            break;
        }
    }

    render() {
        let list = this.state.datas.map( (item , key) =>
            <div className="GameList-col">
                <a href="#" className="GameList-item" id={"item-" + key}>
                    <p className="GameList-item-title">{item.title}</p>
                    <img className="GameList-item-poster" src={"/" + item.poster} alt={"Affiche de " + item.title} />
                </a>
            </div>
        );
        return (
            <div className="GameList">
                <div className="GameList-content">
                    <div className="GameList-row">
                        {list}
                    </div>
                </div>
            </div>
        );
    }
}

export default GameList;
