export default class WeightedEntry {
    constructor(value, weight) {
        this.value = value;
        this.weight = weight;
    }

    getWeightedValues() {
        let weightedValues = [];
        for(let i = 0; i < this.weight; i++) {
            weightedValues.push(this.value);
        }
        return weightedValues;
    }
}