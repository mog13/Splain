export default class {
    /**
     *
     * @param text
     * @returns {Array}
     */
    static getLiterals(text) {
        let literals = [];
        let last = null;
        for (let i = 0; i < text.length; i++) {
            if (text[i] === "`") {
                if (last === null) {
                    last = i;
                }
                else {
                    literals.push({start: last, end: i});
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
    static withinLiterals(start, end, literals) {
        let within = false;
        literals.forEach((literal) => {
            //should break
            if (literal.start < start && literal.end > end) within = true;
        });
        return within;
    }

}