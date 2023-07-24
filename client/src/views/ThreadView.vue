<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <p v-for="post in posts" :key="post._id">
        <img  :src="require('../assets/'+post.image)">
      <router-link :to="'/thread/' + post._id">{{ post._id }}</router-link>
    </p> -->
    <div id="container">
      <div>
        <!-- <p id="page__title">Feed</p> -->
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
            {{ post.content }}
            <br>
            <br>
          </p>
        </div>
        <div id="comment">
        <!-- The v-if ensures that posts.comments is defined before checking for the lenght  -->
        <div  class="comment__user" v-for="comment in post.comments" :key="comment._id">
          <div>
            <div class="comment__id">
            </div>
            <br>
            <div class="comment__text">
              {{ comment.comment }}
            </div>
            <div class="comment__date">
              {{ comment.created }}
            </div>
          </div>
        </div>
        <!-- <div v-else>
          <div>
              Non ci sono commenti
          </div>
        </div> -->
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
    (this.posts);
  } catch (error) {
    console.error(error);
  }
}


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
  font-family: 'Anton', sans-serif;
  font-size: 2.5em;

  color: #4d4d4d;
  width: 10%;
}

.post {
  border-radius: 10px;
  width: 75%;
  min-height: 200px;
  margin: auto;
  margin-bottom: 40px;
  margin-top: 20px;

  justify-content: center;
  position: relative;

}

.post__content {
  text-align: left;
  padding: 40px;
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


.comment__text{
  font-family: 'Roboto',sans-serif;
  font-weight: 200;
}

.comment__date{
  font-family: 'Roboto',sans-serif;
  font-weight: 200;
  font-size: 7px;
}
/*Style for mobile devices*/

</style>
