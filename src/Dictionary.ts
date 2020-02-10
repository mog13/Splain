import deepmerge = require("deepmerge");
import {Entry} from './Entry';

export class Dictionary {
    public entries: any = {};

    AddEntry(entry: object, rebuildDictionary: boolean = true): void {
        this.entries = deepmerge(this.entries, entry);
        if (rebuildDictionary) this.rebuildDictionary();
    }

    getEntries(path: string): any[] {
        // get the entries by walking down the path with a reduce
        const entry = path.split(".").reduce((currentStep, nextStep) => {
            return currentStep ? currentStep[nextStep] : null
        }, this.entries);

        if (entry === null) return null;
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

    rebuildDictionary(entryPoint: object = this.entries): void {
        for (const [key, value] of Object.entries(entryPoint)) {
             Array.isArray(value) ?
                 entryPoint[key] = this.convertEntriesToEntry(value) :
                this.rebuildDictionary(value)
        }
    }


}
