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
    }

    update(){
        this.disp();
        this.toolTip();
    }

    disp(){
        this.sketch.fill(255,0,0);
        this.sketch.stroke(255,0,0);
        this.sketch.strokeWeight(2);
        this.sketch.circle(this.x,this.y,30);
        this.sketch.line(this.x,this.y,this.x2,this.y2);
    }


    toolTip(){
        let d = this.sketch.dist(this.x,this.y,this.sketch.mouseX,this.sketch.mouseY) + this.sketch.dist(this.x2,this.y2,this.sketch.mouseX,this.sketch.mouseY);
        if(this.sketch.abs(d-this.magnitude) < 1){
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