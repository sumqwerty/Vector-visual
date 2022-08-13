const s = ( sketch ) => {
    let arr = [];

    sketch.setup = () => {
        sketch.createCanvas(window.innerWidth, window.innerHeight);
        document.body.style.overflow = "hidden";
    };
  
    sketch.draw = () => {
        sketch.background(50);
        for(let i=0; i<arr.length; ++i){
            arr[i].disp();
        }
    };

    sketch.mousePressed = () => {
        arr.push(new Arrow(100,0,sketch.mouseX, sketch.mouseY, sketch));
    };
};
  
let myp5 = new p5(s);