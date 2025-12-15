let spriteSheet;
let spriteSheet2;
let walkSheet;
let jumpSheet;
let pushSheet;
let smileSheet2;
let fallDownSheet2;
let toolSheet;
let bgGate;
let bgLiberalArts;
let bgTrack;
let stopSheet;
let fastSheet;
let scarySheet;
let spriteSheet4;
let spriteSheet4Ask;
let spriteSheet5;
let bgMusic;
let teleportSound;
let successSound;
let failSound;
let victoryMusic;
let heartAnims = [];
let checkMarkAnims = [];
let crossMarkAnims = [];

// 常數定義
const GROUND_Y_RATIO = 0.72;

// 落葉效果
let leaves = [];
const leafCount = 40;

let animation = [];
let animation2 = [];
let walkAnimation = [];
let jumpAnimation = [];
let pushAnimation = [];
let smileAnimation2 = [];
let fallDownAnimation2 = [];
let toolAnimation = [];
let stopAnimation = [];
let fastAnimation = [];
let scaryAnimation = [];
let animation4 = [];
let animation4Ask = [];
let animation5 = [];

let gameState = 'loading'; // 'loading', 'title' or 'playing'
let loadingProgress = 0; // 載入進度
let isPaused = false; // 暫停狀態
let currentLevel = 1; // 1: gate, 2: liberal_arts, 3: track

let spriteWidth = 1955;
let spriteHeight = 212;
let numFrames = 14;
let frameWidth;

let spriteWidth2 = 699;
let spriteHeight2 = 190;
let numFrames2 = 8;
let frameWidth2;

let smileSpriteWidth2 = 585;
let smileSpriteHeight2 = 183;
let smileNumFrames2 = 5;
let smileFrameWidth2;

let fallDownSpriteWidth2 = 2712;
let fallDownSpriteHeight2 = 156;
let fallDownNumFrames2 = 11;
let fallDownFrameWidth2;

let walkSpriteWidth = 1246;
let walkSpriteHeight = 198;
let walkNumFrames = 9;
let walkFrameWidth;

let jumpSpriteWidth = 1913;
let jumpSpriteHeight = 188;
let jumpNumFrames = 14;
let jumpFrameWidth;

let pushSpriteWidth = 1039;
let pushSpriteHeight = 146;
let pushNumFrames = 4;
let pushFrameWidth;

let toolSpriteWidth = 740;
let toolSpriteHeight = 19;
let toolNumFrames = 5;
let toolFrameWidth;

let stopSpriteWidth = 499;
let stopSpriteHeight = 77;
let stopNumFrames = 15;
let stopFrameWidth;
let fastSpriteWidth = 499;
let fastSpriteHeight = 77;
let fastNumFrames = 6;
let fastFrameWidth;
let scarySpriteWidth = 499;
let scarySpriteHeight = 77;
let scaryNumFrames = 12;
let scaryFrameWidth;

let spriteWidth4 = 375;
let spriteHeight4 = 89;
let numFrames4 = 5;
let frameWidth4;
let scale4 = 2.0; // 角色4的縮放比例，可在此調整大小

let spriteWidth4Ask = 450;
let spriteHeight4Ask = 84;
let numFrames4Ask = 7;
let frameWidth4Ask;
let currentFrame4Ask = 0;
let askAnimationSpeed4 = 0.15;

let spriteWidth5 = 1525;
let spriteHeight5 = 151;
let numFrames5 = 15;
let frameWidth5;
let currentFrame5 = 0;
let animationSpeed5 = 0.15;

let currentFrame2 = 0;
let currentFrame = 0;
let stopCurrentFrame = 0;
let fastCurrentFrame = 0;
let scaryCurrentFrame = 0;
let walkCurrentFrame = 0;
let jumpCurrentFrame = 0;
let pushCurrentFrame = 0;
let smileCurrentFrame2 = 0;
let fallDownCurrentFrame2 = 0;
let animationSpeed = 0.1; // 調整這個值可以改變動畫速度，數字越小越慢
let walkAnimationSpeed = 0.2;
let jumpAnimationSpeed = 0.3;
let pushAnimationSpeed = 0.15;
let smileAnimationSpeed2 = 0.1;
let fallDownAnimationSpeed2 = 0.2;
let animationSpeed2 = 0.1;
let toolAnimationSpeed = 0.3;
let stopAnimationSpeed = 0.15;
let fastAnimationSpeed = 0.2;
let scaryAnimationSpeed = 0.2;
let stopHitThreshold = 135;
let stopHitDuration = 90;
let stopHitTimer = 0;

// 傳送點相關變數
let teleportX, teleportY;
let teleportRadius = 50;
let teleportAngle = 0;

// 角色位置與移動速度
let characterX;
let characterY;
let character2X;
let character2Y;
let moveSpeed = 5;
let stopOffsetX = 180;
let stopOffsetY = 0;
let stopScale = 2.2;
let stopPosX;
let stopPosY;

// 角色狀態
let isJumping = false;
let jumpHeight = 150; // 角色跳躍的高度
let facingDirection = 1; // 角色面向的方向: 1=右, -1=左
let isPushing = false;
let isSmiling2 = false; // 角色2是否在微笑
let isFallingDown2 = false; // 角色2是否在倒下
let isScared = false; // 角色3是否在害怕
let proximityThreshold = 200; // 觸發互動的距離
let projectileHitThreshold = 100; // 飛行道具擊中判定距離
let recoveryThreshold = 150; // 角色1靠近觸發恢復的距離
let hasFired = false; // 確保每次攻擊只發射一次

// 飛行道具陣列，可以管理多個道具
let projectiles = [];

// --- 題庫與問答系統變數 ---
let questions = [
  // Level 1: 教育科技相關題目 (隨機選3題)
  { level: 1, q: "教育科技的重點比較偏向？", op1: "技術本身", op2: "教學與學習", a: '2', hint: "不是只看機器，而是看怎麼用。" },
  { level: 1, q: "教科系學程式的主要目的？", op1: "當工程師", op2: "做教學應用", a: '2', hint: "我們不是資工系，重點是應用。" },
  { level: 1, q: "教育科技中「科技」的角色是？", op1: "目的", op2: "工具", a: '2', hint: "科技是用來幫忙解決問題的。" },
  { level: 1, q: "好的教育科技設計應先考慮？", op1: "學習者", op2: "最新科技", a: '1', hint: "以人為本，使用者是誰？" },
  { level: 1, q: "教育心理學在教科系的功能是？", op1: "了解人怎麼學", op2: "背理論名詞", a: '1', hint: "心理學研究人的行為與認知。" },
  { level: 1, q: "教育科技能不能沒有電腦？", op1: "可以", op2: "不行", a: '1', hint: "黑板、粉筆也是科技的一種喔。" },
  { level: 1, q: "教科系的教學設計比較接近？", op1: "以老師為中心", op2: "以學習者為中心", a: '2', hint: "學生才是學習的主角。" },
  { level: 1, q: "AI 在教育科技中最重要的是？", op1: "自動化", op2: "輔助決策", a: '2', hint: "AI 是助手，不是取代者。" },
  { level: 1, q: "教科系的作品評分重點較可能是？", op1: "外觀炫不炫", op2: "是否有效學習", a: '2', hint: "重點是學到了什麼，而不是特效。" },
  { level: 1, q: "教育科技是否等於線上教學？", op1: "是", op2: "不是", a: '2', hint: "範圍更廣，包含實體教室的科技應用。" },
  // Level 2
  { level: 2, q: "教育科技的核心在於學習，而不是科技本身。", op1: "O", op2: "X", a: '1', hint: "科技只是輔助。" },
  { level: 2, q: "只要使用最新科技，就一定能提升學習效果。", op1: "O", op2: "X", a: '2', hint: "重點是怎麼用，而不是新舊。" },
  { level: 2, q: "教育科技的設計必須考慮學習者的需求與背景。", op1: "O", op2: "X", a: '1', hint: "以學習者為中心。" },
  { level: 2, q: "教育科技只適用於正式學校教育。", op1: "O", op2: "X", a: '2', hint: "企業培訓、終身學習也都算。" },
  { level: 2, q: "教科系學生需要理解學習理論來設計教學。", op1: "O", op2: "X", a: '1', hint: "理論是設計的基礎。" },
  { level: 2, q: "AI 在教育科技中的角色是取代老師。", op1: "O", op2: "X", a: '2', hint: "AI 是助手，老師無可取代。" },
  { level: 2, q: "好的數位教材只需要畫面好看就夠了。", op1: "O", op2: "X", a: '2', hint: "內容與教學設計更重要。" },
  { level: 2, q: "教育科技強調的是解決學習問題。", op1: "O", op2: "X", a: '1', hint: "解決問題是核心目標。" },
  { level: 2, q: "沒有科技就不可能進行教育科技設計。", op1: "O", op2: "X", a: '2', hint: "系統化方法也是一種軟科技。" },
  { level: 2, q: "教育科技重視學習成效勝過技術炫耀。", op1: "O", op2: "X", a: '1', hint: "有效學習才是重點。" },
  // Level 3
  { level: 3, q: "同一套數位教材，對所有學生的學習效果都會一樣。", op1: "O", op2: "X", a: '2', hint: "每個人的學習需求不同。" },
  { level: 3, q: "教學設計時，先訂學習目標再選科技工具是較合理的流程。", op1: "O", op2: "X", a: '1', hint: "目標導向設計。" },
  { level: 3, q: "如果學生覺得有趣，代表一定學得好。", op1: "O", op2: "X", a: '2', hint: "有趣不等於有效學習。" },
  { level: 3, q: "教育科技的評估標準之一是是否真的改變學習行為。", op1: "O", op2: "X", a: '1', hint: "行為改變是重要指標。" },
  { level: 3, q: "科技使用越多，學生學習成效一定越高。", op1: "O", op2: "X", a: '2', hint: "適當使用才是關鍵。" },
  { level: 3, q: "教科系作品需要能說明設計背後的教育理念。", op1: "O", op2: "X", a: '1', hint: "理念支撐設計。" },
  { level: 3, q: "學習者的錯誤與失敗，在教育科技中是沒有價值的。", op1: "O", op2: "X", a: '2', hint: "錯誤也是學習的一部分。" },
  { level: 3, q: "好的教育科技設計需要不斷測試與修正。", op1: "O", op2: "X", a: '1', hint: "迭代設計很重要。" },
  { level: 3, q: "教育科技只要能用，就不需要評估成效。", op1: "O", op2: "X", a: '2', hint: "評估才能確保品質。" },
  { level: 3, q: "教育科技的成功與否，與學習者參與程度有關。", op1: "O", op2: "X", a: '1', hint: "主動參與學習效果更好。" }
];
let currentQuestion = null; // 目前的題目物件
let quizSolved = false; // 是否已解決當前關卡的題目
let isNearQuestioner = false; // 是否靠近提問者 (用於按鍵判斷)
let questionQueue = []; // 待回答問題佇列

// 生命值系統變數
let health = 3;
let maxHealth = 3;
let isInvincible = false; // 是否處於無敵狀態
let invincibleTimer = 0;
const invincibleDuration = 120; // 無敵時間 (幀數)，約 2 秒

// 分數系統變數
let score = 0;
let gameStartTime = 0;
let gameFinalTime = 0;

// 煙火系統變數
let fireworks = [];
let confetti = []; // 彩帶陣列
let dustParticles = []; // 塵土粒子陣列
let items = []; // 道具陣列

// 視覺回饋變數
let shakeTimer = 0;
let damageFlashOpacity = 0;
let successFlashOpacity = 0;

// 對話框動畫變數
let hintBoxScale = 0;
let questionBoxScale = 0;

// 按鈕介面變數
let btnOption1, btnOption2, btnAbout, btnNote;

// --- 輔助函式：切割圖片精靈 ---
function sliceSpriteSheet(sheet, frameW, frameH, count, useRounding = false) {
  let anim = [];
  for (let i = 0; i < count; i++) {
    let x = useRounding ? round(i * frameW) : i * frameW;
    let w = useRounding ? (round((i + 1) * frameW) - x) : frameW;
    // 確保不超出圖片範圍
    if (x + w > sheet.width) w = sheet.width - x;
    anim.push(sheet.get(x, 0, w, frameH));
  }
  return anim;
}

function preload() {
  // 在 preload 函式中載入圖片，確保在 setup() 開始前圖片已完全載入
  // p5.js 會從 index.html 檔案的位置去尋找相對路徑
  spriteSheet = loadImage('1/stop/stop.png');
  spriteSheet2 = loadImage('2/stop/stop_2.png');
  walkSheet = loadImage('1/walk/walk.png');
  jumpSheet = loadImage('1/jump/jump.png');
  pushSheet = loadImage('1/push/push.png');
  smileSheet2 = loadImage('2/smile/smile_2.png');
  fallDownSheet2 = loadImage('2/fall_down/fall_down_2.png');
  toolSheet = loadImage('1/tool/tool.png');
  bgGate = loadImage('assets/bg_gate.png');
  bgLiberalArts = loadImage('assets/bg_liberal_arts.png');
  bgTrack = loadImage('assets/bg_track.png');
  stopSheet = loadImage('3/stop_all.png');
  fastSheet = loadImage('3/fast_all.png');
  scarySheet = loadImage('3/scary_all.png');
  spriteSheet4 = loadImage('4/stop.png');
  spriteSheet4Ask = loadImage('4/ask.png');
  spriteSheet5 = loadImage('5/all.png');
  bgMusic = loadSound('Minuet in G Major.mp3');
  teleportSound = loadSound('new-level-142995.mp3');
  successSound = loadSound('successed-295058.mp3');
  failSound = loadSound('invalid-selection-39351.mp3');
  victoryMusic = loadSound('String Quintet in E major, Op. 11, No. 5.mp3');
}

function setup() {
  // 建立一個佔滿整個瀏覽器視窗的畫布
  createCanvas(windowWidth, windowHeight);

  // 初始化落葉
  for (let i = 0; i < leafCount; i++) {
    leaves.push(createLeaf(true));
  }

  // 計算單一畫格的寬度
  frameWidth = spriteWidth / numFrames;
  animation = sliceSpriteSheet(spriteSheet, frameWidth, spriteHeight, numFrames);

  // 計算新角色動畫單一畫格的寬度並存入陣列
  frameWidth2 = spriteWidth2 / numFrames2;
  animation2 = sliceSpriteSheet(spriteSheet2, frameWidth2, spriteHeight2, numFrames2);
  
  // 計算微笑動畫單一畫格的寬度並存入陣列
  smileFrameWidth2 = smileSpriteWidth2 / smileNumFrames2;
  smileAnimation2 = sliceSpriteSheet(smileSheet2, smileFrameWidth2, smileSpriteHeight2, smileNumFrames2);

  // 計算倒下動畫單一畫格的寬度並存入陣列
  fallDownFrameWidth2 = fallDownSpriteWidth2 / fallDownNumFrames2;
  fallDownAnimation2 = sliceSpriteSheet(fallDownSheet2, fallDownFrameWidth2, fallDownSpriteHeight2, fallDownNumFrames2);

  // 計算走路動畫單一畫格的寬度並存入陣列
  walkFrameWidth = walkSpriteWidth / walkNumFrames;
  walkAnimation = sliceSpriteSheet(walkSheet, walkFrameWidth, walkSpriteHeight, walkNumFrames);

  // 計算跳躍動畫單一畫格的寬度並存入陣列
  jumpFrameWidth = jumpSpriteWidth / jumpNumFrames;
  jumpAnimation = sliceSpriteSheet(jumpSheet, jumpFrameWidth, jumpSpriteHeight, jumpNumFrames);

  // 計算攻擊動畫單一畫格的寬度並存入陣列
  pushFrameWidth = pushSpriteWidth / pushNumFrames;
  pushAnimation = sliceSpriteSheet(pushSheet, pushFrameWidth, pushSpriteHeight, pushNumFrames);

  // 計算飛行道具動畫單一畫格的寬度並存入陣列
  toolFrameWidth = toolSpriteWidth / toolNumFrames;
  toolAnimation = sliceSpriteSheet(toolSheet, toolFrameWidth, toolSpriteHeight, toolNumFrames);

  // 設定圖片繪製模式為中心點對齊，方便將圖片置中
  imageMode(CENTER);

  // 初始化角色位置在畫布中央
  characterX = width / 2;
  characterY = height * GROUND_Y_RATIO;

  // 初始化新角色的位置在原本角色的左邊
  character2X = characterX - 200;
  character2Y = height * GROUND_Y_RATIO;

  // 設定傳送點位置在畫面右側
  teleportX = width - 150;
  teleportY = height * GROUND_Y_RATIO + 60;

  // 停留角色的固定位置（不跟隨角色1移動）
  stopPosX = width / 2 + stopOffsetX;
  stopPosY = height * GROUND_Y_RATIO + stopOffsetY;

  // 使用 stop_all.png 製作中心角色的待機動畫
  stopSpriteWidth = stopSheet.width;
  stopSpriteHeight = stopSheet.height;
  stopFrameWidth = stopSpriteWidth / stopNumFrames;
  stopAnimation = sliceSpriteSheet(stopSheet, stopFrameWidth, stopSpriteHeight, stopNumFrames, true);

  // 使用 fast_all.png 製作靠近時的快速動作動畫
  fastSpriteWidth = fastSheet.width;
  fastSpriteHeight = fastSheet.height;
  fastFrameWidth = fastSpriteWidth / fastNumFrames;
  fastAnimation = sliceSpriteSheet(fastSheet, fastFrameWidth, fastSpriteHeight, fastNumFrames, true);

  // 使用 scary_all.png 製作觸碰時的害怕動作動畫
  scarySpriteWidth = scarySheet.width;
  scarySpriteHeight = scarySheet.height;
  scaryFrameWidth = scarySpriteWidth / scaryNumFrames;
  scaryAnimation = sliceSpriteSheet(scarySheet, scaryFrameWidth, scarySpriteHeight, scaryNumFrames, true);

  // 計算角色4動畫單一畫格的寬度並存入陣列
  frameWidth4 = spriteWidth4 / numFrames4;
  animation4 = sliceSpriteSheet(spriteSheet4, frameWidth4, spriteHeight4, numFrames4);

  // 計算角色4 Ask動畫單一畫格的寬度並存入陣列
  frameWidth4Ask = spriteWidth4Ask / numFrames4Ask;
  animation4Ask = sliceSpriteSheet(spriteSheet4Ask, frameWidth4Ask, spriteHeight4Ask, numFrames4Ask);

  // 計算角色5動畫單一畫格的寬度並存入陣列
  frameWidth5 = spriteWidth5 / numFrames5;
  animation5 = sliceSpriteSheet(spriteSheet5, frameWidth5, spriteHeight5, numFrames5, true);

  // --- 建立答題按鈕 ---
  btnOption1 = createButton('Option 1');
  btnOption1.position(-1000, -1000); // 初始隱藏
  btnOption1.size(150, 50); // 加大按鈕
  btnOption1.style('font-size', '18px');
  btnOption1.style('font-family', 'Arial, sans-serif');
  btnOption1.style('font-weight', 'bold');
  btnOption1.style('background-color', '#FFD700'); // 金色背景
  btnOption1.style('border', '2px solid #DAA520'); // 深金色邊框
  btnOption1.style('border-radius', '10px');
  btnOption1.style('box-shadow', '0px 4px 0px #B8860B'); // 立體陰影
  btnOption1.style('cursor', 'pointer');
  btnOption1.style('transition', 'all 0.1s'); // 平滑過渡效果
  btnOption1.mouseOver(() => btnOption1.style('background-color', '#FFFACD')); // 滑鼠懸停變亮
  btnOption1.mouseOut(() => btnOption1.style('background-color', '#FFD700')); // 滑鼠離開恢復
  btnOption1.mousePressed(() => checkAnswer('1'));

  btnOption2 = createButton('Option 2');
  btnOption2.position(-1000, -1000); // 初始隱藏
  btnOption2.size(150, 50); // 加大按鈕
  btnOption2.style('font-size', '18px');
  btnOption2.style('font-family', 'Arial, sans-serif');
  btnOption2.style('font-weight', 'bold');
  btnOption2.style('background-color', '#FFD700');
  btnOption2.style('border', '2px solid #DAA520');
  btnOption2.style('border-radius', '10px');
  btnOption2.style('box-shadow', '0px 4px 0px #B8860B');
  btnOption2.style('cursor', 'pointer');
  btnOption2.style('transition', 'all 0.1s');
  btnOption2.mouseOver(() => btnOption2.style('background-color', '#FFFACD'));
  btnOption2.mouseOut(() => btnOption2.style('background-color', '#FFD700'));
  btnOption2.mousePressed(() => checkAnswer('2'));

  // 建立關於遊戲按鈕
  btnAbout = createButton('關於遊戲');
  btnAbout.position(-1000, -1000); // 初始隱藏
  btnAbout.size(120, 40);
  btnAbout.style('font-size', '16px');
  btnAbout.style('font-family', 'Arial, sans-serif');
  btnAbout.style('font-weight', 'bold');
  btnAbout.style('background-color', '#4682B4'); // 鋼藍色
  btnAbout.style('color', 'white');
  btnAbout.style('border', '2px solid white');
  btnAbout.style('border-radius', '20px');
  btnAbout.style('cursor', 'pointer');
  btnAbout.style('transition', 'all 0.1s');
  btnAbout.mouseOver(() => btnAbout.style('background-color', '#5F9EA0'));
  btnAbout.mousePressed(() => gameState = 'about');

  // 建立開發筆記按鈕
  btnNote = createButton('📖 筆記');
  btnNote.attribute('title', '開發筆記'); // 滑鼠懸停顯示提示
  btnNote.position(-1000, -1000); // 初始隱藏
  btnNote.size(110, 45);
  btnNote.style('font-size', '18px');
  btnNote.style('font-family', 'Arial, sans-serif');
  btnNote.style('font-weight', 'bold');
  btnNote.style('background-color', '#9370DB'); // MediumPurple
  btnNote.style('color', 'white');
  btnNote.style('border', '2px solid white');
  btnNote.style('border-radius', '25px'); // 圓角矩形按鈕
  btnNote.style('cursor', 'pointer');
  btnNote.style('transition', 'all 0.1s');
  btnNote.mouseOver(() => btnNote.style('background-color', '#BA55D3'));
  btnNote.mouseOut(() => btnNote.style('background-color', '#9370DB'));
  btnNote.mousePressed(() => window.open('https://hackmd.io/@DVFtTMYjTmumEkY6i9d0lw/HyDe5Stxbl', '_blank'));

  // 初始選題 (移到按鈕建立之後)
  initLevelQuestions();
}

function draw() {
  // --- 載入畫面邏輯 (Loading Screen) ---
  if (gameState === 'loading') {
    drawLoading();
    return;
  }

  // --- 畫面震動效果 ---
  if (shakeTimer > 0) {
    translate(random(-5, 5), random(-5, 5)); // 隨機位移畫布
    shakeTimer--;
  }

  // 根據當前關卡繪製對應的背景
  push();
  imageMode(CORNER);
  if (currentLevel === 1) {
    image(bgGate, 0, 0, width, height);
  } else if (currentLevel === 2) {
    image(bgLiberalArts, 0, 0, width, height);
  } else if (currentLevel === 3) {
    image(bgTrack, 0, 0, width, height);
  }
  pop();

  // 繪製落葉
  drawLeaves();

  // --- 繪製走路塵土效果 ---
  handleDust();

  // --- 遊戲標題畫面邏輯 ---
  if (gameState === 'title') {
    drawTitle();
    return;
  }

  // --- 關於遊戲說明頁面 ---
  if (gameState === 'about') {
    drawAbout();
    return;
  }

  // --- 遊戲結束畫面邏輯 ---
  if (gameState === 'gameOver') {
    drawGameOver();
    return;
  }

  // --- 遊戲勝利畫面邏輯 ---
  if (gameState === 'victory') {
    drawVictory();
    return;
  }

  // --- 遊戲進行中邏輯 ---
  drawPlaying();
}

// --- 獨立的繪圖函式 ---

function drawLoading() {
  push();
  background(30); // 深灰色背景
  
  // 模擬載入進度增加
  loadingProgress += 1.5; 
  
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(40);
  textStyle(BOLD);
  text("LOADING...", width / 2, height / 2 - 40);
  
  // 繪製進度條外框
  noFill();
  stroke(255);
  strokeWeight(2);
  rect(width / 2 - 150, height / 2 + 20, 300, 20, 10);
  
  // 繪製進度條內容
  noStroke();
  fill(100, 200, 255); // 亮藍色
  let w = map(loadingProgress, 0, 100, 0, 296);
  rect(width / 2 - 148, height / 2 + 22, min(w, 296), 16, 8);
  
  // 載入完成後切換到標題畫面
  if (loadingProgress >= 100) {
    gameState = 'title';
  }
  pop();
}

function drawTitle() {
  hideButtons(); // 確保按鈕隱藏
  
  // 1. 繪製更有質感的漸層背景 (取代原本的單色遮罩)
  push();
  let gradient = drawingContext.createRadialGradient(width / 2, height / 2, 100, width / 2, height / 2, width);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0.3)'); // 中心較亮
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0.85)'); // 邊緣較暗 (暗角效果)
  drawingContext.fillStyle = gradient;
  rect(0, 0, width, height);
  pop();

  // 2. 加入漂浮的光點 (螢火蟲效果) 增加氛圍
  push();
  noStroke();
  for(let i = 0; i < 20; i++) {
    let x = noise(frameCount * 0.002 + i * 100) * width;
    let y = noise(frameCount * 0.002 + i * 200) * height;
    let size = noise(frameCount * 0.01 + i) * 4 + 2;
    let alpha = noise(frameCount * 0.02 + i) * 150 + 50;
    fill(255, 255, 200, alpha);
    ellipse(x, y, size);
  }
  pop();

  push();
  textAlign(CENTER, CENTER);
  
  // 計算縮放比例 (呼吸效果)
  let scaleFactor = 1 + sin(frameCount * 0.05) * 0.05;

  push();
  translate(width / 2, height / 2 - 40); // 將原點移至標題中心
  scale(scaleFactor); // 應用縮放

  // 3. 標題發光效果
  drawingContext.shadowBlur = 30;
  drawingContext.shadowColor = 'rgba(255, 165, 0, 0.8)'; // 橘色光暈

  // 繪製標題陰影
  fill(50);
  noStroke();
  textSize(80);
  text("淡江校園答題", 5, 5); // 相對於中心的偏移量

  // 繪製標題主體
  fill(255, 220, 100); // 更亮的金黃色
  stroke(255); // 白色邊框
  strokeWeight(6);
  textStyle(BOLD); // 粗體
  textSize(80); // 設定標題文字大小
  text("淡江校園答題", 0, 0); // 在中心點繪製
  
  // 清除發光效果以免影響其他繪圖
  drawingContext.shadowBlur = 0;
  pop(); // 恢復原本的座標系

  // 重置樣式繪製副標題
  noStroke();
  textStyle(NORMAL);
  fill(255);
  textSize(24);
  
  // 裝飾線條
  stroke(255, 100);
  strokeWeight(1);
  line(width / 2 - 120, height / 2 + 25, width / 2 + 120, height / 2 + 25);
  noStroke();

  if (frameCount % 60 < 40) { // 簡單的文字閃爍效果
    text("- 請按 Enter 鍵開始遊戲 -", width / 2, height / 2 + 60);
  }
  
  // 底部版權文字
  fill(255, 80);
  textSize(14);
  text("Tamkang University | Educational Technology", width / 2, height - 30);
  
  // 顯示關於遊戲按鈕
  btnAbout.position(width / 2 - 60, height / 2 + 140);

  // 顯示開發筆記按鈕 (右下角 + 呼吸效果)
  if (btnNote) {
    let scaleVal = 1 + sin(frameCount * 0.05) * 0.1; // 計算呼吸縮放比例
    btnNote.style('transform', `scale(${scaleVal})`);
    btnNote.position(width - 130, height - 80);
  }
  
  pop();
}

function drawAbout() {
  hideButtons(); // 隱藏所有按鈕
  push();
  // 深色漸層背景
  let gradient = drawingContext.createRadialGradient(width / 2, height / 2, 100, width / 2, height / 2, width);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0.8)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0.95)');
  drawingContext.fillStyle = gradient;
  rect(0, 0, width, height);

  textAlign(CENTER, TOP);
  fill(255, 220, 100);
  textSize(50);
  textStyle(BOLD);
  text("關於遊戲", width / 2, 80);

  textAlign(CENTER, CENTER);
  fill(255);
  textStyle(NORMAL);
  textSize(22);
  let info = "【操作說明】\n" +
             "移動：左右方向鍵  |  跳躍：上方向鍵\n" +
             "互動：靠近 NPC 自動觸發對話\n\n" +
             "【遊戲目標】\n" +
             "回答問題通過 3 個關卡\n" +
             "遇到困難可以尋找右側的提示者\n" +
             "小心不要答錯或受傷！\n\n" +
             "【道具說明】\n" +
             "❤️ 急救包：恢復 1 點生命\n" +
             "\n- 按 Esc 鍵返回標題畫面 -";
  text(info, width / 2, height / 2 + 20);
  pop();
}

function drawGameOver() {
  hideButtons(); // 確保按鈕隱藏
  push();
  fill(0, 200); // 深黑色半透明遮罩
  rect(0, 0, width, height);

  textAlign(CENTER, CENTER);
  fill(255, 50, 50); // 紅色文字
  textSize(100);
  text("GAME OVER", width / 2, height / 2 - 40);

  fill(255);
  textSize(30);
  text("請按 Enter 鍵重新開始", width / 2, height / 2 + 60);
  pop();
}

function drawVictory() {
  hideButtons(); // 確保按鈕隱藏
  push();
  fill(0, 200); // 深黑色半透明遮罩
  rect(0, 0, width, height);

  // --- 煙火動畫邏輯 ---
  if (random(1) < 0.05) { // 每幀有 5% 機率產生新煙火
    fireworks.push(new Firework());
  }
  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }

  // --- 彩帶動畫邏輯 ---
  if (frameCount % 4 === 0) { // 每 4 幀產生一個新彩帶
    confetti.push(new Confetti());
  }
  for (let i = confetti.length - 1; i >= 0; i--) {
    confetti[i].update();
    confetti[i].show();
    if (confetti[i].offScreen()) {
      confetti.splice(i, 1);
    }
  }

  textAlign(CENTER, CENTER);
  // 金色閃爍效果
  let alpha = map(sin(frameCount * 0.1), -1, 1, 100, 255);
  fill(255, 215, 0, alpha); 
  drawingContext.shadowBlur = 30; // 加入發光效果
  drawingContext.shadowColor = 'rgba(255, 215, 0, 0.8)';
  textSize(100);
  text("YOU WIN!", width / 2, height / 2 - 40);
  drawingContext.shadowBlur = 0; // 重置發光

  fill(255);
  textSize(30);
  text("最終分數: " + score, width / 2, height / 2 + 40);
  
  let minutes = floor(gameFinalTime / 60);
  let seconds = gameFinalTime % 60;
  text("通關時間: " + nf(minutes, 2) + ":" + nf(seconds, 2), width / 2, height / 2 + 80);
  text("請按 Enter 鍵重新開始", width / 2, height / 2 + 140);
  
  // 顯示開發筆記按鈕
  if (btnNote) btnNote.position(width / 2 - 55, height / 2 + 180);
  pop();
}

function drawPlaying() {
  // 繪製傳送點
  drawTeleporter();

  // --- 處理道具 (生成與繪製) ---
  handleItems();

  // --- 繪製角色陰影 (增加立體感) ---
  // 在繪製角色前先畫陰影，確保陰影在角色下方
  drawShadow(characterX, characterY + 95, 100); // 玩家陰影
  drawShadow(character2X, character2Y + 85, 90); // 提問者陰影
  drawShadow(stopPosX, stopPosY + 75, 120); // 提示者陰影

  // --- 繪製生命值 UI ---
  drawHealth();

  // --- 繪製分數 UI ---
  drawScore();

  // --- 繪製勾勾動畫 ---
  for (let i = checkMarkAnims.length - 1; i >= 0; i--) {
    checkMarkAnims[i].update();
    checkMarkAnims[i].show();
    if (checkMarkAnims[i].isDead()) {
      checkMarkAnims.splice(i, 1);
    }
  }

  // --- 繪製叉叉動畫 ---
  for (let i = crossMarkAnims.length - 1; i >= 0; i--) {
    crossMarkAnims[i].update();
    crossMarkAnims[i].show();
    if (crossMarkAnims[i].isDead()) {
      crossMarkAnims.splice(i, 1);
    }
  }

  // --- 更新無敵狀態計時器 ---
  if (isInvincible) {
    invincibleTimer--;
    if (invincibleTimer <= 0) {
      isInvincible = false;
    }
  }

  // --- 關卡相關邏輯 ---
  // [修改] 移除 if (currentLevel === 1) 限制，讓 NPC 在所有關卡都出現
  
    // --- 角色3 (提示者) 互動邏輯 ---
    // 原本是害怕的角色，現在改為提示者
    let distanceToCenter = dist(characterX, characterY, stopPosX, stopPosY);
    let showHint = distanceToCenter < stopHitThreshold;
    
    // 平滑更新縮放比例 (彈出動畫)
    hintBoxScale = lerp(hintBoxScale, showHint ? 1 : 0, 0.2);

    if (hintBoxScale > 0.01) {
      // 顯示提示對話框
      push();
      // 從對話框中心縮放
      translate(stopPosX, stopPosY - 105);
      scale(hintBoxScale);
      translate(-stopPosX, -(stopPosY - 105));
      
      // 設定陰影效果 (增加立體感)
      drawingContext.shadowOffsetX = 2;
      drawingContext.shadowOffsetY = 4;
      drawingContext.shadowBlur = 10;
      drawingContext.shadowColor = 'rgba(0, 0, 0, 0.2)';

      // 設定氣泡樣式
      fill(255, 255, 255, 250); // 幾乎不透明的白色背景
      stroke(100, 149, 237); // 矢車菊藍 (CornflowerBlue) 邊框，更有質感
      strokeWeight(3);
      
      let boxW = 320;
      let boxH = 130;
      let boxX = stopPosX - boxW / 2;
      let boxY = stopPosY - 170;
      let radius = 15;

      // 繪製對話氣泡形狀 (包含下方尖角)
      beginShape();
      vertex(boxX + radius, boxY);
      vertex(boxX + boxW - radius, boxY);
      quadraticVertex(boxX + boxW, boxY, boxX + boxW, boxY + radius);
      vertex(boxX + boxW, boxY + boxH - radius);
      quadraticVertex(boxX + boxW, boxY + boxH, boxX + boxW - radius, boxY + boxH);
      // 尖角指向角色
      vertex(stopPosX + 10, boxY + boxH);
      vertex(stopPosX, boxY + boxH + 15); 
      vertex(stopPosX - 10, boxY + boxH);
      vertex(boxX + radius, boxY + boxH);
      quadraticVertex(boxX, boxY + boxH, boxX, boxY + boxH - radius);
      vertex(boxX, boxY + radius);
      quadraticVertex(boxX, boxY, boxX + radius, boxY);
      endShape(CLOSE);

      // 清除陰影以免影響文字
      drawingContext.shadowBlur = 0;
      drawingContext.shadowOffsetX = 0;
      drawingContext.shadowOffsetY = 0;
      
      noStroke();
      textAlign(CENTER, CENTER);
      let centerX = boxX + boxW / 2;
      let centerY = boxY + boxH / 2;
      
      if (quizSolved) {
        fill(46, 139, 87); // 海綠色
        textSize(22);
        textStyle(BOLD);
        text("🎉 恭喜答對！", centerX, centerY - 15);
        
        fill(80);
        textSize(16);
        textStyle(NORMAL);
        text("快去傳送點吧！", centerX, centerY + 20);
      } else if (currentQuestion) {
        fill(70, 130, 180); // 鋼藍色
        textSize(20);
        textStyle(BOLD);
        text("💡 提示", centerX, centerY - 25);
        
        fill(50);
        textSize(18);
        textStyle(NORMAL);
        // 使用 text() 的寬高參數讓文字自動換行
        rectMode(CORNER);
        textAlign(CENTER, TOP);
        text(currentQuestion.hint, boxX + 20, boxY + 50, boxW - 40, boxH - 50);
      } else {
        fill(150);
        textSize(30);
        text("...", centerX, centerY);
      }
      pop();
    }
    // 移除原本的 isScared 邏輯，讓提示者保持冷靜

    // 中央角色待機動畫
    drawCenterCharacter();
    
    // --- 角色2互動邏輯 ---
    // 計算兩個角色之間的距離
    let d = dist(characterX, characterY, character2X, character2Y);
    let showQuestionBox = d < proximityThreshold;
    questionBoxScale = lerp(questionBoxScale, showQuestionBox ? 1 : 0, 0.2);

    // 如果角色1進入範圍，觸發互動
    if (d < proximityThreshold) {
      isSmiling2 = true;
      isNearQuestioner = true;
    } else {
      isNearQuestioner = false;
    }

    // --- 繪製新角色 (角色2) ---
    if (isFallingDown2) {
      // 播放倒下動畫
      push();
      translate(character2X, character2Y);
      // 根據角色1的位置決定倒下時的朝向
      if (characterX < character2X) {
        scale(-1, 1);
      }
      
      if (currentLevel === 2) {
        // 第二關使用角色4 (無倒下動畫，暫時使用待機動畫代替)
        image(animation4[floor(frameCount * 0.1) % numFrames4], 0, 0, frameWidth4 * scale4, spriteHeight4 * scale4);
      } else {
        image(fallDownAnimation2[floor(fallDownCurrentFrame2)], 0, 0);
      }
      pop();

      // 動畫播放一次後停在最後一幀
      if (fallDownCurrentFrame2 < fallDownNumFrames2 - 1) {
        fallDownCurrentFrame2 += fallDownAnimationSpeed2;
      }

      // 如果角色1靠近，則恢復
      if (d < recoveryThreshold) {
        isFallingDown2 = false;
      }
    } else if (isSmiling2) {
      // 播放微笑動畫
      push();
      translate(character2X, character2Y);
      // 根據角色1的位置決定微笑時的朝向
      if (characterX < character2X) {
        scale(-1, 1);
      }

      if (currentLevel === 2) {
        // 第二關使用角色4 ask 動畫
        image(animation4Ask[floor(currentFrame4Ask)], 0, 0, frameWidth4Ask * scale4, spriteHeight4Ask * scale4);
        // 更新 ask 動畫 (循環播放)
        currentFrame4Ask = (currentFrame4Ask + askAnimationSpeed4) % numFrames4Ask;
      } else {
        image(smileAnimation2[floor(smileCurrentFrame2)], 0, 0);
        
        // 持續播放微笑動畫 (原本的邏輯)
        smileCurrentFrame2 = (smileCurrentFrame2 + smileAnimationSpeed2);
        // 如果動畫播完，就停在最後一幀
        if (smileCurrentFrame2 >= smileNumFrames2) smileCurrentFrame2 = smileNumFrames2 - 1;
      }
      pop();


      // 如果玩家移開，則重置微笑
      if (d >= proximityThreshold) {
        isSmiling2 = false;
        hideButtons(); // 離開時隱藏按鈕
      }
    } else {
      // 播放待機動畫，並根據角色1位置轉向
      if (currentLevel === 2) {
        // 第二關顯示角色4
        if (characterX < character2X) {
          push();
          translate(character2X, character2Y);
          scale(-1, 1);
          image(animation4[floor(currentFrame2) % numFrames4], 0, 0, frameWidth4 * scale4, spriteHeight4 * scale4);
          pop();
        } else {
          image(animation4[floor(currentFrame2) % numFrames4], character2X, character2Y, frameWidth4 * scale4, spriteHeight4 * scale4);
        }
      } else {
        // 其他關卡顯示原本的角色2
        if (characterX < character2X) {
          push();
          translate(character2X, character2Y);
          scale(-1, 1); // 水平翻轉
          image(animation2[floor(currentFrame2)], 0, 0);
          pop();
        } else {
          // 角色1在右邊，角色2恢復正常朝向 (朝右)
          image(animation2[floor(currentFrame2)], character2X, character2Y);
        }
      }
      // 更新待機動畫的畫格
      let maxFrames = (currentLevel === 2) ? numFrames4 : numFrames2;
      currentFrame2 = (currentFrame2 + animationSpeed2) % maxFrames;
      hideButtons(); // 確保非互動狀態按鈕隱藏
    }
  
    // --- 獨立繪製角色2的題目對話框 (支援縮放動畫) ---
    if (questionBoxScale > 0.01) {
      push();
      // 從對話框中心縮放 (中心約在 character2Y - 200)
      translate(character2X, character2Y - 200);
      scale(questionBoxScale);
      translate(-character2X, -(character2Y - 200));

      // 設定陰影效果 (增加立體感)
      drawingContext.shadowOffsetX = 2;
      drawingContext.shadowOffsetY = 4;
      drawingContext.shadowBlur = 10;
      drawingContext.shadowColor = 'rgba(0, 0, 0, 0.2)';

      // 設定氣泡樣式
      fill(255, 255, 255, 250); // 幾乎不透明的白色背景
      stroke(255, 140, 0); // 深橘色邊框，區分出題者
      strokeWeight(3);

      let boxW = 320;
      let boxH = 140;
      let boxX = character2X - boxW / 2;
      let boxY = character2Y - 270; // 往上調整避免遮臉
      let radius = 15;

      // 繪製對話氣泡形狀 (包含下方尖角)
      beginShape();
      vertex(boxX + radius, boxY);
      vertex(boxX + boxW - radius, boxY);
      quadraticVertex(boxX + boxW, boxY, boxX + boxW, boxY + radius);
      vertex(boxX + boxW, boxY + boxH - radius);
      quadraticVertex(boxX + boxW, boxY + boxH, boxX + boxW - radius, boxY + boxH);
      // 尖角指向角色
      vertex(character2X + 10, boxY + boxH);
      vertex(character2X, boxY + boxH + 15); 
      vertex(character2X - 10, boxY + boxH);
      vertex(boxX + radius, boxY + boxH);
      quadraticVertex(boxX, boxY + boxH, boxX, boxY + boxH - radius);
      vertex(boxX, boxY + radius);
      quadraticVertex(boxX, boxY, boxX + radius, boxY);
      endShape(CLOSE);

      // 清除陰影以免影響文字
      drawingContext.shadowBlur = 0;
      drawingContext.shadowOffsetX = 0;
      drawingContext.shadowOffsetY = 0;

      fill(0); // 黑色文字
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(18);

      if (quizSolved) {
        fill(0, 150, 0); // 綠色文字
        text("回答正確！\n請前往下一關。", character2X, character2Y - 190);
        hideButtons(); // 答對後隱藏按鈕
      } else if (currentQuestion) {
        // 顯示題目與選項
        text(currentQuestion.q, character2X, character2Y - 220);
        
        // 設定按鈕位置 (顯示按鈕) - 只有當對話框完全打開時才顯示
        if (questionBoxScale > 0.9) {
          btnOption1.position(character2X - 155, character2Y - 170);
          btnOption2.position(character2X + 5, character2Y - 170);
        } else {
          hideButtons();
        }
      }
      pop();
    } else {
      // 如果對話框完全關閉，確保按鈕隱藏
      if (!isSmiling2) hideButtons(); 
    }

  // --- 傳送邏輯 ---
  let distToTeleporter = dist(characterX, characterY, teleportX, teleportY - 40); // 碰撞判定的Y軸往上一點
  if (distToTeleporter < teleportRadius) {
    if (quizSolved) { // [修改] 必須答對題目才能傳送
      if (teleportSound) teleportSound.play(); // 播放傳送音效
      score += 50; // 過關加分
      if (currentLevel === 3) {
        gameState = 'victory'; // 通過第三關顯示勝利畫面
        gameFinalTime = floor((millis() - gameStartTime) / 1000); // 計算通關時間 (秒)
        if (bgMusic && bgMusic.isPlaying()) bgMusic.stop(); // 停止背景音樂
        if (victoryMusic) {
          victoryMusic.setVolume(0.5);
          victoryMusic.loop(); // 播放勝利音樂
        }
      } else {
        currentLevel++;
        initLevelQuestions(); // [新增] 進入下一關時，抽取新題目
        // 重設角色位置到畫面中央，避免重複觸發
        characterX = width / 2;
        characterY = height * 0.72;
      }
    } else {
      // 顯示未過關提示
      fill(255, 0, 0);
      textAlign(CENTER);
      textSize(20);
      text("請先回答問題！", characterX, characterY - 100);
    }
  }

  // 處理並繪製所有飛行道具
  // 從後往前遍歷，方便安全地從陣列中移除元素
  for (let i = projectiles.length - 1; i >= 0; i--) {
    let p = projectiles[i];
    p.x += p.speed * p.direction;
    
    if (p.direction === 1) {
      image(toolAnimation[floor(p.currentFrame)], p.x, p.y);
    } else {
      push();
      translate(p.x, p.y);
      scale(-1, 1);
      image(toolAnimation[floor(p.currentFrame)], 0, 0);
      pop();
    }
    
    // --- 飛行道具碰撞偵測 ---
    // 只有在第一關時才偵測與角色2的碰撞
    // [修改] 讓所有關卡都能擊中提問者 (雖然這會打斷答題，但保留物理互動)
      let projectileDistance = dist(p.x, p.y, character2X, character2Y);
      if (projectileDistance < projectileHitThreshold && !isFallingDown2) {
        // score += 10; // 擊中不加分，避免刷分
        isFallingDown2 = true; // 觸發倒下
        isSmiling2 = false; // 停止微笑
        fallDownCurrentFrame2 = 0; // 從第一幀開始播放
        projectiles.splice(i, 1); // 移除擊中的飛行道具
        continue; // 繼續下一個迴圈，避免後續的越界判斷
      }

      // 飛行道具擊中角色3（站立的角色）
      let centerHitDistance = dist(p.x, p.y, stopPosX, stopPosY);
      if (centerHitDistance < stopHitThreshold) {
        stopHitTimer = stopHitDuration; // 觸發快速動畫
        projectiles.splice(i, 1);
        continue;
      }
    

    p.currentFrame = (p.currentFrame + toolAnimationSpeed) % toolNumFrames;

    // 如果飛行道具完全離開畫布的可視範圍，就將其從陣列中移除
    // 判斷條件為：物件中心點 超出 畫布邊界 + 物件寬度的一半
    if (p.x > width + (toolFrameWidth / 2) || p.x < -(toolFrameWidth / 2)) {
      projectiles.splice(i, 1);
    }
  }

  // --- 角色1 (玩家) 繪製邏輯 ---
  // 優先處理跳躍狀態
  push(); // 開始角色繪製設定
  // 如果處於無敵狀態，讓角色閃爍 (每 10 幀切換一次透明度)
  if (isInvincible && frameCount % 10 < 5) {
    tint(255, 128); // 半透明
  }

  if (isPushing) {
    // 播放攻擊動畫
    if (facingDirection === 1) {
      image(pushAnimation[floor(pushCurrentFrame)], characterX, characterY);
    } else {
      push();
      translate(characterX, characterY);
      scale(-1, 1);
      image(pushAnimation[floor(pushCurrentFrame)], 0, 0);
      pop();
    }

    pushCurrentFrame += pushAnimationSpeed;

    // 在動畫的特定幀產生飛行道具
    if (floor(pushCurrentFrame) === 3 && !hasFired) {
      let newProjectile = {
        x: characterX + (50 * facingDirection), // 在角色前方產生
        y: characterY - 20, // 調整Y軸位置
        direction: facingDirection,
        speed: 12,
        currentFrame: 0
      };
      projectiles.push(newProjectile); // 將新道具加入陣列
      hasFired = true; // 標記本次攻擊已發射
    }

    // 動畫結束後，返回待機
    if (pushCurrentFrame >= pushNumFrames) {
      isPushing = false;
      pushCurrentFrame = 0;
    }
  } else if (isJumping) {
    // 根據目前播放的畫格計算 Y 軸位移，形成拋物線
    let jumpProgress = jumpCurrentFrame / (jumpNumFrames -1); // 0 到 1 的進度
    let currentJumpHeight = sin(jumpProgress * PI) * jumpHeight;
    let yPos = characterY - currentJumpHeight;

    // 根據角色方向繪製跳躍動畫
    if (facingDirection === 1) {
      // 面向右
      image(jumpAnimation[floor(jumpCurrentFrame)], characterX, yPos);
    } else {
      // 面向左，翻轉圖片
      push();
      translate(characterX, yPos);
      scale(-1, 1);
      image(jumpAnimation[floor(jumpCurrentFrame)], 0, 0);
      pop();
    }

    // 更新跳躍動畫畫格
    jumpCurrentFrame += jumpAnimationSpeed;

    // 如果動畫播放完畢
    if (jumpCurrentFrame >= jumpNumFrames) {
      isJumping = false; // 結束跳躍狀態
      jumpCurrentFrame = 0; // 重置畫格計數器
      // 落地時產生一圈塵土
      for (let i = 0; i < 10; i++) {
        dustParticles.push(new Dust(characterX + random(-20, 20), characterY + 90));
      }
    }
  } else {
    // 非跳躍狀態下，檢查左右移動
    if (keyIsDown(RIGHT_ARROW)) {
      facingDirection = 1; // 更新方向為右
      // 更新角色位置
      characterX += moveSpeed;
      // 產生塵土 (每 5 幀產生一個，位置在腳後跟)
      if (frameCount % 5 === 0) dustParticles.push(new Dust(characterX - 30, characterY + 90));

      // 顯示走路動畫
      image(walkAnimation[floor(walkCurrentFrame)], characterX, characterY);
      // 更新走路動畫的畫格
      walkCurrentFrame = (walkCurrentFrame + walkAnimationSpeed) % walkNumFrames;
    } else if (keyIsDown(LEFT_ARROW)) {
      facingDirection = -1; // 更新方向為左
      // 更新角色位置
      characterX -= moveSpeed;
      // 產生塵土
      if (frameCount % 5 === 0) dustParticles.push(new Dust(characterX + 30, characterY + 90));
      
      // 透過 translate 和 scale(-1, 1) 來水平翻轉圖片
      push(); // 儲存目前的繪圖設定
      translate(characterX, characterY); // 將原點移動到角色位置
      scale(-1, 1); // 水平翻轉座標系
      image(walkAnimation[floor(walkCurrentFrame)], 0, 0); // 在新的原點繪製圖片
      pop(); // 恢復原本的繪圖設定

      // 更新走路動畫的畫格
      walkCurrentFrame = (walkCurrentFrame + walkAnimationSpeed) % walkNumFrames;
    } else {
      // 顯示待機動畫
      image(animation[floor(currentFrame)], characterX, characterY);
      // 更新待機動畫的畫格
      currentFrame = (currentFrame + animationSpeed) % numFrames;
    }
  }
  pop(); // 結束角色繪製設定 (取消 tint 影響)

  // --- 繪製暗角效果 (增加電影質感) ---
  drawVignette();

  // --- 受傷紅光閃爍效果 ---
  if (damageFlashOpacity > 0) {
    push();
    noStroke();
    fill(255, 0, 0, damageFlashOpacity);
    rect(-20, -20, width + 40, height + 40); // 稍微加大範圍以覆蓋震動邊緣
    pop();
    damageFlashOpacity -= 10; // 逐漸淡出
  }

  // --- 答對綠光閃爍效果 ---
  if (successFlashOpacity > 0) {
    push();
    noStroke();
    fill(0, 255, 0, successFlashOpacity);
    rect(-20, -20, width + 40, height + 40);
    pop();
    successFlashOpacity -= 10; // 逐漸淡出
  }
}

// 建立單片落葉
function createLeaf(spawnAtTop = false) {
  return {
    baseX: random(width),
    y: spawnAtTop ? random(-height, 0) : random(-height * 0.5, 0),
    size: random(14, 28),
    speedY: random(1.1, 2.2),
    swayAmplitude: random(15, 45),
    swaySpeed: random(0.5, 1.4),
    swayOffset: random(TWO_PI),
    rotation: random(TWO_PI),
    rotationSpeed: random(-0.03, 0.03),
    // 偏向綠色系的落葉
    leafColor: color(random(90, 140), random(150, 210), random(70, 120), 180)
  };
}

// 更新與繪製落葉
function drawLeaves() {
  for (let i = 0; i < leaves.length; i++) {
    let leaf = leaves[i];
    leaf.y += leaf.speedY;
    leaf.swayOffset += leaf.swaySpeed * 0.02;
    leaf.rotation += leaf.rotationSpeed;

    let x = leaf.baseX + sin(leaf.swayOffset) * leaf.swayAmplitude;

    push();
    translate(x, leaf.y);
    rotate(leaf.rotation);
    fill(leaf.leafColor);
    noStroke();
    ellipse(0, 0, leaf.size * 0.6, leaf.size); // 橢圓形葉片
    pop();

    // 超出畫面後重置
    if (leaf.y - leaf.size > height) {
      leaves[i] = createLeaf(true);
    }
  }
}

// 繪製傳送陣
function drawTeleporter() {
  push();
  translate(teleportX, teleportY);
  
  // 更新旋轉角度
  teleportAngle += 0.05;

  // --- 1. 垂直光柱效果 (新增) ---
  let beamHeight = 300; // 光柱高度
  
  // [新增] 動態變換顏色 (魔幻效果)
  let hue = (frameCount * 2) % 360; // 隨時間旋轉色相
  let colorPrimary = `hsla(${hue}, 80%, 70%, 0.6)`;
  let colorSecondary = `hsla(${hue}, 80%, 70%, 0)`;
  let colorSolid = `hsl(${hue}, 80%, 70%)`;
  let colorComplement = `hsl(${(hue + 180) % 360}, 80%, 80%)`; // 互補色

  // 建立線性漸層 (從下到上)
  let beamGradient = drawingContext.createLinearGradient(0, 0, 0, -beamHeight);
  beamGradient.addColorStop(0, colorPrimary); // 底部較亮
  beamGradient.addColorStop(1, colorSecondary);   // 頂部透明
  drawingContext.fillStyle = beamGradient;
  noStroke();
  rectMode(CENTER);
  // 寬度隨呼吸變化
  let beamWidth = teleportRadius * (1.5 + sin(frameCount * 0.1) * 0.3);
  rect(0, -beamHeight/2, beamWidth, beamHeight);

  // --- 2. 發光效果設定 ---
  drawingContext.shadowBlur = 25;
  drawingContext.shadowColor = colorSolid; // 跟隨主色調發光

  // 繪製外層旋轉的圓環
  strokeWeight(4);
  stroke(colorSolid); // 使用動態主色
  noFill();
  push();
  rotate(teleportAngle);
  for (let i = 0; i < 3; i++) {
    arc(0, 0, teleportRadius * 2, teleportRadius * 2, i * TWO_PI / 3, i * TWO_PI / 3 + PI / 4);
  }
  pop();

  // 繪製內層反向旋轉的圓環
  stroke(colorComplement); // 使用互補色或較亮的顏色
  push();
  rotate(-teleportAngle * 2);
  for (let i = 0; i < 4; i++) {
    arc(0, 0, teleportRadius * 1.2, teleportRadius * 1.2, i * TWO_PI / 4, i * TWO_PI / 4 + PI / 6);
  }
  pop();

  // 繪製中心的核心
  noStroke();
  fill(255, 255, 255); 
  // 核心呼吸效果
  let coreSize = teleportRadius * 0.6 + sin(frameCount * 0.2) * 5;
  ellipse(0, 0, coreSize, coreSize);

  // 重置發光以免影響後續繪圖
  drawingContext.shadowBlur = 0;

  // --- 3. 上方文字提示 ---
  fill(255, 255, 100); // 淡黃色文字
  textAlign(CENTER);
  textSize(20);
  textStyle(BOLD);
  let floatY = sin(frameCount * 0.1) * 5;
  text("EXIT", 0, -teleportRadius - 30 + floatY);
  
  // 箭頭
  stroke(255, 255, 100);
  strokeWeight(3);
  let arrowY = -teleportRadius - 10 + floatY;
  line(0, arrowY, 0, arrowY + 15); // 豎線
  line(0, arrowY + 15, -8, arrowY + 5); // 左撇
  line(0, arrowY + 15, 8, arrowY + 5);  // 右撇

  pop();
}

// 繪製陰影的輔助函式
function drawShadow(x, y, w) {
  push();
  noStroke();
  fill(0, 0, 0, 50); // 半透明黑色
  ellipseMode(CENTER);
  ellipse(x, y, w, 20); // 扁平的橢圓形
  pop();
}

// 繪製暗角效果的輔助函式
function drawVignette() {
  push();
  // 使用 Canvas API 建立徑向漸層
  let gradient = drawingContext.createRadialGradient(width/2, height/2, height/3, width/2, height/2, height);
  gradient.addColorStop(0, 'rgba(0,0,0,0)'); // 中心透明
  gradient.addColorStop(1, 'rgba(0,0,0,0.6)'); // 邊緣半透明黑
  drawingContext.fillStyle = gradient;
  rect(0, 0, width, height); // 覆蓋整個畫面
  pop();
}

// 使用 stop_all.png 於畫布中央播放待機動畫
function drawCenterCharacter() {
  const x = stopPosX;
  const y = stopPosY;

  if (currentLevel === 2) {
    // 檢查與角色1的距離
    let d = dist(characterX, characterY, x, y);
    let isTouched = d < stopHitThreshold;
    
    // 如果被觸碰，加快動畫速度
    if (isTouched) {
      animationSpeed5 = 0.4;
    } else {
      animationSpeed5 = 0.15;
    }

    let frame = animation5[floor(currentFrame5)];
    let scale5 = 1.1; // 調整比例以配合畫面
    let drawY = isTouched ? y + sin(frameCount * 0.5) * 10 : y; // 被觸碰時增加跳動效果

    if (characterX < x) {
      image(frame, x, drawY, frame.width * scale5, frame.height * scale5);
    } else {
      push();
      translate(x, drawY);
      scale(-1, 1);
      image(frame, 0, 0, frame.width * scale5, frame.height * scale5);
      pop();
    }

    // 如果被觸碰，在頭上顯示驚嘆號
    if (isTouched) {
      push();
      translate(x, drawY - 120); // 移動到頭頂位置
      // 加入縮放動畫 (呼吸效果)
      let scaleFactor = 1 + sin(frameCount * 0.3) * 0.3; 
      scale(scaleFactor);

      textAlign(CENTER, CENTER);
      textSize(60);
      textStyle(BOLD);
      fill(255, 50, 50); // 亮紅色
      stroke(255); // 白色邊框
      strokeWeight(5);
      text("!", 0, 0); // 在原點繪製
      pop();
    }
    currentFrame5 = (currentFrame5 + animationSpeed5) % numFrames5;
    if (stopHitTimer > 0) stopHitTimer--;
    return;
  }

  let anim;
  let frameIndex;
  
  if (isScared) {
    anim = scaryAnimation;
    frameIndex = floor(scaryCurrentFrame);
    scaryCurrentFrame = (scaryCurrentFrame + scaryAnimationSpeed) % scaryNumFrames;
  } else if (stopHitTimer > 0) {
    anim = fastAnimation;
    frameIndex = floor(fastCurrentFrame);
    fastCurrentFrame = (fastCurrentFrame + fastAnimationSpeed) % fastNumFrames;
    stopHitTimer -= 1;
  } else {
    anim = stopAnimation;
    frameIndex = floor(stopCurrentFrame);
    stopCurrentFrame = (stopCurrentFrame + stopAnimationSpeed) % stopNumFrames;
  }
  
  const frame = anim[frameIndex];
  
  // 根據角色1的位置決定角色3的朝向
  if (characterX < x) {
    // 角色1在左邊，角色3朝左 (正常)
    image(frame, x, y, frame.width * stopScale, frame.height * stopScale);
  } else {
    // 角色1在右邊，角色3朝右 (鏡像)
    push();
    translate(x, y);
    scale(-1, 1);
    image(frame, 0, 0, frame.width * stopScale, frame.height * stopScale);
    pop();
  }
}

// --- 生命值系統相關函式 ---

// 繪製生命值 (左上角紅點)
function drawHealth() {
  push();
  translate(30, 30); // 設定 UI 起始位置
  textSize(32); // 設定愛心大小
  textAlign(CENTER, CENTER); // 設定文字置中
  for (let i = 0; i < maxHealth; i++) {
    if (i < health) {
      fill(255, 50, 50); // 紅色代表現有生命
    } else {
      fill(100); // 灰色代表已損失生命
    }
    noStroke();
    text("❤", i * 40, 0); // 繪製愛心符號
  }
  pop();

  // 處理愛心破碎動畫
  for (let i = heartAnims.length - 1; i >= 0; i--) {
    heartAnims[i].update();
    heartAnims[i].show();
    if (heartAnims[i].isDead()) {
      heartAnims.splice(i, 1);
    }
  }
}

// 繪製分數
function drawScore() {
  push();
  textAlign(RIGHT, TOP);
  textSize(32);
  fill(255);
  stroke(0);
  strokeWeight(4);
  text("Score: " + score, width - 30, 30);
  pop();
}

// 玩家受傷函式
function takeDamage() {
  if (isInvincible || gameState !== 'playing') return; // 如果無敵或非遊戲中，不受傷

  health--; // 扣血
  // 加入破碎動畫 (在對應的愛心位置)
  heartAnims.push(new BrokenHeartAnim(30 + health * 40, 30));

  isInvincible = true; // 開啟無敵
  invincibleTimer = invincibleDuration; // 設定無敵時間

  // 觸發視覺回饋
  shakeTimer = 15; // 震動持續時間 (幀數)
  damageFlashOpacity = 180; // 紅光初始透明度 (0-255)

  if (health <= 0) {
    gameState = 'gameOver'; // 血量歸零，遊戲結束
  }
}

// 檢查答案的函式 (由按鈕觸發)
function checkAnswer(ans) {
  if (isPaused) return; // 暫停時無法答題
  if (!currentQuestion || quizSolved) return;

  if (ans === currentQuestion.a) {
    // 答對
    if (successSound) successSound.play();
    successFlashOpacity = 150; // 答對時背景閃爍綠色
    checkMarkAnims.push(new CheckMarkAnim(characterX, characterY - 130)); // 在角色頭上顯示勾勾
    score += 20; // 答對加分
    nextQuestion(); // 載入下一題或完成
  } else {
    // 答錯
    if (failSound) failSound.play();
    damageFlashOpacity = 150; // 答錯時背景閃爍紅色
    crossMarkAnims.push(new CrossMarkAnim(characterX, characterY - 130)); // 在角色頭上顯示叉叉
    takeDamage(); // 扣血
    shakeTimer = 20; // 答錯時觸發震動回饋
  }
}

// 隱藏按鈕的輔助函式
function hideButtons() {
  btnOption1.position(-1000, -1000);
  btnOption2.position(-1000, -1000);
  if (btnAbout) btnAbout.position(-1000, -1000);
  if (btnNote) {
    btnNote.position(-1000, -1000);
    btnNote.style('transform', 'scale(1)'); // 重置縮放狀態
  }
}

// 初始化關卡題目 (第一關隨機選3題，其他關選1題)
function initLevelQuestions() {
  // 從題庫中篩選出目前關卡的題目
  let levelQuestions = questions.filter(q => q.level === currentLevel);
  
  if (currentLevel === 1 || currentLevel === 2 || currentLevel === 3) {
    // 第一、二、三關：隨機選 3 題
    let shuffled = shuffle(levelQuestions, false);
    questionQueue = shuffled.slice(0, 3);
  } else {
    // 其他關卡：隨機選 1 題
    questionQueue = [random(levelQuestions)];
  }
  
  nextQuestion(); // 載入第一題
}

// 載入下一題
function nextQuestion() {
  if (questionQueue.length > 0) {
    currentQuestion = questionQueue.pop();
    quizSolved = false;
    // 更新按鈕文字
    if (btnOption1) btnOption1.html(currentQuestion.op1);
    if (btnOption2) btnOption2.html(currentQuestion.op2);
  } else {
    currentQuestion = null;
    quizSolved = true;
  }
}

// 當瀏覽器視窗大小改變時，自動調整畫布大小
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // 將角色維持在畫面下方三分之一處
  characterY = height * GROUND_Y_RATIO;
  character2Y = height * GROUND_Y_RATIO;
  stopPosX = width / 2 + stopOffsetX;
  stopPosY = height * GROUND_Y_RATIO + stopOffsetY;
  // 重新散佈落葉基準點，以避免縮放造成集中
  for (let i = 0; i < leaves.length; i++) {
    leaves[i].baseX = random(width);
    leaves[i].y = random(-height, height);
  }
}

// 偵測單次按鍵事件來觸發跳躍
function keyPressed() {
  // --- 暫停功能 ---
  if (key === 'p' || key === 'P' || keyCode === ESCAPE) {
    if (gameState === 'playing') {
      isPaused = !isPaused;
      if (isPaused) {
        hideButtons(); // 暫停時隱藏按鈕
        push();
        fill(0, 150); // 半透明遮罩
        rect(0, 0, width, height);
        textAlign(CENTER, CENTER);
        fill(255);
        textSize(80);
        text("PAUSED", width / 2, height / 2);
        pop();
        noLoop(); // 停止遊戲迴圈
      } else {
        loop(); // 恢復遊戲迴圈
      }
      return;
    }
  }

  if (isPaused) return; // 暫停時忽略其他按鍵

  if (gameState === 'about') {
    if (keyCode === ESCAPE) {
      gameState = 'title';
    }
    return;
  }

  if (gameState === 'title') {
    if (keyCode === ENTER) {
      gameState = 'playing'; // 按下 Enter 後切換到遊戲狀態
      gameStartTime = millis(); // 開始計時
      hideButtons(); // 隱藏關於按鈕

      // 播放背景音樂 (如果尚未播放)
      if (bgMusic && !bgMusic.isPlaying()) {
        bgMusic.setVolume(0.5); // 設定音量 (0.0 ~ 1.0)
        bgMusic.loop(); // 循環播放
      }
    }
    return; // 標題畫面時不處理跳躍或攻擊
  }

  if (gameState === 'gameOver') {
    if (keyCode === ENTER) {
      resetGame(); // 重置遊戲變數
    }
    return;
  }

  if (gameState === 'victory') {
    if (keyCode === ENTER) {
      resetGame(); // 重置遊戲變數
    }
    return;
  }

  if (keyCode === UP_ARROW && !isJumping) {
    isJumping = true;
  } else if (keyCode === DOWN_ARROW && !isJumping && !isPushing) { // DOWN_ARROW 是往下鍵
    isPushing = true;
    hasFired = false; // 重置發射旗標
  }
}

// 重置遊戲狀態的函式
function resetGame() {
  isPaused = false; // 確保取消暫停
  loop(); // 確保迴圈執行
  gameState = 'title'; // 回到標題畫面 (也可以改成 'playing' 直接開始)
  currentLevel = 1;
  
  // 重置角色位置
  characterX = width / 2;
  characterY = height * GROUND_Y_RATIO;
  
  // 重置生命值
  health = maxHealth;
  isInvincible = false;
  invincibleTimer = 0;
  score = 0; // 重置分數
  gameStartTime = 0;
  gameFinalTime = 0;
  fireworks = []; // 清空煙火
  confetti = []; // 清空彩帶
  dustParticles = []; // 清空塵土
  items = []; // 清空道具
  heartAnims = []; // 清空愛心動畫
  checkMarkAnims = []; // 清空勾勾動畫
  crossMarkAnims = []; // 清空叉叉動畫
  shakeTimer = 0;
  damageFlashOpacity = 0;
  successFlashOpacity = 0;

  hintBoxScale = 0;
  questionBoxScale = 0;
  hideButtons(); // 隱藏按鈕
  initLevelQuestions(); // 重置題目

  // 重置 NPC 狀態
  isScared = false;
  isFallingDown2 = false;
  isSmiling2 = false;
  
  // 清空飛行道具
  projectiles = [];

  // 停止所有音樂
  if (bgMusic) bgMusic.stop();
  if (victoryMusic) victoryMusic.stop();
}

// --- 煙火系統類別 ---

class Firework {
  constructor() {
    // 隨機產生鮮豔顏色
    this.color = color(random(100, 255), random(100, 255), random(100, 255));
    this.firework = new Particle(random(width), height, this.color, true);
    this.exploded = false;
    this.particles = [];
  }

  done() {
    return this.exploded && this.particles.length === 0;
  }

  update() {
    if (!this.exploded) {
      this.firework.applyForce(createVector(0, 0.25)); // 重力
      this.firework.update();
      
      // 當速度轉為向下時爆炸
      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(createVector(0, 0.2)); // 粒子重力較輕
      this.particles[i].update();
      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  }

  explode() {
    for (let i = 0; i < 80; i++) { // 爆炸產生 80 個粒子
      let p = new Particle(this.firework.pos.x, this.firework.pos.y, this.color, false);
      this.particles.push(p);
    }
  }

  show() {
    if (!this.exploded) {
      this.firework.show();
    }
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].show();
    }
  }
}

// --- 愛心破碎動畫類別 ---
class BrokenHeartAnim {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.life = 255;
    this.particles = [];
    // 產生破碎粒子
    for (let i = 0; i < 8; i++) {
      this.particles.push({
        x: 0, 
        y: 0,
        vx: random(-3, 3),
        vy: random(-3, 3),
        size: random(3, 6),
        life: 255
      });
    }
  }

  update() {
    this.life -= 10;
    for (let p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.2; // 重力
      p.life -= 8;
    }
  }

  show() {
    push();
    translate(this.x, this.y);
    
    // 顯示變大並淡出的破碎愛心
    if (this.life > 0) {
      textAlign(CENTER, CENTER);
      textSize(32 + (255 - this.life) * 0.1); // 稍微變大
      fill(255, 50, 50, this.life);
      text("💔", 0, 0);
    }

    // 顯示粒子
    noStroke();
    for (let p of this.particles) {
      if (p.life > 0) {
        fill(255, 50, 50, p.life);
        ellipse(p.x, p.y, p.size);
      }
    }
    pop();
  }

  isDead() {
    return this.life <= 0 && this.particles.every(p => p.life <= 0);
  }
}

class Particle {
  constructor(x, y, col, isFirework) {
    this.pos = createVector(x, y);
    this.isFirework = isFirework;
    this.lifespan = 255;
    this.color = col;
    this.acc = createVector(0, 0);
    
    if (this.isFirework) {
      this.vel = createVector(0, random(-18, -11)); // 發射高度
    } else {
      this.vel = p5.Vector.random2D(); // 隨機爆炸方向
      this.vel.mult(random(2, 12)); // 爆炸擴散範圍
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    if (!this.isFirework) {
      this.vel.mult(0.9); // 空氣阻力
      this.lifespan -= 5; // 粒子逐漸消失
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  done() {
    return this.lifespan < 0;
  }

  show() {
    if (!this.isFirework) {
      strokeWeight(4);
      // 使用原本顏色但加上透明度
      stroke(red(this.color), green(this.color), blue(this.color), this.lifespan);
    } else {
      strokeWeight(6);
      stroke(this.color);
    }
    point(this.pos.x, this.pos.y);
  }
}

// --- 彩帶類別 ---
class Confetti {
  constructor() {
    this.x = random(width);
    this.y = random(-100, -10); // 從畫面外上方開始
    this.size = random(10, 20);
    // 隨機鮮豔顏色
    this.color = color(random(100, 255), random(100, 255), random(100, 255));
    this.speedY = random(2, 6); // 下落速度
    this.swaySpeed = random(0.05, 0.15); // 左右搖擺速度
    this.swayOffset = random(TWO_PI); // 搖擺相位
    this.rotation = random(TWO_PI); // 初始角度
    this.rotationSpeed = random(-0.1, 0.1); // 旋轉速度
  }

  update() {
    this.y += this.speedY;
    this.x += sin(frameCount * this.swaySpeed + this.swayOffset) * 2; // 左右飄動
    this.rotation += this.rotationSpeed;
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    fill(this.color);
    noStroke();
    rectMode(CENTER);
    rect(0, 0, this.size, this.size * 0.5); // 長方形彩帶
    pop();
  }

  offScreen() {
    return this.y > height + 20;
  }
}

// --- 塵土粒子系統 ---

function handleDust() {
  for (let i = dustParticles.length - 1; i >= 0; i--) {
    dustParticles[i].update();
    dustParticles[i].show();
    if (dustParticles[i].finished()) {
      dustParticles.splice(i, 1);
    }
  }
}

class Dust {
  constructor(x, y) {
    this.pos = createVector(x, y);
    // 隨機向上的速度，帶有一點左右飄移
    this.vel = createVector(random(-1, 1), random(-2, -0.5));
    this.alpha = random(100, 200); // 初始透明度
    this.size = random(5, 12); // 初始大小
    this.growth = random(0.2, 0.5); // 變大速度
  }

  update() {
    this.pos.add(this.vel);
    this.alpha -= 8; // 逐漸消失
    this.size += this.growth; // 逐漸擴散變大
  }

  show() {
    noStroke();
    fill(210, 205, 190, this.alpha); // 灰褐色塵土
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  finished() {
    return this.alpha < 0;
  }
}

// --- 道具系統 ---

function handleItems() {
  // 每 1200 幀 (約 20 秒) 隨機生成一個道具
  if (frameCount % 1200 === 0 && gameState === 'playing') {
    let type = 'health';
    items.push({
      x: random(100, width - 100),
      y: height * GROUND_Y_RATIO - 60, // 懸浮在地面上方
      baseY: height * GROUND_Y_RATIO - 60,
      type: type,
      floatOffset: random(TWO_PI),
      lifespan: 600 // [新增] 道具存在時間 (600幀 = 約10秒)
    });
  }

  for (let i = items.length - 1; i >= 0; i--) {
    let item = items[i];
    
    // [新增] 更新壽命，時間到移除
    item.lifespan--;
    if (item.lifespan <= 0) {
      items.splice(i, 1);
      continue;
    }

    // 上下漂浮動畫
    item.y = item.baseY + sin(frameCount * 0.05 + item.floatOffset) * 10;

    // [修改] 繪製道具 (加入快消失時的閃爍效果)
    if (item.lifespan > 180 || frameCount % 10 < 5) {
      push();
      translate(item.x, item.y);
      
      // 陰影
      noStroke();
      fill(0, 0, 0, 50);
      ellipse(0, 50, 40, 10); // 地面陰影

      // 繪製急救包 (回復生命)
      fill(255);
      stroke(0);
      strokeWeight(2);
      rectMode(CENTER);
      rect(0, 0, 40, 40, 8);
      fill(255, 50, 50);
      noStroke();
      rect(0, 0, 12, 28, 2);
      rect(0, 0, 28, 12, 2);
      pop();
    }

    // 碰撞偵測
    let d = dist(characterX, characterY, item.x, item.y);
    if (d < 60) {
      if (health < maxHealth) {
        health++;
        // 加入愛心恢復動畫 (位置對應到 UI 上的愛心)
        heartAnims.push(new HealingHeartAnim(30 + (health - 1) * 40, 30));
      }
      items.splice(i, 1); // 移除道具
    }
  }
}

// --- 愛心恢復動畫類別 ---
class HealingHeartAnim {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.life = 255;
    this.scale = 0.5;
    this.offsetY = 0;
  }

  update() {
    this.life -= 5; // 逐漸消失
    if (this.scale < 1.5) {
      this.scale += 0.05; // 逐漸變大
    }
    this.offsetY -= 1; // 向上飄浮
  }

  show() {
    push();
    translate(this.x, this.y + this.offsetY);
    scale(this.scale);
    textAlign(CENTER, CENTER);
    textSize(32);
    
    // 發光效果
    drawingContext.shadowBlur = 15;
    drawingContext.shadowColor = 'rgba(255, 100, 100, 0.8)';
    
    fill(255, 50, 50, this.life);
    noStroke();
    text("❤", 0, 0);
    
    drawingContext.shadowBlur = 0;
    pop();
  }

  isDead() {
    return this.life <= 0;
  }
}

// --- 答錯叉叉動畫類別 ---
class CrossMarkAnim {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.life = 255;
    this.scale = 0;
    this.targetScale = 1.5;
  }

  update() {
    this.life -= 5;
    this.scale = lerp(this.scale, this.targetScale, 0.2);
    this.y -= 1; // 緩慢上浮
  }

  show() {
    push();
    translate(this.x, this.y);
    scale(this.scale);
    textAlign(CENTER, CENTER);
    textSize(80);
    textStyle(BOLD);
    
    // 紅色發光效果
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = 'rgba(255, 0, 0, 0.8)';
    
    fill(255, 0, 0, this.life);
    stroke(255, this.life);
    strokeWeight(3);
    text("✘", 0, 0);
    
    drawingContext.shadowBlur = 0;
    pop();
  }

  isDead() {
    return this.life <= 0;
  }
}

// --- 答對勾勾動畫類別 ---
class CheckMarkAnim {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.life = 255;
    this.scale = 0;
    this.targetScale = 1.5;
  }

  update() {
    this.life -= 5;
    this.scale = lerp(this.scale, this.targetScale, 0.2);
    this.y -= 1; // 緩慢上浮
  }

  show() {
    push();
    translate(this.x, this.y);
    scale(this.scale);
    textAlign(CENTER, CENTER);
    textSize(80);
    textStyle(BOLD);
    
    // 綠色發光效果
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = 'rgba(0, 255, 0, 0.8)';
    
    fill(0, 255, 0, this.life);
    stroke(255, this.life);
    strokeWeight(3);
    text("✔", 0, 0);
    
    drawingContext.shadowBlur = 0;
    pop();
  }

  isDead() {
    return this.life <= 0;
  }
}
