<template>
    <v-tooltip top>
        <v-btn slot="activator" @click="sortBy(type)" small flat color="grey">
            <v-icon left small>{{ icon }}</v-icon>
            <span class="caption text-lowercase">{{ text }}</span>
        </v-btn>
        <span class="text-capitalize">Sort Projects by {{ type }}</span>
    </v-tooltip> 
</template>

<script>
export default {
    props: [ "type", "icon", "text" ],
    methods: {
        sortBy() {
            this.$emit("sortBy", this.type)
        }
    }
}
</script>

