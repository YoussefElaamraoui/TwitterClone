<template>
    <div>
        <form @submit.prevent="submitForm">

            <div class="container">
                <label><b>Title</b></label>
                <input v-model="post.title" type="Testo" placeholder="Enter Password"  name="psw">
                <br>
                <br>
                <label><b>Category</b></label>
                <input v-model="post.category" type="text" placeholder="Enter Username" name="uname">
                <br>
                <br>
                <label><b>Content</b></label>
                <input v-model="post.content" type="text" placeholder="Enter Username" name="uname">
                <br>
                <br>

                <input @change="selectFile" type="file" multiple>
                <button type="submit">
                    Pubblica il messaggio
                </button>

            </div>


        </form>
    </div>
</template>

<!-- Validation -->
<script>
import API from '@/api';

export default {
    data() {
        return {
            post: {
                title: "",
                category: "",
                content: "",
                image: "",
            },
            image: "",
        }
    },
    methods: {
        selectFile(event) {
            this.post.image = event.target.files[0];
        },
        async submitForm() {
            const formData = new FormData();
            formData.append('image', this.post.image);
            formData.append('title', this.post.title);
            formData.append('category', this.post.category);
            formData.append('content', this.post.content);


            const response = await API.addPost(formData);
            this.$router.push({name:'home',params:{message:response.message}});

        }
    },
}


</script>