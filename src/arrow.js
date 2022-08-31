class Arrow{

    constructor(_magnitude, _angle, _x, _y, sketch, _controlContainer, _id){
        this.sketch = sketch;
        this.id = _id;
        this.magnitude = _magnitude;
        this.angle = _angle;
        // this.xComponent = Math.floor(_magnitude * this.sketch.cos(this.sketch.radians(_angle)));
        // this.yComponent = Math.floor(_magnitude * this.sketch.sin(this.sketch.radians(_angle)));
        this.xComponent = (_magnitude * this.sketch.cos(this.sketch.radians(_angle)));
        this.yComponent = (_magnitude * this.sketch.sin(this.sketch.radians(_angle)));
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
        this.showComponents = false;
        
        this.createControl();

    }

    createControl(){
        let outerDiv = document.createElement('div');
        this.outerDiv = outerDiv;
        outerDiv.style.display = "flex";
        outerDiv.style.flexDirection = "column";

        this.magSlider = new scrollRange('Magnitude',10,1.5,0,500,this.magnitude,this.color,'after');
        this.angleSlider = new scrollRange('Angle',10,1.5,0,360,this.angle,this.color,'after');
        
        let closeButton = document.createElement('div');
        closeButton.classList.add('close-button');
        outerDiv.appendChild(closeButton);
        outerDiv.appendChild(this.magSlider.getRanger());
        outerDiv.appendChild(this.angleSlider.getRanger());
        this.controlParent.appendChild(outerDiv);

        // div to display x component and other stuff
        let dispXcomp = document.createElement('div');
        dispXcomp.style.display = 'flex';
        dispXcomp.style.flexDirection = 'row';
        dispXcomp.classList.add('infoPanelText');

        this.xCompSld = new scrollRange('X:',9,1.5,-500,500,this.magnitude,this.color,'before');
        dispXcomp.appendChild(this.xCompSld.getRanger());
        outerDiv.appendChild(dispXcomp);


        let dispYcomp = document.createElement('div');
        dispYcomp.style.display = 'flex';
        dispYcomp.style.flexDirection = 'row';
        dispYcomp.classList.add('infoPanelText');

        this.yCompSld = new scrollRange('Y:',9,1.5,-500,500,0,this.color,'before');
        dispYcomp.appendChild(this.yCompSld.getRanger());
        outerDiv.appendChild(dispYcomp);
        outerDiv.appendChild(dispYcomp);


        let toggleComponentContainer = document.createElement('div');
        toggleComponentContainer.classList.add('checkBoxContainer');
        this.componentSwitch = document.createElement('input');
        this.componentSwitch.type = 'checkbox';
        this.componentSwitch.id = this.id+'cSwitch';
        this.componentSwitch.style.height = '1.5rem';
        this.componentSwitch.style.margin = '2px';
        
        let cSwitchLabel = document.createElement('label');
        cSwitchLabel.innerHTML = 'Components';
        cSwitchLabel.htmlFor = this.componentSwitch.id;
        cSwitchLabel.style.height = '1.5rem';
        toggleComponentContainer.appendChild(this.componentSwitch);
        toggleComponentContainer.appendChild(cSwitchLabel);
        dispXcomp.appendChild(toggleComponentContainer);


        let toggleAdd = document.createElement('div');
        toggleAdd.classList.add('checkBoxContainer');
        toggleAdd.style.marginRight = '0.5rem';
        this.addSwitch = document.createElement('input');
        this.addSwitch.type = 'checkbox';
        this.addSwitch.id = this.id+'addSwitch';
        this.addSwitch.style.height = '1.5rem';
        this.addSwitch.style.margin = '2px';

        let aSwitchLabel = document.createElement('label');
        aSwitchLabel.innerHTML = 'Add';
        aSwitchLabel.htmlFor = this.addSwitch.id;
        aSwitchLabel.style.height = '1.5rem';
        toggleAdd.appendChild(this.addSwitch);
        toggleAdd.appendChild(aSwitchLabel);
        dispYcomp.appendChild(toggleAdd);

        let toggleSub = document.createElement('div');
        toggleSub.classList.add('checkBoxContainer');
        toggleSub.style.marginLeft = '0.5rem';
        this.subSwitch = document.createElement('input');
        this.subSwitch.type = 'checkbox';
        this.subSwitch.id = this.id+'subSwitch';
        this.subSwitch.style.height = '1.5rem';
        this.subSwitch.style.margin = '2px';

        let sSwitchLabel = document.createElement('label');
        sSwitchLabel.innerHTML = 'Sub';
        sSwitchLabel.htmlFor = this.subSwitch.id;
        sSwitchLabel.style.height = '1.5rem';
        toggleSub.appendChild(this.subSwitch);
        toggleSub.appendChild(sSwitchLabel);
        dispYcomp.appendChild(toggleSub);




        
        

        outerDiv.classList.add("outer-div");

        let obj = this;

        // this will call the deleteThis function of the sketch object defiend in the script.js file
        closeButton.addEventListener('click',(event) => {
            obj.sketch.deleteThis(obj.id);
        });

        this.magSlider.getSlider().addEventListener('input',(event)=>{
            obj.updateMagnitude();
        });

        this.angleSlider.getSlider().addEventListener('input',(event)=>{
            obj.updateAngle();
        });

        this.xCompSld.getSlider().addEventListener('input',(event)=>{
            obj.updateXComponent();
        });

        this.yCompSld.getSlider().addEventListener('input',(event)=>{
            obj.updateYComponent();
        });

        this.componentSwitch.addEventListener('input', (event)=> {
            obj.showComponents = event.target.checked;
        });


    }

    updateXComponent(){
        this.xComponent = this.xCompSld.value;
        this.manualUpdateMagAngle();
    }

    updateYComponent(){
        this.yComponent = -this.yCompSld.value;
        this.manualUpdateMagAngle();
    }

    updateAngle(){
        this.angle = -1 * this.angleSlider.value;
        this.manualUpdateComponents();
    }

    updateMagnitude(){
        this.magnitude = this.magSlider.value;
        this.manualUpdateComponents();
    }

    manualUpdateMagAngle(){
        let temp = this.sketch.createVector(this.xComponent, this.yComponent);
        this.magnitude = Math.floor(temp.mag());
        
        let unitX = this.sketch.createVector(1,0);
        
        let tempA = Math.floor(this.sketch.degrees(unitX.angleBetween(temp)));
        if(tempA < 0)this.angle = -1 * tempA;
        else this.angle = 360 - tempA;
        

        this.magSlider.updateSlider(this.magnitude);
        this.angleSlider.updateSlider(this.angle);
    }

    manualUpdateComponents(){
        // this.xComponent = Math.floor(this.magnitude * this.sketch.cos(this.sketch.radians(this.angle)));
        // this.yComponent = Math.floor(this.magnitude * this.sketch.sin(this.sketch.radians(this.angle)));
        
        this.xComponent = (this.magnitude * this.sketch.cos(this.sketch.radians(this.angle)));
        this.yComponent = (this.magnitude * this.sketch.sin(this.sketch.radians(this.angle)));
        
        if(Math.abs(this.angle) == 90 || Math.abs(this.angle) == 270    )this.xComponent = 0;
        else if(this.angle == 0 || this.angle == -180 || this.angle == -360)this.yComponent = 0;

        this.xCompSld.updateSlider(Math.floor(this.xComponent));
        this.yCompSld.updateSlider(Math.floor(-this.yComponent));
    }

    deleteControls(){
        this.outerDiv.remove();
    }

    update(){
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

    drawHead(c1,c2,xcomp,ycomp){
        let a1 = this.sketch.createVector(xcomp,ycomp);
        a1.setMag(15);
        this.sketch.push();
        this.sketch.translate(c1,c2);
        this.sketch.rotate(this.sketch.radians(-135));
        this.sketch.line(0,0,a1.x,a1.y);
        this.sketch.rotate(this.sketch.radians(135));
        this.sketch.rotate(this.sketch.radians(135));
        this.sketch.line(0,0,a1.x,a1.y);
        this.sketch.rotate(this.sketch.radians(-135));
        this.sketch.pop();
    }

    disp(){
        
        this.sketch.fill(this.color);
        this.sketch.stroke(this.color);
        this.sketch.strokeWeight(5);
        this.sketch.circle(this.x,this.y,10);
        this.sketch.line(this.x,this.y,this.x2,this.y2);
        this.drawHead(this.x2,this.y2,this.xComponent,this.yComponent);
        if(this.showComponents){
            // x component
            if(this.angle != 270 || this.angle != 90){
                this.sketch.push();
                this.sketch.drawingContext.setLineDash([15, 10]);
                this.sketch.line(this.x,this.y,this.x2,this.y);
                this.drawHead(this.x2,this.y,this.xComponent,0);
                this.sketch.pop();
            }
            // y component
            if(this.angle != 0 || this.angle != 180 || this.angle != 360){
                this.sketch.push();
                this.sketch.drawingContext.setLineDash([15, 10]);
                this.sketch.line(this.x,this.y,this.x,this.y2);
                this.drawHead(this.x,this.y2, 0,this.yComponent);
                this.sketch.pop();
            }
        }
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