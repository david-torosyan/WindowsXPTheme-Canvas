$(() => {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    ctx.strokeStyle = "white";

    let pointsArr = [];
    let points = [];
    for (var i = 0; i < 4; i++) {
        points.push({
            x: getRandomInt(0, canvas.width),
            y: getRandomInt(0, canvas.height),
            velocity: {
                x: getRandomInt(0, 2) === 0 ? -1 : 1,
                y: getRandomInt(0, 2) === 0 ? -1 : 1 
            }
        });
    }

    pointsArr.push(points);

    for (var j = 0; j < 4; j++) {
        let existingPoints = pointsArr[j];
        points = [];

        for (var i = 0; i < 4; i++) {
            points.push({
                x: existingPoints[i].x + 5, 
                y: existingPoints[i].y + 5, 
                velocity: {
                    x: existingPoints[i].velocity.x,
                    y: existingPoints[i].velocity.y
                }
            });
        }
        pointsArr.push(points);
    }

    let interval = 7;

    let myinterval = setInterval(() => {
        update();
        draw();
    }, interval);

    let myRange = document.getElementById("myRange");
    myRange.addEventListener("change", function () {
        interval = (100 - myRange.value) / 10 + 1;

        clearInterval(myinterval);

         myinterval = setInterval(() => {
            update();
            draw();
        }, interval);
    })

    function update() {
        for (var j = 0; j < pointsArr.length; j++) {
            let points = pointsArr[j];


            for (var i = 0; i < points.length; i++) {
                let point = points[i];

                if ((point.x === 0 && point.velocity.x === -1) ||
                    (point.x === canvas.width && point.velocity.x === 1)) {
                    point.velocity.x = -point.velocity.x;
                }
                if ((point.y === 0 && point.velocity.y === -1) ||
                    (point.y === canvas.height && point.velocity.y === 1)) {
                    point.velocity.y = -point.velocity.y;
                }
                point.x += point.velocity.x;
                point.y += point.velocity.y;
            }
        }
    }

    function draw() {
        // clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw

        for (var j = 0; j < pointsArr.length; j++) {
            let points = pointsArr[j];

            for (var i = 0; i < points.length; i++) {
                if (i < points.length - 1) {
                    drawLine(points[i], points[i + 1]);
                } else {
                    drawLine(points[i], points[0]);
                }
            }
        }
        
    }

    function drawLine(p1, p2) {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
    }
});
