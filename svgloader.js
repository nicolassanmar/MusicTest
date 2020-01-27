window.onload = function() {
    var canvas = document.getElementById("myCanvas");
    var scope = paper.setup(canvas);
  
    var url = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/tiger.svg`;
    var tiger;
  
    // // method 1
    // fetch(url)
    // .then(res => res.text())
    // .then(svg => paper.project.importSVG(svg, function(item) {
    //   tiger = item
    //   tiger.scale(0.5)
    //   tiger.position = new paper.Point(tiger.bounds.width/2, tiger.bounds.height/2)
    // }))
  
    // method 2
    paper.project.importSVG(url, function(item) {
      tiger = item;
      tiger.scale(0.5);
      tiger.position = new paper.Point(
        tiger.bounds.width / 2,
        tiger.bounds.height / 2
      );
    });
  
    paper.view.onFrame = event => {
      if (tiger) tiger.rotate(1);
    };
  };
  