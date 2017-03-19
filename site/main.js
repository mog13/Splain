var splain = new Splain();

var templates = {
    cars: ["audi", "mercedes", "subaru"],
    seasons: ["summer", "winter", "autumn", "fall"]
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


generateFromTemplates();
