import axios from 'axios';
import { getApiBase, HEADERS } from './helpers';

export class CRUDBaseClass {

    constructor(public model: string) {
        this.model = model
    }

    post = async(reqBody: {}) => { 
        let response;

        try {
            response = await axios.post(`${getApiBase()}/${this.model}`, reqBody, {
                headers: HEADERS
            });
            
            return response.data

        } catch(error) {
            if(response?.data === undefined || response?.data === null) {
                return {
                    data: response?.data
                }
            }    
        }
    }

    getById = async(pathParam: string) => {
        let response;

        try {
            response = await axios.get(`${getApiBase()}/${this.model}/${pathParam}`, {
                headers: HEADERS
            });

            return response.data;

        } catch(error) {
            if(response?.data === undefined || response?.data === null) {
                return {
                    data: response?.data
                }
            }    
        }
    }

    get = async(queryParam: string | number) => {
        let response;

        try {
            response = await axios.get(`${getApiBase()}/${this.model}`, {
                params: { limit: queryParam },
                headers: HEADERS
            });

            return response.data;
            
        } catch(error) {
            if(response?.data === undefined || response?.data === null) {
                return {
                    data: response?.data
                }
            }    
        }
    }

    patch = async(reqBody: { _id: string, __v?: number, [key: string]: any }) => {
        let response;

        try {
            response = await axios.patch(`${getApiBase()}/${this.model}/${reqBody._id}`, reqBody, {
                headers: HEADERS
            });

            if(response.status === 200) {
                let updatedDocument = await this.getById(reqBody._id);

                return updatedDocument;
            } 
            
        } catch(error) {
            if(response?.data === undefined || response?.data === null) {
                return {
                    data: response?.data
                }
            }    
        }
    }

    delete = async(pathParam: string) => {
        let response;

        try {
            response = await axios.get(`${getApiBase()}/${this.model}/${pathParam}`, {
                headers: HEADERS
            });

            if(response.status === 200) {
                return {
                    data: { status: response.status }
                }
            }

        } catch(error) {
            if(response?.data === undefined || response?.data === null) {
                return {
                    data: response?.data
                }
            }
        }    
    }
}