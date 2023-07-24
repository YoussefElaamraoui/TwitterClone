<template>
  <div id="form__container">
    <div id="form__container__image">
      <div id="form__image">
      </div>
    </div>
    <div id="form__content">
      <h1 id="page__title">Login</h1>
      <div class="container">
        <p v-if="registrationSuccess">Registrazione avvenuta con successo!</p>
        <form enctype="application/x-www-form-urlencoded" @submit.prevent="submitForm">
          <label for="username"><b>Username</b></label>
          <br>
          <input v-model="user.username" type="text" placeholder="Enter Username" name="username" required>
          <br>
          <br>
          <label for="password"><b>Password</b></label>
          <br>
          <input v-model="user.password" type="password" placeholder="Enter Password" name="password" required>
          <br>
          <br>
          <button type="submit">
            Accedi
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script>
import axios from 'axios';
// import Cookies from 'js-cookie';
// import { mapActions } from 'vuex';

const url = 'http://localhost:3000/login';

export default {
  data() {
    return {
      registrationSuccess: false,
      user: {
        username: '',
        password: '',
      },
    };
  },
  created() {
    // Check for the presence of the 'registrationSuccess' query parameter
    this.registrationSuccess = this.$route.query.registrationSuccess === 'true';
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post(url, this.user);

        const accessToken = response.data.access_token;
        this.$store.dispatch('setAuthentication', accessToken);

        // A fine registrazione se avvenuta con successo, manda al login
        this.$router.push({ name: 'home' });
      } catch (error) {
        console.error(error);
      }

    },
  },
};
</script>


<style scoped>
body {
  height: 100vh;
}

#form__container {
  width: 100%;
  height: 100vh;
  display: inline-flex;
}

#form__container__image {
  width: 50%;
  background-color: #F8F4E3;
}

#form__image {
  height: 100%;
  width: 50%;
  margin-left: 25%;
  background-image: url('../assets/kingdom-sign-in.gif');
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
}

#form__content {
  height: 100%;
  width: 50%;
}

#page__title {
  font-size: 3em;
  font-family: Anton, sans-serif;
  margin-top: 10%;
  color: #EF3E36;
}

.container {
  margin-top: 15%;
}

button{
    border: 0px ;
    background-color: #2E282A;
    color: white;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bolder;
}
</style>