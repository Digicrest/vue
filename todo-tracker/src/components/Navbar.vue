<template>
    <nav>
        <v-toolbar app flat>
            <v-toolbar-side-icon @click="drawer = !drawer" fab color="grey--text">
                <v-icon>menu</v-icon>
            </v-toolbar-side-icon>
            <v-toolbar-title class="text-uppercase grey--text">
                <span class="font-weight-light">Todo</span>
                <span>Digicrest</span>
            </v-toolbar-title>

            <v-spacer></v-spacer>
            
            <v-btn flat color="grey">
                <span>Sign out</span>
                <v-icon right>exit_to_app</v-icon>
            </v-btn>
        </v-toolbar>

        <v-navigation-drawer app v-model="drawer">
            <p>test</p>
        </v-navigation-drawer>
    </nav>
</template>

<script>
export default {
    data: function() {
        return {
            drawer: false
        }
    }
}
</script>
