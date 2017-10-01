export default {
    adj: {
        size: {
            xxl: ["enormous", "massive", "gigantic", "colossal"],
            xl: ["giant", "huge", "vast", "mammoth"],
            l: ["big", "jumbo", "large"],
            s: ["small", "slight"],
            xs: ["tiny", "minuscule"]
        },
        temp: {
            cold: ["cold", "freezing", "icy", "brisk", "bleak"],
            warm: ["hot", "boiling", "sweltering", "roasting", "scorching", "melting", "sizzling"]
        },
        difficulty: {
            hard: ["difficult", "hard", "troublesome", "tough"],
            easy: ["easy", "simple", "effortless", "straightforward"]
        },
        interesting: ["interesting", "appealing", "delightful", "engaging", "compelling", "enchanting", "gripping"],
        veryInteresting: ["{{adverbs.very adj.interesting}}", "{{adj.size.xxl'ly' adj.interesting}}"],
        speed: {
            fast: ["fast", "upbeat", "quick", "brisk"],
            slow: ["slow", "creep", "crawl"]
        }
    },
    adverbs: {
        speed: {
            fast: ["quickly", "speedily", "hastily", "rapidly", "briskly", "promptly"],
            slow: ["slowly", "sluggishly", "unhurriedly", "lazily", "casually"]
        },
        very: ["very", "exceedingly", "awfully", "greatly"]
    },
    weather: {
        rain: ["drizzling", "showering", "raining", "spitting"],
        sun: ["sunny", "warm", "bright"]
    },
    nouns: {
        animal: ["monkey", "lion", "jaguar", "elephant", "butterfly", "ant"],   
        daytime: ["morning", "afternoon", "evening", "night"],                        
        fruit: ["banana", "apple", "orange", "pear", "pineapple", "grapefruit"],
        sport: ["football", "cricket", "basketball", "baseball", "hockey", "tennis", "volleyball", "rugby"]
    },
}