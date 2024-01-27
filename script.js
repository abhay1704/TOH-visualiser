
const main = document.querySelector("#main");
let discCount = [];
let nDisc = 3;
const inputField = document.querySelector("#input--disc");
const buttonStart = document.querySelector('#start');
const stepsDisplay = document.querySelector("#steps");
discCount[1] = nDisc;
discCount[2] = 0;
discCount[3] = 0;
let startListener = undefined;




inputField.addEventListener('change', () => {
    nDisc = inputField.value;
    console.log(nDisc);
    discCount[1] = nDisc;
    discCount[2] = 0;
    discCount[3] = 0;
    let discs = document.querySelectorAll(".disc");

    discs.forEach(disc => disc.remove());

    for (let i = 1; i <= nDisc; i++) {
        main.insertAdjacentHTML("beforeend",
            `
        <div class="disc" data-container="1" data-disc-no="${i}"></div>
        `
        )
    }


    discs = document.querySelectorAll(".disc");
    discs.forEach(disc => setDiscPos(disc));


    if (startListener)
        buttonStart.removeEventListener('click', startListener);

    startListener = defineTOH(nDisc, 1, 3, 2);
    // console.log(startListener);

    buttonStart.addEventListener('click', startListener);
    buttonStart.addEventListener('click', () => {
        inputField.style.display = "none";
        buttonStart.style.display = "none";
    });

});


function setDiscPos(disc, animate = false) {
    if (animate) {
        disc.style.transform = `translateY(-50px)`;
        disc.style.transition = 'bottom 0.8s ease';
        disc.style.transition = 'left 0.8s 0.8s ease';
        setTimeout(
            () => {
                disc.style.transform = `translateY(0)`;
            }
            , 1600);
    }
    else {
        const width = 100 - disc.dataset.discNo * 10;
        disc.style.width = `${width}px`;
    }

    const width = disc.style.width;
    const leftPos = 20 + 30 * (disc.dataset.container - 1);
    const bottomPos = 10 * (disc.dataset.discNo - 1);
    disc.style.left = `calc(${leftPos}% - ${width} / 2)`;
    disc.style.bottom = `calc(10% + ${bottomPos}px)`;
}




function moveDisc(from, to) {
    const targetDisc = document.querySelector(`[data-container = "${from}"][data-disc-no="${discCount[from]}"]`);
    discCount[from]--;
    discCount[to]++;
    targetDisc.dataset.container = to;
    targetDisc.dataset.discNo = discCount[to];
    setDiscPos(targetDisc, true);
}


function defineTOH(nDisc, start, end, mid) {
    let delay = 0;
    let steps = 0;
    function TOH(a, b, d, c) {
        if (a >= 1) {
            TOH(a - 1, b, c, d);
            setTimeout(() => {
                // console.log(`1 block from ${b} to ${d}`);
                steps++;
                stepsDisplay.innerText = steps;
                moveDisc(b, d);
            }, delay);
            delay += 3000;
            TOH(a - 1, c, d, b);
        }
    }

    return TOH.bind(this, nDisc, start, end, mid);
}