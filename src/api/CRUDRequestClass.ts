import axios from 'axios';
import { getApiBase, HEADERS } from './helpers';

export class CRUDBaseClass {

    constructor(public model: string) {
        this.model = model
    }

    post = async(reqBody: {}) => { 
        let response = await axios.post(`${getApiBase()}/${this.model}`, reqBody, {
            headers: HEADERS,
            withCredentials: true
        });

        return response.data
    }

    getById = async(objectId: string) => {
        let response = await axios.get(`${getApiBase()}/${this.model}/${objectId}`, {
            headers: HEADERS,
            withCredentials: true
        });

        return response.data;
    }

    get = async(queryParams: {}) => {
            let response = await axios.get(`${getApiBase()}/${this.model}`, {
                params: queryParams,
                headers: HEADERS,
                withCredentials: true
            });

            return response.data;
    }

    patch = async(reqBody: { _id: string, __v?: number, [key: string]: any }) => {
        let response = await axios.patch(`${getApiBase()}/${this.model}/${reqBody._id}`, reqBody, {
            headers: HEADERS,
            withCredentials: true
        });

        if(response.status === 200) {
            let updatedDocument = await this.getById(reqBody._id);

            return updatedDocument;
        } 
    }

    delete = async(objectId: string) => { 
        let response = await axios.get(`${getApiBase()}/${this.model}/${objectId}`, {
            headers: HEADERS,
            withCredentials: true
        });

        let deletedDocument = await axios.delete(`${getApiBase()}/${this.model}/${objectId}`, {
            headers: HEADERS,
            withCredentials: true
        });

        return {
            data: { 
                doc_deletion: response.data, 
                status: deletedDocument.status,
            }
        }
    }
}