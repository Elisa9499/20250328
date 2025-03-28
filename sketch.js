let seaweeds = []; // 儲存水草屬性的陣列
let palette = ['#d8f3dc', '#b7e4c7', '#95d5b2', '#74c69d', '#52b788', '#40916c', '#2d6a4f', '#1b4332', '#081c15']; // 調色盤

function setup() {
  // 設定透明的畫布背景
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('pointer-events', 'none'); // 讓畫布不攔截滑鼠事件
  canvas.position(0, 0); // 將畫布放置在視窗的最上層
  clear(); // 設定畫布背景為透明

  // 在視窗中產生一個充滿視窗的 iframe
  let iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw/'); // 設定 iframe 的來源網址
  iframe.position(0, 0); // 將 iframe 放置在視窗的左上角
  iframe.size(windowWidth, windowHeight); // 設定 iframe 的大小為充滿整個視窗
  iframe.style('z-index', '-1'); // 將 iframe 放置在動畫的後面

  // 初始化 40 條水草的屬性
  for (let i = 0; i < 40; i++) {
    seaweeds.push({
      height: random(300, 350), // 水草高度
      color: color(random(palette) + hex(floor(random(100, 200)), 2)), // 加入透明度
      thickness: random(15, 35), // 水草粗細
      frequency: random(0.02, 0.08), // 搖晃頻率
    });
  }
}

function draw() {
  clear(); // 清除畫布，保持背景透明

  for (let i = 0; i < seaweeds.length; i++) {
    let seaweed = seaweeds[i]; // 取得每條水草的屬性
    let sway = sin(frameCount * seaweed.frequency + i) * 50; // 搖晃幅度
    let y = height; // 線的起點在畫布底部
    let x = (width / seaweeds.length) * i + (width / (seaweeds.length * 2)); // 每條水草的水平位置

    strokeWeight(seaweed.thickness); // 設定水草的粗細
    stroke(seaweed.color); // 設定水草的顏色
    noFill(); // 不填充內部，避免顏色重疊加深

    // 畫出水草，底部固定，上方呈現流暢的 S 型搖動
    beginShape();
    vertex(x, y); // 底部固定點
    for (let j = 1; j <= 5; j++) { // 將水草分為 5 段，讓形狀更細緻
      let segmentHeight = seaweed.height / 5; // 每段的高度
      let controlX = x + sway * (j % 2 === 0 ? -0.6 : 0.6); // 控制點左右交替，增加擺動幅度
      let controlY = y - segmentHeight * j; // 控制點的高度
      curveVertex(controlX, controlY); // 添加控制點
    }
    vertex(x, y); // 再次將底部固定點封閉，確保水草貼著地面
    endShape(CLOSE); // 繪製水草並封閉形狀
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 調整畫布大小
  let iframe = select('iframe'); // 選取 iframe 元素
  iframe.size(windowWidth, windowHeight); // 調整 iframe 的大小為充滿整個視窗
}