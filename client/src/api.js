import axios from 'axios';
const messaggi = '/Messaggi';
const localhost = 'http://localhost:3000';
const thread  = '/thread'

export default class API {
    //tutto il feed di messaggi

    // Non capisco perchè il proxy non viene preso come default e poi aggiunto questo url
    // Scrivendo normale funziona, mentre se dovessi concatenare delle stringhe allora non funziona più
    static async getAllPost() {
        const res = await axios.get(localhost+messaggi);
        return res.data;
    }
    
    //tutto il feed di messaggi in base ad un'id
    static async getAllPostById(id) {
        const res = await axios.get(localhost + messaggi + '/' + id);
        return res.data;
    }

    //creazione di nuovi messaggi
    static async addPost(post) {
        const res = await axios.post(localhost+messaggi,post);
        return res.data;
    }

    //update di  messaggi
    static async updatePost(id,post) {
        const res = await axios.patch(localhost + messaggi + '/' + id,post);
        return res.data;
    }

    //Cancellazione di post 
    static async deletePost(id) {
        const res = await axios.delete(localhost + messaggi + '/' + id);
        return res.data;
    }

    static async allThreads() {
        const res = await axios.get(localhost + thread)
        return res.data;
    }

    static async fetchThreadById(id) {
        const res = await axios.get(localhost + thread + '/' + id)
        return res.data
        
    }
}