<template>
  <div style="display: flex; justify-content: center;">
    <label class="progress_lbl">{{ name }}</label>
    <div class="progress">
      <div 
            :class="`progress-bar ${bootstrap_class}`" 
            :style="`width: ${width}%; color: black;`" 
            
            aria-valuenow="val" 
            aria-valuemax="limit" 
            aria-valuemin="0"
      >{{ val }} / {{ limit }}</div>
    </div>
  </div>
</template>

<script>
export default {
    props: [ "width", "val", "limit", "name", "bootstrap_class" ]
}
</script>


<style scoped>
    .progress {
        margin: 5px;
        box-shadow: 2px 2px 2px silver;
        height: 25px; 
        width: 70%;
    }

    .progress_lbl {
        width: 10%; 
        font-size: .7rem; 
        margin: auto 0;
    }
</style>
