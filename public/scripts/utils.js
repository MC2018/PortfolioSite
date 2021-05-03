function initialize() {
    loadHeaderFooter();
    loadSVGs();
}

function loadHeaderFooter() {
    $("body").prepend("<header></header>").append("<footer></footer>");
    //$("header").load("header.html");
    $("footer").load("footer.html", function() {
        loadSVGs("footer");
    });
}

function loadSVGs(parent) {
    const svgs = {
        github: "images/github.svg",
        linkedin: "images/linkedin.svg",
        download: "images/download.svg",
        aboutme: "images/aboutme.svg",
        projects: "images/projects.svg",
        contact: "images/contact.svg"
    };

    if (parent) {
        parent += " ";
    } else {
        parent = "";
    }

    for (var key in svgs) {
        $(`${parent}.${key}`).load(svgs[key]);
    }
}