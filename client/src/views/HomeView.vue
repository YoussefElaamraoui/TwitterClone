<template>
  <div>
    <h1 id="page__title">Threads</h1>
    <div id="thread" v-for="thread in threads" :key="thread._id">
    <div id="thread__content">
      <p class="thread__title">{{thread.title}}</p>
      <hr class="solid">
      <button><router-link class="thread__link" :to="'/thread/' + thread._id">continua thread</router-link> </button>
    </div>

    </div>
  </div>
</template>

<script>
import API from '../api';

export default {
    data() {
        return {
            threads: [],
        };
    },
    async created() {
        this.threads = await API.allThreads();
        console.log(this.threads)
    },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap');


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