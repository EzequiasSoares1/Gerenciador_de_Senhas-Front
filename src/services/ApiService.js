import axios from "axios";
import StorageService from './StorageService';

export const LOGGER_USER = 'loggedUser';
export const TOKEN = 'token';


const httpClient =  axios.create({
    baseURL:"http://localhost:8080/api",
    withCredentials: true,
});

export default class ApiService{

    constructor(endpoint){
        this.endpoint = endpoint;
        this.storageService = new StorageService();
        const token = this.storageService.getItem(TOKEN);
        this.registerToken(token);
    }

    registerToken(token){
        if(token){
            httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }        
    }
    post(url, params){
        url = this.biuldUrl(url);
        return httpClient.post(url,params);
    }
    put(url, params){
        url = this.biuldUrl(url);
        return httpClient.put(url,params);
    }
    delete(url){
        url = this.biuldUrl(url);
        return httpClient.delete(url);
    }
    get(url){
        url = this.biuldUrl(url);
        return httpClient.get(url);
    }
    biuldUrl(url){
        return `${this.endpoint}${url}`;
    }
}