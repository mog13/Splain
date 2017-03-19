var splain = new Splain();

var templates = {
    "good-adj":[
        "Amazing",
        "Awesome",
        "Blithesome",
        "Excellent",
        "Fabulous",
        "Fantastic",
        "Favorable",
        "Fortuitous",
        "Great",
        "Incredible",
        "Ineffable",
        "Mirthful",
        "Outstanding",
        "Perfect",
        "Propitious",
        "Remarkable",
        "Smart",
        "Spectacular",
        "Splendid",
        "Stellar",
        "Stupendous",
        "Super",
        "Ultimate",
        "Unbelievable",
        "Wondrous"
    ],
    "quant-lg-advb":["really","very","rather","pretty","fairly","too","quite"],
    "low-difficulty":["easy","simple", "understandable","implementable","aproachable"]

}

var selectedTemplate = "";


function generateFromTemplates() {
    $("#templateDropdownSelections").empty();
    for(var template in templates) {
        splain.addTemplate(template,templates[template]);
        addToDropdown(template);
    }
}

function addToDropdown(template) {
    $("#templateDropdownSelections").append("<li><a onClick='setTemplate(\"" + template + "\")' href='#'>" + template + "</a></li>");
}

function getInput() {
    return $('#splainCode').val();
}

function setOutput(output) {
    return $('#compiledSplain').text(output);

}

function buildCurrentTemplate() {
    var newVars =  $("#templateContents").val().trim().split(",");
    templates[selectedTemplate] = newVars;
    splain.addTemplate(selectedTemplate,newVars);
}


var doCompilation = function () {
    setOutput(splain.compile(getInput()));
};

var setTemplate = function (temp) {
    if (templates[temp]) {
        selectedTemplate = temp;
        $("#templatesDropDown").text(temp);
        $("#templateContents").val(templates[temp].join(", "));
    }
};

var addTemplate = function () {
    var newName = $("#newTemplateName").val()
    $("#newTemplateName").val("");
    templates[newName] = ["new template"];
    addToDropdown(newName)
    setTemplate(newName);
};

$("#templateContents").on("blur", function() {
  buildCurrentTemplate()
});

$('#splainCode').val('Splain is {good-adj}, {good-adj} and  {quant-lg-advb?3 low-difficulty}. {"make text more exciting"?} {"use now"|"fork us on github!"}');

generateFromTemplates();

