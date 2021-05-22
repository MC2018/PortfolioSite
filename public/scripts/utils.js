function initialize() {
    loadSVGs();
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