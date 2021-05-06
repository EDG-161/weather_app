import React, {Component} from 'react';
import { WeatherService } from '../services/weather.service';
import {Weather} from  '../models/models'

class CurrentCityWeather extends Component {

    constructor(props: {}) {
        super(props);
        this.state = {
            weather: {}
        }
    }

    componentDidMount() {
        this.updateCity();
    }

    updateCity() {
        // @ts-ignore
        WeatherService.getCityWeather(this.props.id).then(r=>{
            this.setState({
                weather : r,
            });
        })
    }


    render() {
        // @ts-ignore
        const weather: Weather = this.state.weather;
        return (
            <div className="card m-3" >
                <div className="card-body">
                    <h5 className="card-title">{weather.name} <small>{weather.sys?.country}</small></h5>
                    <h3 className="card-title">
                        {weather.main?.temp} C°

                    </h3>
                    <h3 className="card-title">
                        <small>min. {weather.main?.temp_min} C°</small>
                        &nbsp;
                        <small>max. {weather.main?.temp_max} C°</small>
                    </h3>
                    <h6 className="card-subtitle mb-2 text-muted">Sensacón de {weather.main?.feels_like} C°</h6>
                    <h6 className="card-subtitle mb-2 text-muted">{weather.weather?weather.weather[0]?.description:''}</h6>
                    <p className="card-text">
                        Viento {weather.wind?.speed} m/s<br/>
                        Humedad {weather.main?.humidity}%
                    </p>
                </div>
            </div>
        );
    }
}

export default CurrentCityWeather;