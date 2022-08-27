class Arrow{

    constructor(_magnitude, _angle, _x, _y, sketch, _controlContainer, _id){
        this.sketch = sketch;
        this.id = _id;
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
        this.color = this.sketch.color(this.sketch.random(0,255),this.sketch.random(0,255),this.sketch.random(0,255));
        this.createControl();
    }

    createControl(){
        let outerDiv = document.createElement('div');
        this.outerDiv = outerDiv;
        outerDiv.style.display = "flex";
        outerDiv.style.flexDirection = "column";

        this.magSlider = new scrollRange('Magnitude',10,1.5,0,500,this.magnitude,this.color);
        this.angleSlider = new scrollRange('Angle',10,1.5,0,360,this.angle,this.color);
        
        let closeButton = document.createElement('div');
        closeButton.classList.add('close-button');
        outerDiv.appendChild(closeButton);
        outerDiv.appendChild(this.magSlider.getRanger());
        outerDiv.appendChild(this.angleSlider.getRanger());
        this.controlParent.appendChild(outerDiv);

        outerDiv.classList.add("outer-div");


        let obj = this;
        // this will call the deleteThis function of the sketch object defiend in the script.js file
        closeButton.addEventListener('click',(event) => {
            obj.sketch.deleteThis(obj.id);
        });

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
        this.angle = -1 * this.angleSlider.value;
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
        }
        else{
            this.inRangeToMove = this.minRange;
        }
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