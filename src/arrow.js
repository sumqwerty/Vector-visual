class Arrow{
    // constructor(_magnitude, _angle){
    //     this.magnitude = _magnitude;
    //     this.angle = _angle;
    //     this.xComponent = _magnitude * cos(radians(_angle));
    //     this.yComponent = _magnitude * sin(radians(_angle));
    //     this.x = 0;
    //     this.y = 0;

    // }

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
    }

    disp(){
        this.sketch.fill(255,0,0);
        this.sketch.stroke(255,0,0);
        this.sketch.strokeWeight(2);
        this.sketch.circle(this.x,this.y,30);
        this.sketch.line(this.x,this.y,this.x2,this.y2);
    }


    toolTip(){
    }
}