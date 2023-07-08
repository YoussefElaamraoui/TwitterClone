<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <p v-for="post in posts" :key="post._id">
        <img  :src="require('../assets/'+post.image)">
      <router-link :to="'/thread/' + post._id">{{ post._id }}</router-link>
    </p>
  </div>
</template>

<script>
// @ is an alias to /src
import API from '../api';

export default {
  name: 'HomeView',
  data() {
    return {
      posts: [],
    };
  },
  async created() {
    this.posts = await API.getAllPost();
  }
}
</script>
