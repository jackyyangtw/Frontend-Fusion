# Frontend Fusion:
- yarn install
- yarn run dev

# Home bg
- bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-950 dark:to-slate-800


    ✨ Below is HTML code! (Remove this row)
    <div class="canvas-wrapper">
        <div class='circle circle-0' />
        <div class='circle circle-1' />
        <div class='circle circle-2' />
        <div class='circle circle-3' />
    </div>

    ✨ Below is CSS code! (Remove this row)
    .canvas-wrapper {
        width: px;
        height: px;
        background-color: #EA78DE;
        opacity: 0.19;
        position: relative;
        overflow: hidden;
      }
      
      .canvas-wrapper .aurora-wrapper {
        width: 100%;
        height: 100%;
        background: rgba(194, 194, 194, 0.131);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        position: absolute;
        z-index: 1;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      
      .canvas-wrapper .circle {
        width: 150%;
        aspect-ratio: 0.8;
        margin: 0px auto;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      
      .canvas-wrapper .circle.circle-0 {
        background: radial-gradient(ellipse, #6689E8, transparent, transparent),
        animation: moveAround0 16s ease-in-out infinite;
      }
      
      .canvas-wrapper .circle.circle-1 {
        background: radial-gradient(ellipse, #4BF87B, transparent, transparent),
        animation: moveAround1 16s ease-in-out infinite;
      }
      
      .canvas-wrapper .circle.circle-2 {
        background: radial-gradient(ellipse, #D5638A, transparent, transparent),
        animation: moveAround2 16s ease-in-out infinite;
      }
      
      .canvas-wrapper .circle.circle-3 {
        background: radial-gradient(ellipse, #817CED, transparent, transparent),
        animation: moveAround3 16s ease-in-out infinite;
      }
      
      @keyframes moveAround0 {
        0% {
          transform: translate(-40%, -30%);
        }
        50% {
          transform: translate(0%, 20%);
        }
        100% {
          transform: translate(-40%, -30%);
        }
      }
      
      @keyframes moveAround1 {
        0% {
          transform: translate(-70%, -70%);
        }
        50% {
          transform: translate(-40%, -40%);
        }
        100% {
          transform: translate(-70%, -70%);
        }
      }
      
      @keyframes moveAround2 {
        0% {
          transform: translate(30%, -80%);
        }
        50% {
          transform: translate(-30%, -50%);
        }
        100% {
          transform: translate(30%, -80%);
        }
      }
      
      @keyframes moveAround3 {
        0% {
          transform: translate(-25%, 0%);
        }
        50% {
          transform: translate(-76%, -45%);
        }
        100% {
          transform: translate(-25%, 0%);
        }
      }
      
    