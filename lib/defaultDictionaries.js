export default {
    adj: {
        size: {
            xxl: ["enormous", "massive", "gigantic", "colossal", "gargantuan"],
            xl: ["giant", "huge", "vast", "mammoth"],
            l: ["big", "jumbo", "large"],
            s: ["small", "slight", "petite","slender","trim","diminuitive"],
            xs: ["tiny", "minuscule"]
        },
        temp: {
            cold: ["cold", "freezing", "icy", "brisk", "bleak", "nippy", "chilly", "cool","bracing"],
            warm: ["hot", "boiling", "sweltering", "roasting", "scorching", "melting", "sizzling", "burning", "fiery"]
        },
        difficulty: {
            hard: ["difficult", "hard", "troublesome", "tough", "arduous", "laborious", "strenuous","back breaking"],
            easy: ["easy", "simple", "effortless", "straightforward", "trivial"]
        },
        interesting: ["interesting", "appealing", "delightful", "engaging", "compelling", "enchanting", "gripping", "fascinating", "riveting", "intriguing"],
        veryInteresting: ["{{adverbs.very adj.interesting}}", "{{adj.size.xxl'ly' adj.interesting}}"],
        speed: {
            fast: ["fast", "upbeat", "quick", "brisk"],
            slow: ["slow", "creep", "laggy", "crawl", "lackadaisical", "lethargic"]
        },
        color: ["red", "blue", "green", "purple", "pink", "gray", "black", "orange", "brown", "charcoal", "cyan", "magenta","fuchsia",
                "yellow", "gold", "silver", "white", "teal", "turquoise"],
    },
    adverbs: {
        speed: {
            fast: ["quickly", "speedily", "hastily", "rapidly", "briskly", "promptly", "swiftly"],
            slow: ["slowly", "sluggishly", "unhurriedly", "lazily", "casually", "lackadaisically"]
        },
        very: ["very", "exceedingly", "awfully", "greatly", "emininently", "absolutely", "extraordinarily", "extremely", "really"],
        frequency: {
            always: ["always", "constantly"],
            frequently: ["usually", "normally", "often", "frequently"],
            sometimes: ["sometimes", "occasionally", "intermittenly"],
            infrequently: ["hardly ever", "rarely", "seldom", "infrequently"],
            never: ["never"]
        }
    },
    weather: {
        rain: ["drizzling", "showering", "raining", "spitting", "pouring", "deluge"],
        sun: ["sunny", "warm", "bright", "luminous", "radiant"],
        snow: ["thundersnow", "blizzard", "flurry", "snow storm", "snowsquall", "lake-effect snow", "sleet", "slush"],
        wind: ["airstream", "breeze", "berg wind", "crosswind", "dust devil", "easterly", "gale", "gust", "headwind", "jet stream", "mistral", "monsoon", "sandstorm", "prevailing wind", "sea breeze", "sicocco", "southwester", "tail wind", "tornado", "trade wind", "turbulance", "twister", "typhoon", "whirlwind", "wind", "windstorm", "zephr"],
        winter: ["freezing", "snowy", "icy", "slick", "frosty", "arctic", "bitingly chilly", "polar"],
        fog: ["foggy", "misty", "smog", "haze"],
    },
    genre: {
        music: ["rock", "pop", "punk", "indie", "hip hop", "reggae", "folk", "country", "blues", "classical", "jazz", "alternative", "electronic"],
        film: ["action", "adventure", "comedy", "drama", "fantasy", "horror", "thriller", "romance", "science fiction", "western", "documentary"],
        book: ["non fiction", "fiction", "sci-fi","mystery","cyber punk","graphic","young adult","children","classic"]
    },
    nouns: {
        landtypes: ["forest","desert","rain forest", "mountains", "plains","grasslands","bush"],
        food: {
            fruit: ["banana", "apple", "orange", "pear", "pineapple", "grapefruit", "avocado", "passionfruit", "strawberry", "kiwifruit", "grape", "peach", "cherry", "guava", "blueberry", "blackberry", "raspberry", "watermelon", "melon", "mango", "nectarine", "starfruit", "date", "cranberry", "persimmon", "gooseberry", "kumquat", "jujube", "boysenberry", "longan"],
            desserts: ["cupcakes", "ice cream", "cookies", "brownies", "apple pie", "pumpkin pie", "cake", "cheesecake", "muffin", "fruit salad", "tiramisu", "tart", "cobbler", "macaron", "macaroon", "custard", "rice pudding", "sorbet", "flan", "gelato"],
            vegetables: ['avocado', 'asparagus', 'arugula', 'beet', 'broccoli', 'brussel sprout', 'cabbage', 'carrot', 'cauliflower', 'celery', 'chard', 'collard greens', 'corn', 'kale', 'lettuce', 'mushroom', 'onion', 'pepper', 'parsley', 'rhubarb', 'parsnip', 'radish', 'spinach', 'squash', 'tomato', 'sweet potato', 'yam', 'zucchini'],
            breakfast: ["eggs", "toast", "pancakes", "coffee", "orange juice", "bacon", "sausage", "oatmeal", "waffles", "cereal", "bagel", "muesli", "granola bar"],
            condiments: ["ketchup", "mustard", "mayonaise", "soy sauce", "vinegar", "sauerkraut", "salsa", "relish", "hot sauce", "sriracha"],
            lunch: ["sandwich", "soup", "salad", "pizza", "leftovers", "tacos", "burrito", "sushi"],
            dinner: ["roast chicken", "meatloaf", "steak", "baked potato", "lasagna", "casserole"]
        },
        clothes: ["sweater","boots", "jeans", "shirt", "shoes", "t-shirt", "trousers", "cardigan", "skirt", "dress", "jacket", "hat", "shorts", "tie", "socks","mittens","gloves","nylons","leggings","jeggings","tights","panty-hose"],
        daytime: ["morning", "afternoon", "evening", "night", "sunset", "sunrise", "dusk", "dawn"],
        trees: ["ash", "beech", "birch", "conifer", "fir", "larch", "maple", "oak", "pine", "spruce", "sycamore", "willow", "yew", "rowan", "hickory"],
        nationalParks: ["Denali", "Gates of the Arctic", "Glacier Bay", "Katmai", "Kenai Fjords", "Kobuk Valley", "Lake Clark", "Wrangell - St. Elias", "American Samoa", "Grand Canyon", "Petrified Forest", "Saguaro", "Hot Springs", "Channel Islands", "Death Valley", "Joshua Tree", "Kings Canyon", "Lassen Volcanic", "Redwood", "Sequoia", "Yosemite", "Black Canyon of the Gunnison", "Great Sand Dunes", "Mesa Verde", "Rocky Mountain", "Biscayne", "Dry Tortugas", "Everglades", "Haleakala", "Hawaii Volcanoes", "Yellowstone", "Mammoth Cave", "Acadia", "Isle Royale", "Voyageurs", "Glacier", "Yellowstone", "Great Basin", "Carlsbad Caverns", "Great Smoky Mountains", "Theodore Roosevelt", "Cuyahoga Valley", "Crater Lake", "Congaree", "Badlands", "Wind Cave", "Great Smoky Mountains", "Big Bend", "Guadalupe Mountains", "Virgin Islands", "Arches", "Bryce Canyon", "Capitol Reef", "Canyonlands", "Zion", "Shenandoah", "Mount Rainier", "North Cascades", "Olympic", "Grand Teton"],
        animal: ["monkey", "lion", "jaguar", "elephant", "butterfly", "ant", "pangolin", "gorilla", "dog", "cat", "bear", "snake", "mouse", "rabbit", "horse", "giraffe", "armadillo", "donkey", "wolf", "cayote", "hippo", "lion", "rhino", "aardvark", "alpaca", "cow", "moose", "crow", "deer", "dolphin", "skunk", "snail", "walrus", "whale", "zebra", "duck", "eel", "goat", "raccoon", "rat", "frog", "gopher", "chicken", "chipmonk", "panda","ferret","sheep"],

        country: ["Afghanistan", "Albania", "Algeria", "America", "Andorra", "Angola", "Antigua", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas",
                  "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bissau", "Bolivia", "Bosnia", "Botswana", "Brazil", "British",
                  "Brunei", "Bulgaria", "Burkina", "Burma", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China",
                  "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech", "Denmark", "Djibouti", "Dominica", "East Timor", "Ecuador", "Egypt", "El Salvador", "Emirate",  "England", "Eritrea", "Estonia",
                  "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Great Britain", "Greece", "Grenada", "Grenadines", "Guatemala", "Guinea", "Guyana",
                  "Haiti", "Herzegovina", "Holland", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea",
                  "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia",  "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives",
                  "Mali", "Malta", "Marshall", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru",
                  "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
                  "Romania", "Russia", "Rwanda", "Samoa", "San Marino", "Sao Tome", "Saudi Arabia", "Scotland", "Scottish", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
                  "Solomon", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "St Kitts", "St Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
                  "Tanzania",  "Thailand", "Tobago", "Togo", "Tonga", "Trinidad", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Kingdom", "United States", "Uruguay", "USA", "Uzbekistan",
                  "Vanuatu", "Vatican", "Venezuela", "Vietnam", "Wales", "Welsh", "Yemen", "Zambia", "Zimbabwe", "Antigua and Barbuda", "Bosnia and Herzegovina", "Burkina Faso", "Cabo Verde", "Central African Republic", "Democratic Republic of the Congo", "Republic of the Congo", "Cote d'Ivoire",
                  "South Korea", "Timor-Leste", "Trinidad and Tobago", "United Arab Emirates", "United Kingdom", "United States of America", "Vatican City"
        ],

        vehicle: ["ambulance", "bicycle", "boat", "bulldozer", "bus", "car", "jeep", "minibus", "mini cooper", "motorcycle", "scooter", "sidecar", "snowplow", "tank", "taxi", "tractor", "truck"],
        place: ["amusement park", "apartments", "beach", "church", "factory", "farm", "fire station", "hospital", "house", "library", "mosque", "park", "playground", "police station", "school", "store", "temple", "university", "zoo", "office", "synagogue", "city hall"],
        sport: ["football", "cricket", "basketball", "baseball", "hockey", "tennis", "volleyball", "rugby", "soccer", "swimming", "cycling"],
        states: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"],
        body: ["ankle", "arm", "back", "blood", "liver", "lung", "kidney", "bone", "brain", "cheek", "chest", "chin", "ear", "elbow", "eye", "finger", "foot", "hand", "heart", "knee", "leg", "lip", "mouth", "muscle", "neck", "nose", "shoulder", "stomach", "teeth", "toe", "tongue", "wrist"],
        season: ["fall", "autumn", "winter", "summer", "spring"],
        computer: ["mouse", "keyboard", "processor", "hard drive", "software", "RAM", "monitor", "speakers", "usb", "GPU", "VRAM", "motherboard", "SSD", "power supply", "CPU", "sound card", "KVM switch"]
    },
}
