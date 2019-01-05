<template>
    <div>
        <p :style="textColor">{{ name }}</p>
        <hr />
        <div id="stat-container">
            <div style="display: flex; justify-content: center;">
                <label style="width: 10%; font-size: .7rem; margin: auto 0;">POW</label>
                <div class="progress" style="height: 25px; width: 70%;">
                    <div :style="`width: ${bar_widths.power}%; color: black;`" aria-valuenow="stats.max_power" aria-valuemax="limits.max_power" aria-valuemin="0" role="progressbar" class="progress-bar bg-warning">
                       {{ stats.max_power }} / {{ limits.max_power }}
                    </div>
                </div>
            </div>

            <div style="display: flex; justify-content: center;">
                <label style="width: 10%; font-size: .7rem; margin: auto 0;">HP</label>
                <div class="progress" style="height: 25px; width: 70%;">
                    <div :style="`width: ${bar_widths.health}%; color: black;`" aria-valuenow="stats.max_health" aria-valuemax="limits.max_health" aria-valuemin="0" role="progressbar" class="progress-bar bg-success">
                        {{ stats.max_health }} / {{ limits.max_health }}
                    </div>
                </div>
            </div>


            <div style="display: flex; justify-content: center;">
                <label style="width: 10%; font-size: .7rem; margin: auto 0;">ATT</label>
                <div class="progress" style="height: 25px; width: 70%;">
                    <div :style="`width: ${bar_widths.attack}%; color: black;`" aria-valuenow="stats.max_attack" aria-valuemax="limits.max_attack" aria-valuemin="0" role="progressbar" class="progress-bar bg-danger">
                        {{ stats.max_attack }} / {{ limits.max_attack }}
                    </div>
                </div>
            </div>

            <div style="display: flex; justify-content: center;">
                <label style="width: 10%; font-size: .7rem; margin: auto 0;">DEF</label>
                <div class="progress" style="height: 25px; width: 70%;">
                    <div :style="`width: ${bar_widths.defense}%; color: black;`" aria-valuenow="stats.max_defense" aria-valuemax="limits.max_defense" aria-valuemin="0" role="progressbar" class="progress-bar bg-primary">
                        {{ stats.max_defense }} / {{ limits.max_defense }}
                    </div>
                </div>
            </div>

            <div style="display: flex; justify-content: center;">
                <label style="width: 10%; font-size: .7rem; margin: auto 0;">SPD</label>
                <div class="progress" style="height: 25px; width: 70%;">
                    <div :style="`width: ${bar_widths.speed}%; color: black;`" aria-valuenow="stats.max_speed" aria-valuemax="limits.max_speed" aria-valuemin="0" role="progressbar" class="progress-bar bg-secondary">
                        {{ stats.max_speed }} / {{ limits.max_speed }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
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
    .progress {
        margin: 5px;
        /* border: 2px solid silver; */
        box-shadow: 2px 2px 2px silver;
    }
</style>