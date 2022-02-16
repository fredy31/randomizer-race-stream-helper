import GenericLetters from "./items/genericletters";
import PokemonBadges from "./items/pokemonbadges";
import PokemonOthers from "./items/pokemonbadges";

const Config = {
    "firebaseURL":"https://speedruntracker-default-rtdb.firebaseio.com",
    "firebaseApiKey":"AIzaSyDRpi5OTU-hDSxlDYoW7bj1LRGRHbZGSXE",
    "firebaseAuthDomain":"speedruntracker.firebaseapp.com",
    "items": {
       ...GenericLetters,
       ...PokemonBadges,
       ...PokemonOthers,
        "triforce":{
            "type":"svg",
            "content":"triforce",
            "nicename": "Triforce"
        },
        "go":{
            "type":"png",
            "content":"go",
            "nicename": "GO!"
        },
        "phone":{
            "type":"png",
            "content":"phone",
            "nicename": "Phone"
        },
        "trophy":{
            "type":"png",
            "content":"trophy",
            "nicename": "Trophy"
        },
    },
    "sets":{
        //"pokemon":"pokemon-tm,pokemon-pokeball,r",
        "pokemon-gen1-indigo-badges":"pokemon-badge-boulder,pokemon-badge-cascade,pokemon-badge-thunder,pokemon-badge-rainbow,pokemon-badge-soul,pokemon-badge-marsh,pokemon-badge-volcano,pokemon-badge-earth",
        "pokemon-gen2-johto-badges":",pokemon-badge-zephyr,pokemon-badge-hive,pokemon-badge-plain,pokemon-badge-fog,pokemon-badge-storm,pokemon-badge-mineral,pokemon-badge-glacier,pokemon-badge-rising",
        "pokemon-gen3-hoenn-badges":",pokemon-badge-stone,pokemon-badge-knuckle,pokemon-badge-dynamo,pokemon-badge-heat,pokemon-badge-balance,pokemon-badge-feather,pokemon-badge-mind,pokemon-badge-rain",
        "pokemon-gen4-sinnoh-badges":",pokemon-badge-coal,pokemon-badge-forest,pokemon-badge-cobble,pokemon-badge-fen,pokemon-badge-relic,pokemon-badge-mine,pokemon-badge-icicle,pokemon-badge-beacon",
        "pokemon-bw-badges":",pokemon-badge-trio,pokemon-badge-basic,pokemon-badge-insect,pokemon-badge-bolt,pokemon-badge-quake,pokemon-badge-jet,pokemon-badge-freeze,pokemon-badge-legend",
        "pokemon-bw2-badges":",pokemon-badge-basic,pokemon-badge-toxic,pokemon-badge-insect,pokemon-badge-bolt,pokemon-badge-quake,pokemon-badge-jet,pokemon-badge-legend,pokemon-badge-wave",
        "pokemon-gen5-kalos-badges":",pokemon-badge-bug,pokemon-badge-cliff,pokemon-badge-rumble,pokemon-badge-plant,pokemon-badge-voltage,pokemon-badge-fairy,pokemon-badge-psychic,pokemon-badge-iceberg",
        "pokemon-sword-badges":",pokemon-badge-grass,pokemon-badge-water,pokemon-badge-fire,pokemon-badge-fighting,pokemon-badge-fairy-galar,pokemon-badge-rock,pokemon-badge-dark,pokemon-badge-dragon",
        "pokemon-shield-badges":",pokemon-badge-grass,pokemon-badge-water,pokemon-badge-fire,pokemon-badge-ghost,pokemon-badge-fairy-galar,pokemon-badge-ice,pokemon-badge-dark,pokemon-badge-dragon",
        "pokemon-masters-badges":",pokemon-badge-tranquility,pokemon-badge-freedom,pokemon-badge-patience,pokemon-badge-glacier-masters,pokemon-badge-pride",
        "pokemon-crystal-randomizer":"pokemon-pokegear,pokemon-radio,pokemon-expension-card,pokemon-squirt-bottle,pokemon-secret-potion,pokemon-card-key,|,,pokemon-machine-part,pokemon-basement-key,pokemon-lost-item,pokemon-bicycle,pokemon-ss-ticket,pokemon-pass,|,,1,2,3,4,5,6,7,8,|,,pokemon-badge-boulder,pokemon-badge-cascade,pokemon-badge-thunder,pokemon-badge-rainbow,|,,pokemon-badge-soul,pokemon-badge-marsh,pokemon-badge-volcano,pokemon-badge-earth,|,,pokemon-badge-zephyr,pokemon-badge-hive,pokemon-badge-plain,pokemon-badge-fog,|,,pokemon-badge-storm,pokemon-badge-mineral,pokemon-badge-glacier,pokemon-badge-rising,|,,pokemon-team-rocket,pokemon-red,trophy,go,"
    }
}
export default Config;