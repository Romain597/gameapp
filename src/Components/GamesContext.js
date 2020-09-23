import React from 'react'

export default React.createContext({
    games: [],
    updateGames: games => {},
    sortingMethod: event => {}
});

/*export default React.createContext({
    sortingMethod: event => {}
});*/