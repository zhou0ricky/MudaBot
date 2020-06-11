/** 
 *  Array of Civilization V civilizations. Each element of this array is a 
 *  array with the civilizaton's standard name at index 0 and aliases
 *  as subsequent indices. All entries are lowercase. The last element
 *  in each subarray is always the ruler of the civilization
 */
const _civs = [
  ["america","american","usa","us","🇺🇸","washington"],
  ["arabia","arabian","ara","arab","🇸🇦","rashid"],
  ["assyria","assyrian","syr","ass","syria","🇸🇾","ashurbanipal"],
  ["austria","austrian","aus","🇦🇹","theresa"],
  ["aztec","aztecs","azt","az","montezuma"],
  ["babylon","babylonian","baby","bab","ba","nebu","nebuchadnezzar"],
  ["brazil","brazillian","brazilian","braz","bra","br","🇧🇷","pedro"],
  ["byzantine empire","byzantine","byz","theodora"],
  ["carthage","carthaginian","car","🇹🇳","dido"],
  ["celts","celtic","cel","ie","ireland","irish","🕈","☘️","🍀","🇮🇪","bou","boudicca"],
  ["china","chinese","chi","chn","ch","🇨🇳","prc","wu","zetian"],
  ["denmark","danish","dnk","den","d","dn","blue","🇩🇰","harald","harold","bluetooth"],
  ["netherlands","dutch","nld","nl","n","nether","🇳🇱","🍊","orange","william"],
  ["egypt","egyptian","egy","eg","🇪🇬","ramesses","rameeses"],
  ["england","english","eng","en","🏴󠁧󠁢󠁥󠁮󠁧󠁿","🇬🇧","elizabeth"],
  ["ethiopia","ethiopian","eth","et","🇪🇹","haile","selassie"],
  ["france","french","fra","fr","f","🇫🇷","napoleon"],
  ["germany","german","ger","de","deutsch","deutschland","🇩🇪","bismarck"],
  ["greece","greek","gre","gr","🇬🇷","alex","alexander"],
  ["the huns","huns","hunnic","hun","h","attila"],
  ["inca","incan","inc","🇵🇪","pachacuti"],
  ["india","indian","ind","🇮🇳","🛕","☢️","gandhi"],
  ["indonesia","indonesian","idn","indo","🇮🇩","gajah","mada","gajah mada"],
  ["iroquois","iro","hiawatha"],
  ["japan","japanese","jpn","jap","j","🇯🇵","🗾","🌸","oda","nobunaga"],
  ["korea","korean","rok","kor","k","sk","🇰🇷","sejong"],
  ["maya","mayan","may","pacal"],
  ["mongolia","mongolian","mongols","mongol","mn","genghis","🇲🇳","khan"],
  ["morocco","moroccan","mor","mar","morroco","🇲🇦","ahmad","mansur","al-mansur"],
  ["ottoman empire","ottoman","otto","o","🇹🇷","suleiman"],
  ["persia","persian","per","🇮🇷","darius"],
  ["poland","polish","🇵🇱","casimir"],
  ["polynesia","polynesian","poly","🇫🇲","🇵🇫","kamehameha"],
  ["portugal","portuguese","por","port","🇵🇹","maria i"],
  ["Roman Empire","rome","rom","augustus","caesar"],
  ["russia","russian","rus","ussr","soviet","🇷🇺","catherine"],
  ["shoshone","sho","pocatello"],
  ["siam","siamese","sia","thailand","tha","🇹🇭","ramkhamhaeng"],
  ["songhai","song","hai","son","🇲🇱","askia"],
  ["spain","spanish","spa","esp","es","🇪🇸","isabella"],
  ["sweden","swedish","swe","se","🇸🇪","gustavus","adolphus"],
  ["venice","venetian","ven","v","enrico","dandolo","doge"],
  ["zulu","zulus","z","🇿🇦","zul","shaka"]
];

/**
 * Shuffles array in place using the Fisher-Yates algorithm
 * @param {Array} a An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

/**
 * Converts a string to title case.
 * @param {string} str The string to be made titlecase.
 */
function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

/**
 * Outputs a comma separated representation of an array, separated by spaces and without braces
 * @param {Array} a An array.
 */
function arrToString(a) {
  if(a.length == 0) {return;}
  var s = "";
  for(var i = 0; i < a.length; i++) {
    s += a[i]
    if (i < a.length-1) {s+=", ";}
  }
  return s;
}

/**
 * Draft civs from Civilization V.
 * The first element of args specifies the number of players and the second
 * specifies the number of civs drafted to each player. Subsequent arguments
 * can be used to ban civs (for example, -bab bans Babylon). An argument of
 * the form [name1,name2,name3,name4] outputs those names on the draft
 * printout, otherwise the generic "Player #" is used.
 *
 * Using the command civ 3 5 [alice,bob,charlie] -bab -egy -poland 
 * drafts 5 civs for 3 players each, pairing the draft with alice, bob, and
 * charlie, and bans Babylon, Egypt, and Poland from the draft.
 *
 * @param {object} message A DiscordJS Message object.
 * @param {list} args A list of string arguments.
 */
var civ = (message, args) => {
    console.log(typeof(message))
    var p_list = [], rm_civs = []; // Arrays of players and banned  civs
    var civs = shuffle(_civs.slice(0)); // Copy and shuffle civ array
    /**
     * Parse parameters for the civ command
     * @param {string} s The parameter passed
     */
    function civ_parse_params(s) {
      // Banned civ condition
      if(s[0] === '-') {
        var tag = s.substring(1,s.length).toLowerCase();
        // Query civ in civ array
        var rm = -1;
        for(var i=0; i<civs.length; i++){
          if(civs[i].includes(tag)) {rm = i;} // Civ found
        }
        // Civ not found
        if(rm != -1) {
          rm_civs.push(toTitleCase(civs[rm][0]));
          civs.splice(rm,1);
        }
        if(rm === -1) {message.channel.send(s+" is not a valid civ or is ambiguous.");}
      } else if(s[0] === '[' && s[s.length-1] === ']') {p_list = s.substring(1,s.length-1).split(',');} // Player array condition
    }
    const players = parseInt(args[0]);
    const options = parseInt(args[1]);
    // First and second parameters must represent natural numbers of players and/or options
    if (isNaN(players) || isNaN(options) || players<1 || options<1) {
      message.channel.send("You specified an invalid number of players and/or number of options.");
    } else {
      args.forEach(civ_parse_params); // Parse parameters
      if(rm_civs.length>0) { message.channel.send("*Banned civs: "+arrToString(rm_civs)+"*");} // Notify banned civ(s)
      // Check if too many civs specified
      if(players*options > civs.length) {
        message.channel.send("There are not enough available civilizations for this draft.");
      } else {
        var draft = Array.from({length:players}, _=>[]); // Pre-populate draft
        for(var j = 0; j < players*options; j++) {draft[j%players].push(toTitleCase(civs[j][0]));} // Draft
        var to_send = ""; // Build message to send
        for(var i=0; i < players; i++) {
          if(p_list.length === players) {to_send += "**" + p_list[i] + ":** "+arrToString(draft[i])+"\n";} 
          else {to_send += "**Player "+(i+1)+":** "+arrToString(draft[i]) +"\n";}
        }
        message.channel.send(to_send);
      }
    }
}

module.exports = {
    name: 'civ',
    aliases: ['civ','draft','civs'],
    description: 'Draft civs for Civilization V! The first element of args specifies the number of players and the second specifies the number of civs drafted to each player. Subsequent arguments can be used to ban civs (for example, -bab bans Babylon). An argument of the form [name1,name2,name3,name4] outputs those names on the draft printout, otherwise the generic "Player #" is used.',
    usage: '&civ num_players num_options [name1,name2,name3,...] -bannedciv1 -banendciv2 ...',
    cooldown: 1,
    execute: civ,
};
