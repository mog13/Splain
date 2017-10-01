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
            cold: ["cold", "freezing", "icy"],
            warm: ["hot", "boiling", "sweltering"]
        },
        difficulty: {
            hard: ["difficult", "hard", "troublesome"],
            easy: ["easy", "simple", "effortless"]
        },
        interesting: ["interesting", "appealing", "delightful", "engaging", "compelling"],
        veryInteresting: ["{{adverbs.very adj.interesting}}", "{{adj.size.xxl'ly' adj.interesting}}"],
        speed: {
            fast: ["fast", "upbeat", "quick"],
            slow: ["slow", "creep"]
        }
    },
    adverbs: {
        speed: {
            fast: ["quickly", "speedily", "hastily", "rapidly"],
            slow: ["slowly", "sluggishly", "unhurriedly"]
        },
        very: ["very", "exceedingly", "awfully", "greatly"],
        frequency: ["always","usually","normally","often","sometimes","occasionally","hardly ever","rarely","never"]
    },
    weather: {
        rain: ["drizzling", "showering", "raining", "spitting"],
        sun: ["sunny", "warm", "bright"]
    },
    nouns: {
        fruit: ["banana", "apple", "orange", "pear", "pineapple", "grapefruit"],
        animal: ["monkey", "lion", "jaguar", "elephant", "butterfly", "ant"],
        daytime: ["morning", "afternoon", "evening", "night"],
        vehicle: ["ambulance","bicycle","boat","bulldozer","bus","car","jeep","minibus","motorcycle","scooter","sidecar","snowplow","tank","taxi","tractor"],
        place: ["amusement park", "apartments", "beach", "church", "factory", "farm", "fire station", "hospital", "house", "library", "mosque", "park", "playground", "police station", "school", "store", "temple", "university", "zoo"]
    },
}
