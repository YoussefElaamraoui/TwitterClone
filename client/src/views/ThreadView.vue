<template>
  <div class="about">
    <h1>Thread messagi</h1>
    <div>
      <p>{{ posts._id }}</p>
      <p>{{ posts.title }}</p>
      <p>{{ posts.category }}</p>
      <p>{{ posts.image }}</p>
      <img  :src="require('../assets/' + posts.image)"> 
    </div>
  </div>
</template>


<script>
import API from '../api';

export default {
  name: 'HomeView',
    data() {
    return {
      posts: [],
    };
  },
  async created() {
    try {
      const post = await API.getAllPostById(this.$route.params.id);
      this.posts = post;
    } catch (error) {
      console.error(error);
    }
  },
}
</script>
