let canvas = null;
let ctx = null;
// let alpha = Math.random() * 360 + 1;
// let c1 = 100, c2 = 100;
let slope = 2 * Math.PI / 360 * 60;
let pills = [];

// colors: light green, pink, orange, blue, red, purple , yellow

let colors = ['#dee610', '#357bde', '#d92727', '#2fd1fa', '#fab132', '#ee23fc', '#6cff3b'];

let getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
}

let getRandomInt = (min,max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let init = () => {
    // Get the canvas element node
    canvas = document.querySelector('#animated_background');
    if(canvas.getContext){
        ctx = canvas.getContext('2d');
        ctx.canvas.height = window.innerHeight;
        ctx.canvas.width = window.innerWidth;
        // Populate Pills array with values
        for(let i = 1; i <= 30; ++i){
            pills.push({
                c1: getRandomArbitrary(-25,ctx.canvas.width + 5),
                c2: getRandomArbitrary(-25,ctx.canvas.height + 5),
                omega: getRandomArbitrary(0.5,2),
                speed: getRandomArbitrary(0.5,1.1),
                angle: getRandomArbitrary(0,361),
                color: colors[getRandomInt(0,6)]
            });
        }
        window.requestAnimationFrame(doAnimation);
    }
}

let drawShape = (x,y,angle,color) => {
    ctx.save();
    ctx.translate(x,y);
    ctx.fillStyle = color;
    ctx.rotate(angle);
    // Draw The Shape ---->
    ctx.beginPath();
    ctx.moveTo(15,8);
    ctx.lineTo(-15,8);
    ctx.arc(-15,0,8,Math.PI / 2,3 * Math.PI / 2,false);
    ctx.lineTo(15,-8);
    ctx.arc(15,0,8,-Math.PI / 2,-3 * Math.PI / 2,false);
    ctx.fill();
    // Restore the initial canavas state
    ctx.restore();
}

let doAnimation = () => {
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    for(let i = 0; i < pills.length; ++i){
        let currPill = pills[i];
        currPill.c1 = currPill.c1+ Math.cos(slope) * currPill.speed;
        currPill.c2 = currPill.c2 + Math.sin(slope) * currPill.speed;
        currPill.angle = (currPill.angle + currPill.omega) % 360;
        if(currPill.c1> ctx.canvas.width + 25 || currPill.c2 > ctx.canvas.height + 25){
            let choice = [];
            // (x, -y)
            choice.push({
                c1: getRandomArbitrary(0, ctx.canvas.width - 10),
                c2: getRandomArbitrary(-100,-25)
            });
            // (-x, -y)
            // choice.push({
            //     c1: getRandomArbitrary(-100,-25),
            //     c2: getRandomArbitrary(-100,-25)
            // });
            // (-x, y)
            choice.push({
                c1: getRandomArbitrary(-100,-25),
                c2: getRandomArbitrary(0, ctx.canvas.height - 10)
            });
            let randomChoice = getRandomInt(0,1);
            currPill.c1 = choice[randomChoice].c1;
            currPill.c2 = choice[randomChoice].c2;
        }
        let currRadian = ((2 * Math.PI) / 360) * currPill.angle;
        drawShape(currPill.c1, currPill.c2, currRadian, currPill.color);
    }   
    //                      <-- Test Code -->
    // alpha = (alpha + 5) % 360;
    // c1 = c1 + Math.cos(slope); // Hypotenuse = 1
    // c2 = c2 + Math.sin(slope); // Hypoteneuse = 1
    // if(c1 > ctx.canvas.width + 25 || c2 > ctx.canvas.height + 25){
    //     c1 = c2 = 100;
    // }
    // let currRadian = ((2 * Math.PI) / 360) * alpha;
    // drawShape(c1,c2,currRadian,'blue');
    window.requestAnimationFrame(doAnimation);
}

window.onresize = () => {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    // window.cancelAnimationFrame(ID); the above approach looks better, hence not using this
    // pills = [];
    // init();
}

init();