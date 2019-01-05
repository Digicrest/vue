<template>
    <div class="noselect">
        <img src="../assets/pin.png" alt="">
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
div {
    position: absolute; 
    top: 5px; 
    right: 5px;
}

img {
    max-width: 60px;
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

