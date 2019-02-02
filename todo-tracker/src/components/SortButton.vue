<template>
     <v-btn @click="sortBy(type)" small flat color="grey">
        <v-icon left small>{{ icon }}</v-icon>
        <span class="caption text-lowercase">{{ text }}</span>
    </v-btn>
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

