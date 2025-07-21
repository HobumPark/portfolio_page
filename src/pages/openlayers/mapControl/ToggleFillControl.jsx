import Control from 'ol/control/Control';

class ToggleFillControl extends Control {
  constructor(onToggle) {
    const button = document.createElement('button');
    button.style.fontSize='8px'
    button.innerHTML = '영역 ON';
    button.title = '다각형 내부 채우기 토글';

    button.addEventListener('click', () => {
      onToggle();
      // 버튼 텍스트 토글 (옵션)
      button.innerHTML = button.innerHTML === '영역 ON' ? '영역 OFF' : '영역 ON';
    });

    const element = document.querySelector('.ol-zoom')
    element.appendChild(button);

    super({
      element: element,
    });
  }
}

export default ToggleFillControl;