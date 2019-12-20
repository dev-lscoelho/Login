<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="username"
      :counter="10"
      :rules="usernameRules"
      label="Username"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      label="Password"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="passwordRules"
      :type="showPassword ? 'text' : 'password'"
      hint="At least 6 characters"
      @click:append="showPassword = !showPassword"
    ></v-text-field>

    <v-btn
      :disabled="!isFormValid"
      color="primary"
      class="mr-4"
    >
      Validate
    </v-btn>
  </v-form>
</template>

<script>
  import axios from 'axios'
  // import Notification from '@/components/Notification'

  export default {
    // components: {
    //   Notification,
    // },

    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      username: '',
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length >= 6) || 'Username must be higher than 6 characters',
        v => (v && v.length <= 10) || 'Username must be less than 14 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: "",
      showPassword: false,
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be higher than 6 characters',
      ],
      notification: {
        message: '',
        type: '',
      },
    }),
    computed: {
      // isFormValid() {
      //   return Object.keys(this.fields).every(key => this.fields[key].valid);
      // },
    },
    beforeRouteEnter(to, from, next) {
      const token = localStorage.getItem('login-token');

      return token ? next('/') : next();
    },
    methods: {
      signup() {
        axios
          .post('/signup', {
            name: this.name,
            username: this.username,
            email: this.email,
            password: this.password,
          })
          .then(response => {
            // save token in localstorage
            localStorage.setItem('login-token', response.data.data.token);

            // redirect to user home
            this.$router.push('/');
          })
          .catch(error => {
            // display error notification
            this.notification = Object.assign({}, this.notification, {
              message: error.response.data.message,
              type: error.response.data.status,
            });
          });
      }
    },
  }
</script>
<style>

</style>