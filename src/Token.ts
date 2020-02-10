import {Config} from "./Config";
import {findTokens} from "./Utility/TokenFinder";

export class Token {
    raw: string;
    value: string;
    pure: boolean;

    constructor(value: string, config: Config) {
        this.raw = value;
        this.value = value.substring(config.token.open.length, value.length - config.token.close.length)
        this.pure = findTokens(this.value, config).length === 0;
    }

}
