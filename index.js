// your code goes here ...
var callback = function(){
    var addButton = document.querySelector('.add');
    addButton.addEventListener("click", function(event) {
        event.preventDefault();
        addPerson();
    });

    var form = document.forms[0];
    form.onsubmit = function(event){
        event.preventDefault();
        var outputJSON = [];
        var lis = document.querySelectorAll("li");
        for (let i = 0; i < lis.length; i++) {
            var listItem = lis[i].firstChild.textContent.split("/");
            outputJSON.push({
                relationship: listItem[0],
                age: listItem[1],
                smoker: (listItem[2] === "Smoker")
            })
        }

        var debug = document.querySelector('.debug');
        debug.innerText = JSON.stringify(outputJSON, null, 4);
        debug.style.display = "block";
    };

    var addPerson = function() {
        var form = document.forms[0];
        var ageSelection = +form.elements.age.value;
        var smokerSelection = form.elements.smoker.checked;
        var relationshipSelection = form.elements.rel.value;

        if (!isNaN(ageSelection) && (ageSelection > 0) && (relationshipSelection !== "")) {
            appendToList(ageSelection, relationshipSelection, smokerSelection);
        }
    };

    var appendToList = function(age, relationship, smoker) {
        var list = document.querySelector(".household");
        var node = document.createElement("li");
        var remove = document.createElement("a");
        remove.text = "[remove]";
        remove.href = "#";
        remove.addEventListener("click", removePerson);
        var textString = relationship + "/" + age + "/";
        textString += (smoker) ? "Smoker" : "Non-Smoker";
        var textNode = document.createTextNode(textString);
        node.appendChild(textNode);
        node.appendChild(remove);
        list.appendChild(node);
    };

    var removePerson = function(event) {
        var parent = event.target.parentNode;
        var greatparent = parent.parentNode;
        greatparent.removeChild(parent);
    };
};

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
    callback();
} else {
    document.addEventListener("DOMContentLoaded", callback);
}