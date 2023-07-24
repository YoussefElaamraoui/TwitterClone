<template>
    <div id="form__container">
        <div id="form__container__image">
            <div id="form__image">
            </div>
        </div>
        <div id="form__content">
            <form enctype="application/x-www-form-urlencoded" @submit.prevent="submitForm">
                <h1 id="page__title">Registrazione</h1>
                <div class="container">
                    <label for="email"><b>Email</b></label>
                    <br>
                    <input v-model="user.email" type="email" placeholder="Enter Email" name="email" required>
                    <br>
                    <br>
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
                    <label for="confirm_password"><b>Confirm Password</b></label>
                    <br>
                    <input v-model="user.confirm_password" type="password" placeholder="Confirm Password"
                        name="confirm_password" required>
                    <br>
                    <br>
                    <div id="button__container">
                        <button  style="margin-right:15px" type="submit">
                            Registrati
                        </button>
                        <router-link to="/login">
                            <button>Login</button>
                        </router-link>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>



<!-- Validation -->
<script>
import axios from 'axios';

const url = 'http://localhost:3000/Registrazione';

export default {
    data() {
        return {
            user: {
                email: '',
                username: '',
                password: '',
                confirm_password: '',
            },
        };
    },
    methods: {
        async submitForm() {
            try {
                const response = await axios.post(url, this.user);
                (response.data);

                // A fine registrazione se avvenuta con successo, manda al login
                this.$router.push({ name: 'login', query: { registrationSuccess: 'true' } });

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
    background-image: url('../assets/bonbon-sign-in-to-the-account-with-username-and-password-1.png');
    background-position: center center;
    background-size: contain;
    background-repeat: no-repeat;
}

#form__content {
    height: 100%;
    width: 50%;
}

#button__container{
    padding: 15px;
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