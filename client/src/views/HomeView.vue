<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <p v-for="post in posts" :key="post._id">
        <img  :src="require('../assets/'+post.image)">
      <router-link :to="'/thread/' + post._id">{{ post._id }}</router-link>
    </p> -->
    <div id="container">
      <div>
        <p id="page__title">Feed</p>
      </div>
      <br>
      <div class="post" v-for="post in posts" :key="post._id">
        <div class="post__content">

          <div class="post__container__image">
            <p class="post__title">{{post.title}}</p>

            <!-- showing image only if it was given by the user -->
            <img v-if="post.image" class="post__image" :src="require('../assets/' + post.image)">

          </div>
          <p class="post__text">
            <!-- {{ post.content }} -->
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in laoreet sapien.
            In pharetra augue nec interdum ornare. Donec feugiat massa vel nunc consequat interdum.
            Donec et iaculis lacus. Vivamus eget sagittis metus, ut luctus ligula. Donec vitae sem id nibh lacinia
            elementum.
            Nullam facilisis interdum lacus in dictum. Nullam eu vehicula nisl.

            Donec fermentum blandit nisi eget porttitor.
            In vehicula, metus sed sodales scelerisque, nisi neque pharetra elit, eget consequat magna nibh sit amet
            augue.
            Maecenas tristique quis felis id pulvinar. Nulla id auctor mauris. Integer quis imperdiet lacus, in imperdiet
            turpis.
            Vivamus consectetur sodales convallis.
            Vestibulum cursus quam justo, eget ultricies nisi malesuada sed. Ut a dictum felis, sed imperdiet sem.
            <br>
            <br>
            <button><router-link :to="'/thread/' + post._id">continua thread</router-link> </button>
          </p>
        </div>
      </div>
    </div>
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


<style>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200;500;700&family=Roboto:wght@300&display=swap');

button,
a {
  text-decoration: none;
  color: white;
  font-weight: bold;

}

button {
  background: none;
  color: inherit;
  border: 2px ;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  border-radius: 5px;

  font-family: 'Roboto',sans-serif;
  background-color: #f15946;
  padding: 6px;
  color: white;
}

#page__title {
  padding-left: 5%;
  position: relative;
  font-family: 'Oswald', sans-serif;
  font-size: 2.5em;

  color: #f15946;
  width: 10%;
}

.post {
  border-radius: 10px;
  width: 75%;
  min-height: 200px;
  background-color: #f8f8f8;
  margin: auto;
  margin-bottom: 40px;
  margin-top: 20px;

  display: flex;
  justify-content: center;
  position: relative;

}

.post__content {
  text-align: left;
  padding: 40px;
}

.post__title {
  font-family: 'Oswald', sans-serif;
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

/*Style for mobile devices*/

</style>