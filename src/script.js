


const s = ( sketch ) => {
    let arr = [];

    sketch.setup = () => {
        sketch.createCanvas(window.innerWidth, window.innerHeight);
        document.body.style.overflow = "hidden";
    };
  
    sketch.draw = () => {
        sketch.background(50);
        for(let i=0; i<arr.length; ++i){
            arr[i].update();
        }
    };

    sketch.generateVector = () => {
        arr.push(new Arrow(100,sketch.random(90),sketch.width/2, sketch.height/2, sketch));
    };
};

  
let myp5 = new p5(s);
function createVector(){
    myp5.generateVector();
}