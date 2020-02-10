import { Config } from "./Config";
import { Dictionary } from "./Dictionary";
import { ProcessInfo, Processor } from "./Processor";
declare class Splain {
    config: Config;
    dictionary: Dictionary;
    processor: Processor;
    Process(input: string, contexts?: object, forceRefresh?: boolean): ProcessInfo;
    Execute(input: string): string;
    addEntry(entry: any): void;
}
declare const _default: Splain;
export = _default;
