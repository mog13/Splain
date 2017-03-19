var splain = new Splain();

console.log(splain.compile('"test"'));

function getInput() {
 return $('#splainCode').val();
}

function setOutput(output) {
    return $('#compiledSplain').text(output);
}


var doCompilation = function() {
    setOutput(splain.compile(getInput()));
};

