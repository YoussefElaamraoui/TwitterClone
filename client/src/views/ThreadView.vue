<template>
  <nav>
    <router-link style="font-family:'Damion';font-size:30px" to="/"><span style="color:#EF3E36;">T</span>wi<span
        style="color:#EF3E36;">tt</span>o</router-link>
  </nav>
  <div class="home">

    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <p v-for="post in posts" :key="post._id">
        <img  :src="require('../assets/'+post.image)">
      <router-link :to="'/thread/' + post._id">{{ post._id }}</router-link>
    </p> -->
    <div id="container">
      <div>
        <p id="page__title">Thread
          <button id="sidebarButton" @click="openSidebar">
            <img style="width:25px;height:25px; cursor :pointer" src="../assets/download.png">
          </button>
        </p>
      </div>
      <br>
      <!-- Metto come key il title cosi da non avere problemi con i commenti -->
      <div class="post" v-for="postFeed in paginatedData" :key="postFeed._id">

        <div class="post__content">

          <div v-if="postFeed.content" class="post__content">
            <div class="post__container__image">
              <p class="post__title">{{ postFeed.title }}
              <p style="font-size: 12px;"><span style="color:#EF3E36;">category: </span> <span
                  style="font-style: lowercase;">{{ postFeed.category }}</span></p>
              <br>
              </p>


              <!-- showing image only if it was given by the user -->
              <img v-if="postFeed.image" class="post__image" :src="require('../assets/' + postFeed.image)">

            </div>
            <p class="post__text">


              {{ postFeed.content }}
              <br>
              <br>
              <button class="buttonComment" @click="toggleCommentForm">commenta</button>


              <!-- Form commento  -->
            <div v-if="showCommento" class="form-popup">
              <br>
              <br>
              <br>
              <form enctype="application/x-www-form-urlencoded" @submit.prevent="submitFormComment(postFeed._id)">

                <label class="form__label" for="content">Testo</label>
                <br>
                <br>
                <input v-model="comment.content" style="border: 2px solid black;width:35%" type="text" required>
                <br>
                <br>

                <button type="submit">Save</button>
                <button type="reset">Reset</button>
              </form>
            </div>

            </p>
          </div>

          <div v-else class="comment__user"
            style="padding:15px;border-radius:10px ;margin-top:15px;background-color:#f8f8f8">
            <div>
              <br>
              <div class="comment__text">
                {{ postFeed.comment }}
              </div>
              <div class="comment__date">
                <p style="color: #EF3E36;">{{ postFeed.creator }}</p>
                <br>

                {{ postFeed.created }}
              </div>
            </div>
          </div>
        </div>

        <div id="sidebar" :class="{ active: showSidebar }">
          <div id="sidebar__username">
            <div style="width: 100%;">Menu</div>
            <button id="sidebar__button" style="text-decoration:none" @click="openSidebar">X</button>
          </div>
          <div id="sidebar__content">
            <br>
            <p id="title__username" v-if="userData" style="color: white;">Ciao, {{ userData.id }}!</p>
            <button style="padding:0px;  text-decoration:none;  font-size: .7em; color: #EF3E36;" @click="logOut()">Log
              out</button>
          </div>

          <!-- Pop-up form Post -->
          <div v-if="showForm" class="form-popup">
            <br>
            <br>
            <p class="sidebar__title">Aggiungi Post</p>
            <br>
            <form enctype="application/x-www-form-urlencoded" @submit.prevent="submitFormPost">
              <label class="form__label" for="title">Title</label>
              <br>
              <input v-model="post.title" type="text" required>
              <br>

              <label class="form__label" for="category">Category</label>
              <br>
              <input v-model="post.category" type="text" required>
              <br>

              <label class="form__label" for="content">Content</label>
              <br>
              <textarea v-model="post.content" required></textarea>
              <br>


              <label class="form__label" for="image">Immagine</label>
              <br>
              <input @change="handleImageUpload" type="file" accept="image/*">
              <br>


              <button type="submit">Save</button>
              <button type="reset">Reset</button>
              <br><br><br>
              <p v-if="!allowed"> Non sei il proprietario del thread</p>
            </form>
          </div>


          <!-- Pop-up form Thread-->



          <!-- <div v-else>
          <div>
              Non ci sono commenti
          </div>
        </div> -->
        </div>
      </div>
      <div>
        <button @click="goToPage(1)" :disabled="currentPage === 1">First</button>
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
        <button @click="goToPage(totalPages)" :disabled="currentPage === totalPages">Last</button>
      </div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import API from '../api';

import { watchEffect, computed } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import jwtDecode from 'jwt-decode';


const url = 'http://localhost:3000/';

export default {
  name: 'HomeView',
  data() {
    return {
      posts: [],
      showSidebar: false,
      showForm: true,
      threads: [],
      postUser: [],
      showCommento: false,
      comment: {
        postId: '',
        content: '',
      },
      allowed: true,
      post: {
        title: '',
        category: '',
        content: '',
        creator: '',
        image: '',
        username: '',
      },
      currentPage: 1,
      perPage: 5,
      userDecoded: null,
      nSubmit: 0,
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
    accessToken() {
      return this.$store.state.accessToken;
    },
    userData() {
      if (this.isAuthenticated && this.accessToken) {
        return this.userDecoded;
      } else {
        return null;
      }
    },
    paginatedPosts() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.posts.slice(startIndex, endIndex);
    },
    paginatedComments() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      const paginatedComments = [];
      for (const post of this.posts) {
        if (post.comments && post.comments.length > 0) {
          paginatedComments.push(...post.comments.slice(startIndex, endIndex));
        }
      }
      return paginatedComments;
    },
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      const paginatedData = [];

      let postIndex = 0;
      let commentIndex = 0;
      let totalItemsAdded = 0; // Track the total number of items added

      while (totalItemsAdded < endIndex) {
        if (postIndex >= this.posts.length) break;

        paginatedData.push(this.posts[postIndex]);

        if (this.posts[postIndex].comments && this.posts[postIndex].comments.length > 0) {
          const commentEndIndex = Math.min(endIndex - totalItemsAdded - 1, this.posts[postIndex].comments.length);
          console.log("comment end index", commentEndIndex);
          paginatedData.push(...this.posts[postIndex].comments.slice(commentIndex, commentIndex + commentEndIndex));
          commentIndex += commentEndIndex;
          totalItemsAdded += commentEndIndex;
        }

        postIndex++;

        // Resetto il numero di commentIndex per  i successivi post
        if (postIndex < this.posts.length && this.posts[postIndex].comments && this.posts[postIndex].comments.length > 0) {
          commentIndex = 0;
        }

        totalItemsAdded++;
      }

      return paginatedData.slice(startIndex, endIndex); // Limit the data to the current page
    },


    totalPages() {
      const totalPosts = this.posts.length;
      let totalComments = 0;
      for (const post of this.posts) {
        if (post.comments && Array.isArray(post.comments)) {
          totalComments += post.comments.length;
        }
      }
      const totalItems = totalPosts + totalComments;
      return Math.ceil(totalItems / this.perPage);
    },
  },
  methods: {

    getPaginatedData(startIndex, endIndex) {
      const paginatedData = [];
      const totalItems = this.getTotalItemCount();

      for (let i = startIndex; i < endIndex && i < totalItems; i++) {
        if (i < (this.posts.length + this.post.commenst.length)) {
          paginatedData.push(this.posts[i]);
        } else {
          const commentIndex = i - this.posts.length;
          const postIndex = Math.floor(commentIndex / this.commentsPerPage);
          const commentInnerIndex = commentIndex % this.commentsPerPage;

          if (
            postIndex < this.posts.length &&
            this.posts[postIndex].comments &&
            this.posts[postIndex].comments.length > commentInnerIndex
          ) {
            paginatedData.push(this.posts[postIndex].comments[commentInnerIndex]);
          }
        }
      }

      return paginatedData;
    },
    getTotalItemCount() {
      const postCount = this.posts.length;
      const commentCount = this.posts.reduce((total, post) => total + (post.comments ? post.comments.length : 0), 0);
      return postCount + commentCount;
    },
    async updateData() {
      try {
        // Clear the postUser array
        this.postUser = [];

        const arrayPosts = await API.fetchThreadById(this.$route.params.id);

        this.postUser.push(arrayPosts.originalMessage);

        arrayPosts.otherMessages.forEach((element) => {
          this.postUser.push(element);
        });

        const fetchPostsAsync = async () => {
          const updatedPostUser = [];
          for (const element of this.postUser) {
            const valuePostFetched = await API.getAllPostById(element);
            updatedPostUser.push(valuePostFetched);
          }
          this.postUser = updatedPostUser;
        };

        // Call the async function to fetch posts
        await fetchPostsAsync();
      } catch (error) {
        console.error(error);
      }
    },

    async goToPage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;
        this.updateData();
      }
    },
    async fetchData() {
      try {
        const arrayPosts = await API.fetchThreadById(this.$route.params.id);

        // Find the index of the original message in this.posts array
        const originalMessageIndex = this.posts.findIndex((post) => post._id === arrayPosts.originalMessage._id);

        if (originalMessageIndex !== -1) {
          // Update the original message in this.posts array
          this.posts.splice(originalMessageIndex, 1, arrayPosts.originalMessage);
        }

        // Add new comments to this.posts array
        for (const comment of arrayPosts.otherMessages) {
          const commentIndex = this.posts.findIndex((post) => post._id === comment._id);
          if (commentIndex !== -1) {
            this.posts.splice(commentIndex, 1, comment);
          } else {
            this.posts.push(comment);
          }
        }
        // Now the this.posts array contains all posts and comments in the desired order.
        this.currentPage = 1; // Reset to the first page after fetching new data.
      } catch (error) {
        console.error(error);
      }
    },

    async submitFormComment(id) {
      try {
        this.comment.postId = id;
        const formData = new FormData();
        formData.append('content', this.comment.content);
        formData.append('postId', this.comment.postId);
        formData.append('creatorUsername', this.userDecoded.id);

        const response = await API.Comment(formData);
        console.log('Comment added successfully:', response.comments);

        // Find the index of the post in this.posts array
        const postIndex = this.posts.findIndex((post) => post._id === id);

        if (postIndex !== -1) {
          // Push the new comment object into the comments array of the corresponding post
          this.posts[postIndex].comments.push(response.comments[response.length - 1]);
          // Increment nSubmit for the next comment
          this.nSubmit = response.length;
          console.log("il numero di commenti gia presenti ", this.nSubmit);
        }

        // Hide the comment form after submitting
        this.showCommento = false;
        console.log(this.posts);
      } catch (error) {
        console.error('Error while adding comment:', error);
      }
    },






    async toggleCommentForm() {
      this.showCommento = !this.showCommento;
    },

    async openSidebar() {
      this.showSidebar = !this.showSidebar;
    },
    async logOut() {
      localStorage.removeItem('access_token');
      this.userDecoded = null;
      this.accessToken = null;
      this.$router.push('/login');
    },

    handleImageUpload(event) {
      const file = event.target.files[0];
      this.post.image = file; // Store the file in the "post" data property
    },

    async submitFormPost() {
      try {
        const user = this.userData;

        if (!user) {
          console.log("utente non ha valori")
          return;
        }

        const userData = await API.fetchUser(user.id);

        this.post.creator = userData._id;
        this.post.username = userData.username;

        //prima di provare a creare il post, vediamo se il thread è dell'utente loggato

        const threadUsername = await API.fetchThreadById(this.$route.params.id)

        console.log("chi è il proprietario del thread", threadUsername.creatorName)

        if (threadUsername.creatorName != this.post.username) {
          this.allowed = false;
          console.log("non ti è permesso fare questa modifica, non sei il proprietario")
          return;
        }



        try {
          const formData = new FormData();
          formData.append('title', this.post.title);
          formData.append('creator', this.post.creator);
          formData.append('category', this.post.category);
          formData.append('content', this.post.content);
          formData.append('image', this.post.image);
          formData.append('creatorName', this.post.username);
          formData.append('idThread', this.$route.params.id);

          const responsePost = await API.addPost(formData);


          console.log("il post creato ha queste caratteristiche", responsePost);
          const postId = responsePost.postId;



          //I need the id of the post, after beign created

          const response = await API.addThread(
            {
              // Your other threadData properties here
              title: this.post.title,
              otherMessages: postId,
              creator: this.post.creator,
            },
            this.$route.params.id
          );

          console.log("ecco il response", response)
          // After successfully adding the thread, fetch the updated data
          this.fetchData();
        } catch (error) {
          console.log("l errore ", error);
        }

      } catch (error) {
        console.error(error);
      }
    },
  },

  async created() {
    const store = useStore();
    const isAuthenticated = computed(() => store.state.isAuthenticated);
    const accessToken = computed(() => store.state.accessToken);

    watchEffect(() => {
      if (isAuthenticated.value && accessToken.value) {
        this.userDecoded = jwtDecode(accessToken.value);
        this.fetchData();
      }
    });
    try {


      const postThreads = await API.fetchThreadById(this.$route.params.id);
      const postTemporaneo = [];
      // Inserisco il primo post in posts
      postTemporaneo.push(postThreads.originalMessage);

      // Controllo se ci sono altri post allegati al thread
      // Se si inserisco tutto in posts
      if (postThreads.otherMessages.length > 0) {
        postThreads.otherMessages.forEach((element) => {
          postTemporaneo.push(element);
        });
      }

      // Use Promise.all to wait for all API calls to complete before updating the posts
      const promises = postTemporaneo.map(async (element) => {
        return await API.getAllPostById(element);
      });

      this.posts = await Promise.all(promises);
      this.updateData();
      this.currentPage = 1;
    } catch (error) {
      console.error(error);
    }

  },
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200;500;700&family=Roboto:wght@300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

button,
a {
  text-decoration: none;
  color: white;
  font-weight: bold;

}

button {
  background: none;
  color: inherit;
  border: 2px;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  border-radius: 5px;

  font-family: 'Roboto', sans-serif;
  background-color: #f15946;
  padding: 6px;
  color: white;
}

.buttonComment {
  border: 2px solid red;
  background-color: #f15946;
  font-weight: 800;
  color: white;

}

#page__title {
  padding-left: 5%;
  color: #f15946;

  position: relative;
  font-family: 'Anton', sans-serif;
  font-size: 2.5em;

  color: #4d4d4d;
  width: 10%;
}

.post {
  border-radius: 10px;
  width: 75%;
  margin: auto;
  margin-bottom: 40px;
  margin-top: 20px;

  justify-content: center;
  position: relative;

}

.post__content {
  text-align: left;
}

.post__title {
  font-family: 'Anton', sans-serif;
  color: #4d4d4d;
  font-size: 2rem;

}

.post__container__image {
  display: flex;
  justify-content: space-between;
}


.post__image {
  max-height: 200px;
  float: right;
  border-radius: 5px;

}

.post__text {
  font-family: 'Roboto', sans-serif;
  font-size: 1.05rem;
  line-height: 180%;
  font-weight: 200;
}


.comment__text {
  font-family: 'Roboto', sans-serif;
  font-weight: 200;
}

.comment__date {
  font-family: 'Roboto', sans-serif;
  font-weight: 200;
  font-size: 7px;
}




@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap');

#contenuto {
  display: block;
  padding: 50px;
}



#thread {
  display: flex;
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 10px;

  text-align: left;
  margin-bottom: 5%;
}

#home__title {
  color: #EF3E36;
}

#thread__content {
  display: inline-block;
}

.sidebar__title {
  color: #EF3E36;
  font-family: 'Anton', sans-serif;
}

#sidebar__username {
  font-size: 1.5rem;
  font-family: 'Anton', sans-serif;
  text-align: left;
  display: flex;
  padding: 20px;

}

#title__username {
  margin-top: -20px;
  font-size: 0.9rem;
  color: #2E282A;
  text-align: left;
}

#nav__home {
  display: flex;
  flex-direction: column;
}

#page__title {
  font-family: Anton, sans-serif;
  text-align: left;
  display: flex;
  padding: 25px;
  padding-left: 100px;
  color: #f15946;
  justify-content: space-between;

  width: 87%;

}

.image__feed {
  width: 50%;
  border-radius: 15px;
}

.form__label {
  font-family: 'Open Sans', sans-serif;
  font-size: 0.9em;
  text-align: left;

}

.thread__title {
  font-family: Anton, sans-serif;
  font-size: 2.2rem;

}

#sidebar__content {
  padding: 20px;
  text-align: left;
  font-family: 'Open Sans', sans-serif;
}

.thread__link {
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  color: #f15946;
  font-weight: 400;

}

#sidebar__button {

  text-align: right;
  font-size: 0.8em;
  font-family: 'Open Sans', sans-serif;
  color: #EF3E36;
  font-weight: bolder;
  cursor: pointer;
}

#thread__container {
  background-color: #F5F5F5;
  border-radius: 15px;
  margin-top: 10%;


}

#thread__title {
  font-family: 'Anton';
  text-align: left;
  width: 85%;
  font-size: 1.8rem;
  margin-left: 5%;
  margin-bottom: 5%;
  padding-top: 5.5%;


}

#thread__category {
  font-size: .9rem;
  font-style: italic;
  font-family: 'Open Sans', sans-serif;
  text-decoration: underline;
}

#thread__content {
  display: inline-block;
  width: 85%;
  text-align: left;
  font-size: 0.85rem;
  line-height: 190%;
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 0.4px;
  margin-bottom: 5%;


}


.threadFeed {
  margin-bottom: 6%;
  width: 100%;
  height: 100%;
}

.form-popup {
  margin-bottom: 20%;
}

select {
  margin-bottom: 10%;
  margin-top: 10%;
}

#sidebar {
  color: white;
  overflow-y: auto;
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  /* Set the desired width of the sidebar */
  height: 100%;
  background-color: #2c3d50;
  /* Set the background color of the sidebar */
  z-index: 999;
  /* Ensure the sidebar appears above other content */
  transition: transform 0.3s ease-in-out;
  /* Add a smooth transition effect */
  transform: translateX(100%);
  /* Start with the sidebar off-screen to the right */

  font-family: 'Open Sans', sans-serif;
}

#sidebar button {
  color: white;
  text-decoration: underline;
  text-decoration-color: #EF3E36;
}

.thread__title__feed {
  display: flex;
  padding: 20px;
}

#sidebar.active {
  transform: translateX(0);
  /* Move the sidebar onto the screen when active */
}

button,
a {
  background-color: transparent;
  border: none;
  text-decoration: none;
  color: black;
}

p {
  margin: 0px;
}

input {
  border: 0px;
  border-radius: 8px;
  padding: 10px;
}
</style>
