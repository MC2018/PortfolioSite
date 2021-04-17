function initialize() {
    loadHeaderFooter();
    loadSVGs();
}

function loadHeaderFooter() {
    $("body").prepend("<header></header>").append("<footer></footer>");
    $("header").load("header.html");
    $("footer").load("footer.html");
}

function loadSVGs() {
    const svgs = {
        github: "images/github.svg",
        linkedin: "images/linkedin.svg",
        download: "images/download.svg"
    };

    for (var key in svgs) {
        $(`.${key}`).load(svgs[key]);
    }
}

function manageNavigation() {
    if ($("header nav").hasClass("visible")) {
        $("header nav").removeClass("visible");
    } else {
        $("header nav").addClass("visible");
    }
}