class Arrow{

    constructor(_magnitude, _angle, _x, _y, sketch, _controlContainer){
        this.sketch = sketch;
        this.magnitude = _magnitude;
        this.angle = _angle;
        this.xComponent = _magnitude * this.sketch.cos(this.sketch.radians(_angle));
        this.yComponent = _magnitude * this.sketch.sin(this.sketch.radians(_angle));
        this.x = _x;
        this.y = _y;
        this.x2 = this.x+this.xComponent;
        this.y2 = this.y+this.yComponent;
        this.fade = 0;
        this.minRange = 5; // check if vector can be moved
        this.maxRange = 200; // once it moved range increases
        this.inRangeToMove = this.minRange; 
        this.controlParent = document.getElementById(_controlContainer);
        this.color = this.sketch.color(this.sketch.random(100,255),this.sketch.random(100,255),this.sketch.random(100,255));
        this.createControl();
    }
    selfDestruct(){

    }
    createControl(){
        let outerDiv = document.createElement('div');
        this.outerDiv = outerDiv;
        outerDiv.style.display = "flex";
        outerDiv.style.flexDirection = "column";

        this.magSlider = new scrollRange('Magnitude',200,30,0,500,this.magnitude,this.color);
        this.angleSlider = new scrollRange('Angle',200,30,0,360,this.angle,this.color);
        
        // let innerDiv1 = document.createElement('div');
        // innerDiv1.style.display = "flex";
        // innerDiv1.style.flexDirection = "row";

        // let innerDiv2 = document.createElement('div');
        // innerDiv2.style.display = "flex";
        // innerDiv2.style.flexDirection = "row";


        // this.magSlider = document.createElement("input");
        // let magLabel = document.createElement("span");
        // let magValue = document.createElement("div");
        // magLabel.innerHTML = "Magnitude";
        // magValue.innerHTML = this.magnitude;
        // magValue.classList.add("rangeVal");
        // this.magSlider.type = "range";
        // this.magSlider.min=-500;
        // this.magSlider.max=500;
        // this.magSlider.value=this.magnitude;
        // innerDiv1.appendChild(this.magSlider);
        // innerDiv1.appendChild(magValue);
        // innerDiv1.appendChild(magLabel);
        


        // this.angleSlider = document.createElement("input");
        // let angleLabel = document.createElement("span");
        // let angleValue = document.createElement("div");
        // angleValue.classList.add("rangeVal");
        // angleLabel.innerHTML = "Angle";
        // angleValue.innerHTML = this.angle;
        // this.angleSlider.type = "range";
        // this.angleSlider.min = 0;
        // this.angleSlider.max = 360;
        // this.angleSlider.style.backgroundColor = 'rgb(0,255,0)';
        // this.angleSlider.value=this.angle;
        // innerDiv2.appendChild(this.angleSlider);
        // innerDiv2.appendChild(angleValue);
        // innerDiv2.appendChild(angleLabel);
        

        let closeButton = document.createElement('div');
        closeButton.classList.add('close-button');
        outerDiv.appendChild(closeButton);
        outerDiv.appendChild(this.magSlider.getRanger());
        outerDiv.appendChild(this.angleSlider.getRanger());
        // outerDiv.appendChild(innerDiv1);
        // outerDiv.appendChild(innerDiv2);
        
        this.controlParent.appendChild(outerDiv);




        outerDiv.classList.add("outer-div");
        
        // let classObj = this;
        // this.magSlider.addEventListener('input', function (event){
        //     classObj.updateMagnitude(parseFloat(event.target.value));
        //     magValue.innerHTML = event.target.value;
        // });

        // this.angleSlider.addEventListener('input', function (event){
        //     classObj.updateAngle(parseFloat(event.target.value));
        //     angleValue.innerHTML = event.target.value;
        // });

        // magValue.addEventListener('click',(event)=>{},{capture: false});

    }

    updateAngle(angl){
        this.angle = angl;
    }

    updateMagnitude(mag){
        this.magnitude = mag;
    }

    deleteControls(){
        this.outerDiv.remove();
    }

    update(){
        this.magnitude = this.magSlider.value
        this.angle = this.angleSlider.value;
        this.xComponent = this.magnitude * this.sketch.cos(this.sketch.radians(this.angle));
        this.yComponent = this.magnitude * this.sketch.sin(this.sketch.radians(this.angle));
        this.x2 = this.x+this.xComponent;
        this.y2 = this.y+this.yComponent;


        this.disp();
        this.toolTip();
        this.dragMove();

        
    }

    get mouseDist(){
        let d = this.sketch.dist(this.x,this.y,this.sketch.mouseX,this.sketch.mouseY) + this.sketch.dist(this.x2,this.y2,this.sketch.mouseX,this.sketch.mouseY);
        return d-Math.abs(this.magnitude);
    }

    dragMove(){
        if(this.sketch.mouseIsPressed && this.sketch.mouseButton == this.sketch.LEFT && this.mouseDist < this.inRangeToMove){
            this.x = this.sketch.mouseX;
            this.y = this.sketch.mouseY;
            this.inRangeToMove = this.maxRange;
            // console.log("drag on");
        }
        else{
            this.inRangeToMove = this.minRange;
        }
    }

    calc(){
        
    }

    disp(){
        this.sketch.fill(this.color);
        this.sketch.stroke(this.color);
        this.sketch.strokeWeight(2);
        this.sketch.circle(this.x,this.y,10);
        this.sketch.line(this.x,this.y,this.x2,this.y2);
    }


    toolTip(){
        
        if(this.sketch.abs(this.mouseDist) < 1){
            // console.log("in range");
            this.sketch.noStroke();
            this.sketch.fill(255,255,255,this.fade);
            this.sketch.rect(this.sketch.mouseX,this.sketch.mouseY,100,100);
            if(this.fade < 150){
                this.fade += 5;
            }
        }
        else{
            this.fade = 0;
        }
    }
}