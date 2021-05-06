import React, {Component} from 'react';
import { WeatherService } from '../services/weather.service';
import {Forecast} from '../models/models'

class ForecastCityList extends Component {

    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            forecast: []
        }
    }

    componentDidUpdate(prevProps: { id: any; }) {
        // @ts-ignore
        if (prevProps.id !== this.props.id){
            this.setState({
                forecast:[]
            })
            // @ts-ignore
            WeatherService.getCityWeatherForecast(this.props.id).then(r=>{
                this.setState({
                    forecast: r.map(m=>m.grup)
                })
            })
        }
    }

    getForecast(forecast:Forecast[]){
        return (
            <div className="card m-3" key={forecast[0].dt}>
                <div className="card-body">
                    <h5 className="card-title">{
                        WeatherService.getDayString(forecast[0].dt_txt.getDay())
                    } ({forecast[0].dt_txt.getDate()} / {forecast[0].dt_txt.getMonth()+1})</h5>
                    <div className="row">
                        <div className="col-md-3">
                            <span>Horario</span>
                            <ul className='list-group'>
                                {forecast.slice(1).map(f=>
                                    <li className='list-group-item' key={f.dt}>
                                        {`${f.dt_txt.getHours()}:00`}
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className="col-md-3">
                            <span>Temperatura</span>
                            <ul className='list-group'>
                                {forecast.slice(1).map(f=>
                                    <li className='list-group-item' key={f.dt}>{f.main.temp} C°</li>
                                )}
                            </ul>
                        </div>
                        <div className="col-md-3">
                            <span>Humedad</span>
                            <ul className='list-group'>
                                {forecast.slice(1).map(f=>
                                    <li className='list-group-item' key={f.dt}>{f.main.humidity}%</li>
                                )}
                            </ul>
                        </div>
                        <div className="col-md-3">
                            <span>Viento</span>
                            <ul className='list-group'>
                                {forecast.slice(1).map(f=>
                                    <li className='list-group-item' key={f.dt}>{f.wind.speed} m/s</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        // @ts-ignore
        const forecast: [] = this.state.forecast;
        return (
            <div className="col-md-8 p-4">
                <h4>Pronosticos de los siguientes días</h4>
                {forecast.map(f=>this.getForecast(f))}
            </div>
        );
    }
}

export default ForecastCityList;