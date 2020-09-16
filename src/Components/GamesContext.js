import React from 'react'

export default React.createContext({
    games: [],
    updateGames: games => {},
    sortingMethod: event => {}
});