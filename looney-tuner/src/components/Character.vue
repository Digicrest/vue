<template>
  <div v-on:dblclick="pinned = !pinned" class="character card col-sm-3">
    <div class="card-block">
      <div v-if="infoVisible" class="more-info" v-on:click="toggleMore()" style="margin-top: 20px;">
        <img :src="imagePath()" alt>
        <pin v-if="pinned"/>
        <div v-for="(rel, i) in charObj.relationships" :key="i">
          <hr>
          <label>
            <strong>{{ rel.name || "???" }}</strong>
          </label>
          <p>
            <em>{{ rel.description }}</em>
          </p>
        </div>
      </div>
      <div v-if="statsVisible" v-on:click="toggleStats">
        <pin v-if="pinned"/>
        <character-stats
          :isPinned="pinned"
          :textColor="rarityColor"
          :stats="charObj.stats"
          :limits="statLimits"
          :name="charObj.name"
        />
      </div>
      <div v-if="!statsVisible && !infoVisible">
        <!-- <div class="rarity" :style="rarityBGColor" v-html="rarityIcon(charObj.rarity)"></div> -->
        <h4 :style="rarityColor" class="card-title">{{ charObj.name }}</h4>
        <h6 class="card-subtitle" v-on:click="filterByRegion(charObj.region)">{{ charObj.region }}</h6>

        <div id="character-img">
          <spinnable-image
            v-on:togglePinned="pinned = !pinned"
            :sauce="imagePath()"
            :name="charObj.name"
          />
          <pin v-if="pinned"/>
          <br>
          <button id="stats-btn" class="btn" v-on:click="toggleStats()">&laquo; Stats</button>
          <button id="relationship-btn" class="btn" v-on:click="toggleMore()">Relations &raquo;</button>
        </div>
        <hr>
        <div class="icons">
          <img :src="roleImage" v-on:click="filterByRole(charObj.role)">
          <button
            v-for="(tag, i) in charObj.tags"
            :key="i"
            v-on:click="filterByTag(tag);"
            class="btn btn-outline-primary"
          >{{ tag }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CharacterStats from "./CharacterStats";
import SpinnableImage from "./SpinnableImage";
import Pin from "./Pin";
export default {
  components: {
    CharacterStats,
    SpinnableImage,
    Pin
  },
  props: ["charObj", "charName", "statLimits"],
  data: function() {
    return {
      infoVisible: false,
      statsVisible: false,
      roleImage: require(`../assets/icons/roles/${this.charObj.role}.png`),
      rarityColor: "color: pink",
      rarityBGColor: "background-color: pink",
      pinned: false
    };
  },
  methods: {
    imagePath: function() {
      return require(`../assets/characters/${this.charName.toLowerCase()}/${this.charObj.name
        .split(" ")
        .join("_")
        .split("'")
        .join("_")}.png`);
    },
    toggleMore: function() {
      this.infoVisible = !this.infoVisible;
    },
    toggleStats: function() {
      this.statsVisible = !this.statsVisible;
    },
    filterByTag: function(tag) {
      this.$emit("filterByTag", tag);
    },
    filterByRole: function(role) {
      this.$emit("filterByRole", role);
    },
    filterByRegion: function(region) {
      this.$emit("filterByRegion", region);
    },
    rarityIcon: function() {
      let rarity = this.charObj.rarity;

      if (rarity === "Common") {
        this.rarityColor = "color: #666";
        this.rarityBGColor = "background-color: #666";
      } else if (rarity === "Rare") {
        this.rarityColor = "color: deepskyblue";
        this.rarityBGColor = "background-color: deepskyblue";
      } else if (rarity === "Epic") {
        this.rarityColor = "color: mediumvioletred";
        this.rarityBGColor = "background-color: mediumvioletred";
      } else {
        this.rarityColor = "color: peru";
        this.rarityBGColor = "background-color: peru";
      }
    }
  },
  watch: {
    pinned: function() {
      this.$emit("setPinned", {
        name: this.charObj.name,
        pin_status: this.pinned
      });
    }
  },
  created() {
    this.rarityIcon();
  }
};
</script>

<style scoped>
.character {
  min-width: 300px;
  max-width: 300px;
  padding: 10px;
  font-family: "Quicksand", sans-serif;
}

img {
  max-width: 100px;
  margin: auto;
  border-radius: 50%;
}

.rarity {
  float: left;
  min-height: 10px;
  min-width: 10px;
  border: 0.5px solid #666;
  border-radius: 50%;
}
.more-info button {
  margin: auto;
}

.more-info img {
  max-width: 60px;
}

#character-img {
  max-width: fit-content;
  margin: auto;
  margin-left: 32%;
  margin-top: 3%;
}

#character-img .btn {
  position: absolute;
  bottom: 70px;
  font-size: 0.85rem;
}

#stats-btn {
  left: 70px;
}

#relationship-btn {
  right: 50px;
}

#character-img .btn:hover {
  color: darkcyan;
}

.icons {
  margin-top: 20px;
}

.icons img {
  max-width: 30px;
  min-width: 30px;
  border: none;
  cursor: pointer;
  margin-right: 10px;
  margin-left: -10px;
}

.icons .btn {
  display: inline-block;
  border-radius: 8px;
  margin-top: 0;
  margin: 3px;
  font-size: 0.8rem;
}

.character-tile .m10 {
  max-height: 300px;
  overflow: scroll;
}
</style>


