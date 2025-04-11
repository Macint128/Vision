// MR 카메라 출력 (후면만)
navigator.mediaDevices.getUserMedia({
  video: { facingMode: { exact: "environment" } }
}).then((stream) => {
  document.getElementById('backCam').srcObject = stream;
}).catch(console.error);

// 전면 카메라 (시선 추정용) - 감지만, 화면엔 안 보임
navigator.mediaDevices.getUserMedia({
  video: { facingMode: "user" }
}).then((stream) => {
  document.getElementById('frontCam').srcObject = stream;
  // 추후 얼굴 감지 모델 붙이기
});

// === 앱 선택 & 실행 ===
let focusedApp = null;
let isAppOpen = false;

function simulateGazeDetection() {
  // 임시로 랜덤하게 앱 선택
  const icons = document.querySelectorAll('.app-icon');
  icons.forEach((el) => el.classList.remove('focused'));
  const r = Math.floor(Math.random() * icons.length);
  focusedApp = icons[r];
  focusedApp.classList.add('focused');
}
setInterval(simulateGazeDetection, 2000); // 가짜 시선 처리

// === 핀치 인식 시 실행 (가짜 처리) ===
document.addEventListener('keydown', (e) => {
  if (e.key === 'p') { // 'p' 키 누르면 핀치로 간주
    if (!isAppOpen && focusedApp) {
      document.getElementById('appWindow').style.display = 'block';
      isAppOpen = true;
    }
  }
});

// === 드래그 로직 ===
const appWindow = document.getElementById('appWindow');
const handle = document.getElementById('handle');

let dragging = false, offsetX = 0, offsetY = 0;

handle.addEventListener('mousedown', (e) => {
  dragging = true;
  offsetX = e.clientX - appWindow.offsetLeft;
  offsetY = e.clientY - appWindow.offsetTop;
});

document.addEventListener('mousemove', (e) => {
  if (!dragging) return;
  appWindow.style.left = `${e.clientX - offsetX}px`;
  appWindow.style.top = `${e.clientY - offsetY}px`;
});

document.addEventListener('mouseup', () => dragging = false);
