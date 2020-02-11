interface Config {
    maxWeight?:number,
    token?: {
        open: string,
        close: string
    }
}
const DefaultConfig:Config = {
    maxWeight:1000,
    token:{
        open:"{{",
        close:"}}"
    }
};

export {Config, DefaultConfig};
