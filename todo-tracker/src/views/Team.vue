<template>
  <div class="team">
    <h1 class="subheading grey--text">The Team</h1>
    
    <v-container class="my-5">
      <!-- used for grid system -->
      <v-layout row wrap>
        <!-- card -->
        <v-flex xs12 sm6 md4 lg3 v-for="member in team" :key="member.name">
          <v-card flat class="text-xs-center ma-3">
           <v-responsive class="pt-4">
             <v-avatar size="100" class="grey lighten-2">
               <img :src="member.avatar">
             </v-avatar>
           </v-responsive>
           <v-card-text>
              <div class="subheading">{{ member.name }}</div>
              <div class="grey--text">{{ member.role }}</div>
           </v-card-text>
           <v-card-actions>
             <v-btn flat color="grey">
               <v-icon small left>message</v-icon>
               <span>Message</span>
            </v-btn>
           </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
       team: [
        { name: 'Digicrest', role: 'Web Developer', avatar: '/avatars/digicrest.jpg' },
        { name: 'Ryu', role: 'Graphic Designer', avatar: '/avatars/ryu.png' },
        { name: 'Chun Li', role: 'Web Developer', avatar: '/avatars/chunli.png' },
        { name: 'Gouken', role: 'Social Media Maverick', avatar: '/avatars/gouken.png' },
        { name: 'Yoshi', role: 'Sales guru', avatar: '/avatars/yoshi.png'}
      ]
    }
  }
};
</script>
