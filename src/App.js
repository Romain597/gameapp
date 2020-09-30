import React , { useState, useEffect, useContext } from 'react';
import GameList from './Components/GameList';
import GameView from './Components/GameView';
import GameClassify from './Components/GameClassify';
import Api from './Api'
import SortingContext from './Components/SortingContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Redirect
} from "react-router-dom";

function ButtonSort(props) {
  return (
    <div className={props.colClass}>
        <button id={props.btnId} className={props.btnClass} onClick={props.sortingMethod}>{props.children}</button>
    </div>
  );
}

function ButtonClassify(props) {

  const getDataList = () => {
      return props.datas.map( (object,index) => 
          <option value={object.id} key={index} >{object.name}</option>
      );
  }

  return (
    <div className={props.colClass}>
        <button id={props.btnId} className={props.btnClass} onClick={props.classifyMethod}>{props.children}</button>
        <select id={props.selectId} className={props.selectClass} defaultValue={""} >
            <option value="" disabled >{props.selectLabel}</option>
            {getDataList()}
        </select>
    </div>
  );
}

function ButtonSortList(props) {

  const [ redirectPath , setRedirectPath ] = useState( "" );

  //const [ sortingOptions , setSortingOptions ] = useState( props.sortingOptions );

  let contextValue = useContext(SortingContext);

  useEffect( () => {
    Api.getApiGames(1 , props.updateGames , contextValue.sortingOptions);
  }, [contextValue.sortingOptions] );

  const handleSortClick = (event) => {
    let prevSortingOptions = {};
    if( contextValue.sortingOptions.hasOwnProperty('classifyField') === true ) {
        prevSortingOptions = { classifyField: contextValue.sortingOptions.classifyField }
    }
    switch(event.target.id) {
      case "sort-alpha-asc":
        contextValue.updateSortingMethod({ orderField: "name", orderBy: "asc", ...prevSortingOptions });
      break;
      case "sort-alpha-desc":
        contextValue.updateSortingMethod({ orderField: "name", orderBy: "desc", ...prevSortingOptions });
      break;
      case "sort-date-asc":
        contextValue.updateSortingMethod({ orderField: "released", orderBy: "asc", ...prevSortingOptions });
      break;
      case "sort-date-desc":
        contextValue.updateSortingMethod({ orderField: "released", orderBy: "desc", ...prevSortingOptions });
      break;
      case "reset-sort":
        contextValue.updateSortingMethod({ ...prevSortingOptions });
      break;
      default:
        contextValue.updateSortingMethod({ ...prevSortingOptions });
    }
  }

  const handleClassifyClick = (event) => {
      let targetId = event.target.id;
      let select;
      let choice;
      let selectedValue;
      let newSortingOptions = contextValue.sortingOptions;
      let redirectValue = "";
      if( targetId === "classify-by-category" ) {
        redirectValue = "categories";
        select = document.getElementById("category-select");
        choice = select.selectedIndex;
        selectedValue = select.options[choice].value
        select.selectedIndex = 0;
        if( selectedValue.trim() !== "" ) {
            if( newSortingOptions.hasOwnProperty('classifyField') === false ) {
                newSortingOptions = { classifyField: "", ...newSortingOptions }
            }
            if( newSortingOptions.hasOwnProperty('classifyId') === false ) {
                newSortingOptions = { classifyId: "", ...newSortingOptions }
            }
            newSortingOptions.classifyField = "category";
            newSortingOptions.classifyId = selectedValue;
        }
      } else if( targetId === "classify-by-studio" ) {
          redirectValue = "studios";
          select = document.getElementById("studio-select");
          choice = select.selectedIndex;
          selectedValue = select.options[choice].value
          select.selectedIndex = 0;
          if( selectedValue.trim() !== "" ) {
              if( newSortingOptions.hasOwnProperty('classifyField') === false ) {
                  newSortingOptions = { classifyField: "", ...newSortingOptions }
              }
              if( newSortingOptions.hasOwnProperty('classifyId') === false ) {
                  newSortingOptions = { classifyId: "", ...newSortingOptions }
              }
              newSortingOptions.classifyField = "studio";
              newSortingOptions.classifyId = selectedValue;
          }
      }
      if( selectedValue !== null && selectedValue !== "" ) {
          contextValue.updateSortingMethod(newSortingOptions);
          Api.getApiGames(1 , props.updateGames , newSortingOptions);
          // remove focus
          document.getElementById(targetId).blur();
      }
      else {
          // redirect path to ClassifyPage
          setRedirectPath("/GameApp/gameapp/public/games-by-" + redirectValue);
      }
  }

  const handleGamesClassifyClick = () => {
      // redirect path to ClassifyPage
      setRedirectPath("/GameApp/gameapp/public/games-by-alphabetic");
  }

  const getRedirectBalise = () => {
    let data = null;
    if( redirectPath !== "" ) {
        data = (
                <Route>
                    <Redirect to={redirectPath} />
                </Route>
              );
    }
    return (data);
  }

  const [ categories , setCategories ] = useState( [] );

  useEffect( () => {
    Api.getApiCategoriesList( setCategories );
  }, [] );

  const [ studios , setStudios ] = useState( [] );

  useEffect( () => {
    Api.getApiStudiosList( setStudios );
  }, [] );

  return (
    <>
    {getRedirectBalise()}
    <header>
        <div className="row justify-content-between align-items-stretch my-4">
            <div className="col-12">
                <button id="classify-games" className="btn btn-secondary my-2 w-100" onClick={handleGamesClassifyClick}>Voir les jeux classés par lettres</button>
            </div>
        </div>
        <div className="row justify-content-between align-items-stretch my-4">
            <ButtonClassify classifyMethod={handleClassifyClick} datas={categories} selectId="category-select" selectClass="form-control my-2" selectLabel="Choisisez une catégorie" colClass="col" btnId="classify-by-category" btnClass="btn btn-warning my-2 w-100" >Classifier par catégorie</ButtonClassify>
            <ButtonClassify classifyMethod={handleClassifyClick} datas={studios} selectId="studio-select" selectClass="form-control my-2" selectLabel="Choisisez un studio" colClass="col" btnId="classify-by-studio" btnClass="btn btn-warning my-2 w-100" >Classifier par studio</ButtonClassify>
        </div>
        <div className="row justify-content-between align-items-stretch my-4">
            <ButtonSort sortingMethod={handleSortClick} colClass="col" btnId="sort-alpha-asc" btnClass="btn btn-success h-100 w-100" >Trier par ordre alphabétique croissant</ButtonSort>
            <ButtonSort sortingMethod={handleSortClick} colClass="col" btnId="sort-alpha-desc" btnClass="btn btn-primary h-100 w-100" >Trier par ordre alphabétique décroissant</ButtonSort>
            <ButtonSort sortingMethod={handleSortClick} colClass="col" btnId="sort-date-asc" btnClass="btn btn-success h-100 w-100" >Trier par date de sortie croissante</ButtonSort>
            <ButtonSort sortingMethod={handleSortClick} colClass="col" btnId="sort-date-desc" btnClass="btn btn-primary h-100 w-100" >Trier par date de sortie décroissante</ButtonSort>
            <ButtonSort sortingMethod={handleSortClick} colClass="col" btnId="reset-sort" btnClass="btn btn-danger h-100 w-100" >Réinitialiser le tri</ButtonSort>
        </div>
    </header>
    </>
  );
}

function LetterSortList(props) {

  const letterArray = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

  const handleSelectLetterClick = (event) => {
      event.preventDefault();
      let letter = event.target.innerText;
      props.updateLetter(letter);
      Api.getApiGamesWithClassify( letter , props.updateDatas , props.classifyBy );
  }

  const getLettersList = () => {
      let lettersList;
      letterArray.forEach( (letter , index) => {
          //let method = handleSelectLetterClick;
          let stateClass = "";
          let emptySymbol = '...';
          if( props.selectLetter.toUpperCase() === letter.toUpperCase() ) {
              stateClass = " active";
          }
          /*let resultFind = props.alphabeticList.find(element => element.first_letter === letter.toLowerCase());
          if( resultFind === undefined ) {
              stateClass = " disabled";
              method = null;
          } else if( typeof resultFind === "object" && parseInt(resultFind.games_count , 10) === 0 ) {
              stateClass = " disabled";
              method = null;
          }
          lettersList = <>{lettersList}<li className={"page-item " + stateClass}><a className="page-link" href="#" onClick={method} >{letter}</a></li></>;*/
          let resultFind = props.alphabeticList.find(element => element.first_letter === letter.toLowerCase());
          if( typeof resultFind === "object" && parseInt(resultFind.games_count , 10) > 0 ) {
              lettersList = <>{lettersList}<li className={"page-item " + stateClass}><a className="page-link" href="#" onClick={handleSelectLetterClick} >{letter}</a></li></>;
          }/* else if( index === 0 || ( index > 0 && props.alphabeticList.find(element => element.first_letter === letterArray[index-1].toLowerCase()) !== undefined ) ) {
              lettersList = <>{lettersList}<li className={"page-item disabled"}><a className="page-link" href="#" >{emptySymbol}</a></li></>;
          }*/
      });
      return (
        <nav aria-label="Choix par lettre de l'aplabet">
            <ul className="pagination justify-content-center my-4">
                {lettersList}
            </ul>
        </nav>
      );
  }

  return (
    <header>
        <nav aria-label="Menu de lettre">
            <ul className="pagination justify-content-center my-4">
              {getLettersList()}
            </ul>
        </nav>
    </header>
  );
}

function ClassifyPage(props) {

  const { classifyType } = useParams();

  const [ alphabeticList , setAlphabeticList ] = useState( [] );

  useEffect( () => {
    Api.getApiAlphabeticListDatas(classifyType , setAlphabeticList);
  }, [] );

  const [ letter , setLetter ] = useState( "" );

  const [ datas , setDatas ] = useState( [] );

  useEffect( () => {
    Api.getApiGamesWithClassify( letter , setDatas , classifyType );
  }, [] );

  const getClassifyTitle = () => {
      if( classifyType.trim() !== "" ) {
          let title = 'Liste de jeux PC classer';
          switch(classifyType) {
              case 'categories':
                  title += ' par catégories';
              break;
              case 'studios':
                  title += ' par studios';
              break;
              case 'games':
                  title += ' par lettres';
              break;
          }
          return title;
      }
      return null;
  }

  return (
    <div className="App">
      <div className="container">
        <h2 className="text-center mt-3 mb-4 user-select-none">{getClassifyTitle()}</h2>
        <LetterSortList alphabeticList={alphabeticList} selectLetter={letter} updateLetter={setLetter} updateDatas={setDatas} classifyBy={classifyType} />
        <GameClassify datasList={datas} classifyBy={classifyType} />
      </div>
    </div>
  );
}

function HomePage(props) {

  const [ games , setGames ] = useState( [] );

  useEffect( () => {
    Api.getApiGames(1 , setGames , props.sortingOptions);
  }, [] );

  return (
    <div className="App">
      <div className="container">
        <h2 className="text-center mt-3 mb-4 user-select-none">Liste de jeux PC</h2>
        <ButtonSortList updateGames={setGames} sortingOptions={props.sortingOptions} />
        <GameList games={games} sortingOptions={props.sortingOptions} />
      </div>
    </div>
  );
}

function SinglePage(props) {
  return (
    <div className="App">
      <div className="container">
        <GameView sortingOptions={props.sortingOptions} />
      </div>
    </div>
  );
}

const App = () => {

  const [ sortingOptions , setSortingOptions ] = useState( {} );

  let contextValue = {
      sortingOptions: sortingOptions,
      updateSortingMethod: setSortingOptions
  }

  return (
      <SortingContext.Provider value={contextValue}>
          <Router>
              <Switch>
                  <Route exact path="/GameApp/gameapp/public">
                      <HomePage sortingOptions={sortingOptions} />
                  </Route>
                  <Route path="/GameApp/gameapp/public/view/:gameId">
                      <SinglePage sortingOptions={sortingOptions} />
                  </Route>
                  <Route path="/GameApp/gameapp/public/:classifyType-by-alphabetic">
                      <ClassifyPage />
                  </Route>
                  <Route path="/GameApp/gameapp/public/games-by-:classifyType">
                      <ClassifyPage />
                  </Route>
              </Switch>
          </Router>
      </SortingContext.Provider>
  );
}

export default App;
