'use strict';

import splain from "./splain";
let Splain = new splain();
(function(window) {
    window.Splain  = Splain;
})(window);

export default Splain;
module.exports = Splain;