<template>
    <div>
        <p :style="textColor">{{ name }}</p>
        <hr />
        <div id="stat-container">
            <character-stat name="POW" bootstrap_class="bg-warning" :width="bar_widths.power" :val="stats.max_power" :limit="limits.max_power"/>
            <character-stat name="HP" bootstrap_class="bg-success" :width="bar_widths.health" :val="stats.max_health" :limit="limits.max_health"/>
            <character-stat name="ATT" bootstrap_class="bg-danger" :width="bar_widths.attack" :val="stats.max_attack" :limit="limits.max_attack"/>
            <character-stat name="DEF" bootstrap_class="bg-primary" :width="bar_widths.defense" :val="stats.max_defense" :limit="limits.max_defense"/>
            <character-stat name="SPD" bootstrap_class="bg-secondary" :width="bar_widths.speed" :val="stats.max_speed" :limit="limits.max_speed"/>
        </div>
    </div>
</template>

<script>
import Stat from "./Stat.vue";

export default {
    components: {
        CharacterStat: Stat
    },
    props: [
        "stats",
        "limits",
        "name",
        "textColor"
    ],
    data: function() {
        return {
            bar_widths: {
                power: 50,
                attack: 50,
                defense: 50,
                health: 50,
                speed: 50
            }
        }
    },
    methods: {
        setBarWidth: function(){
            this.bar_widths.power = Math.round((this.stats.max_power / this.limits.max_power) * 100)
            this.bar_widths.attack = Math.round((this.stats.max_attack / this.limits.max_attack) * 100)
            this.bar_widths.defense = Math.round((this.stats.max_defense / this.limits.max_defense) * 100)
            this.bar_widths.health = Math.round((this.stats.max_health / this.limits.max_health) * 100)
            this.bar_widths.speed = Math.round((this.stats.max_speed / this.limits.max_speed) * 100)
        }
    },
    created: function(){
        this.setBarWidth();
    }
}
</script>

<style scoped>

</style>