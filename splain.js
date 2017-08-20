/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _splain = __webpack_require__(1);

var _splain2 = _interopRequireDefault(_splain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Splain = new _splain2.default();
(function (window) {
    window.Splain = Splain;
})(window);

exports.default = Splain;

module.exports = Splain;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dictionary = __webpack_require__(2);

var _dictionary2 = _interopRequireDefault(_dictionary);

var _defaultDictionaries = __webpack_require__(3);

var _defaultDictionaries2 = _interopRequireDefault(_defaultDictionaries);

var _templateFinder = __webpack_require__(4);

var _templateFinder2 = _interopRequireDefault(_templateFinder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Splain = function () {
    function Splain() {
        _classCallCheck(this, Splain);

        this.dictionary = new _dictionary2.default();
        this.dictionary.addEntry(_defaultDictionaries2.default);
    }

    _createClass(Splain, [{
        key: "process",
        value: function process(text) {
            var _this = this;

            var templates = _templateFinder2.default.getTemplates(text);
            templates.forEach(function (template) {
                template = _templateFinder2.default.stripTemplate(template);
                if (_templateFinder2.default.containsTemplate(template)) {
                    template = _this.process(template);
                }
                //run templates
            });
        }
    }]);

    return Splain;
}();

exports.default = Splain;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dictioanry = function () {
    function Dictioanry() {
        _classCallCheck(this, Dictioanry);

        this.entries = {};
    }

    _createClass(Dictioanry, [{
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

    return Dictioanry;
}();

exports.default = Dictioanry;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  "weather": {
    "rain": ["drizzling", "showering", "raining", "spitting"],
    "sun": ["sunny", "warm", "bright"]
  },
  "speed": {
    "fast": ["fast", "upbeat", "quick"],
    "slow": ["slow", "creep"]
  }
};

/***/ }),
/* 4 */
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

/***/ })
/******/ ]);