import Token from "./splainToken";

const regToken = /[?'"|\s]/;

export default class {

    static getTokens(template) {
        let tokens = [];
        let n = 100000;
        while(template) {
            n--;
            let nextToken = this.findNextToken(template);
            tokens.push(nextToken);
            template = template.slice(nextToken.raw.length);
            if(n<0) {
                console.warn("couldn't finish processing tokens after 100,000 panicking..");
                break;
            }
        }

        return tokens;
    }


    static findNextToken(template) {
        let n =1;
            if(template[0] === "?"){
                for(;!isNaN(template[n]) && template[n] !== " " && n< template.length; n++ ) {}
                return new Token("?", template.substring(1,n),template.substring(0,n));
            }
            if(template[0] === "|") {
                return new Token("|",null,"|")
            }
            if(template[0] === " " || template[0] === "\n"){
                return new Token("blank",null,template[0])
            }
            if(template[0] === "'" || template[0] === '"') {
                for(;template[n]!=="'" && template[n] !== '"'  && n< template.length; n++ ) {}
                return new Token("lit", template.substring(1,n),template.substring(0,n+1));
            }
            let nextToken = template.search(regToken);
            if(nextToken <0) nextToken = template.length;
            return new Token("splain", template.substring(0,nextToken),template.substring(0,nextToken));

    }
}