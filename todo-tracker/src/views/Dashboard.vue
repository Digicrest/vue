<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>
    
    <v-container class="my-5">
      <v-layout row class="mb-3">
        <sort-button type="title"  icon="folder" text="by folder name" @sortBy="sortBy"/>
        <sort-button type="person" icon="person" text="by person" @sortBy="sortBy"/>
        <sort-button type="status" icon="check" text="by status" @sortBy="sortBy"/>
      </v-layout>
      <project-card v-for="project in projects" :key="project.title" :project="project"/>
    </v-container>
  </div>
</template>

<script>
import ProjectCard from '@/components/ProjectCard';
import SortButton from '@/components/SortButton';
import db from '@/firebaseConfig';

export default {
  components:{
    ProjectCard,
    SortButton
  },
  data: function() {
    return {
      projects: [ ]
    }
  },
  methods: {
    sortBy: function(prop) {
      this.projects.sort((a, b) => a[prop] < b[prop] ? -1 : 1)
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
        }
      });
    });
  }
};
</script>
