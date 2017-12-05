(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Splain", [], factory);
	else if(typeof exports === 'object')
		exports["Splain"] = factory();
	else
		root["Splain"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Token = function () {
    function Token(type, data, raw) {
        _classCallCheck(this, Token);

        this.type = type;
        this.data = data;
        this.raw = raw;
    }

    _createClass(Token, [{
        key: 'convert',
        value: function convert(dictionary) {
            switch (this.type) {
                case 'splain':
                    var entry = dictionary.getEntry(this.data, false);
                    if (entry !== null && Array.isArray(entry)) {
                        return entry[Math.floor(Math.random() * entry.length)];
                    }
                    return null;
                    break;
                case 'blank':
                    return " ";
                case 'lit':
                    return this.data;
                default:
                    return undefined;
            }
        }
    }]);

    return Token;
}();

exports.default = Token;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _splain = __webpack_require__(2);

var _splain2 = _interopRequireDefault(_splain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = new _splain2.default();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dictionary = __webpack_require__(3);

var _dictionary2 = _interopRequireDefault(_dictionary);

var _SplainConfig = __webpack_require__(4);

var _SplainConfig2 = _interopRequireDefault(_SplainConfig);

var _defaultDictionaries = __webpack_require__(5);

var _defaultDictionaries2 = _interopRequireDefault(_defaultDictionaries);

var _templateFinder = __webpack_require__(6);

var _templateFinder2 = _interopRequireDefault(_templateFinder);

var _templateProcessor = __webpack_require__(7);

var _templateProcessor2 = _interopRequireDefault(_templateProcessor);

var _templateExecutor = __webpack_require__(8);

var _templateExecutor2 = _interopRequireDefault(_templateExecutor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Splain = function () {
    function Splain() {
        _classCallCheck(this, Splain);

        this.dictionary = new _dictionary2.default();
        this.dictionary.addEntry(_defaultDictionaries2.default);
        this.config = new _SplainConfig2.default();
    }

    _createClass(Splain, [{
        key: "addEntry",
        value: function addEntry(JSON, name) {
            this.dictionary.addEntry(JSON, name);
        }
    }, {
        key: "process",
        value: function process(text, addQuotes, unmatchedTemplates) {
            var _this = this;

            if (!unmatchedTemplates) {
                unmatchedTemplates = [];
            }
            _templateFinder2.default.getTemplates(text).map(function (template) {
                return _templateFinder2.default.stripTemplate(template);
            }).forEach(function (template) {
                if (_templateFinder2.default.containsTemplate(template)) {
                    var output = "" + _this.process(template, true, unmatchedTemplates);
                    text = text.replace(template, output);
                    template = "" + output;
                }
                var compiledTemplate = _templateExecutor2.default.run(_templateProcessor2.default.getTokens(template), _this.dictionary);
                if (compiledTemplate.includes("null") && _this.config.keepTemplateOnUnmatched) {
                    unmatchedTemplates.push(template);
                    return;
                }
                if (addQuotes) compiledTemplate = "`" + compiledTemplate + "`";
                text = text.replace("{{" + template + "}}", compiledTemplate);
            });

            if (_templateFinder2.default.containsTemplate(text) !== null) {
                var remainingTemplates = _templateFinder2.default.getTemplates(text).map(function (template) {
                    return _templateFinder2.default.stripTemplate(template);
                });
                if (!remainingTemplates.every(function (val) {
                    return unmatchedTemplates.includes(val);
                })) {
                    text = this.process(text, false, unmatchedTemplates);
                }
            }

            return text;
        }
    }]);

    return Splain;
}();

exports.default = Splain;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dictionary = function () {
    function Dictionary() {
        _classCallCheck(this, Dictionary);

        this.entries = {};
    }

    _createClass(Dictionary, [{
        key: "addEntry",
        value: function addEntry(JSONEntry, name) {
            var _this = this;

            if (name) {
                this.entries[name] = JSONEntry;
            } else {
                Object.keys(JSONEntry).forEach(function (key) {
                    _this.addEntry(JSONEntry[key], key);
                });
            }
        }
    }, {
        key: "getEntry",
        value: function getEntry(name, explicit) {
            if ((typeof explicit === "undefined" ? "undefined" : _typeof(explicit)) === ( true ? "undefined" : _typeof(undefined))) explicit = true;
            if (!name.includes(".")) {
                return this.entries[name];
            }

            var path = name.split(".");

            var entry = path.reduce(function (currentStep, nextStep) {
                if (currentStep === null) return null;
                var curObj = currentStep[nextStep];
                if (curObj) {
                    return curObj;
                } else {
                    if (!explicit) return currentStep;else {
                        return null;
                    }
                }
            }, this.entries);
            if (explicit && Array.isArray(entry) === false) {
                console.warn("entry was not found explicitly or was not array, make sure entry is valid or call with explicit off ");
                return null;
            }

            return entry;
        }
    }]);

    return Dictionary;
}();

exports.default = Dictionary;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SplainConfig = function () {
  function SplainConfig() {
    _classCallCheck(this, SplainConfig);

    this.keepTemplateOnUnmatched = true;
  }

  _createClass(SplainConfig, [{
    key: "configure",
    value: function configure(key, value) {
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    }
  }]);

  return SplainConfig;
}();

exports.default = SplainConfig;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    adj: {
        size: {
            xxl: ["enormous", "massive", "gigantic", "colossal", "gargantuan", "brobdingnagian"],
            xl: ["giant", "huge", "vast", "mammoth"],
            l: ["big", "jumbo", "large"],
            s: ["small", "slight", "petite", "slender", "trim", "diminuitive"],
            xs: ["tiny", "minuscule", "lilliputian"]
        },
        temp: {
            cold: ["cold", "freezing", "icy", "brisk", "bleak", "nippy", "chilly", "cool", "bracing"],
            lukewarm: ["tepid", "room temperature"],
            warm: ["hot", "boiling", "sweltering", "roasting", "scorching", "melting", "sizzling", "burning", "fiery"]
        },
        difficulty: {
            impossible: ["insurmountable", "intractable"],
            hard: ["difficult", "hard", "troublesome", "tough", "arduous", "laborious", "strenuous", "back breaking"],
            easy: ["easy", "simple", "effortless", "straightforward", "trivial"]
        },
        boring: ["uninteresting", "bland"],
        interesting: ["interesting", "appealing", "delightful", "engaging", "compelling", "enchanting", "gripping", "fascinating", "riveting", "intriguing"],
        veryInteresting: ["{{adverbs.very adj.interesting}}", "{{adj.size.xxl'ly' adj.interesting}}"],
        speed: {
            fast: ["fast", "upbeat", "quick", "brisk", "hasty"],
            slow: ["slow", "creep", "laggy", "crawl", "lackadaisical", "lethargic"]
        },
        color: ["red", "blue", "green", "purple", "pink", "gray", "black", "orange", "brown", "charcoal", "cyan", "magenta", "fuchsia", "yellow", "gold", "silver", "white", "teal", "turquoise", "mauve"]
    },
    adverbs: {
        speed: {
            fast: ["quickly", "speedily", "hastily", "rapidly", "briskly", "promptly", "swiftly"],
            slow: ["slowly", "sluggishly", "unhurriedly", "lazily", "casually", "lackadaisically"]
        },
        very: ["very", "exceedingly", "awfully", "greatly", "emininently", "absolutely", "extraordinarily", "extremely", "really", "terribly"],
        frequency: {
            always: ["always", "constantly", "unceasingly", "incessantly"],
            frequently: ["usually", "normally", "often", "frequently"],
            sometimes: ["sometimes", "occasionally", "intermittenly"],
            infrequently: ["hardly ever", "rarely", "seldom", "infrequently", "irregularly", "once in a blue moon"],
            never: ["never"]
        }
    },
    weather: {
        rain: ["drizzling", "showering", "raining", "spitting", "pouring", "deluge"],
        sun: ["sunny", "warm", "bright", "luminous", "radiant"],
        snow: ["thundersnow", "blizzard", "flurry", "snow storm", "snowsquall", "lake-effect snow", "sleet", "slush"],
        wind: ["airstream", "breeze", "berg wind", "crosswind", "dust devil", "easterly", "gale", "gust", "headwind", "jet stream", "mistral", "monsoon", "sandstorm", "prevailing wind", "sea breeze", "sicocco", "southwester", "tail wind", "tornado", "trade wind", "turbulance", "twister", "typhoon", "whirlwind", "wind", "windstorm", "zephr"],
        winter: ["freezing", "snowy", "icy", "slick", "frosty", "arctic", "bitingly chilly", "polar"],
        fog: ["foggy", "misty", "smog", "haze"]
    },
    genre: {
        music: ["rock", "pop", "punk", "indie", "hip hop", "reggae", "folk", "country", "blues", "classical", "jazz", "alternative", "electronic", "metal", "dubstep", "rap", "ragtime", "disco"],
        film: ["action", "adventure", "comedy", "drama", "fantasy", "horror", "thriller", "romance", "science fiction", "western", "documentary"],
        book: ["non fiction", "fiction", "sci-fi", "mystery", "cyberpunk", "graphic", "young adult", "children", "classic", "romance", "fantasy", "science fiction", "speculative", "poetry", "suspense"]
    },
    nouns: {
        landtypes: ["forest", "desert", "rain forest", "mountains", "plains", "grasslands", "bush", "tundra", "jungle", "bog", "swamp", "veldt", "hills", "wetlands"],
        food: {
            fruit: ["banana", "apple", "orange", "pear", "pineapple", "grapefruit", "avocado", "passionfruit", "strawberry", "kiwifruit", "grape", "peach", "cherry", "guava", "blueberry", "blackberry", "raspberry", "watermelon", "melon", "mango", "nectarine", "starfruit", "date", "cranberry", "persimmon", "gooseberry", "kumquat", "jujube", "boysenberry", "longan"],
            desserts: ["cupcakes", "ice cream", "cookies", "brownies", "apple pie", "pumpkin pie", "cake", "cheesecake", "muffin", "fruit salad", "tiramisu", "tart", "cobbler", "macaron", "macaroon", "custard", "rice pudding", "sorbet", "flan", "gelato"],
            vegetables: ["avocado", "asparagus", "arugula", "beet", "broccoli", "brussel sprout", "cabbage", "carrot", "cauliflower", "celery", "chard", "collard greens", "corn", "kale", "lettuce", "mushroom", "onion", "pepper", "parsley", "rhubarb", "parsnip", "radish", "spinach", "squash", "tomato", "sweet potato", "yam", "zucchini"],
            breakfast: ["eggs", "toast", "pancakes", "coffee", "orange juice", "bacon", "sausage", "oatmeal", "waffles", "cereal", "bagel", "muesli", "granola bar"],
            condiments: ["ketchup", "mustard", "mayonaise", "soy sauce", "vinegar", "sauerkraut", "salsa", "relish", "hot sauce", "sriracha"],
            lunch: ["sandwich", "soup", "salad", "pizza", "leftovers", "tacos", "burrito", "sushi"],
            dinner: ["roast chicken", "meatloaf", "steak", "baked potato", "lasagna", "casserole"]
        },
        clothes: {
            shirts: ["t-shirt", "button-down", "dress", "hawaiian", "tank-top", "tie-dye", "flannel"],
            sweaters: ["cardigan", "wool", "cashmere", "knitted", "cosby"],
            coats: ["jacket", "overcoat", "army", "camouflage", "raincoat", "slicker", "dress"],
            pants: ["jeans", "trousers", "corduroy", "short", "riding", "skinny jeans", "dress", "cargo"],
            skirts: ["riding", "mini", "maxi", "tutu", "ruffled"],
            shoes: ["boots", "tap", "dance", "high-heel", "riding"],
            dresses: ["gown", "ballgown", "evening", "sun-dress"],
            socks: ["hose", "knee-high", "jeggings", "leggings", "panty-hose", "tights", "nylons"],
            gloves: ["mittens", "fingerless", "wool", "army", "riding", "driving", "lace", "leather"],
            hats: ["top", "baseball cap", "bowler", "cowboy", "tricorne", "crown", "bonnet"],
            accessories: ["tie", "kerchief"],
            swimsuits: ["speedo", "bikini", "trunks", "monokini", "one-piece", "wetsuit", "diving suit"]
        },
        daytime: ["morning", "afternoon", "evening", "night", "sunset", "sunrise", "dusk", "dawn", "midnight", "twilight"],
        trees: ["ash", "beech", "birch", "conifer", "fir", "larch", "maple", "oak", "pine", "spruce", "sycamore", "willow", "yew", "rowan", "hickory"],
        nationalParks: ["Denali", "Gates of the Arctic", "Glacier Bay", "Katmai", "Kenai Fjords", "Kobuk Valley", "Lake Clark", "Wrangell - St. Elias", "American Samoa", "Grand Canyon", "Petrified Forest", "Saguaro", "Hot Springs", "Channel Islands", "Death Valley", "Joshua Tree", "Kings Canyon", "Lassen Volcanic", "Redwood", "Sequoia", "Yosemite", "Black Canyon of the Gunnison", "Great Sand Dunes", "Mesa Verde", "Rocky Mountain", "Biscayne", "Dry Tortugas", "Everglades", "Haleakala", "Hawaii Volcanoes", "Yellowstone", "Mammoth Cave", "Acadia", "Isle Royale", "Voyageurs", "Glacier", "Yellowstone", "Great Basin", "Carlsbad Caverns", "Great Smoky Mountains", "Theodore Roosevelt", "Cuyahoga Valley", "Crater Lake", "Congaree", "Badlands", "Wind Cave", "Great Smoky Mountains", "Big Bend", "Guadalupe Mountains", "Virgin Islands", "Arches", "Bryce Canyon", "Capitol Reef", "Canyonlands", "Zion", "Shenandoah", "Mount Rainier", "North Cascades", "Olympic", "Grand Teton"],
        animal: {
            mammels: ["monkey", "lion", "jaguer", "elephant", "gorilla", "gopher", "armadillo", "pnagolin", "dog", "cat", "bear", "mouse", "rabbit", "horse", "giraffe", "donkey", "wolf", "coyote", "rhino", "hippo", "aardvark", "alpaca", "llama", "cow", "moose", "deer", "dolphin", "skunk", "walrus", "whale", "zebra", "goat", "racoon", "rat", "chipmonk", "panda", "ferret", "sheep"],
            reptiles: ["snake"],
            birds: ["crow", "chicken", "duck"],
            fish: ["eel", "clown", "shark", "tuna", "salmon"],
            crustaceans: ["crab", "lobster"],
            molluscs: ["clam"],
            insects: ["ant", "butterfly"],
            gastropods: ["snail"],
            amphibians: ["frog", "salamander"]
        },

        country: ["Afghanistan", "Albania", "Algeria", "America", "Andorra", "Angola", "Antigua", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bissau", "Bolivia", "Bosnia", "Botswana", "Brazil", "British", "Brunei", "Bulgaria", "Burkina", "Burma", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech", "Denmark", "Djibouti", "Dominica", "East Timor", "Ecuador", "Egypt", "El Salvador", "Emirate", "England", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Great Britain", "Greece", "Grenada", "Grenadines", "Guatemala", "Guinea", "Guyana", "Haiti", "Herzegovina", "Holland", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Samoa", "San Marino", "Sao Tome", "Saudi Arabia", "Scotland", "Scottish", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "St Kitts", "St Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Tobago", "Togo", "Tonga", "Trinidad", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Kingdom", "United States", "Uruguay", "USA", "Uzbekistan", "Vanuatu", "Vatican", "Venezuela", "Vietnam", "Wales", "Welsh", "Yemen", "Zambia", "Zimbabwe", "Antigua and Barbuda", "Bosnia and Herzegovina", "Burkina Faso", "Cabo Verde", "Central African Republic", "Democratic Republic of the Congo", "Republic of the Congo", "Cote d'Ivoire", "South Korea", "Timor-Leste", "Trinidad and Tobago", "United Arab Emirates", "United Kingdom", "United States of America", "Vatican City"],

        vehicle: ["ambulance", "bicycle", "boat", "bulldozer", "bus", "car", "jeep", "minibus", "mini cooper", "motorcycle", "scooter", "sidecar", "snowplow", "tank", "taxi", "tractor", "truck"],
        place: ["amusement park", "apartments", "beach", "church", "factory", "farm", "fire station", "hospital", "house", "library", "mosque", "park", "playground", "police station", "school", "store", "temple", "university", "zoo", "office", "synagogue", "city hall"],
        sport: ["football", "cricket", "basketball", "baseball", "hockey", "tennis", "volleyball", "rugby", "soccer", "swimming", "cycling"],
        states: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"],
        body: ["ankle", "arm", "back", "blood", "liver", "lung", "kidney", "bone", "brain", "cheek", "chest", "chin", "ear", "elbow", "eye", "finger", "foot", "hand", "heart", "knee", "leg", "lip", "mouth", "muscle", "neck", "nose", "shoulder", "stomach", "teeth", "toe", "tongue", "wrist"],
        season: ["fall", "autumn", "winter", "summer", "spring", "monsoon"],
        computer: ["mouse", "keyboard", "processor", "hard drive", "software", "RAM", "monitor", "speakers", "usb", "GPU", "VRAM", "motherboard", "SSD", "power supply", "CPU", "sound card", "KVM switch"]
    }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var regTemplateMatcher = /{{.*?}}/g;

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);
    }

    _createClass(_class, null, [{
        key: "getTemplates",
        value: function getTemplates(text) {
            var templates = [];
            while (text.includes("{{") && text.includes("}}")) {
                var start = text.indexOf("{{"),
                    nested = 0;
                //start +2 to skip  initial brackets
                for (var i = start + 2; i < text.length - 1; i++) {
                    if (text[i] + text[i + 1] === "{{") {
                        nested++;
                    }
                    if (text[i] + text[i + 1] === "}}") {
                        if (nested > 0) {
                            nested--;
                            i += 1; //skip over the other nested '}'
                        } else {
                            templates.push(text.substring(start, i + 2));
                            text = text.slice(0, start) + text.slice(i + 2);
                            i = text.length;
                        }
                    }
                }
            }
            return templates;
        }
    }, {
        key: "stripTemplate",
        value: function stripTemplate(template) {
            var open = template.indexOf("{{"),
                close = template.lastIndexOf("}}") - 2;
            if (open > -1) template = template.slice(0, open) + template.slice(open + 2);
            if (close > -1) template = template.slice(0, close) + template.slice(close + 2);
            return template;
        }
    }, {
        key: "containsTemplate",
        value: function containsTemplate(text) {
            return text.match(regTemplateMatcher);
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _splainToken = __webpack_require__(0);

var _splainToken2 = _interopRequireDefault(_splainToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var regToken = /[?`|\s]/;

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);
    }

    _createClass(_class, null, [{
        key: "getTokens",
        value: function getTokens(template) {
            var tokens = [];
            var n = 100000;
            while (template) {
                n--;
                var nextToken = this.findNextToken(template);
                tokens.push(nextToken);
                template = template.slice(nextToken.raw.length);
                if (n < 0) {
                    console.warn("couldn't finish processing tokens after 100,000 panicking..");
                    break;
                }
            }

            return tokens;
        }
    }, {
        key: "findNextToken",
        value: function findNextToken(template) {
            var n = 1;
            if (template[0] === "?") {
                for (; !isNaN(template[n]) && template[n] !== " " && n < template.length; n++) {}
                return new _splainToken2.default("?", template.substring(1, n) || "2", template.substring(0, n));
            }
            if (template[0] === "|") {
                return new _splainToken2.default("|", null, "|");
            }
            if (template[0] === " " || template[0] === "\n") {
                return new _splainToken2.default("blank", null, template[0]);
            }
            if (template[0] === "`") {
                for (; template[n] !== "`" && n < template.length; n++) {}
                return new _splainToken2.default("lit", template.substring(1, n), template.substring(0, n + 1));
            }
            var nextToken = template.search(regToken);
            if (nextToken < 0) nextToken = template.length;
            return new _splainToken2.default("splain", template.substring(0, nextToken), template.substring(0, nextToken));
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _splainToken = __webpack_require__(0);

var _splainToken2 = _interopRequireDefault(_splainToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);
    }

    _createClass(_class, null, [{
        key: "run",
        value: function run(tokens, dictionary) {
            this.executeOrs(tokens);
            this.executeConditionals(tokens);
            var retString = "";
            tokens.forEach(function (token) {
                retString += token.convert(dictionary);
            });

            return retString;
        }
    }, {
        key: "executeConditionals",
        value: function executeConditionals(tokens) {
            while (this.findFirstTokenOfType("?", tokens) !== null) {
                var conditionalIndex = this.findFirstTokenOfType("?", tokens);
                if (conditionalIndex !== null) {
                    if (this.rand(tokens[conditionalIndex].data) !== 1) {
                        var target = this.getPreceedingTokenOfType(["lit", "splain"], tokens, conditionalIndex);
                        tokens.splice(target, conditionalIndex - target + 1);
                    } else {
                        tokens.splice(conditionalIndex, 1);
                    }
                } else {
                    break;
                }
            }
        }
    }, {
        key: "executeOrs",
        value: function executeOrs(tokens) {
            while (this.findFirstTokenOfType("|", tokens) !== null) {
                var indexOfOr = this.findFirstTokenOfType("|", tokens);
                if (indexOfOr !== null) {
                    var prec = this.getPreceedingTokenOfType(["lit", "splain"], tokens, indexOfOr),
                        proc = this.getProceedingTokenOfType(["lit", "splain"], tokens, indexOfOr);

                    if (prec !== null && proc !== null) {
                        var side = this.rand(2);
                        if (side === 1) //remove left
                            {
                                tokens.splice(prec, indexOfOr - prec + 1);
                            } else {
                            if (proc + 1 < tokens.length && tokens[proc + 1].type === "?") proc++;
                            tokens.splice(indexOfOr, proc - indexOfOr + 1);
                        }
                    } else tokens.splice(indexOfOr, 1);
                } else {
                    break;
                }
            }
        }
    }, {
        key: "findFirstTokenOfType",
        value: function findFirstTokenOfType(type, tokens) {
            for (var i = 0; i < tokens.length; i++) {
                if (tokens[i].type === type) return i;
            }
            return null;
        }
    }, {
        key: "getPreceedingTokenOfType",
        value: function getPreceedingTokenOfType(types, tokens, index) {
            if (index === 0) return null;
            for (var i = index - 1; i >= 0; i--) {
                if (types.indexOf(tokens[i].type) > -1) return i;
            }
            return null;
        }
    }, {
        key: "getProceedingTokenOfType",
        value: function getProceedingTokenOfType(types, tokens, index) {
            if (index === tokens.length - 1) return null;
            for (var i = index + 1; i < tokens.length; i++) {
                if (types.indexOf(tokens[i].type) > -1) return i;
            }
            return null;
        }

        //random number between 1 and n inclusive

    }, {
        key: "rand",
        value: function rand(n) {
            return Math.floor(Math.random() * n) + 1;
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ })
/******/ ]);
});