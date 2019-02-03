<template>
  <v-app class="grey lighten-4">
    <v-content class="mx-4 mb-4">
      <navbar v-on:projectAdded="projectAdded"/>
      <router-view></router-view>
    </v-content>
    <v-snackbar v-model="snackbar" :timeout="3000" top color="success" class="my-4">
      <span>{{ snackbarMessage }}</span>
      <v-btn flat color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "App",
  components: {
    Navbar
  },
  data() {
    return {
      snackbar: false,
      snackbarMessage: ""
    };
  },
  methods: {
    projectAdded(person) {
      this.snackbar = true;
      this.snackbarMessage = `Awesome! ${person} added a new project.`
    }
  }
};
</script>
