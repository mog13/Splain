let Splain =require("./splain");

Splain.addEntry({test:["hello world"], test2:["{{test}} it works!"]});

console.log(Splain.process("{{test}} {{test2}}"));