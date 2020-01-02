<template>
  <v-app>
    <v-container fill-height>
      <v-content>
        <router-view />
      </v-content>
    </v-container>
  </v-app>
</template>

<script>

export default {
  name: 'App'
};
</script>

<style>
  body, #app {
    background-color: #880E4F;
  }
</style>
