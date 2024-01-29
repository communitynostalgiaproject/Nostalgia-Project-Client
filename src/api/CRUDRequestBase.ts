import axios from 'axios';
import { getApiBase } from './helpers';

export class CRUDRequestBase {

    constructor(public model: string) {
        this.model = model
    }

    post = async(reqBody: {}, headers?: {}) => { 
        let response = await axios.post(`${getApiBase()}/${this.model}`, reqBody, {
            headers: headers,
            withCredentials: true
        });

        return response.data
    }

    getById = async(objectId: string, headers?: {}) => {
        let response = await axios.get(`${getApiBase()}/${this.model}/${objectId}`, {
            withCredentials: true
        });

        return response.data;
    }

    get = async(queryParams?: {}, headers?: {}) => {
            let response = await axios.get(`${getApiBase()}/${this.model}`, {
                params: queryParams,
                withCredentials: true
            });

            return response.data;
    }

    patch = async(reqBody: { _id: string, __v?: number, [key: string]: any }, headers?: {}) => {
        let response = await axios.patch(`${getApiBase()}/${this.model}/${reqBody._id}`, reqBody, {
            withCredentials: true
        });

        if(response.status === 200) {
            let updatedDocument = await this.getById(reqBody._id);

            return updatedDocument;
        } 
    }

    delete = async(objectId: string, headers?: {}) => { 
        let response = await this.getById(objectId);

        await axios.delete(`${getApiBase()}/${this.model}/${objectId}`, {
            withCredentials: true
        });

        return response.data
    }
}