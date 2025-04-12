const webcam = document.getElementById('webcam');
const appIcons = document.querySelectorAll('.app-icon');
const appWindow = document.getElementById('app1');
const appHeader = appWindow.querySelector('.app-header');

let dragging = false;
let offsetX = 0, offsetY = 0;

// 기본 웹캠 설정
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => webcam.srcObject = stream);

// 아이콘 클릭 → 윈도우 열기
appIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    appWindow.classList.remove('hidden');
  });
});

// 드래그 기능
appHeader.addEventListener('mousedown', (e) => {
  dragging = true;
  offsetX = e.offsetX;
  offsetY = e.offsetY;
});

document.addEventListener('mousemove', (e) => {
  if (dragging) {
    appWindow.style.left = `${e.clientX - offsetX}px`;
    appWindow.style.top = `${e.clientY - offsetY}px`;
  }
});

document.addEventListener('mouseup', () => {
  dragging = false;
});
