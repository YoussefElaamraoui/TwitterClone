import axios from 'axios';
import qs from 'qs';

const url = '/Registrazione'; // Update the URL to the correct path
const localhost = 'http://localhost:3000';

export default class Utenti {
    static async addUser(user) {
        const formData = qs.stringify(user);
        console.log("Ecco cosa contiene user");
        for (let pair of user.entries()) {
            console.log(pair[0], pair[1]);
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await axios.post(localhost + url, formData, config);
        return res.data;
    }
}
