import { City } from "../models/models";

export class CitiesService {
    static prefix = 'https://openweathermap.org/data/2.5';

    static async getCityList(name: string): Promise<City[]> {
        try{
            const response = await fetch(`${this.prefix}/find?q=${name}&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric&lang=sp`);
            const responseJson = await response.json();
            return responseJson.list.map((city: any) =>city as City);
        }catch (e){
            return [];
        }
    }
}