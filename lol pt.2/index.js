(function () {
    var preTag = document.getElementById('donut');

    var A = 1;
    var B = 1;
    var R1 = 1;
    var R2 = 2;
    var K1 = 150;
    var K2 = 5;

    function renderAsciiFrame() {
        var b = [];
        var z = [];

        var width = 200;
        var height = 160;


        A += 0.10;
        B += 0.03;
        var cA = Math.cos(A),
            sA = Math.sin(A);
        cB = Math.cos(B),
            sB = Math.sin(B);


        //  initialize arrays with default angles
        for (var k = 0; k < width * height; k++) {
            b[k] = k % width == width - 1 ? '\n' : ' ';
            z[k] = 0;
        }

        // Generate the ascii frame
        for (var j = 0; j < 6.28; j += 0.07) {
            var ct = Math.cos(j);
            var st = Math.sin(j);

            for (var i = 0; i < 6.28; i += 0.02) {
                var sp = Math.sin(i);
                cp = Math.cos(i),
                    h = ct + 2,
                    D = 1 / (sp * h * sA + st * cA + 5),
                    t = sp * h * cA - st * sA;

                // Calculate coordinates of ascii char
                var x = Math.floor(width / 2 + (width / 4) * D *
                    (cp * h * cB - t * sB));
                var y = Math.floor(height / 2 + (height / 4) * D *
                    (cp * h * sB + t * cB));

                var index = x + width * y;
                // calculate the ascii char index
                var N = Math.floor(8 * ((st * sA - sp * ct * cA)
                    * cB - sp * ct * sA - st * cA - cp * ct * sB));

                // update ascii char and depth if conditions are met, so:
                if (y < height && y >= 0 && x >= 0 && x < width && D > z[index]) {
                    z[index] = D;
                    b[index] = '.,-~:;=!*#$@' [N > 0 ? N : 0];
                }
            }
        }
        // update html element with the ascii frame
        preTag.innerHTML = b.join('');
    }

    // initiating the animation
    function startAsciiAnimation() {
        //by calling renderAsciiAnimation  every 50ms
        window.asciiIntervalId = setInterval(renderAsciiFrame, 50);
    }

    renderAsciiFrame();
    if (document.all) {
        // for older version of browsers
        window.attachEvent('onload', startAsciiAnimation);
    } else {
        // for newer version of browsers
        window.addEventListener('load', startAsciiAnimation, false);
    }

    // add event listener to update ascii frame when window resized
    window.addEventListener('resize', renderAsciiFrame);
})();