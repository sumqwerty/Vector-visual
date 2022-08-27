Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

class scrollRange{
    constructor(_name, _width, _height, _min, _max, _value, _color){
        this.width = _width;
        this.height = _height;
        this.min = _min;
        this.max = _max;
        this.value = _value;
        this.color = _color;
        this.name = _name;
        
    }

    getRanger(){

        this.container = document.createElement('div');
        this.container.style.display = 'flex';
        this.container.style.flexDirection = 'row';

        this.outer = document.createElement('div');
        this.outer.style.display = 'flex';


        this.range = document.createElement('input');
        this.range.type = 'range';
        this.range.style.width = this.width+'rem';
        this.range.style.height = this.height+'rem';
        this.range.min = this.min;
        this.range.max = this.max;
        this.range.value = this.value;
        this.outer.appendChild(this.range);

        this.innerRect = document.createElement('div');
        this.innerRect.classList.add('innerRect');
        this.innerRect.style.width = this.value.map(this.min, this.max, 0, this.width)+'rem';
        this.innerRect.style.height = this.height+'rem';
        this.innerRect.style.backgroundColor = this.color;
        this.outer.appendChild(this.innerRect);

        this.rValue = document.createElement('div');
        this.rValue.innerHTML = this.range.value;
        this.rValue.classList.add('rangeVal');
        this.rValue.style.fontSize = this.height-(this.height/4)+'rem';
        this.outer.appendChild(this.rValue);

        this.container.appendChild(this.outer);

        this.rLabel = document.createElement('span');
        this.rLabel.innerHTML = this.name;
        this.rLabel.style.fontSize = this.height-(this.height/4)-0.1+'rem';
        this.rLabel.style.alignSelf = 'center';
        this.container.appendChild(this.rLabel);

        
        
        let obj = this;
        this.range.addEventListener('input',function(){
            obj.value = parseInt(this.value);
            obj.innerRect.style.width = obj.value.map(obj.min, obj.max, 0, obj.width)+'rem';
            obj.rValue.innerHTML = this.value;
        });

        return this.container;
    }


}