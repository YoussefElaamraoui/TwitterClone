<template>
    <div>
        <form enctype="application/x-www-form-urlencoded" @submit.prevent="submitForm">
            <div class="container">
                <label for="email"><b>Email</b></label>
                <input v-model="user.email" type="email" placeholder="Enter Email" name="email" required>
                <br>
                <br>
                <label for="username"><b>Username</b></label>
                <input v-model="user.username" type="text" placeholder="Enter Username" name="username" required>
                <br>
                <br>
                <label for="password"><b>Password</b></label>
                <input v-model="user.password" type="password" placeholder="Enter Password" name="password" required>
                <br>
                <br>
                <label for="confirm_password"><b>Confirm Password</b></label>
                <input v-model="user.confirm_password" type="password" placeholder="Confirm Password"
                    name="confirm_password" required>

                <button type="submit">
                    Registrati
                </button>
            </div>
        </form>
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
                console.log(response.data);
                // Handle the response as needed
            } catch (error) {
                console.error(error);
                // Handle any error that occurred during the request
            }
        },
    },
};

</script>