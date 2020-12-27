function initialize() {
    loadHeaderFooter();
    loadName();
    loadSVGs();
}

function loadHeaderFooter() {
    $("body").prepend("<header></header>").append("<footer></footer>");
    $("header").load("header.html");
    $("footer").load("footer.html");
}

function loadName() {
    $(".name").each(function (index, html) {
        var element = $(html);
        element.text(element.text().replace("!fullName", fullName));
    });
}

function loadSVGs() {
    $(".github").load("images/github.svg");
    $(".linkedin").load("images/linkedin.svg");
}

function manageNavigation() {
    if ($("header nav").hasClass("visible")) {
        $("header nav").removeClass("visible");
    } else {
        $("header nav").addClass("visible");
    }
}