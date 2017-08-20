import Token from "./splainToken";
export default class {

    static ExecuteOrs(tokens) {
        while(this.findFirstTokenOfType("|",tokens) !==null ) {
            let conditionalIndex = this.findFirstTokenOfType("|", tokens);
            if(conditionalIndex !==null){
                let prec = this.getPreceedingTokenOfType(["lit","splain"], tokens,conditionalIndex),
                    proc = this.getProceedingTokenOfType(["lit","splain"], tokens,conditionalIndex);

                if(prec !==null && proc!==null){
                    let side = this.rand(2);
                    if(side ===1) //remove left
                    {
                        tokens.splice(prec,conditionalIndex-prec+1);
                    }
                    else{
                        if(proc+1 < tokens.length && tokens[proc+1].type === "?") proc++;
                        tokens.splice(conditionalIndex,proc-conditionalIndex+1);
                    }
                }
                else tokens.splice(conditionalIndex,1);
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