<template>
  <div id="contenuto">
    <div id="nav__home">
      <h1 id="page__title">Home</h1>
      <p>{{ userData.id }}</p>
      <button @click="showForm = true">Add Thread</button>

      <!-- Pop-up form Post-->
      <div v-if="showForm" class="form-popup">
        <form enctype="application/x-www-form-urlencoded" @submit.prevent="submitFormPost">
          <label for="title">Title:</label>
          <input v-model="post.title" type="text" required>

          <label for="category">Category:</label>
          <input v-model="post.category" type="text" required>

          <label for="content">Content:</label>
          <textarea v-model="post.content" required></textarea>

          <button type="submit">Save</button>
          <button @click="showForm = false">Cancel</button>
        </form>
      </div>
    </div>


    <!-- Pop-up form Post-->
    <div v-if="showForm" class="form-popup">
        <form enctype="application/x-www-form-urlencoded" @submit.prevent="submitFormThread">
          <label for="title">Title:</label>
          <input v-model="thread.title" type="text" required>

          <label for="OriginalMessage">Attach Message:</label>
          <input v-model="thread.originalMessage" type="text" required>


          <button type="submit">Save</button>
          <button @click="showForm = false">Cancel</button>
        </form>
      </div>

    <button @click="logOut()">Log out</button>

    <div v-for="threadFeed in threads" :key="threadFeed._id" style="border: 1px solid black;">
  <p>Ciao {{ threadFeed.title }}</p>
</div>

  </div>
</template>

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
      thread: {
        title: '',
        originalMessage: '',
        creator: '',
      },
      post: {
        title: '',
        category: '',
        content: '',
        creator: '',
      },
      showForm: false,
      userDecoded: null,
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
  },

  methods: {
  async fetchData() {
  try {
    this.threads = await API.getAllPost();
    console.log("Fetched Threads:", this.threads); // Check if data is received
  } catch (error) {
    console.error(error);
  }
},

async submitFormPost() {
  try {
    const user = this.userData;

    if (!user) {
      // If user data is not available, do something (e.g., show an error message)
      return;
    }

    const userData = await API.fetchUser(user.id);

    this.post.creator = userData._id;

    const response = await API.addPost(this.post);

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

    const response = await API.addThread(this.thread);

    // After successfully adding the thread, fetch the updated data
    this.fetchData();
  } catch (error) {
    console.error(error);
  }
},
    async logOut() {
      await axios.post(url+'logout'); // Assuming this is your logout API endpoint
      this.$router.push({ name: 'login' });
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
  },
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap');

#contenuto{
  display: block;
  padding: 50px;
}


#thread{
  display: flex;
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 10px;

  text-align: left;
  margin-bottom: 5%;
}

#thread__content{
  display: inline-block;
}


#nav__home{
  display: flex;
}

#page__title{
  font-family: Anton,sans-serif;

}



.thread__title{
  font-family: Anton,sans-serif;
  font-size: 2rem;
}

.thread__link{
  font-family: Roboto,sans-serif;
  font-size: 12px;
  color: #f15946;
  font-weight: 400;
  
}

button,a{
  background-color: transparent;
  border: none;
  text-decoration: none;
  color: black;
}
</style>