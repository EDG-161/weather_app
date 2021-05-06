import {Forecast, Weather } from "../models/models";

export class WeatherService {
    static prefix = 'https://openweathermap.org/data/2.5';
    static api_key = '439d4b804bc8187953eb36d2a8c26a02';
    
    static getDayString(i: number){
        switch (i){
            case 1:
                return 'Lunes';
            case 2:
                return 'Martes';
            case 3:
                return 'Miércoles';
            case 4:
                return 'Jueves';
            case 5:
                return 'Viernes';
            case 6:
                return 'Sábado';
            case 0:
                return 'Domingo';
        }
    }

    static async getCityWeather(id: number): Promise<Weather> {
        try {
            const response = await fetch(`${this.prefix}/weather?id=${id}&appid=${this.api_key}&units=metric&lang=es`);
            const responseJson = await response.json();
            return responseJson as Weather;
        } catch (e) {
            return {
                cod: 500
            } as Weather;
        }
    }

    static async getCityWeatherForecast(id: number): Promise<Forecast[]> {
        try {
            const response = await fetch(`${this.prefix}/forecast?id=${id}&appid=${this.api_key}&units=metric&lang=es`);
            const responseJson = await response.json();
            const list: Forecast[] =responseJson.list
                .map((forecast: any)=>{
                    forecast.dt_txt = new Date(forecast.dt_txt);
                    return forecast as Forecast;
                })
                .filter((f:Forecast) =>
                    f.dt_txt.getHours() === 18 ||
                    f.dt_txt.getHours() === 6 ||
                    f.dt_txt.getHours() === 12
                );
            const reduced = list.reduce((pv:Forecast[],cv: Forecast)=>{
                const existing = pv.filter(v=>v.dt_txt.getDate()===cv.dt_txt.getDate());
                if (existing.length>0){
                    const first = existing[0]
                    first.grup.push(cv)
                    return [...pv.filter(v=>v.dt_txt.getDate()!==cv.dt_txt.getDate()),first]
                }else{
                    if (!cv.grup){
                        cv.grup = [cv];
                    }
                    cv.grup.push(cv)
                    return [...pv,cv];
                }
            },[]);
            return reduced;
        } catch (e) {
            return [];
        }
    }
}