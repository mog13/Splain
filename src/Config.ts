interface Config {
    weights?: {
        maxWeight?: number,
        tokenContribution?: number
        autoComputationEnabled?:boolean
    },
    token?: {
        open: string,
        close: string
    }
}

const DefaultConfig: Config = {
    weights: {
        maxWeight: 25,
        tokenContribution:0.1,
        autoComputationEnabled:true
    },
    token: {
        open: "{{",
        close: "}}"
    }
};

export {Config, DefaultConfig};
