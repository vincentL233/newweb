const scene = document.getElementById("scene");
const road = document.getElementById("road");
const door = document.getElementById("door");
const flash = document.getElementById("flash");
const hint = document.querySelector(".hint");

let started = false;

scene.addEventListener("click", () => {
  if (started) return;
  started = true;

  // 1. 讓提示消失
  hint.style.display = "none";

  // 2. 讓路先變慢一點，像是要停下來
  road.classList.add("road-slow");

  // 3. 過一小段時間把路停住 + 門升起
  setTimeout(() => {
    road.classList.add("road-stop");
    road.classList.remove("road-slow");

    // 門升起
    door.classList.add("door-rise");

    // 4. 再過一下，讓門「打開」（白光亮起）
    setTimeout(() => {
      door.classList.add("door-open");

      // 5. 門打開瞬間閃白
      setTimeout(() => {
        flash.style.opacity = 1;

        // 6. 閃白之後可以導去下一頁 or 顯示主畫面
        setTimeout(() => {
          // 這裡你可以改成 window.location.href = "main.html";
          flash.style.opacity = 0;
        }, 200); // 白一下停留時間
      }, 120); // 門開到白光的延遲
    }, 600); // 門升起到打開的延遲
  }, 700);
});
