import deepmerge = require("deepmerge");
import {Entry} from './Entry';
import {findTokens} from "./Utility/TokenFinder";
import {Config, DefaultConfig} from "./Config";
import {Token} from "./Token";

export class Dictionary {
    public entries: any = {};

    addEntry(entry: object, config: Config = DefaultConfig, rebuildDictionary: boolean = true): void {
        this.entries = deepmerge(this.entries, entry);
        if (rebuildDictionary) {
            this.rebuildDictionary(this.entries, config);
            this.reweighDictionary(this.entries, config);
            this.balanceWeights(this.entries,config);
        }
    }

    getEntries(path: string): any[] {
        // get the entries by walking down the path with a reduce
        const entry = path.split(".").reduce((currentStep, nextStep) => {
            return currentStep ? currentStep[nextStep] : null
        }, this.entries);

        if (!entry) return null;
        return Array.isArray(entry) ? entry : this.getFloodedEntry(entry)

    }

    getFloodedEntry(floodPoint: object): any[] {
        return Object.values(floodPoint)
            .map(entry => Array.isArray(entry) ? entry : this.getFloodedEntry(entry))
            .reduce((accumulator, current) => {
                return accumulator.concat(current);
            }, []);
    }

    private convertEntriesToEntry(entries: any[]) {
        return entries.map(entry => {
            return entry instanceof Entry ?
                entry :
                entry.value ?
                    new Entry(entry.value, entry.contexts, entry.weight) :
                    new Entry(entry);
        });
    }

    rebuildDictionary(entryPoint: object = this.entries, config: Config): void {
        for (const [key, value] of Object.entries(entryPoint)) {
            Array.isArray(value) ?
                entryPoint[key] = this.convertEntriesToEntry(value) :
                this.rebuildDictionary(value, config)
        }
    }

    balanceWeights(entryPoint: object = this.entries, config: Config){
        Object.values(entryPoint).forEach(value => {
            if( Array.isArray(value)) {
                const lowestWeight = Math.min(...value.map(entry=>entry.computedWeight));
                value.forEach((entry)=> {
                    entry.computedWeight= Math.min(Math.ceil(entry.computedWeight/lowestWeight), config.maxWeight);
                })
            }
            else {
                this.balanceWeights(value, config)
            }
        });
    }


    reweighDictionary(entryPoint: object = this.entries, config: Config): void {
        // avoid problems with this
        const getEntries = this.getEntries.bind(this);

        const weighTime = new Date().getTime();

        function weighEntries(entries: Entry[], evaluatedTokens: Token[] = []): number {
            return entries.reduce((accumulator, entry) => {
                return accumulator + weighEntry(entry, evaluatedTokens);
            }, 0);
        }

        function weighEntry(entry: Entry, evaluatedTokens: Token[] = []): number {
            if(entry.lastWeighed === weighTime) return entry.lastWeighed;

            const weight = findTokens(entry.value, config).reduce((accumulator, token) => {
                if (evaluatedTokens.filter(evalToken => token.raw === evalToken.raw).length < 1) {
                    evaluatedTokens.push(token);
                    if (token.pure) {
                        return accumulator + (weighEntries(getEntries(token.value) || [], evaluatedTokens) || 0);
                    }
                    else {
                        return findTokens(token.value,config).reduce((acc,innerToken) => {
                            return acc + (weighEntries(getEntries(innerToken.value) || [], evaluatedTokens)||0);
                        },0);
                    }
                }
                return accumulator;
            }, 0) || 1;

            entry.computedWeight = weight;
            entry.lastWeighed = weighTime;
            return weight;

        }

        Object.values(entryPoint).forEach(value => {
            Array.isArray(value) ?
                value.forEach((entry) => {
                    weighEntry(entry)
                }) :
                this.reweighDictionary(value, config)
        });
    }


}
