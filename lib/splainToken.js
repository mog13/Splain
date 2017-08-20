export default class Token {

    constructor(type, data, raw) {
        this.type = type;
        this.data = data;
        this.raw = raw;
    }

    convert(dictionary) {
        switch(this.type) {
            case 'splain':
                let entry = dictionary.getEntry(this.data,false);
                if(entry !== null && Array.isArray(entry)) {
                    return entry[Math.floor(Math.random()*entry.length)];
                }
                return null;
                break;
            case 'blank':
                return " ";
            case 'lit':
                return this.data;
            default:
                return undefined;
        }
    }
}
