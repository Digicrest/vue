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

            <!-- dropdown menu -->
            <v-menu offset-y>
                <v-btn flat slot="activator" color="grey">
                    <v-icon left>expand_more</v-icon>
                    <span>Menu</span>
                </v-btn>
                <v-list>
                    <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
                        <v-list-tile-title>{{ link.title }}</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>

            <!-- signout button -->
            <v-btn flat color="grey">
                <span>Sign out</span>
                <v-icon right>exit_to_app</v-icon>
            </v-btn>
        </v-toolbar>

        <v-navigation-drawer app v-model="drawer" class="primary">
            <v-layout column align-center>
                <v-flex class="mt-4">
                    <v-avatar size="100">
                        <img src="/avatars/digicrest.jpg">
                    </v-avatar>
                    <p class="white--text subheading mt-1">Koshiro Izumi</p>  
                </v-flex>
                <v-flex class="mt-4 mb-3">
                    <popup v-on:projectAdded="projectAdded"/>
                </v-flex>
            </v-layout>

            <v-list dark>
                <v-list-tile active-class="secondary" v-for="link in links" :key="link.title" router :to="link.route">
                    <v-list-tile-action>
                        <v-icon>{{ link.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ link.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
import Popup from './Popup';

export default {
    components: { Popup },
    data: function() {
        return {
            drawer: false,
            links: [
                { icon: 'dashboard', title: 'Dashboard', route: '/' },
                { icon: 'folder', title: 'My Projects', route: '/projects' },
                { icon: 'group', title: 'The Team', route: '/team' }
            ]
        }
    },
    methods: {
        projectAdded(person) {
            this.$emit("projectAdded", person);
        }
    }
}
</script>
