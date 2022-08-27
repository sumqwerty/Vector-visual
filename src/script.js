const s = ( sketch ) => {
    let arr = {};
    let lastVectorID = 0;
    let numOfVectors = 0;

    sketch.setup = () => {
        sketch.createCanvas(window.innerWidth, window.innerHeight);        
    };

    sketch.draw = () => {
        sketch.background(50);
        for(let i in arr){
            arr[i].update();
        }
    };

    sketch.generateVector = (_controlContainer) => {
        lastVectorID += 1;
        numOfVectors += 1;
        // let d = new Arrow(100,0,sketch.width/2, sketch.height/2, sketch, _controlContainer, lastVectorID);
        //arr.push(new Arrow(100,0,sketch.width/2, sketch.height/2, sketch, _controlContainer, lastVectorID));
        arr[lastVectorID] = new Arrow(100,0,sketch.width/2, sketch.height/2, sketch, _controlContainer, lastVectorID);
    };

    sketch.deleteAll = () => {
        numOfVectors = 0;
        while(lastVectorID > 0){
            sketch.deleteLast();
        }
    };

    sketch.deleteLast = () => {
        arr[lastVectorID].deleteControls();
        delete arr[lastVectorID];
        lastVectorID -= 1;
        numOfVectors -= 1;
    };

    sketch.keyTyped = () => {
        if(sketch.key == 'd')console.log(arr);
    };

    sketch.deleteThis = (vecID) => {
        arr[vecID].deleteControls();
        delete arr[vecID];
        numOfVectors -= 1;
    } 
};

let myp5 = new p5(s);
function createVector(){
    myp5.generateVector('vector-controls');
}
function deleteLast(){
    myp5.deleteLast();
}
function deleteAll(){
    myp5.deleteAll();
}

