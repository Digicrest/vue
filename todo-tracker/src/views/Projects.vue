<template>
  <div class="projects">
    <v-snackbar v-model="snackbar" :timeout="3000" top color="success" class="my-4">
      <span>{{ snackbarMessage }}</span>
      <v-btn flat color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>

    <h1 class="subheading grey--text">My Projects</h1> 
     <v-container class="my-5">
      <v-expansion-panel>
        <v-expansion-panel-content v-for="project in myProjects" :key="project.id">
          <div slot="header">{{ project.title }}</div>
          <v-card>
            <v-card-text class="px-4 grey--text">
              <div class="font-weight-bold">due by {{ project.due }}</div>
              <div>{{ project.content }}</div>
            </v-card-text>

            <!-- ----------------------------------------------- -->
            <v-card-actions>
              <v-list-tile class="grow">
                <v-list-tile-avatar color="grey darken-3">
                  <v-img
                    class="elevation-6"
                    src="/avatars/digicrest.jpg"
                  ></v-img>
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>{{ project.person }}</v-list-tile-title>
                </v-list-tile-content>

                <v-layout align-center justify-end>
                  <v-btn small fab color="red lighten-2" depressed @click="deleteProject(project.id)">
                    <v-icon small>close</v-icon>
                  </v-btn>
                </v-layout>
              </v-list-tile>
            </v-card-actions>
    <!-- ----------------------------------------------- -->
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-container>
  </div>
</template>

<script>
import db from '@/firebaseConfig';

export default {
  data() {
    return {
      projects: [],
      snackbar: false,
      snackbarMessage: "Project Removed."
    }
  },
  methods: {
    deleteProject(id) {
      db.collection("projects").doc(id).delete().then(() => {
        this.snackbar = true;
      })
    }
  },
  computed: {
    myProjects() {
      return this.projects.filter(project => project.person === "Digicrest")
    }
  },
  created() {
    db.collection("projects").onSnapshot(response => {
      const changes = response.docChanges();
      
      changes.forEach(change => {
        if (change.type === "added") {
          this.projects.push({
            ...change.doc.data(),
            id: change.doc.id
          })
        } else if (change.type === "removed") {
          let index = this.projects.map(p => p.id).indexOf(change.doc.id)
          this.projects.splice(index, 1);
        }
      });
    });
  }
};
</script>
