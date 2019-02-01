import Processor from "./processor";
import Token from "./token";
import TokenFinder from "./tokenFinder";

export default class Executor {
    /**
     * Run the executor over given tokens compiling each
     * @param {array} tokens - the tokens to compile/execute
     * @param {Processor} processorInstance - the current process instance
     * @returns {string} - the compiled output
     */
    public static run(tokens: Token[], processorInstance: Processor) {
        this.executeOrs(tokens);
        this.executeConditionals(tokens);
        let retString = "";
        tokens.forEach((token) => {
            retString += token.convert(processorInstance);
        });

        return retString;
    }

    /**
     * execute any conditional tokens
     * @param {array} tokens - the tokens to compile/execute
     */
    public static executeConditionals(tokens: Token[]) {
        while (TokenFinder.findFirstTokenOfType("?", tokens) !== null) {
            const conditionalIndex = TokenFinder.findFirstTokenOfType("?", tokens);
            if (conditionalIndex !== null) {
                if (this.rand(tokens[conditionalIndex].data) !== 1) {
                    const target = TokenFinder.getPrecedingTokenOfType(["lit", "splain"], tokens, conditionalIndex);
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
     * Execute any or tokens
     * @param {array} tokens - the tokens to compile/execute
     */
    public static executeOrs(tokens: Token[]) {
        while (TokenFinder.findFirstTokenOfType("|", tokens) !== null) {
            const indexOfOr = TokenFinder.findFirstTokenOfType("|", tokens);
            if (indexOfOr !== null) {
                const prec = TokenFinder.getPrecedingTokenOfType(["lit", "splain"], tokens, indexOfOr);
                let proc = TokenFinder.getProceedingTokenOfType(["lit", "splain"], tokens, indexOfOr);

                if (prec !== null && proc !== null) {
                    const side = this.rand(2);
                    if (side === 1) {
                        tokens.splice(prec, indexOfOr - prec + 1);
                    } else {
                        if (proc + 1 < tokens.length && tokens[proc + 1].type === "?") {
                            proc++;
                        }
                        tokens.splice(indexOfOr, proc - indexOfOr + 1);
                    }
                } else {
                    tokens.splice(indexOfOr, 1);
                }
            } else {
                break;
            }
        }
    }

    /**
     * Return an random number between 1 and n (inclusive)
     * @param n - the max number
     * @returns {number}
     */
    public static rand(n: number) {
        return Math.floor(Math.random() * n) + 1;
    }

}
