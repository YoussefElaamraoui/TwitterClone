<template>
  <div>
    <p v-if="registrationSuccess">Registrazione avvenuta con successo!</p>
    <form enctype="application/x-www-form-urlencoded" @submit.prevent="submitForm">
    <label for="username"><b>Username</b></label>
    <input v-model="user.username" type="text" placeholder="Enter Username" name="username" required>
    <br>
    <br>
    <label for="password"><b>Password</b></label>
    <input v-model="user.password" type="password" placeholder="Enter Password" name="password" required>
    <br>
    <button type="submit">
    Accedi
    </button>
    
    </form>
  </div>  
</template>

<style scoped>

</style>

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
                this.$router.push({ name: 'home'});
              } catch (error) {
                console.error(error);
              }
            
        },
    },
};
</script>
