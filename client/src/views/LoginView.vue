<template>
  <div class="about">
    <div id="thread">
      <p id="thread__title">
        Franco svizzero
      </p>
      <img id="thread__image" v-if="posts.image" :src="require('../assets/' + posts.image)">
      <p id="thread__text">
        <br>
        <br>
        <!-- Fuziona ma non mi piace come testo {{ posts.content }} -->
        Sed pellentesque dictum lectus vitae finibus. Fusce in sapien hendrerit, fermentum felis efficitur, hendrerit
        urna. Aliquam sit amet sagittis dafdsfdsfd. Nam non elit nulla. Donec vel nibh arcu. Proin congue odio et vestibulum
        dapibus. Praesent nisl lacus, laoreet eu nulla et, eleifend tempor quam.
        <br>
        <br>
        Donec facilisis consequat nulla, id varius nisi congue et. Ut porttitor faucibus purus. Mauris bibendum erat sit
        amet orci suscipit, vitae imperdiet orci volutpat. Donec sodales turpis purus, porta feugiat nibh ullamcorper a.
        Praesent erat justo, elementum nec libero vitae, mattis eleifend orci. Etiam vulputate vestibulum sagittis. Fusce
        varius consequat arcu a pretium. Maecenas viverra quam ac arcu varius condimentum. Mauris nulla urna, gravida et
        orci sed, sodales fermentum neque. Sed et semper lectus. Cras sed interdum urna. Praesent vulputate ut risus sed
        gravida. Vivamus vulputate iaculis tortor, in posuere magna tristique id.


      </p>
      <p id="section__comment">Sezione commenti</p>

      <div id="comment">
        <!-- The v-if ensures that posts.comments is defined before checking for the lenght  -->
        <div v-if="posts.comments && posts.comments.length > 0" class="comment__user" v-for="comment in posts.comments" :key="posts.comments">
          <div>
            <div class="comment__id">
              Franco
            </div>
            <br>
            <div class="comment__text">
              {{ post.comment }}
            </div>
            <div class="comment__date">
              {{ post.created }}
            </div>
          </div>
        </div>
        <div v-else>
          <div>
              Non ci sono commenti
          </div>
        </div>
      </div>

    </div>




    <!-- <div>
      <p>{{ posts._id }}</p>
      <p>{{ posts.title }}</p>
      <p>{{ posts.category }}</p>
      <p>{{ posts.image }}</p>
      <p>Ecco i tuoi commenti{{posts.comment}}</p>
      <img v-if="posts.image" :src="require('../assets/' + posts.image)"> 
    </div> -->
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200;500;700&family=Roboto:wght@300&display=swap');

#thread {
  width: 80%;
  height: auto;
  margin-left: 10%;

}

#thread__title {
  display: flex;
  font-size: 1.5rem;
  font-family: 'Oswald', sans-serif;
  color: #f15946;
  text-transform: capitalize;
  font-weight: 700;

}

#thread__image {
  display: flex;
  width: 100%;
  max-height: 50vw;
  vertical-align: middle;

  border-radius: 15px;
}

#thread__text {
  text-align: left;
  line-height: 180%;
  word-spacing: 5px;
  font-size: .95rem;
  width: 90%;
  margin-left: 5%;

  font-weight: 200;
  color: #4d4d4d;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 5%;
}

#section__comment {
  display: flex;
  font-family: 'Oswald', sans-serif;
  font-size: 1.5rem;
}

#comment {
  width: 100%;
}

.comment__id {
  font-size: 1.2rem;
  font-weight: 300;
  text-align: left;

  font-family: 'Oswald', sans-serif;

  font-weight: 400;
}

.comment__user {
  border-radius: 5px;
  background-color: #f8f8f8;
  padding: 20px;

  font-family: 'Roboto', sans-serif;
  display: flex;
  position: relative;
  margin-left: 40%;
  margin-bottom: 40px;

  width: 60%;
}

.comment__text {
  text-align: left;
}

.comment__date {
  margin-top: 10px;
  font-size: .7rem;
  text-align: left;
}
</style>

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
      console.log(post);
    } catch (error) {
      console.error(error);
    }
  },
}
</script>
