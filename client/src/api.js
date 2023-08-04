import axios from 'axios';
const messaggi = '/Messaggi';
const localhost = 'http://localhost:3000';
const thread = '/thread'


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

    static async getAllPostByUsername(id) {
        const res = await axios.get(localhost + messaggi + '/' + 'username/' + id);
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

    // 
    // Beginning of Thread's 
    // 
    static async allThreads() {
        const res = await axios.get(localhost + thread)
        return res.data;
    }

    static async fetchThreadById(id) {
        const res = await axios.get(localhost + thread + '/' + id)
        return res.data
        
    }

    static async creationThread(threadData) {
        const res = await axios.post(localhost + thread, threadData);
        return res.data;
    }

    static async addThread(threadData, id) {
        const res = await axios.post(localhost + thread +'/'+id, threadData)
        return res.data
        
    }

    


    //
    // Beginning of Login's
    //
    
    static async fetchUser(id) {
        const res = await axios.get(localhost + '/user' + '/' + id)
        console.log(localhost + '/user' + '/' + id);
        return res.data
    }

    static async Logout() {
        const res = await axios.get(localhost + '/Logout')
        return res.data;
    }

    // Comment

static async Comment(commentData) {
  try {
    const res = await axios.post(localhost + messaggi + '/comment/' + commentData.get('postId'),{ content: commentData.get('content'), creatorUsername : commentData.get('creatorUsername') });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


}