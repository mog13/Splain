
import TokenFinder from "./tokenFinder";

export default class {
    /**
     * run the executor over given tokens compiling each
     * @param {array} tokens - the tokens to compile/execute
     * @param processorInstance
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
        while(TokenFinder.findFirstTokenOfType("?",tokens) !==null ) {
            let conditionalIndex = TokenFinder.findFirstTokenOfType("?", tokens);
            if(conditionalIndex !== null) {
                if(this.rand(tokens[conditionalIndex].data) !== 1) {
                    let target = TokenFinder.getPrecedingTokenOfType(["lit","splain"], tokens,conditionalIndex);
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
        while(TokenFinder.findFirstTokenOfType("|",tokens) !==null ) {
            let indexOfOr = TokenFinder.findFirstTokenOfType("|", tokens);
            if(indexOfOr !==null){
                let prec = TokenFinder.getPrecedingTokenOfType(["lit","splain"], tokens,indexOfOr),
                    proc = TokenFinder.getProceedingTokenOfType(["lit","splain"], tokens,indexOfOr);

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
     * Return an random number between 1 and n (inclusive)
     * @param n - the max number
     * @returns {number}
     */
    static rand(n) {
        return Math.floor(Math.random()*n)+1;
    }

}