import ApiService from "./ApiService";

export default class DataApiService extends ApiService{
    constructor(){
        super('/data')
    }

    create(object){
        return this.post('',object);
    }
    update(id,object){
        return this.put(id,object);
    }
    delete(id){
        return super.delete(`/${id}`);
    }
    find(id){
        return this.get(`?id=${id}`);
    }
    

}