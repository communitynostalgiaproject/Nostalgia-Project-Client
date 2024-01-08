import axios from 'axios';
import { getApiBase, HEADERS } from './helpers';

export class CRUDBaseClass {

    constructor(public model: string) {
        this.model = model
    }

    post = async(reqBody: {}) => { 
        try {
            let response = await axios.post(`${getApiBase()}/${this.model}`, reqBody, {
                headers: HEADERS
            });
            return response.data

        } catch(error) {
            return error
        }
    }

    getById = async(pathParam: string) => {
        try {
            let response = await axios.get(`${getApiBase()}/${this.model}/${pathParam}`, {
                headers: HEADERS
            });
            return response.data;

        } catch(error) {
            return error
        }
    }

    get = async(queryParam: string | number) => {
        try {
            let response = await axios.get(`${getApiBase()}/${this.model}`, {
                params: { limit: queryParam },
                headers: HEADERS
            });
            return response.data;
            
        } catch(error) {
            return error
        }
    }

    patch = async(reqBody: { _id: string, __v?: number, [key: string]: any }) => {
        try {
            let response = await axios.patch(`${getApiBase()}/${this.model}/${reqBody._id}`, reqBody, {
                headers: HEADERS
            });

            if(response.status === 200) {
                let updatedDocument = await this.getById(reqBody._id);

                return updatedDocument;
            } 
            
        } catch(error) {
            return error
        }
    }

    delete = async(pathParam: string) => { 
        try {
            let response = await axios.get(`${getApiBase()}/${this.model}/${pathParam}`, {
                headers: HEADERS
            });

            let deletedDocument = await axios.delete(`${getApiBase()}/${this.model}/${pathParam}`, {
                headers: HEADERS
            });

            return {
                data: { 
                    doc_deletion: response.data, 
                    status: deletedDocument.status,
                }
            }

        } catch(error) {
            return error
        }    
    }
}