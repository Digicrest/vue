<template>
  <div class="container" id="app">
    <div class="form-group col-sm-12">
      <img id="floating-tweety" src="./assets/tweety-float.png" alt="">
      <input id="search_bar" class="col-sm-10 form-control center" v-model="searchTerm" style="margin-bottom: 20px;" type="text" placeholder="Bugs Bunny...">

      <div id="role-icon-btns" class="col-sm-4">
        <button class="btn btn-success" v-on:click="filterByRole('Support')">Support</button>
        <button class="btn btn-info"    v-on:click="filterByRole('Defender')">Defender</button>
        <button class="btn btn-danger"  v-on:click="filterByRole('Attacker')">Attacker</button>
      </div>
      <div id="sort-method-btns" role="group">
        <div class="btn-group">
          <button type="button" class="btn btn-outline-secondary" v-on:click="sort('name')">Name</button>
          <button type="button" class="btn btn-outline-secondary" v-on:click="sort('rarity')">Rarity</button>
        </div>
        <div class="dropdown" style="margin-left: 10px; display: inline;">
          <button id="stats-dropdown" data-toggle="dropdown" type="button" class="btn btn-outline-secondary dropdown-toggle">Stats</button>

          <div class="dropdown-menu">
            <button v-on:click="statPriority = 'total'" class="dropdown-item">TOTAL</button>
            <button v-on:click="statPriority = 'max_power'" style="color: orange" class="dropdown-item">Power</button>
            <button v-on:click="statPriority = 'max_health'" style="color: green" class="dropdown-item">Health</button>
            <button v-on:click="statPriority = 'max_attack'" style="color: red" class="dropdown-item">Attack</button>
            <button v-on:click="statPriority = 'max_defense'" style="color: blue" class="dropdown-item">Defense</button>
            <button v-on:click="statPriority = 'max_speed'" style="color: grey" class="dropdown-item">Speed</button>
          </div>
        </div>
      </div>

      <div id="draggable-filter-reminder" @dblclick="reset" class="btn-group btn filter-group" v-show="showSortBadge || showFilterBadge">
        <div class="badge" v-show="showSortBadge">
           Sort: {{ sortBadgeText }}
        </div>
        <div class="badge" v-show="showFilterBadge">
          {{ filterBadgeType }}: {{ filterBadgeText }}
        </div>
        <span class="small-info good">&#x2713;draggable</span>
        <span class="small-info bad">&times; double click</span>
      </div>
    </div>
    <div id="character-box">
      <div class="character-tile m10" v-for="toon in (filter.length || searchTerm ? filter : toons)" :key="toon.name">
          <looney-tune 
            :charObj="toon" 
            :charName="toon.parentName"
            :statLimits="stat_limits"
            v-on:filterByTag="filterByTag" 
            v-on:filterByRole="filterByRole"
            v-on:setPinned="setPinned"
          />
      </div>
      <div id="bad-search" v-if="(searchTerm && filter.length < 1)" class="col-sm-12">
        <h2>What's up Doc!</h2>
        <img src="./assets/bad-search.png" alt="No search results">
      </div>
    </div>
    <button class="col-sm-10 btn btn-outline-danger m10" v-on:click="reset">Reset</button>
  </div>
</template>

<script>
import { toonsRef } from '../firebaseConfig.js'
import Character from './components/Character'

export default {
  name: 'app',
  firebase: {
    fb_toons: toonsRef
  },
  data: function() {
    return {
      toons: [],
      filter: [],
      searchTerm: "",
      stat_limits: {
        max_power: 0,
        max_health: 0,
        max_attack: 0,
        max_defense: 0,
        max_speed: 0
      },
      statPriority: "",
      showSortBadge: false,
      sortBadgeText: "",
      showFilterBadge: false,
      filterBadgeText: "",
      filterBadgeType: ""
    }
  },
  methods: {
    reset() {
      this.filter = []; 
      this.searchTerm = '';
      this.sortBadgeText = "";
      this.filterBadgeText = "";
      this.sort("name");
    },
    setPinned: function(e) {
      this.toons[this.toons.map(toon => toon.name).indexOf(e.name)].pinned = e.pin_status;
    },
    filterBySearch: function() {
      this.filterBadgeType = "Search"

      this.filter = [];
      this.filter = this.toons.filter(toon => {
        return toon.pinned ? toon : toon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      })
    },
    filterByTag: function(tagName) {
      this.filterBadgeType = "Tag";
      this.filterBadgeText = tagName;

      this.filter = [];
      this.filter = this.toons.filter(toon => {
        return toon.pinned ? toon : toon.tags.includes(tagName)
      })
    },
    filterByRole: function(roleName) {
      this.filterBadgeType = "Role"
      this.filterBadgeText = roleName

      this.filter = []
      this.filter = this.toons.filter(toon => {
        return toon.pinned ? toon : toon.role === roleName
      })
    },
    initialResults: function() {
      // TODO: Try to fix this
      // for some reason on page refresh i sometimes get no data from the database, this seems to work as a hack fix
      // but the problem is still there and can happen sometimes.
      for(let i = 0; i < 3; i++) {
        setTimeout(() => {
          this.toons = [];
          // using the database reference to toons
          this.fb_toons.map(fbt => {
            // for each "toon" push the object to our toons array
            fbt[".value"].map(t => { 
              t.parentName = fbt[".key"]
              this.toons.push(t)
              
              // iterate through each stat and set the upper bounds rounded up to the nearest 100
              for (const stat in t.stats) {
                if (t.stats.hasOwnProperty(stat)) {
                  const current_stat = t.stats[stat];
                  if(this.stat_limits[stat] < current_stat) {
                    this.stat_limits[stat] = current_stat
                  }
                }
              }

              for (const stat in this.stat_limits) {
                this.stat_limits[stat] = Math.ceil(this.stat_limits[stat]/100)*100
              }

              this.sort('name')
            })
          })   
        }, 1000);
        if(this.toons.length > 0) break;
      }
    },
    sort: function(by) {
      let comparator = this.compareByName;
      if (by === "rarity")  comparator = this.compareByRarity
      if (by === "stats") {
        comparator = this.compareByStats
        this.showSortBadge = true;
      } else {
        this.showSortBadge = false;
        this.sortBadgeText = ""
      }
      this.toons = this.toons.sort(comparator)
      this.filter = this.filter.sort(comparator)
    },
    compareByName: function(t1, t2) {
      let comparison = 0;
      
      let t1Name = t1.name.toLowerCase();
      let t2Name = t2.name.toLowerCase();

      if(t1Name > t2Name) comparison = 1;
      if(t1Name < t2Name) comparison = -1;
      return comparison;
    },
    compareByRarity: function(t1, t2) {
      let rarities = ["Common", "Rare", "Epic", "Legendary"]
      let comparison = 0;
      
      let t1Rarity = rarities.indexOf(t1.rarity);
      let t2Rarity = rarities.indexOf(t2.rarity);

      if(t1Rarity > t2Rarity) comparison = -1;
      if(t1Rarity < t2Rarity) comparison = 1;
      return comparison;
    },
    compareByStats: function(t1, t2) {
      let comparison = 0;

      if(this.statPriority === "total"){
        this.sortBadgeText = "Total"
        const t1TotalStats = Object.values(t1.stats).reduce((total, stat) => total += stat, 0)
        const t2TotalStats = Object.values(t2.stats).reduce((total, stat) => total += stat, 0)

        if (t1TotalStats < t2TotalStats) { comparison = 1; } 
        else if (t1TotalStats > t2TotalStats) { comparison = -1; }
      } else {
        this.sortBadgeText = this.statPriority[4].toUpperCase() + this.statPriority.substring(5);
        if (t1.stats[this.statPriority] < t2.stats[this.statPriority]) { comparison = 1; }
        else if (t1.stats[this.statPriority] > t2.stats[this.statPriority]) { comparison = -1; }
      }
      return comparison
    }
  },
  watch: {
    "searchTerm": function() {
      this.filterBySearch();
      this.filterBadgeText = this.searchTerm;
      setDraggable();
    },
    "statPriority": function () {
      this.sort("stats")
    },
    "sortBadgeText"(){
      if (!this.sortBadgeText){
        this.showSortBadge = false;
      } else {
        this.showSortBadge = true;
        setDraggable();
      }
    },
    "filterBadgeText": function(){
      if(!this.filterBadgeText){
        this.showFilterBadge = false
      } else {
        this.showFilterBadge = true;
        setDraggable();
      }
    }
  },
  created() {
    this.initialResults();
  },
  components: {
    LooneyTune: Character,
  }
}

function setDraggable() {
    $("#draggable-filter-reminder").draggable();
}
</script>

<style>
body { background-color: #EEE }

#floating-tweety {
  position: absolute;
  left: -10%;
  top: 40%;
  max-width: 100px;
  z-index: -1;
  animation: tweetyFloat 2.1s infinite;
}

@keyframes tweetyFloat{
    0% {
        transform: translate3d(0, 0, 0);
        animation-timing-function: ease-in;
    }

    50% {
        transform: translate3d(0, 20px, 0);
        animation-timing-function: ease-out
    }

    100% { transform: translate3d(0, 0, 0) }
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
}

.character-tile {
  display: inline-block;
  box-shadow: 2px 2px 10px silver;
}

#character-box {
  max-height: 70vh;
  overflow: auto;
  /* box-shadow: 5px 5px 10px silver; */
}

.m10 {
  margin: 10px;
}

#bad-search {
  height: 100%;
  font-size: 100pt;
  width: 100%;
}

#bad-search img {
  border-radius: 20px;
  box-shadow: 5px 10px 10px black;
  margin-top: 20px;
  margin-bottom: 50px;
}

.filter-group {
  position: absolute; 
  display: flex; 
  flex-direction: column;
  border-bottom: 1px solid grey;
  border-left: 1px solid grey;
  border-right: 1px solid grey;
  border-radius: 10px;
  box-shadow: 3px 3px 3px silver;
  z-index: 9;
}

.filter-group:hover {
  background-color: white;
  color: red;
}

.small-info {
  margin-top: 5px;
  font-size: .6rem;
}
.good { color: mediumseagreen }
.bad { color: maroon }


@media only screen and (max-width: 700px) {
  #bad-search img {
    max-width: 300px;
  }
}

#role-icon-btns {
  display: flex;
  justify-content: space-around;
  margin: auto;
}

#role-con-btns button {
  align-self: center;
  justify-self: center;
}

#sort-method-btns {
  margin-top: 20px;
}

.center {
  margin: auto;
  text-align: center;
}

.link, .link:hover {
  font-size: 24pt;
  color: rgb(32, 178, 170)
}
.link:hover {
  color: rgb(2, 148, 140);
}

.dropdown-menu {
    box-shadow: 4px 4px 4px silver;
}
.dropdown-menu button {
  margin-top: 3px;
  /* border: 1px solid grey; */
  /* border-radius: 5px; */
  text-align: center;
  font-family: 'Courier New', Courier, monospace;
}

.badge {
  color: #777;
  border: 1px solid #777;
  font-size: .6rem;
  margin-top: 10px;
  padding: 8px;
  box-shadow: 2px 2px 2px silver;
}

.badge:hover {
  transform: scale(1.05)
}

#search_bar {
  font-family: 'Charm', cursive;
}
</style>
