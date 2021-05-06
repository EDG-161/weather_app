import React from 'react';
import CitiesListComponent from './components/cities.list.component';
import ForecastCityList from './components/forecast.city.list';
class App extends React.Component{

    constructor(props:{}) {
        super(props);
        this.state = {
            active_city:0
        }
    }


    render(){
        return (
            <div className="">
                <header className="App-header">
                    <h1>Reto Climas</h1>
                </header>
                <div className="row">
                    <CitiesListComponent
                        // @ts-ignore
                        select={(id)=>{
                            this.setState({
                                active_city: id,
                            })
                        }}
                    />
                    <ForecastCityList
                        // @ts-ignore
                        id = {this.state.active_city}    
                    />
                </div>
            </div>
        );
    }
}

export default App;
