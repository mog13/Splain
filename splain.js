(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Splain", [], factory);
	else if(typeof exports === 'object')
		exports["Splain"] = factory();
	else
		root["Splain"] = factory();
})(this, function() {
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

var _defaultDictionaries = __webpack_require__(4);

var _defaultDictionaries2 = _interopRequireDefault(_defaultDictionaries);

var _templateFinder = __webpack_require__(5);

var _templateFinder2 = _interopRequireDefault(_templateFinder);

var _templateProcessor = __webpack_require__(6);

var _templateProcessor2 = _interopRequireDefault(_templateProcessor);

var _templateExecutor = __webpack_require__(7);

var _templateExecutor2 = _interopRequireDefault(_templateExecutor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Splain = function () {
    function Splain() {
        _classCallCheck(this, Splain);

        this.dictionary = new _dictionary2.default();
        this.dictionary.addEntry(_defaultDictionaries2.default);
    }

    _createClass(Splain, [{
        key: "addEntry",
        value: function addEntry(JSON, name) {
            this.dictionary.addEntry(JSON, name);
        }
    }, {
        key: "process",
        value: function process(text, addQuotes) {
            var _this = this;

            var templates = _templateFinder2.default.getTemplates(text);
            templates.forEach(function (template) {
                template = _templateFinder2.default.stripTemplate(template);
                if (_templateFinder2.default.containsTemplate(template)) {
                    var output = "" + _this.process(template, true);
                    text = text.replace(template, output);
                    template = "" + output;
                }
                var compiledTemplate = _templateExecutor2.default.run(_templateProcessor2.default.getTokens(template), _this.dictionary);
                if (addQuotes) compiledTemplate = "`" + compiledTemplate + "`";
                text = text.replace("{{" + template + "}}", compiledTemplate);
            });

            if (_templateFinder2.default.containsTemplate(text) !== null) text = this.process(text);
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
exports.default = {
    adj: {
        size: {
            xxl: ["enormous", "massive", "gigantic", "colossal"],
            xl: ["giant", "huge", "vast", "mammoth"],
            l: ["big", "jumbo", "large"],
            s: ["small", "slight"],
            xs: ["tiny", "minuscule"]
        },
        temp: {
            cold: ["cold", "freezing", "icy", "brisk", "bleak", "nippy", "chilly", "cool"],
            warm: ["hot", "boiling", "sweltering", "roasting", "scorching", "melting", "sizzling"]
        },
        difficulty: {
            hard: ["difficult", "hard", "troublesome", "tough"],
            easy: ["easy", "simple", "effortless", "straightforward"]
        },
        interesting: ["interesting", "appealing", "delightful", "engaging", "compelling", "enchanting", "gripping", "fascinating", "riveting"],
        veryInteresting: ["{{adverbs.very adj.interesting}}", "{{adj.size.xxl'ly' adj.interesting}}"],
        speed: {
            fast: ["fast", "upbeat", "quick", "brisk"],
            slow: ["slow", "creep", "laggy", "crawl"]
        }
    },
    adverbs: {
        speed: {
            fast: ["quickly", "speedily", "hastily", "rapidly", "briskly", "promptly"],
            slow: ["slowly", "sluggishly", "unhurriedly", "lazily", "casually"]
        },
        very: ["very", "exceedingly", "awfully", "greatly"],
        frequency: ["always", "usually", "normally", "often", "sometimes", "occasionally", "hardly ever", "rarely", "never"]
    },
    weather: {
        rain: ["drizzling", "showering", "raining", "spitting", "pouring"],
        sun: ["sunny", "warm", "bright"],
        snow: ["thundersnow", "blizzard", "flurry", "snow storm", "snowsquall", "lake-effect snow", "sleet"],
        wind: ["airstream", "breeze", "berg wind", "crosswind", "dust devil", "easterly", "gale", "gust", "headwind", "jet stream", "mistral", "monsoon", "sandstorm", "prevailing wind", "sea breeze", "sicocco", "southwester", "tail wind", "tornado", "trade wind", "turbulance", "twister", "typhoon", "whirlwind", "wind", "windstorm", "zephr"],
        winter: ["freezing", "snowy", "icy", "slick", "frosty"]
    },
    genre: {
        music: ["rock", "pop", "punk", "indie", "hip hop", "reggae", "folk", "country", "blues", "classical", "jazz"],
        film: ["action", "adventure", "comedy", "drama", "fantasy", "horror", "thriller", "romance", "science fiction", "western"]
    },
    nouns: {
        food: {
            fruit: ["banana", "apple", "orange", "pear", "pineapple", "grapefruit", "avocado", "passionfruit", "strawberry", "kiwifruit", "grape", "peach", "cherry"],
            desserts: ["cupcakes", "ice cream", "cookies", "brownies", "apple pie", "pumpkin pie", "cake", "cheesecake"],
            vegetables: ['avocado', 'asparagus', 'arugula', 'beet', 'broccoli', 'brussel sprout', 'cabbage', 'carrot', 'cauliflower', 'celery', 'chard', 'collard greens', 'corn', 'kale', 'lettuce', 'mushroom', 'onion', 'pepper', 'parsley', 'rhubarb', 'parsnip', 'radish', 'spinach', 'squash', 'tomato', 'sweet potato', 'yam', 'zucchini']
        },
        daytime: ["morning", "afternoon", "evening", "night", "sunset", "sunrise", "dusk", "dawn"],
        animal: ["monkey", "lion", "jaguar", "elephant", "butterfly", "ant", "pangolin", "gorilla", "dog", "cat", "bear", "snake", "mouse", "rabbit", "horse", "giraffe", "armadillo", "donkey", "wolf", "cayote", "hippo", "lion", "rhino", "aardvark", "alpaca", "cow", "moose", "crow", "deer", "dolphin", "skunk", "snail", "walrus", "whale", "zebra", "duck", "eel", "goat", "raccoon", "rat", "frog", "gopher", "chicken", "chipmonk", "panda"],
        country: ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic (CAR)", "Chad", "Chile", "China", "Colombia", "Comoros", "Democratic Republic of the Congo", "Republic of the Congo", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates (UAE)", "United Kingdom (UK)", "United States of America (USA)", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City (Holy See)", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"],
        vehicle: ["ambulance", "bicycle", "boat", "bulldozer", "bus", "car", "jeep", "minibus", "motorcycle", "scooter", "sidecar", "snowplow", "tank", "taxi", "tractor", "truck"],
        place: ["amusement park", "apartments", "beach", "church", "factory", "farm", "fire station", "hospital", "house", "library", "mosque", "park", "playground", "police station", "school", "store", "temple", "university", "zoo", "office"],
        sport: ["football", "cricket", "basketball", "baseball", "hockey", "tennis", "volleyball", "rugby", "soccer"]
    }
};

/***/ }),
/* 5 */
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
/* 6 */
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