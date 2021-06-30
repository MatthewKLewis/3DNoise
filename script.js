///////// CONSTANTS /////////
UNIT = 4
SIDE_PIXELS = 80
SIDE_LENGTH = SIDE_PIXELS / UNIT // 20

///////// Z LAYER /////////
zIndex = -1

///////// CANVAS /////////
var cnv0 = document.querySelector('#canvas0');
var ctx0 = cnv0.getContext("2d");
cnv0.width = 80;
cnv0.height = 80;

var cnv1 = document.querySelector('#canvas1');
var ctx1 = cnv1.getContext("2d");
cnv1.width = 80;
cnv1.height = 80;

var cnv2 = document.querySelector('#canvas2');
var ctx2 = cnv2.getContext("2d");
cnv2.width = 80;
cnv2.height = 80;

document.addEventListener('click', scrollThroughZ)

function makeBorderingRed(cube) {
    cube.color = 'red'
    cube.bordering[0].color = 'red'
    cube.bordering[1].color = 'red'
    cube.bordering[2].color = 'red'
    cube.bordering[3].color = 'red'
    cube.bordering[4].color = 'red'
    cube.bordering[5].color = 'red'
}

function scrollThroughZ(evt) {
    zIndex++;
    if (zIndex >= SIDE_LENGTH - 2) {
        zIndex = 0
    }
    //console.log(zIndex)

    zStart = zIndex * SIDE_LENGTH * SIDE_LENGTH
    zEnd = (zIndex + 1) * SIDE_LENGTH * SIDE_LENGTH

    ///////// DRAW /////////
    //clear
    ctx0.clearRect(0,0, cnv0.width, cnv0.height)
    ctx1.clearRect(0,0, cnv1.width, cnv1.height)
    ctx2.clearRect(0,0, cnv2.width, cnv2.height)

    for (let i = zStart; i < zEnd; i++) {
        ctx0.fillStyle = grid[i].color
        if (grid[i].color != 'white') {
            ctx0.fillRect(grid[i].x * UNIT, grid[i].z * UNIT, UNIT, UNIT)
        }
    }

    for (let j = zStart + (SIDE_LENGTH * SIDE_LENGTH); j < zEnd  + (SIDE_LENGTH * SIDE_LENGTH); j++) {
        ctx1.fillStyle = grid[j].color
        if (grid[j].color != 'white') {
            ctx1.fillRect(grid[j].x * UNIT, grid[j].z * UNIT, UNIT, UNIT)
        }
    }

    for (let k = zStart + 2 * (SIDE_LENGTH * SIDE_LENGTH); k < zEnd  + 2 * (SIDE_LENGTH * SIDE_LENGTH); k++) {
        ctx2.fillStyle = grid[k].color
        if (grid[k].color != 'white') {
            ctx2.fillRect(grid[k].x * UNIT, grid[k].z * UNIT, UNIT, UNIT)
        }
    }
}

///////// GRID /////////
var grid = []
for (let y = 0; y < SIDE_LENGTH; y++) {
    for (let z = 0; z < SIDE_LENGTH; z++) {
        for (let x = 0; x < SIDE_LENGTH; x++) {
            grid.push(
                {
                    x: x,
                    y: y,
                    z: z,
                    i: x + (z * SIDE_LENGTH) + (y * (SIDE_LENGTH * SIDE_LENGTH)),
                    r: Math.floor(Math.random() * 2),
                    color: 'white'
                }
            )
        }
    }
}

///////// AWARENESS /////////
grid.forEach((square) => {
    square.bordering = []
    square.bordering[0] = grid[square.i - SIDE_LENGTH]  //top
    square.bordering[1] = grid[square.i + SIDE_LENGTH]  //bottom
    square.bordering[2] = grid[square.i - 1]            //left
    square.bordering[3] = grid[square.i + 1]            //right
    square.bordering[4] = grid[square.i - (SIDE_LENGTH * SIDE_LENGTH)] //OUT
    square.bordering[5] = grid[square.i + (SIDE_LENGTH * SIDE_LENGTH)] //IN
})

//////// SMOOTHING ////////
//

///////// COLOR /////////
for (let i = 0; i < grid.length; i++) {
    // TURN R's INTO HEX COLORS
    // switch (grid[i].r) {
    //     case 10:
    //         grid[i].r = 'A'
    //         break;
    //     case 11:
    //         grid[i].r = 'B'
    //         break;
    //     case 12:
    //         grid[i].r = 'C'
    //         break;
    //     case 13:
    //         grid[i].r = 'D'
    //         break;
    //     case 14:
    //         grid[i].r = 'E'
    //         break;
    //     case 15:
    //         grid[i].r = 'F'
    //         break;
    //     default:
    //         break;
    // }
    // grid[i].color = '#' + grid[i].r.toString().repeat(6)
    if (grid[i].r == 0) {
        grid[i].color = 'white'
    } else {
        grid[i].color = 'lightgrey'
    }
}

makeBorderingRed(grid[4210])
makeBorderingRed(grid[4210].bordering[0])
makeBorderingRed(grid[4210].bordering[1])
makeBorderingRed(grid[4210].bordering[2])
makeBorderingRed(grid[4210].bordering[3])
makeBorderingRed(grid[4210].bordering[4])
makeBorderingRed(grid[4210].bordering[5])