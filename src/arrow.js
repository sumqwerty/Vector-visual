class Arrow{
    constructor(_magnitude, _angle, _x, _y, sketch){
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
        this.minRange = 10; // check if vector can be moved
        this.maxRange = 200; // once it moved range increases
        this.inRangeToMove = this.minRange; 
        
    }

    update(){
        this.disp();
        this.toolTip();
        this.dragMove();

        this.x2 = this.x+this.xComponent;
        this.y2 = this.y+this.yComponent;
    }

    get mouseDist(){
        let d = this.sketch.dist(this.x,this.y,this.sketch.mouseX,this.sketch.mouseY) + this.sketch.dist(this.x2,this.y2,this.sketch.mouseX,this.sketch.mouseY);
        return d-this.magnitude;
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

    calc(){
        
    }

    disp(){
        this.sketch.fill(255,0,0);
        this.sketch.stroke(255,0,0);
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