<template>
    <v-card flat class="ma-1">
        <v-layout row wrap :class="`pa-2 project ${project.status}`">
          <v-flex xs12 md6>
            <div class="caption grey--text">Project Title</div>
            <div>{{ project.title }}</div>
          </v-flex>

          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Person</div>
            <div>{{ project.person }}</div>
          </v-flex>

           <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Due By</div>
            <div>{{ project.due }}</div>
          </v-flex>

            <v-flex xs12 sm4 md2>
                <div class="right">
                    <v-chip small :class="`${project.status} white--text caption text-capitalize my-2`">{{ project.status }}</v-chip>
                </div>
            </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
</template>

<script>
export default {
    props: [
        "project"
    ]
}
</script>

<style scoped>
.project.ongoing {
    border-left: 4px solid orange;
}
.project.complete {
    border-left: 4px solid #3CD1C2;
}
.project.overdue {
    border-left: 4px solid tomato;
}

.v-chip.complete{
  background: #3cd1c2;
}
.v-chip.ongoing{
  background: #ffaa2c;
}
.v-chip.overdue{
  background: #f83e70;
}
</style>

