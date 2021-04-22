let xCurrentPosition = 0;
let yCurrentPosition = 0;

let tempX;
let tempY;

let tempX0;
let tempY0;

let tempX1;
let tempY1;

let str = "";

let step = 0;

let energy = 0;

const calculateRoverPath = (map) => {
    str = str + "[" + yCurrentPosition + "]" + "[" + xCurrentPosition + "]" + "->";
    
    if (!map[yCurrentPosition + 1]) {
        counterEnergy(map[yCurrentPosition][xCurrentPosition], map[yCurrentPosition][xCurrentPosition + 1])

        xCurrentPosition = xCurrentPosition + 1;

        if (xCurrentPosition < map.length - 1 || yCurrentPosition < map.length - 1) {
            calculateRoverPath(map);
        }
        
        step++;

        return;
    }

    if (!map[xCurrentPosition + 1]) {
        counterEnergy(map[yCurrentPosition][xCurrentPosition], map[yCurrentPosition + 1][xCurrentPosition])

        yCurrentPosition = yCurrentPosition + 1;

        if (xCurrentPosition < map.length - 1 || yCurrentPosition < map.length - 1) {
            calculateRoverPath();
        }

        step++;

        return;
    }

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (xCurrentPosition === j && yCurrentPosition + 1 === i) {    
                tempX = map[i][j];

                tempX0 = j;
                tempY0 = i;
            }
    
            if (xCurrentPosition + 1 === j && yCurrentPosition === i) {
                tempY = map[i][j];

                tempX1 = j;
                tempY1 = i;
            }
    
            if (tempX && tempY) {
                if (tempX < tempY) {
                    counterEnergy(map[yCurrentPosition][xCurrentPosition], map[tempY0][tempX0])

                    xCurrentPosition = tempX0;
                    yCurrentPosition = tempY0;
                } else {
                    console.log("log 2", map[yCurrentPosition][xCurrentPosition], map[tempY1][tempX1]);
                    counterEnergy(map[yCurrentPosition][xCurrentPosition], map[tempY1][tempX1])

                    xCurrentPosition = tempX1;
                    yCurrentPosition = tempY1;
                }

                tempX = tempY = tempX0 = tempY0 = tempX1 = tempY1 = null;

                if (xCurrentPosition < map.length - 1 || yCurrentPosition < map.length - 1) {
                    calculateRoverPath(map);
                }

                step++;

                return;
            }
        }
    }
};

str = str + "[" + yCurrentPosition + "]" + "[" + xCurrentPosition + "]";

const download = (filename, text, step, energy) => {
    let file = document.createElement('a');
    file.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text) + "\r\n" + encodeURIComponent(" step:" + step)+ "\r\n" + encodeURIComponent(" fuel:" + energy));
    file.setAttribute('download', filename);
    file.style.display = 'none';
    
    document.body.appendChild(file);
  
    file.click();
  
    document.body.removeChild(file);
};

download("path-plan", str, step, energy);

function counterEnergy(prev, current) {
    energy++;
    energy = energy + Math.abs(current - prev);
};

module.exports = {
    calculateRoverPath,
};
