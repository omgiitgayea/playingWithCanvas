/**
 * Created by GodaiYuusaku on 10/24/16.
 */
// storage.local.set("oreNoPokemon", ["Pikachu", "Purin", "Fushigidane", "Zenigame", "Mizugoro"]);

document.getElementById("local").innerHTML = storage.local.get("oreNoPokemon");

// storage.session.set("mmosToEatTime", ["Elder Scrolls Online", "The Old Republic", "DC Online", "Star Trek Online", "World of Warcraft"]);

document.getElementById("session").innerHTML = storage.session.get("mmosToEatTime");