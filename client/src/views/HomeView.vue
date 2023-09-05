<template>
  <div :class="{ 'card': moveCard, 'cardMoved': !moveCard }">
  </div>

  <nav style="opacity: 0;transition:0.5s" :class="{ 'page-loaded': !loading }">
    <router-link style="font-family:'Damion';font-size:30px" to="/"><span style="color:#EF3E36;">T</span>wi<span
        style="color:#EF3E36;">tt</span>o</router-link>
  </nav>
  <div id="contenuto" :class="{ 'page-loaded': !loading }">
    <div id="nav__home">
      <div id="home__title">
        <div id="homeButton">
          <div id="page__title">
            <h1 style="width: 90%;">Home</h1>
            <button id="sidebarButton" @click="openSidebar">
              <img style="width:25px;height:25px; cursor :pointer" src="../assets/download.png">
            </button>
          </div>
        </div>
        <p v-if="userData" id="title__username">Ciao, {{ userData.id }}!</p>
      </div>
    </div>

    <div id="nothing__container" v-if="threads.length === 0">
      <div id="nothing__content">
        <p id="nothing__text">Nulla da vedere, mi dispiace ):</p>
        <img id="nothing__img" src="../assets/looney-sad-empty-wallet.png">
      </div>
    </div>





    <input v-model="filterTitle" type="text" placeholder="filtra">

    <div class="threadFeed" v-for="threadFeed in filteredThreads" :key="threadFeed._id">
      <div id="thread__container">
        <div class="thread__title__feed">
          <div style="width: 65%;">
            <div id="thread__title">
              <p>{{ threadFeed.title }}
              </p>
              <div id="thread__category">
                <p>{{ threadFeed.category }}</p>
              </div>
            </div>
          </div>
          <div style="width: 35%;">
            <img class="image_feed" v-if="threadFeed.image" style="width:100%;border-radius: 0px;"
              :src="require('../assets/' + threadFeed.image)">
          </div>
        </div>
        <div>
        </div>
        <div id="thread__content">
          <router-link :to="'/thread/' + threadFeed._id" style="color: ;">Vai al thread</router-link>
          <p style="font-family: 'Open Sans';font-size: 0.7rem;font-style:italic">creator: {{ threadFeed.creatorName }}
          </p>
        </div>
      </div>
    </div>



    <div id="sidebar" :class="{ active: showSidebar }">
      <div id="sidebar__username">
        <div style="width: 100%;">Menu</div>
        <button id="sidebar__button" style="text-decoration:none" @click="openSidebar">X</button>
      </div>
      <div id="sidebar__content" v-if="userData">
        {{ userData.id }}
        <br>
        <button style="padding:0px;  text-decoration:none;  font-size: .7em; color: #EF3E36;" @click="logOut()">Log
          out</button>
      </div>

      <br>
      <br>

      <button @click="showForm = true">Aggiungi Post/Thread</button>

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
          <button @click="showForm = false">Cancel</button>
        </form>
      </div>


      <!-- Pop-up form Thread-->
      <div v-if="showForm" class="form-popup">
        <br>
        <br>
        <p class="sidebar__title">Aggiungi Thread</p>
        <br>

        <form enctype="application/x-www-form-urlencoded" @submit.prevent="submitFormThread">
          <label class="form__label" for="title">Title</label>
          <br>
          <input v-model="thread.title" type="text" required>
          <br>

          <br>
          Post da collegare al thread:
          <br>
          <br>
          <!-- Cambiare in solo post dell'utente -->
          <div v-for="threadFeed in postUser" :key="threadFeed._id">
            <label>
              <input type="radio" name="scelta" :value="threadFeed._id" v-model="thread.originalMessage"
                @change="updateSelection" required />
              {{ threadFeed.title }}
            </label>
          </div>


          <br><br>
          <button type="submit">Save</button>
          <button @click="showForm = false">Cancel</button>
        </form>
      </div>
    </div>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap');

#contenuto {
  display: block;
  padding: 50px;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.page-loaded {
  opacity: 1 !important;
}

.card {
  height: 100vh;
  width: 100vw;
  position: absolute;
  z-index: 1;
  background-color: #f15946;
  transform: translate(-100vw, 0);
  transition: 2s ease-in-out;
}

.cardMoved {
  height: 100vh;
  width: 100vw;
  position: absolute;
  z-index: 1;
  background-color: #f15946;
  transform: translate(100vw, 0);
  transition: 2s ease-in-out;
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
  width: 100%;

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

#nothing__container {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}


#nothing__img {}

#nothing__text {
  font-size: 2.25em;
  margin-bottom: 5%;

  font-family: 'Anton', sans-serif;

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


<script>
import { watchEffect, computed } from 'vue';
import API from '../api';
import axios from 'axios';
import { useStore } from 'vuex';
import jwtDecode from 'jwt-decode';


const url = 'http://localhost:3000/';

export default {
  data() {
    return {
      threads: [],
      postUser: [],
      thread: {
        title: '',
        originalMessage: '',
        creator: '',
        creatorName: '',
      },
      filterTitle: '',
      post: {
        title: '',
        category: '',
        content: '',
        creator: '',
        image: '',
        username: '',
      },
      showSidebar: false,
      showForm: false,
      userDecoded: null,
      loading: true,
      moveCard: true,
    };
  },

  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;

    },

    filteredThreads() {
      // Filter the threads based on the filterTitle
      return this.threads.filter(thread => {
        // Convert both the thread title and filterTitle to lowercase for case-insensitive filtering
        const threadTitle = thread.title.toLowerCase();
        const searchTerm = this.filterTitle.toLowerCase();

        // Check if the thread title contains the search term
        return threadTitle.includes(searchTerm);
      });
    },
    accessToken() {
      this.$store.state.accessToken = localStorage.getItem('access_token')
      return this.$store.state.accessToken;
    },
    userData() {
      if (this.isAuthenticated && this.accessToken) {
        console.log("I dati dell'utente", this.userDecoded);
        console.log("l'access token ", this.accessToken)
        return this.userDecoded;
      } else {
        return null;
      }
    },
  },


  watch: {
    userAccessToken: {
      immediate: true,
      handler(newToken) {
        if (newToken) {
          // Token is available, decode and set user data
          this.userDecoded = jwtDecode(newToken);
          this.fetchData(); // Fetch data for the new user
        } else {
          // Token is not available (user logged out), clear user data
          this.userDecoded = null;
        }
      },
    },
  },


  methods: {
    async fetchData() {
      try {
        this.threads = await API.allThreads();

        const userData = this.userData;

        //Potevo usare anche l'id, ma mi risultava più semplice andare verso questa strada
        this.postUser = await API.getAllPostByUsername(userData.id)


      } catch (error) {
        console.error(error);
      }
    },
    async openSidebar() {
      if (this.showSidebar == false)
        this.showSidebar = true;
      else
        this.showSidebar = false;
    },

    handleImageUpload(event) {
      const file = event.target.files[0];
      this.post.image = file; // Store the file in the "post" data property
    },

    async submitFormPost() {
      try {
        const user = this.userData;

        if (!user) {
          // If user data is not available, do something (e.g., show an error message)
          return;
        }

        const userData = await API.fetchUser(user.id);

        console.log(userData);

        this.post.creator = userData._id;
        this.post.username = userData.username;



        const formData = new FormData();
        formData.append('title', this.post.title);
        formData.append('category', this.post.category);
        formData.append('content', this.post.content);
        formData.append('image', this.post.image);
        formData.append('creator', this.post.creator);
        formData.append('creatorName', this.post.username); // Append the image file

        const response = await API.addPost(formData);

        // After successfully adding the post, fetch the updated data
        this.fetchData();
      } catch (error) {
        console.error(error);
      }
    },



    async submitFormThread() {
      try {
        const user = this.userData;

        if (!user) {
          // If user data is not available, do something (e.g., show an error message)
          return;
        }

        const userData = await API.fetchUser(user.id);

        this.thread.creator = userData._id;
        this.thread.creatorName = userData.username;

        const formData = new FormData();
        formData.append('title', this.thread.title);
        formData.append('originalMessage', this.thread.originalMessage);
        formData.append('creator', this.thread.creator);
        formData.append('creatorName', this.thread.creatorName);

        console.log("thread content", this.thread)

        const response = await API.creationThread(this.thread);
        console.log(response);

        // After successfully adding the thread, fetch the updated data
        this.fetchData();
      } catch (error) {
        console.error(error);
      }
    },

    async logOut(req, res) {
      localStorage.removeItem('access_token');
      this.userDecoded = null;
      this.accessToken = null;
      this.$router.push('/login');
    }
  },

  created() {
    const store = useStore();
    const isAuthenticated = computed(() => store.state.isAuthenticated);
    const accessToken = computed(() => store.state.accessToken);

    watchEffect(() => {
      if (isAuthenticated.value && accessToken.value) {
        this.userDecoded = jwtDecode(accessToken.value);
        if (this.userDecoded) {
          this.fetchData();
        }
      }
    });

    setTimeout(() => {

      this.moveCard = false; // card 
    }, 0);

    setTimeout(() => {

      this.loading = false; // opacity 
    }, 2000);
  },
};
</script>

