const A = document.getElementById("A");
const B = document.getElementById("B");
const C = document.getElementById("C");

const rods = {
  A: document.getElementById("A"),
  B: document.getElementById("B"),
  C: document.getElementById("C"),
};

const start = document.getElementById("start");
const stop = document.getElementById("stop");
const next = document.getElementById("next");
const back = document.getElementById("back");
const end = document.getElementById("end");
const restart = document.getElementById("restart");

const moves = [];
const previous_moves = [];

let lock = false;

const time = 500;

function hanoi(n, A, B, C) {
    if (n == 1) {
      moves.push([A, C]);
    } else {
      hanoi(n - 1, A, C, B);
      moves.push([A, C]);
      hanoi(n - 1, B, A, C);
    }
};

function exhanoi(n, A, B, C) {
  if (n == 1) {
    moves.push([C, B]);
    moves.push([A, C]);
    moves.push([B, A]);
    moves.push([B, C]);
    moves.push([A, C]);
  } else {
    exhanoi(n - 1, A, B, C);
    hanoi(3 * n - 2, C, A, B);
    moves.push([A, C]);
    hanoi(3 * n - 1, B, A, C);
  }
}


(() => {
  const n = window.prompt("Enter the number of disks:");

  let x = 3;
  for (let i = 1; i <= n; i++) {
    const disk1 = document.createElement("div");
    disk1.classList.add("disk");
    disk1.style.width = `calc(5rem + ${x - 1}rem)`;
    rods["A"].appendChild(disk1);
    x += 3;
  }

  let y = 2;
  for (let i = 1; i <= n; i++) {
    const disk2 = document.createElement("div");
    disk2.classList.add("disk");
    disk2.style.width = `calc(5rem + ${y - 1}rem)`;
    rods["B"].appendChild(disk2);
    y += 3;
  }

  let z = 1;
  for (let i = 1; i <= n; i++) {
    const disk3 = document.createElement("div");
    disk3.classList.add("disk");
    disk3.style.width = `calc(5rem + ${z - 1}rem)`;
    rods["C"].appendChild(disk3);
    z += 3;
  }

  exhanoi(n, "A", "B", "C");
})();


function moveDisk(from, to) {
  const fromEl = rods[from];
  const toEl = rods[to];
  const disk = fromEl.firstChild;
  toEl.insertBefore(disk, toEl.firstChild);
}

start.addEventListener("click", () => {
  lock = false;
  start.disable = true;
  setInterval(() => {
    if (moves.length == 0 || lock) {
      return;
    }
    const [from, to] = moves.shift();
    previous_moves.push([from, to]);
    moveDisk(from, to);
  }, time);
});

next.addEventListener("click", () => {
    if (moves.length == 0) {
      window.alert("You have reached the end!");
      return;
    }
    const [from, to] = moves.shift();
    previous_moves.push([from, to]);
    moveDisk(from, to);
});
  
back.addEventListener("click", () => {
    if (previous_moves.length === 0) {
      window.alert("You have reached the base state!");
      return;
    }
    const [from, to] = previous_moves.pop();
    moves.unshift([from, to]);
    moveDisk(to, from);
});
  
stop.addEventListener("click", () => {
    lock = true;
});
  
end.addEventListener("click", () => {
    while (moves.length !== 0) {
      const [from, to] = moves.shift();
      previous_moves.push([from, to]);
      moveDisk(from, to);
    }
});

restart.addEventListener("click", () => {
    location.reload();
});
  