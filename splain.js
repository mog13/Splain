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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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

var _dictionary = __webpack_require__(1);

var _dictionary2 = _interopRequireDefault(_dictionary);

var _splainConfig = __webpack_require__(2);

var _splainConfig2 = _interopRequireDefault(_splainConfig);

var _defaultDictionaries = __webpack_require__(6);

var _defaultDictionaries2 = _interopRequireDefault(_defaultDictionaries);

var _templateProcessor = __webpack_require__(3);

var _templateProcessor2 = _interopRequireDefault(_templateProcessor);

var _splainContext = __webpack_require__(9);

var _splainContext2 = _interopRequireDefault(_splainContext);

var _dictionaryVerifier = __webpack_require__(10);

var _dictionaryVerifier2 = _interopRequireDefault(_dictionaryVerifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Main Splain Class and intended interface with library.
 */
var Splain = function () {
    /**
     * Create a new instance of Splain
     * @param {Object} [initialDictionary] - Optional JSON object to use as initial dictionary.
     */
    function Splain(initialDictionary) {
        _classCallCheck(this, Splain);

        this.dictionary = new _dictionary2.default();
        this.dictionary.addEntry(initialDictionary || _defaultDictionaries2.default);
        this.config = new _splainConfig2.default();
    }

    /**
     * Add an entry to a splain dictionary
     * @param {Object} JSON - The entry to add in the form of JSON (can be multiple layers deep and have multiple roots). Also accepts array when used with the name param
     * @param {string} [name] - The name of the entry if an array was given instead of JSON. this is long hand for simply using JSON {name:[entries]}
     * @param {string} [dictionaryContext] - the dictionary to add it to i.e EN
     */


    _createClass(Splain, [{
        key: "addEntry",
        value: function addEntry(JSON, name, dictionaryContext) {
            this.dictionary.addEntry(JSON, name, dictionaryContext);
        }

        /**
         * Process a given string compiling all the templates in it.
         * @param {string} text - the text or string to compile (that contains splain templates
         * @param {object} [variables] - any variables needed for variable templates to use
         * @param {string} [dictionaryContext] - the dictionary to use
         * @returns {string} - the compiled template
         */

    }, {
        key: "process",
        value: function process(text, variables, dictionaryContext) {
            var context = new _splainContext2.default(this.dictionary, this.config);
            context["variables"] = variables;
            context["dictionaryContext"] = dictionaryContext;

            return _templateProcessor2.default.processTemplate(text, context);
        }

        /**
         * verifies all entries in a dictionary compile to something
         * @param dictionary
         * @returns {*}
         */

    }, {
        key: "verifyDictionary",
        value: function verifyDictionary(dictionary) {
            return _dictionaryVerifier2.default.verifyEntries(dictionary);
        }
    }]);

    return Splain;
}();

exports.default = Splain;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dictionary = function () {
    function Dictionary() {
        _classCallCheck(this, Dictionary);

        this.entries = {};
    }

    /**
     * Add an entry to a splain dictionary
     * @param {Object} JSONEntry - The entry to add in the form of JSON (can be multiple layers deep and have multiple roots). Also accepts array when used with the name param
     * @param {string} [name] - The name of the entry if an array was given instead of JSON. this is long hand for simply using JSON {name:[entries]}
     * @param {string} [dictionaryContext] - the dictionary to add it to i.e EN
     */


    _createClass(Dictionary, [{
        key: "addEntry",
        value: function addEntry(JSONEntry, name, dictionaryContext) {
            var _this = this;

            var contextualEntries = this.getContextualEntries(dictionaryContext);
            if (name) {
                contextualEntries[name] = JSONEntry;
            } else {
                Object.keys(JSONEntry).forEach(function (key) {
                    _this.addEntry(JSONEntry[key], key, dictionaryContext);
                });
            }
        }

        /**
         * returns the entries for a given dictionary
         * @param dictionaryContext
         * @returns {array}
         */

    }, {
        key: "getContextualEntries",
        value: function getContextualEntries(dictionaryContext) {
            if (dictionaryContext) {
                if (!this.entries[dictionaryContext]) {
                    this.entries[dictionaryContext] = {};
                }
                return this.entries[dictionaryContext];
            } else {
                return this.entries;
            }
        }

        /**
         * processes a given entry in accordance with any weighting or context it has
         * @param {array} entry - the entry to process
         * @param context - the current context of splain to process it in
         */

    }, {
        key: "processEntry",
        value: function processEntry(entry, context) {
            var contextualEntry = this.processContexts(entry, context);
            return this.processWeights(contextualEntry);
        }

        /**
         * filter out entries that match the currently active contexts, if none do then return all
         * @param {array} entry - the entry to process
         * @param context - the current context of splain to process it in
         * @returns {*}
         */

    }, {
        key: "processContexts",
        value: function processContexts(entry, context) {
            if (context && context.contexts) {
                //filter entries that have at least one matching context
                var contextualEntry = entry.filter(function (value) {
                    return value.hasOwnProperty("context") && context.hasMatchingContext(value.context);
                });
                //only return contextual entries if any match
                if (contextualEntry.length > 0) {
                    return contextualEntry;
                }
            }
            return entry;
        }

        /**
         * Temporarily add extra entries to account for a heavier weighting
         * @param {array} entry - the entry to process
         * @returns {*}
         */

    }, {
        key: "processWeights",
        value: function processWeights(entry) {
            if (entry !== null && Array.isArray(entry)) {
                var index = void 0;
                while ((index = entry.findIndex(function (value) {
                    return value.hasOwnProperty("weight");
                })) !== -1) {
                    var weightedValues = [];
                    for (var i = 0; i < entry[index].weight; i++) {
                        weightedValues.push(entry[index].value);
                    }
                    entry.splice.apply(entry, [index, 1].concat(weightedValues));
                }
            }
            return entry;
        }

        /**
         * get a dictionary entry
         * @param {string} name - the entry name/path
         * @param context - the current context of splain to process it in
         * @returns {*}
         */

    }, {
        key: "getEntry",
        value: function getEntry(name, context) {
            //get entries from specific dictionary if set. in this cas contextual is contextual to the dictionary (e.g EN)
            var contextualEntries = context.dictionaryContext ? this.entries[context.dictionaryContext] : this.entries;
            //get the entries by walking down the path with a reduce
            var entry = name.split(".").reduce(function (currentStep, nextStep) {
                if (currentStep === null) return null;
                var curObj = currentStep[nextStep];
                if (curObj) {
                    return curObj;
                } else {
                    return null;
                }
            }, contextualEntries);
            //if the entry isnt an array then its invalid and we should either return the path or null depending on the setting.
            if (Array.isArray(entry) === false) {
                return null;
            }
            //apply weights and context filtering to selection
            return this.processEntry(entry, context);
        }
    }]);

    return Dictionary;
}();

exports.default = Dictionary;

/***/ }),
/* 2 */
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
        this.templateTokens = {
            opening: "{{",
            closing: "}}"
        };
        this.fixedResolutionToken = "::";
        this.variableResolutionToken = "##";
        this.keepTemplateOnUnmatched = true;
    }

    /**
     * Sets a config parameter
     * @param {string} key - the parameter to configure
     * @param value - the value to set the parameter to
     * @returns {SplainConfig}
     */


    _createClass(SplainConfig, [{
        key: "configure",
        value: function configure(key, value) {
            if (this.hasOwnProperty(key)) {
                this[key] = value;
            }
            return this;
        }
    }]);

    return SplainConfig;
}();

exports.default = SplainConfig;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _splainToken = __webpack_require__(7);

var _splainToken2 = _interopRequireDefault(_splainToken);

var _templateFinder = __webpack_require__(4);

var _templateFinder2 = _interopRequireDefault(_templateFinder);

var _templateExecutor = __webpack_require__(8);

var _templateExecutor2 = _interopRequireDefault(_templateExecutor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var regToken = /[?`|\s]/;

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);
    }

    _createClass(_class, null, [{
        key: "processTemplate",


        /**
         * process/compile the given template
         * @param {string} text - the string to compile
         * @param context - the current splain context
         * @returns {*}
         */
        value: function processTemplate(text, context) {
            var _this = this;

            //for all the templates in the given test
            _templateFinder2.default.getTemplates(text, context).forEach(function (template) {
                //strip it, tokenize it and compile it
                var strippedTemplate = TemplateStripper.stripTemplate(template, context),
                    tokens = _this.getTokens(strippedTemplate, context),
                    compiledTemplate = _templateExecutor2.default.run(tokens, context);
                // if the result contains a template recursively re run it
                if (_templateFinder2.default.containsTemplate(compiledTemplate, context)) compiledTemplate = _this.processTemplate(compiledTemplate, context);
                //replace the template with its compiled version and store its resolution
                text = text.replace("" + template, compiledTemplate);
                context.addTemplateResolution(strippedTemplate, compiledTemplate);
            });
            return text;
        }

        /**
         * gets the tokens from a given template
         * @param {string} template - the template to convert to tokens
         * @param context - the current splain context
         * @returns {Array} - an array of tokens
         */

    }, {
        key: "getTokens",
        value: function getTokens(template, context) {
            var tokens = [];
            var n = 100000;
            while (template) {
                n--;
                var nextToken = this.findNextToken(template, context);
                tokens.push(nextToken);
                template = template.slice(nextToken.raw.length);
                if (n < 0) {
                    console.warn("couldn't finish processing tokens after 100,000 panicking..");
                    break;
                }
            }

            return tokens;
        }

        /**
         * Find the first token in the given template
         * @param {string} template - the template to find the token in
         * @param context - the current splain context
         * @returns {Token} - the first token in the template
         */

    }, {
        key: "findNextToken",
        value: function findNextToken(template, context) {
            var n = 1;
            if (template.startsWith(context.config.templateTokens.opening)) {
                var bracketAmount = 1,
                    openLength = context.config.templateTokens.opening.length,
                    closeLength = context.config.templateTokens.closing.length;
                n = openLength;
                while (n < template.length && bracketAmount > 0) {
                    if (template.indexOf(context.config.templateTokens.opening, n) === n) {
                        bracketAmount++;
                        n += openLength;
                    } else if (template.indexOf(context.config.templateTokens.closing, n) === n) {
                        bracketAmount--;
                        n += closeLength;
                    } else {
                        n++;
                    }
                }
                if (n < 0) throw "template {" + template + "} has no closing token";
                return new _splainToken2.default("template", template.substring(openLength, n - closeLength), template.substring(0, n));
            }
            if (template[0] === "?") {
                while (!isNaN(template[n]) && template[n] !== " " && n < template.length) {
                    n++;
                }
                return new _splainToken2.default("?", template.substring(1, n) || "2", template.substring(0, n));
            }
            if (template[0] === "|") {
                return new _splainToken2.default("|", null, "|");
            }
            if (template[0] === " " || template[0] === "\n") {
                return new _splainToken2.default("blank", null, template[0]);
            }
            if (template[0] === "`") {
                while (template[n] !== "`" && n < template.length) {
                    n++;
                }
                return new _splainToken2.default("lit", template.substring(1, n), template.substring(0, n + 1));
            }
            var nextToken = template.search(regToken);
            var nextTemplate = template.indexOf(context.config.templateTokens.opening);
            if (nextToken == -1 || nextTemplate > -1 && nextTemplate < nextToken) nextToken = nextTemplate;
            if (nextToken < 0) {
                nextToken = template.length;
            }
            var tokenData = template.substring(0, nextToken);
            if (template.startsWith(context.config.variableResolutionToken)) {
                return new _splainToken2.default("variable", tokenData.substr(context.config.variableResolutionToken.length), tokenData);
            }
            if (template.startsWith(context.config.fixedResolutionToken)) {
                return new _splainToken2.default("fixed", tokenData.substr(context.config.fixedResolutionToken.length), tokenData);
            }

            return new _splainToken2.default("splain", tokenData, tokenData);
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);
    }

    _createClass(_class, null, [{
        key: "getLiterals",


        /**
         * returns any literals in a given string
         * @param {string} text - the text to search
         * @returns {Array}
         */
        value: function getLiterals(text) {
            var literals = [];
            var last = null;
            for (var i = 0; i < text.length; i++) {
                if (text[i] === "`") {
                    if (last === null) {
                        last = i;
                    } else {
                        literals.push({ start: last, end: i });
                        last = null;
                    }
                }
            }
            return literals;
        }

        /**
         * returns if the given start and end index's fall within the given array
         * @param {int} start - the start of the index to check
         * @param {int} end - the end of the index to check
         * @param {array} literals - the array of literals (starts and ends) to check against
         * @returns {boolean}
         */

    }, {
        key: "withinLiterals",
        value: function withinLiterals(start, end, literals) {
            var within = false;
            literals.forEach(function (literal) {
                //should break
                if (literal.start < start && literal.end > end) within = true;
            });
            return within;
        }

        /**
         * Get all the templates within the given text
         * @param text - the text to search
         * @param context - the splain contexts
         * @returns {Array} - the found templates
         */

    }, {
        key: "getTemplates",
        value: function getTemplates(text, context) {
            var templates = [];
            var literals = this.getLiterals(text);
            var openingTokens = text.split(context.config.templateTokens.opening).length - 1;
            var closingTokens = text.split(context.config.templateTokens.closing).length - 1;

            if (openingTokens > closingTokens) throw "Error: not enough closing tokens found in " + text;
            if (openingTokens < closingTokens) throw "Error: not enough opening tokens found in " + text;
            while (text.includes(context.config.templateTokens.opening) && text.includes(context.config.templateTokens.closing)) {
                var start = text.indexOf(context.config.templateTokens.opening),
                    nested = 0;
                //start +2 to skip  initial brackets
                for (var i = start + 2; i < text.length - 1; i++) {
                    if (text[i] + text[i + 1] === context.config.templateTokens.opening) {
                        nested++;
                    }
                    if (text[i] + text[i + 1] === context.config.templateTokens.closing) {
                        if (nested > 0) {
                            nested--;
                            i += 1; //skip over the other nested '}'
                        } else {
                            if (!this.withinLiterals(start, i + 1, literals)) {
                                templates.push(text.substring(start, i + 2));
                            }
                            text = text.slice(0, start) + text.slice(i + 2);
                            i = text.length;
                        }
                    }
                }
            }
            return templates;
        }

        /**
         * strips the template deliminators, leaves inner templates remaining
         * @param {string} template - the template to strip
         * @param context - the current splain context
         * @returns {*}
         */

    }, {
        key: "stripTemplate",
        value: function stripTemplate(template, context) {
            var open = template.indexOf(context.config.templateTokens.opening),
                close = template.lastIndexOf(context.config.templateTokens.closing) - context.config.templateTokens.closing.length;
            if (open > -1) template = template.slice(0, open) + template.slice(open + context.config.templateTokens.opening.length);
            if (close > -1) template = template.slice(0, close) + template.slice(close + context.config.templateTokens.opening.length);
            return template;
        }

        /**
         * returns if the given text contains a template
         * @param {string} text - the text to check
         * @param context - the current splain Context.
         * @returns {*}
         */

    }, {
        key: "containsTemplate",
        value: function containsTemplate(text, context) {
            function escapeTokens(templateTokens) {
                return "\\" + templateTokens.split("").join("\\");
            }

            var regTemplateMatcher = escapeTokens(context.config.templateTokens.opening) + ".*?" + escapeTokens(context.config.templateTokens.closing);
            return text.match(regTemplateMatcher);
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _splain = __webpack_require__(0);

var _splain2 = _interopRequireDefault(_splain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = new _splain2.default();

/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateProcessor = __webpack_require__(3);

var _templateProcessor2 = _interopRequireDefault(_templateProcessor);

var _templateFinder = __webpack_require__(4);

var _templateFinder2 = _interopRequireDefault(_templateFinder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Token = function () {

    /**
     * Create a new splain oken
     * @param {string} type - the type of token it is (splain/fixed/variable/blank/lit/template)
     * @param data - the relevant data about the token, different depending on type
     * @param {string} raw - the raw token as it appeared in the original template
     */
    function Token(type, data, raw) {
        _classCallCheck(this, Token);

        this.type = type;
        this.data = data;
        this.raw = raw;
    }

    /**
     * Converts the given token iintos its compiled equivalent.
     * @param {object} context - the splain context to use
     * @returns {*}
     */


    _createClass(Token, [{
        key: "convert",
        value: function convert(context) {
            function getResult(token) {
                // check if weve cached the entries
                var entry = context.getFromCache(token);
                if (!entry) {
                    //if we havn't find the entry and cache is
                    entry = context.dictionary.getEntry(token, context);
                    context.addToCache(token, entry);
                }
                if (entry !== null && Array.isArray(entry)) {
                    var result = entry[Math.floor(Math.random() * entry.length)];
                    if (result.hasOwnProperty("context")) {
                        context.addContext(result.context);
                        return result.value;
                    }
                    return result;
                }
                return context.config.keepTemplateOnUnmatched ? token : null;
            }

            switch (this.type) {
                case "splain":
                    {
                        return getResult(this.data);
                    }
                case "fixed":
                    {
                        var fixed = context.getFixedResolution(this.data);
                        if (fixed) {
                            return fixed;
                        }
                        var result = getResult(this.data);
                        context.addFixedResolution(this.data, result);
                        return result;
                    }
                case "variable":
                    {
                        if (context.hasOwnProperty("variables") && context.variables.hasOwnProperty(this.data)) {
                            var variable = context.variables[this.data];
                            if (typeof variable === "function") {
                                return variable(context.templateResolutions);
                            } else {
                                return variable;
                            }
                        }
                        return context.config.keepTemplateOnUnmatched ? this.data : null;
                    }
                case "blank":
                    {
                        return " ";
                    }
                case "lit":
                    {
                        return this.data;
                    }
                case "template":
                    {
                        var output = _templateProcessor2.default.processTemplate(this.raw, context);
                        return _templateFinder2.default.containsTemplate(output, context) ? _templateProcessor2.default.processTemplate(output, context) : output;
                    }
                default:
                    {
                        return undefined;
                    }
            }
        }
    }]);

    return Token;
}();

exports.default = Token;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);
    }

    _createClass(_class, null, [{
        key: "run",

        /**
         * run the executor over given tokens compiling each
         * @param {array} tokens - the tokens to compile/execute
         * @param context - the splain context to use
         * @returns {string} - the compiled output
         */
        value: function run(tokens, context) {
            this.executeOrs(tokens);
            this.executeConditionals(tokens);
            var retString = "";
            tokens.forEach(function (token) {
                retString += token.convert(context);
            });

            return retString;
        }

        /**
         * execute any conditional tokens
         * @param {array} tokens - the tokens to compile/execute
         */

    }, {
        key: "executeConditionals",
        value: function executeConditionals(tokens) {
            while (this.findFirstTokenOfType("?", tokens) !== null) {
                var conditionalIndex = this.findFirstTokenOfType("?", tokens);
                if (conditionalIndex !== null) {
                    if (this.rand(tokens[conditionalIndex].data) !== 1) {
                        var target = this.getPrecedingTokenOfType(["lit", "splain"], tokens, conditionalIndex);
                        tokens.splice(target, conditionalIndex - target + 1);
                    } else {
                        tokens.splice(conditionalIndex, 1);
                    }
                } else {
                    break;
                }
            }
        }
        /**
         * execute any or tokens
         * @param {array} tokens - the tokens to compile/execute
         */

    }, {
        key: "executeOrs",
        value: function executeOrs(tokens) {
            while (this.findFirstTokenOfType("|", tokens) !== null) {
                var indexOfOr = this.findFirstTokenOfType("|", tokens);
                if (indexOfOr !== null) {
                    var prec = this.getPrecedingTokenOfType(["lit", "splain"], tokens, indexOfOr),
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

        /**
         * Find the first token of the given type within the provided array of tokens
         * @param {string} type - the type of token to find
         * @param {array} tokens - the tokens to use in the search
         * @returns {*}
         */

    }, {
        key: "findFirstTokenOfType",
        value: function findFirstTokenOfType(type, tokens) {
            for (var i = 0; i < tokens.length; i++) {
                if (tokens[i].type === type) return i;
            }
            return null;
        }

        /**
         * find the nearest preceding token of a given set of types from a given point
         * @param {array} types - the types of token to match on
         * @param {array} tokens - the tokens to use in the search
         * @param {int} index - the index to start the search from
         * @returns {*}
         */

    }, {
        key: "getPrecedingTokenOfType",
        value: function getPrecedingTokenOfType(types, tokens, index) {
            if (index === 0) return null;
            for (var i = index - 1; i >= 0; i--) {
                if (types.indexOf(tokens[i].type) > -1) return i;
            }
            return null;
        }

        /**
         * find the nearest preceding token of a given set of types from a given point
         * @param {array} types - the types of token to match on
         * @param {array} tokens - the tokens to use in the search
         * @param {int} index - the index to start the search from
         * @returns {*}
         */

    }, {
        key: "getProceedingTokenOfType",
        value: function getProceedingTokenOfType(types, tokens, index) {
            if (index === tokens.length - 1) return null;
            for (var i = index + 1; i < tokens.length; i++) {
                if (types.indexOf(tokens[i].type) > -1) return i;
            }
            return null;
        }

        /**
         * Return an random number between 1 and n (inclusive)
         * @param n - the max number
         * @returns {number}
         */

    }, {
        key: "rand",
        value: function rand(n) {
            return Math.floor(Math.random() * n) + 1;
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _splainConfig = __webpack_require__(2);

var _splainConfig2 = _interopRequireDefault(_splainConfig);

var _dictionary = __webpack_require__(1);

var _dictionary2 = _interopRequireDefault(_dictionary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SplainContext = function () {
    /**
     * Create a new splainContext
     * @param {object} dictionary - the dictionary to use
     * @param {object} config - the config to use
     */
    function SplainContext(dictionary, config) {
        _classCallCheck(this, SplainContext);

        this.dictionary = dictionary;
        this.config = config;
        this.contexts = [];
        this.templateResolutions = {};
        this.fixedResolutions = {};
        this.dictionaryCache = {};
    }

    /**
     * Add the found entry to the cache against the token/path so it doesn't need to be looked up if reused.
     * @param {string} token - the token
     * @param {array} entry - the entry
     */


    _createClass(SplainContext, [{
        key: "addToCache",
        value: function addToCache(token, entry) {
            this.dictionaryCache[token] = entry;
        }

        /**
         * return the cached toke if it exists
         * @param {string} token - the token
         * @returns {array}
         */

    }, {
        key: "getFromCache",
        value: function getFromCache(token) {
            if (this.dictionaryCache) {
                return this.dictionaryCache[token];
            }
        }

        /**
         * Adds result to the fixed resolutions object
         * @param {string} token - the token to be mapped by
         * @param {string} result - the compiled output of the token
         */

    }, {
        key: "addFixedResolution",
        value: function addFixedResolution(token, result) {
            this.fixedResolutions[token] = result;
        }

        /**
         * retrieves sny matching fixed resolutions
         * @param {string} token - the token to search for
         * @returns {*}
         */

    }, {
        key: "getFixedResolution",
        value: function getFixedResolution(token) {
            if (this.fixedResolutions) {
                return this.fixedResolutions[token];
            }
        }

        /**
         * Adds an entry context
         * @param {array} context - the contexts to add
         */

    }, {
        key: "addContext",
        value: function addContext(context) {
            var _this = this;

            if (!this.hasMatchingContext(context)) {
                this.contexts = this.contexts.concat(context);
            }

            this.contexts = this.contexts.filter(function (context, pos) {
                return _this.contexts.indexOf(context) === pos;
            });
        }

        /**
         * returns if the given contexts match any current contexts
         * @param {array} context - the context to check.
         * @returns {boolean}
         */

    }, {
        key: "hasMatchingContext",
        value: function hasMatchingContext(context) {
            return Array.isArray(context) && this.contexts.some(function (con) {
                return context.includes(con);
            }) || this.contexts.includes(context);
        }

        /**
         * Add a compiled resolution to the splain context
         * @param {string} template - the template that was compiled
         * @param {string} resolution - the output of the template
         */

    }, {
        key: "addTemplateResolution",
        value: function addTemplateResolution(template, resolution) {
            if (!this.templateResolutions[template]) {
                this.templateResolutions[template] = resolution;
            } else if (Array.isArray(this.templateResolutions[template])) {
                this.templateResolutions[template].push(resolution);
            } else {
                var firstResolution = this.templateResolutions[template];
                this.templateResolutions[template] = [];
                this.templateResolutions[template].push(firstResolution);
                this.templateResolutions[template].push(resolution);
            }
        }

        /**
         * get a default context
         * @returns {SplainContext}
         */

    }], [{
        key: "getDefault",
        value: function getDefault() {
            return new SplainContext(new _dictionary2.default(), new _splainConfig2.default());
        }
    }]);

    return SplainContext;
}();

exports.default = SplainContext;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _splain = __webpack_require__(0);

var _splain2 = _interopRequireDefault(_splain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

    /*if called without a splain instance will set one up and pass through to recursive calls
    this means original call will make splain at the dictionary level
    but also has the added benefit that you could use it to verify it with a given splain instance*/
    verifyEntries: function verifyEntries(node, splain, root) {
        var _this = this;

        if (!splain) {
            splain = new _splain2.default(node.entries || node); //allows for just sending part of a dictionary
            splain.config.configure("explicit", true);
            splain.config.configure("keepTemplateOnUnmatched", false);
        }
        if (node.entries) node = node.entries; //only want to scan entries of dictionary
        var invalidTokens = [];

        var _loop = function _loop(key) {
            var branch = node[key],
                fullyQualifiedKey = root ? root + "." + key : key;
            if (Array.isArray(branch)) {
                branch.forEach(function (entry) {
                    var keyedEntry = key + "." + entry,
                        output = splain.process("" + entry);
                    if (output.indexOf("null") >= 0 || output === keyedEntry) invalidTokens.push({ token: entry, key: fullyQualifiedKey });
                });
            } else {
                invalidTokens = invalidTokens.concat(_this.verifyEntries(branch, splain, fullyQualifiedKey));
            }
        };

        for (var key in node) {
            _loop(key);
        }
        return invalidTokens;
    }
};

/***/ })
/******/ ]);
});