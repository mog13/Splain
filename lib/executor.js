export default class {
    /**
     * run the executor over given tokens compiling each
     * @param {array} tokens - the tokens to compile/execute
     * @param context - the splain context to use
     * @returns {string} - the compiled output
     */
    static run(tokens, processorInstance) {
        this.executeOrs(tokens);
        this.executeConditionals(tokens);
        let retString = "";
        tokens.forEach(token=>{
            retString+= token.convert(processorInstance);
        });

        return retString;
    }

    /**
     * execute any conditional tokens
     * @param {array} tokens - the tokens to compile/execute
     */
    static executeConditionals(tokens) {
        while(this.findFirstTokenOfType("?",tokens) !==null ) {
            let conditionalIndex = this.findFirstTokenOfType("?", tokens);
            if(conditionalIndex !== null) {
                if(this.rand(tokens[conditionalIndex].data) !== 1) {
                    let target = this.getPrecedingTokenOfType(["lit","splain"], tokens,conditionalIndex);
                    tokens.splice(target,conditionalIndex-target+1);
                } else {
                    tokens.splice(conditionalIndex,1);
                }
            }
            else {break;}
        }
    }
    /**
     * execute any or tokens
     * @param {array} tokens - the tokens to compile/execute
     */
    static executeOrs(tokens) {
        while(this.findFirstTokenOfType("|",tokens) !==null ) {
            let indexOfOr = this.findFirstTokenOfType("|", tokens);
            if(indexOfOr !==null){
                let prec = this.getPrecedingTokenOfType(["lit","splain"], tokens,indexOfOr),
                    proc = this.getProceedingTokenOfType(["lit","splain"], tokens,indexOfOr);

                if(prec !==null && proc!==null){
                    let side = this.rand(2);
                    if(side ===1) //remove left
                    {
                        tokens.splice(prec,indexOfOr-prec+1);
                    }
                    else{
                        if(proc+1 < tokens.length && tokens[proc+1].type === "?") proc++;
                        tokens.splice(indexOfOr,proc-indexOfOr+1);
                    }
                }
                else tokens.splice(indexOfOr,1);
            }
            else {break;}
        }
    }

    /**
     * Find the first token of the given type within the provided array of tokens
     * @param {string} type - the type of token to find
     * @param {array} tokens - the tokens to use in the search
     * @returns {*}
     */
    static findFirstTokenOfType(type,tokens) {
        for(let i =0; i <tokens.length; i++) {
            if(tokens[i].type === type) return i;
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
    static getPrecedingTokenOfType(types, tokens, index) {
        if(index ===0) return null;
        for(let i =index-1; i >=0; i--) {
            if(types.indexOf(tokens[i].type) >-1) return i;
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
    static getProceedingTokenOfType(types,tokens, index) {
        if (index === tokens.length-1) return null;
        for(let i =index+1; i <tokens.length; i++) {
            if(types.indexOf(tokens[i].type) >-1) return i;
        }
        return null;
    }

    /**
     * Return an random number between 1 and n (inclusive)
     * @param n - the max number
     * @returns {number}
     */
    static rand(n) {
        return Math.floor(Math.random()*n)+1;
    }

}