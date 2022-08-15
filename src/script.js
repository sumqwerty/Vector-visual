


const s = ( sketch ) => {
    let arr = [];

    sketch.setup = () => {
        sketch.createCanvas(window.innerWidth, window.innerHeight);
        
    };
  
    sketch.draw = () => {
        sketch.background(50);
        for(let i=0; i<arr.length; ++i){
            arr[i].update();
        }
    };

    sketch.generateVector = (_controlContainer) => {
        let d = new Arrow(100,0,sketch.width/2, sketch.height/2, sketch, _controlContainer);
        arr.push(d);
    };

    sketch.deleteAll = () => {
        while(arr.length > 0){
            arr[0].deleteControls();
            arr.shift();
        }
    }
};



let myp5 = new p5(s);


function createVector(){
    
    myp5.generateVector('vector-controls');

}

function deleteAll(){
    myp5.deleteAll();
}