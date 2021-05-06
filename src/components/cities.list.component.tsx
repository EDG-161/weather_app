import React, {Component} from 'react';
import CurrentCityWeather from './current.city.weather';
import { CitiesService } from '../services/cities.service';

class CitiesListComponent extends Component {

    constructor(props:{}) {
        super(props);
        this.state = {
            cities_list: [],
            pre_cities_ids: [
                3435910,
                3688689,
                3530597,
                3117735,
                3936456
            ]
        }
        this.handleChange = this.handleChange.bind(this);
        this.loadCities = this.loadCities.bind(this);
    }

    handleChange(event:any) {
        this.setState({value: event.target.value});
    }

    loadCities(){
        // @ts-ignore
        CitiesService.getCityList(this.state.value).then(r=>{
            this.setState({
                cities_list: r.map(city=>city.id)
            })
        })
    }


    render() {
        // @ts-ignore
        const cities_list: number[] = this.state.cities_list;
        // @ts-ignore
        const pre_cities_ids: number[] = this.state.pre_cities_ids;
        // @ts-ignore
        const value = this.state.value;



        return (
            <div className="col-md-4 p-3" style={{maxHeight:'600px', overflowY:'scroll'}}>
                <div className="form-group d-flex p-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder='Buscar ciudad'
                        value={value}
                        onChange={this.handleChange}
                    />

                    <button
                        className = 'btn btn-default'
                        onClick={this.loadCities} >
                        Buscar
                    </button>
                </div>
                {
                    cities_list.length>0?
                        <div>
                            <button
                                className='btn btn-info'
                                onClick={()=>{
                                    this.setState({
                                        cities_list:[]
                                    })
                                }}
                            >
                                Atras
                            </button>
                            {cities_list.map(
                                id =>
                                    <div
                                        onClick={()=>{
                                            // @ts-ignore
                                            this.props.select(id)
                                        }}
                                        key={id}
                                    >
                                        <CurrentCityWeather
                                            // @ts-ignore
                                            id={id}
                                        />
                                    </div>
                            )}
                        </div>:
                        pre_cities_ids.map(
                            id =>
                                <div
                                    onClick={()=>{
                                        // @ts-ignore
                                        this.props.select(id)
                                    }}
                                    key={id}
                                >
                                    <CurrentCityWeather
                                        // @ts-ignore
                                        id={id}
                                    />
                                </div>
                        )
                }
            </div>
        );
    }
}

export default CitiesListComponent;