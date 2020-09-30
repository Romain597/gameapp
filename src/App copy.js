import React , { useState, useEffect } from 'react';
import GameList from './Components/GameList';
import GameView from './Components/GameView';
import GameClassify from './Components/GameClassify';
import Api from './Api'
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

  const [ sortingOptions , setSortingOptions ] = useState( props.sortingOptions );

  useEffect( () => {
    Api.getApiGames(1 , props.updateGames , sortingOptions);
  }, [sortingOptions] );

  const handleSortClick = (event) => {
    let prevSortingOptions = {};
    if( sortingOptions.hasOwnProperty('classifyField') === true ) {
        prevSortingOptions = { classifyField: sortingOptions.classifyField }
    }
    switch(event.target.id) {
      case "sort-alpha-asc":
        setSortingOptions({ orderField: "name", orderBy: "asc", ...prevSortingOptions });
      break;
      case "sort-alpha-desc":
        setSortingOptions({ orderField: "name", orderBy: "desc", ...prevSortingOptions });
      break;
      case "sort-date-asc":
        setSortingOptions({ orderField: "released", orderBy: "asc", ...prevSortingOptions });
      break;
      case "sort-date-desc":
        setSortingOptions({ orderField: "released", orderBy: "desc", ...prevSortingOptions });
      break;
      case "reset-sort":
        setSortingOptions({ ...prevSortingOptions });
      break;
      default:
        setSortingOptions({ ...prevSortingOptions });
    }
  }

  const handleClassifyClick = (event) => {
      let targetId = event.target.id;
      let select;
      let choice;
      let selectedValue;
      let newSortingOptions = sortingOptions;
      let redirectValue = "";
      //console.log(newSortingOptions);
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
      //console.log(selectedValue);
      //console.log(newSortingOptions);
      if( selectedValue !== null && selectedValue !== "" ) {
          setSortingOptions(newSortingOptions);
          Api.getApiGames(1 , props.updateGames , newSortingOptions);
          // remove focus
          document.getElementById(targetId).blur();
      }
      else {
          // redirect path to ClassifyPage
          setRedirectPath("/GameApp/gameapp/public/list-by/" + redirectValue);
      }
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

  const getLetterList = () => {
      return (
        <nav aria-label="Menu de lettre">
            <ul class="pagination justify-content-center my-4">
                <li class="page-item active"><a class="page-link" href="#">A</a></li>
                <li class="page-item"><a class="page-link" href="#">B</a></li>
                <li class="page-item disabled"><a class="page-link" href="#">C</a></li>
            </ul>
        </nav>
      );
  }

  return (
    <header>
        <nav aria-label="Menu de lettre">
            <ul class="pagination justify-content-center my-4">
              {getLetterList()}
            </ul>
        </nav>
    </header>
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

function ClassifyPage(props) {

  const { classifyType } = useParams();

  const [ games , setGames ] = useState( [] );

  useEffect( () => {
    //Api.getApiGamesWithClassify("a" , setGames , classifyType);
  }, [] );

  const getClassifyTitle = () => {
      if( classifyType.trim() !== "" ) {
          let title = 'Liste de jeux PC classer par studios ou catégories';
          if( classifyType === "studios" ) {
              title = 'Liste de jeux PC classer par studios';
          } else if( classifyType === "categories" ) {
              title = 'Liste de jeux PC classer par catégories';
          }
          return (<h2>{title}</h2>);
      }
      return null;
  }

  return (
    <div className="App">
      <div className="container">
        <h2 className="text-center mt-3 mb-4 user-select-none">{getClassifyTitle()}</h2>
        <LetterSortList updateGames={setGames} classifyBy={classifyType} />
        <GameClassify games={games} classifyBy={classifyType} />
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

  let sortingOptions = {};

  return (
      <Router>
          <Switch>
              <Route exact path="/GameApp/gameapp/public">
                  <HomePage sortingOptions={sortingOptions} />
              </Route>
              <Route path="/GameApp/gameapp/public/view/:gameId">
                  <SinglePage sortingOptions={sortingOptions} />
              </Route>
              <Route path="/GameApp/gameapp/public/list-by/:classifyType">
                  <ClassifyPage />
              </Route>
          </Switch>
      </Router>
  );
}

/*
<Redirect
            to={{
              pathname: "/GameApp/gameapp/public/list-by/",
              state: { from: location }
            }}
          />
*/

export default App;
