//helper class to help allow the React client to talk to the Express Server
import config from '../config';

export default class Data {
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = config.apiBaseUrl + path;
        console.log('url from api in data.js', url);

        const options = {
            method,
            headers: {
            'Content-Type': 'application/json; charset=utf-8',
            },
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        //checking if auth is required
/*         if (requiresAuth) {
            //encode the credentials that were passed through
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
            //set the auth header
            //Example: Authorization: Basic am9lQHNtaXRoLmNvbTpqb2U=
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        } */

        return fetch(url, options);
    }

    async getUser(emailAddress, password) {
        const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
        if (response.status === 200) {
            return response.json().then(data => data);
        } else if (response.status === 401) {
            return null;
        } else {
            throw new Error();
        }
    }

    //get all existing users
    async getUsers() {
        const response = await this.api('/users', 'GET');
        if (response.status === 200) {
            return response.json().then(data => data);
        } else if (response.status === 401) {
            return null;
        } else {
            throw new Error();
        }
    } 

    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        console.log('Response from createUser in Data.js: ', response);
        if (response.status === 201) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => {
                console.log('Error from Data.js: ', data);
                return data;
            });
        } else {
            throw new Error();
        }
    }    
}