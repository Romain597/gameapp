import React from 'react';

function GameListInfo(props) {

    const dateOptions = { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' };

    const getGameDateObject =  (dateString , time = false ) => {
        let dateObj = dateString;
        if( typeof dateString == "string" ) {
            if( time === false ) {
                dateString = dateString.replace(/[Tt].+$/,'');
                dateString = dateString.trim() + '-0-0-0'
            } else {
                dateString = dateString.replace(/[^\d-]/,'-');
            }
            let dateArray = dateString.split('-');
            let year = parseInt(dateArray[0] , 10);
            let month = parseInt(dateArray[1] , 10) - 1;
            let day = parseInt(dateArray[2] , 10);
            let hour = parseInt(dateArray[3] , 10);
            let minute = parseInt(dateArray[4] , 10);
            let second = parseInt(dateArray[5] , 10);
            dateObj = new Date(Date.UTC(year,month,day,hour,minute,second));
        }
        return dateObj;
    }

    let poster = "no-poster.svg";
    let dateString = "Non renseignée"
    let categoriesNames = "Non renseignée"
    let name = "Inconnu"

    if( typeof props.gameObject === "object" ) {
        name = props.gameObject.name
        poster = props.gameObject.posterFile
        if( poster === null || poster.trim() === "" ) {
            poster = 'no-poster.svg';
        }
        if( props.gameObject.releasedAt !== null && props.gameObject.releasedAt !== "" ) {
            dateString = (getGameDateObject(props.gameObject.releasedAt)).toLocaleDateString('fr-FR', dateOptions)
        }
        let separator = ' | '
        let categories = props.gameObject.categories
        if( categories.length > 0 ) {
            categoriesNames = "";
            categories.forEach( ( category , key ) => {
                if(category.name.trim() !== '' ) {
                    separator = ', '
                    if( key === 0 ) {
                        separator = ''
                    }
                    categoriesNames += separator + category.name
                }
            });
        }
    }

    return (
        <React.Fragment>
        <h6 className="text-center font-weight-bold my-2">{name}</h6>
        <img className="text-center w-100 mt-1 img-fluid" src={"/img/" + poster} alt={"Affiche de " + name} />
        <p className="text-center my-2">Date de sortie : {dateString}</p>
        <p className="text-center my-2">Catégorie(s) : {categoriesNames}</p>
        </React.Fragment>
    );
}

export default GameListInfo;
