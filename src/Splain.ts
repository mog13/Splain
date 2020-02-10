import {Config,DefaultConfig} from "./Config";

class Splain {

    config: Config = DefaultConfig;

    process(input: string): object {
        throw new Error("not implemented");
    }

    execute(input:string):string {
        return this.process(input).value;
    }
};


export = new Splain()
