import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  NavLink,
  Redirect,
  useParams,
  useRouteMatch,
  useLocation
} from 'react-router-dom';

import './App.css';
import peopleList from './data/people.json';
import planetList from './data/planets.json';
import filmList from './data/films.json';

class App extends React.Component {
  render () {
    return (
      <div>
        <Navbar/>
        <div>
          {/* <h1>
            A long time ago, in a galaxy far, far away...
          </h1> */}
        </div>
      </div>
    )
  }
}

class Navbar extends React.Component {
  render() {
    return (
      <Router>
        <div>

          <nav>
            <ul>
              <li><Link to="/">Star Wars</Link></li>
              <li><Link to="/people">People</Link></li>
              <li><Link to="/planet">Planets</Link></li>
              <li><Link to="/films">Films</Link></li>
            </ul>
          </nav>

          <Switch>
            <Route path="/people">
              <People />
            </Route>
            <Route path="/planet">
              <Planet />
            </Route>
            <Route path="/films">
              <Films />
            </Route>
            <Route path="/">
              <StarWars />
            </Route>
          </Switch>

        </div>
      </Router>
    )
  }
}

class StarWars extends React.Component {
  render() {
    return <h1> Welcome to the Official Star Wars Website!</h1>
  }
}

class People extends React.Component {
  constructor() {
    super();
  }

  render() {
    const names = []
    for (var i in peopleList){
      names.push(peopleList[i]['name']);
    }
    
    return (
      <Router>
        <div>
          <h1>People</h1>
          <ul>
            {
              names.map((person, index) => (
                <li><Link key={person} to={'/people/' + index}>{person}</Link></li>
              ))
            }
          </ul>
        </div>

        <Switch>
          <Route path="/people/:index">
            <SinglePerson />
          </Route>
        </Switch>

      </Router>
    );
  }
}

class Planet extends React.Component {
  constructor() {
    super();
  }

  render() {
    const names = []
    for (var i in planetList){
      names.push(planetList[i]['name']);
    }
    
    return (
      <Router>
        <div>
          <h1>Planet</h1>
          <ul>
            {
              names.map((person, index) => (
                <li><Link key={person} to={'/planet/' + index}>{person}</Link></li>
              ))
            }
          </ul>
        </div>

        <Switch>
          <Route path="/planet/:index">
            <SinglePlanet />
          </Route>
        </Switch>

      </Router>
    );
  }
}

class Films extends React.Component {
  constructor() {
    super();
  }

  render() {
    const names = []
    for (var i in filmList){
      names.push(filmList[i]['title']);
    }
    
    return (
      <Router>
        <div>
          <h1>Films</h1>
          <ul>
            {
              names.map((person, index) => (
                <li><Link key={person} to={'/films/' + index}>{person}</Link></li>
              ))
            }
          </ul>
        </div>
        
        <Switch>
          <Route path="/films/:index">
            <SingleFilm />
          </Route>
        </Switch>

      </Router>
    );
  }
}

function SingleFilm() {
  const location = useLocation();
  const path = location.pathname;
  const selectedIndex = parseInt(path.split("/")[2]);
  const selectedJson = filmList[selectedIndex + 1];
  console.log(selectedJson);
  return (
    <div>
      <h5>Title: {selectedJson['title']}</h5>
      <h5>Episode ID: {selectedJson['episode_id']}</h5>
      <h5>Opening Crawl: {selectedJson['opening_crawl']}</h5>
      <h5>Director: {selectedJson['director']}</h5>
      <h5>Producer: {selectedJson['producer']}</h5>
      <h5>Release Date: {selectedJson['release_date']}</h5>
      <h5>Characters: {selectedJson['characters']}</h5>
      <h5>Planets: {selectedJson['planets']}</h5>
      <h5>URL: {selectedJson['url']}</h5>
    </div>
  );
}

function SinglePlanet() {
  const location = useLocation();
  const path = location.pathname;
  const selectedIndex = parseInt(path.split("/")[2]);
  const selectedJson = planetList[selectedIndex + 1];
  console.log(selectedJson);
  return (
    <div>
      <h5>Name: {selectedJson['name']}</h5>
      <h5>Rotation Period: {selectedJson['rotation_period']}</h5>
      <h5>Orbital Period: {selectedJson['orbital_period']}</h5>
      <h5>Diameter: {selectedJson['diameter']}</h5>
      <h5>Climate: {selectedJson['climate']}</h5>
      <h5>Gravity: {selectedJson['gravity']}</h5>
      <h5>Terrain: {selectedJson['terrain']}</h5>
      <h5>Surface Water: {selectedJson['surface_water']}</h5>
      <h5>Population: {selectedJson['population']}</h5>
      <h5>Residents: {selectedJson['residents']}</h5>
      <h5>Films: {selectedJson['films']}</h5>
      <h5>URL: {selectedJson['url']}</h5>
    </div>
  );
}

function SinglePerson() {
  const location = useLocation();
  const path = location.pathname;
  const selectedIndex = parseInt(path.split("/")[2]);
  const selectedJson = peopleList[selectedIndex + 1];
  console.log(selectedJson);
  return (
    <div>
      <h5>Name: {selectedJson['name']}</h5>
      <h5>Height: {selectedJson['height']}</h5>
      <h5>Mass: {selectedJson['mass']}</h5>
      <h5>Hair Color: {selectedJson['hair_color']}</h5>
      <h5>Skin Color: {selectedJson['skin_color']}</h5>
      <h5>Eye Color: {selectedJson['eye_color']}</h5>
      <h5>Birth Year: {selectedJson['birth_year']}</h5>
      <h5>Gender: {selectedJson['gender']}</h5>
      <h5>Homeworld: {selectedJson['homeworld']}</h5>
      <h5>Films: {selectedJson['films']}</h5>
      <h5>URL: {selectedJson['url']}</h5>
    </div>
  );
}


export default App;
