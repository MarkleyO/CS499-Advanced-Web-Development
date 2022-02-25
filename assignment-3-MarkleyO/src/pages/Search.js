import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import fetch from 'isomorphic-unfetch';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPercentage, faTint, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

const API_KEY = process.env.REACT_APP_SECRET_KEY

document.body.style = 'background-color: #33658A;'

const Searchapp = styled.div`
    font-family: "Space Grotesk", Arial, sans-serif !important;
    margin-bottom: 40px;
    margin-top: 0px;
    background-color: #33658A;
`;

const Navbar = styled.div`
    background-color: #2F4858;
    overflow: hidden;
    // position: fixed;

`;

const Title = styled.a`
    float:left;
    display: block;
    color: #F6AE2D;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
    font-family: Cardo;
    font-weight: 900;
`;

const Searchcontainer = styled.form`
    float: right;
`;

const Searcher = styled.input`
    padding: 6px;
    margin-top: 8px;
    font-size: 17px;
    border: none;
    color: gray;
`;

const Button = styled.button`
    float: right;
    padding: 6px;
    margin-top: 8px;
    margin-right: 16px;
    font-size: 17px;
    color: #33658A;
    background-color: #F6AE2D;
    border: none;
    cursor: pointer;
`;

const Header = styled.p`
    font-size: 22px;
    text-align: center;
    color: #86BBD8;
`;

const City = styled.i`
    text-transform: uppercase;
    font-size: 26px;
    color: #F6AE2D;
`;

const Cardcontainer = styled.div`
    background-color: #2F4858;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 17px;
    overflow: hidden;
    color: #86BBD8;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 10px;
    border-radius: 25px;
`;

const Cardcomponent =styled.div`
    // padding: 6px;
    flex-grow: 1;
    flex-shrink: 1;
    text-align: center;
`;

const Footer = styled.div`
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    background-color: black;
    color: white;
    font-size: 11px;
    padding-left: 16px;
    padding-top: 8px;
    padding-bottom: 8px;
`;

function Daycard(props){
    var t = new Date(props.date);

    return(
        <Cardcontainer>
            <Cardcomponent><
                Moment format="ddd MMM DD" unix>{props.date}</Moment>
            </Cardcomponent>
            <Cardcomponent>
                {props.min} / {props.max} &deg; C
            </Cardcomponent>
            <Cardcomponent>
                <FontAwesomeIcon icon={faPercentage}/>
                &nbsp;
                <FontAwesomeIcon icon={faTint}/>
                &nbsp;
                {props.rain}
            </Cardcomponent>
            <Cardcomponent>
                {props.desc}
            </Cardcomponent>
            <Cardcomponent>
                <img src={`http://openweathermap.org/img/wn/${props.ic}@2x.png`}/>
            </Cardcomponent>
        </Cardcontainer>
    );
}

function Search({ query }){
    const [ inputQuery, setInputQuery ] = useState(query || "");
    const [ forecast, setForecast ] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const controller = new AbortController();
        async function fetchCityCoordinates(){
            let geocodeResponse = {};
            let weatherResponse = {};
            try {
                const geocoded = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&appid=${API_KEY}`,
                { signal: controller.signal }
                );
                geocodeResponse = await geocoded.json();
            } catch (e){
                if (e instanceof DOMException) {
                    console.log("HTTP request aborted");
                } else {
                    console.log(e);
                }
            }
            try {
                const weather = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${geocodeResponse[0].lat}&lon=${geocodeResponse[0].lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${API_KEY}`,
                { signal: controller.signal }
                );
                weatherResponse = await weather.json();
            } catch (e){
                if (e instanceof DOMException){
                    console.log("HTTP request aborted");
                } else {
                    console.log(e);
                }
            }
            setForecast(weatherResponse.daily || []);
            console.log(forecast);
        }
        fetchCityCoordinates();

    }, [ query ]);

    return(
        <Searchapp>
            <Navbar>
                <Title>
                    <FontAwesomeIcon icon={faMoon}/>
                    &nbsp;
                    WeatherReport
                    &nbsp;
                    <FontAwesomeIcon icon={faSun}/>
                </Title>
                <Searchcontainer onSubmit={(e) => {
                    e.preventDefault();
                    history.push(`?q=${inputQuery}`);
                }}>
                    <Searcher value={inputQuery} onChange={e => setInputQuery(e.target.value)} />
                    <Button type="submit">Search</Button>
                </Searchcontainer>
            </Navbar>
            <Header>
                Reporting from &nbsp;
                <City>{query}</City>
            </Header>
            <div>
                {forecast.map((day, index) => (
                    <Daycard key={index} date={day.dt} min={day.temp.min} max={day.temp.max} rain={day.pop} desc={day.weather[0].description} ic={day.weather[0].icon} />
                ))}
            </div>
            <Footer> Created By: Owen Markley | CS 499 Advanced Web Development | Winter 2021</Footer>
        </Searchapp>
    );
}

export default Search;