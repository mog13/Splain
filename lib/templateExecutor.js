import Token from "./splainToken";
export default class {

    static run(tokens, dictionary) {
        this.executeOrs(tokens);
        this.executeConditionals(tokens);
        let retString = "";
        tokens.forEach(token=>{
            retString+= token.convert(dictionary);
        });

        return retString;
    }

    static executeConditionals(tokens) {
        while(this.findFirstTokenOfType("?",tokens) !==null ) {
            let conditionalIndex = this.findFirstTokenOfType("?", tokens);
            if(conditionalIndex !== null) {
                if(this.rand(tokens[conditionalIndex].data) !== 1) {
                    let target = this.getPreceedingTokenOfType(["lit","splain"], tokens,conditionalIndex);
                    tokens.splice(target,conditionalIndex-target+1);
                } else {
                    tokens.splice(conditionalIndex,1);
                }
            }
            else {break;}
        }
    }

    static executeOrs(tokens) {
        while(this.findFirstTokenOfType("|",tokens) !==null ) {
            let indexOfOr = this.findFirstTokenOfType("|", tokens);
            if(indexOfOr !==null){
                let prec = this.getPreceedingTokenOfType(["lit","splain"], tokens,indexOfOr),
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

    static findFirstTokenOfType(type,tokens) {
        for(let i =0; i <tokens.length; i++) {
            if(tokens[i].type === type) return i;
        }
        return null;
    }

    static getPreceedingTokenOfType(types,tokens, index) {
        if(index ===0) return null;
        for(let i =index-1; i >=0; i--) {
            if(types.indexOf(tokens[i].type) >-1) return i;
        }
        return null;
    }

    static getProceedingTokenOfType(types,tokens, index) {
        if (index === tokens.length-1) return null;
        for(let i =index+1; i <tokens.length; i++) {
            if(types.indexOf(tokens[i].type) >-1) return i;
        }
        return null;
    }

    //random number between 1 and n inclusive
    static rand(n) {
        return Math.floor(Math.random()*n)+1;
    }

}