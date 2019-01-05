<template>
<div class="noselect" v-bind:id="name" v-on:click="playAnimation" >
    <img class="noselect" :src="sauce">
</div>
</template>

<script>
export default {
    props: [
        "name",
        "sauce"
    ],
    methods: {
        playAnimation(){
            this.togglePinned();
            let currentEl = document.getElementById(`${this.name}`)
            currentEl.classList.add("spinner")
            currentEl.setAttribute("style", "pointer-events: none")
            setTimeout(() => {
                currentEl.classList.remove("spinner");
                currentEl.removeAttribute("style")
            }, 1000);
        },
        togglePinned: function(){
            this.$emit("togglePinned")
        }
    }
}
</script>


<style scoped>
.spinner {
    -webkit-animation-name: spinner;
    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    -webkit-animation-iteration-count: 1;
    -webkit-animation-duration: 1s;

    animation-name: spinner;
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    animation-iteration-count: 1;
    animation-duration: 1s;

    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    -ms-transform-style: preserve-3d;
    transform-style: preserve-3d;
}

/* WebKit and Opera browsers */
@-webkit-keyframes spinner {
    from { -webkit-transform: rotateY(0deg);    }
    to   { -webkit-transform: rotateY(-360deg); }
}

/* all other browsers */
@keyframes spinner {
    from {
        -moz-transform: rotateY(0deg);
        -ms-transform: rotateY(0deg);
        transform: rotateY(0deg);
    }
    to {
        -moz-transform: rotateY(-360deg);
        -ms-transform: rotateY(-360deg);
        transform: rotateY(-360deg);
    }
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}
</style>