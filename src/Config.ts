interface Config {
    token?: {
        open: string,
        close: string
    }
}
const DefaultConfig:Config = {
    token:{
        open:"{{",
        close:"}}"
    }
};

export {Config, DefaultConfig};
