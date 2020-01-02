<template>
  <v-card class="pt-5" max-width="520" flat>
    <v-card-title class="justify-center">
      <h1 class="title primary--text white pa-5 mt-n12 text-uppercase">New User</h1>
    </v-card-title>
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Name"
          placeholder="Name"
          autofocus
          outlined
          required
        ></v-text-field>

        <v-text-field
          v-model="username"
          :rules="usernameRules"
          label="Username"
          placeholder="Username"
          outlined
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          placeholder="example@example.com"
          outlined
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          hint="At least 6 characters"
          outlined
          @click:append="showPassword = !showPassword"
        ></v-text-field>

      </v-form>
    </v-card-text>
    <v-card-actions class="pb-5 justify-center">
      <v-btn
        color="#880E4F"
        class=""
        depressed
        dark
        @click="signup"
      >
        Register
      </v-btn>
    </v-card-actions>
    
  </v-card>
  
</template>

<script>
  import axios from 'axios'
  // import Notification from '@/components/Notification'

  export default {
    // components: {
    //   Notification,
    // },

    data() {
      return {
        valid: true,
        name: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length >= 10) || 'Name must be higher than 10 characters',
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
        }
      } 
    },

    beforeRouteEnter(to, from, next) {
      const token = localStorage.getItem('login-token');

      return token ? next('/') : next();
    },
    methods: {
      signup() {
        if (this.$refs.form.validate()) {
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
      }
    },
  }
</script>
<style lang="scss" scoped>
.v-card {
  margin: 0 auto;

  h1 {
    border-radius: 3px;
  }
}
</style>