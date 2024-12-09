<template>
  <div
    class="revolution-animation"
    :style="{'padding': ballWidth / 2 + 'px'}"
  >
    <div
      class="rotate-ball-planet"
      :style="{'width': width + 'px', 'height': height + 'px'}"
    >
      <!-- 轨迹线 -->
      <div class="rotate-ball-track"></div>
      <!-- 球体 & 球体运动 -->
      <div
        v-for="(item, index) in data"
        :key="index"
        class="rotate-ball-ball"
        :style="ballMoveStyle(index)"
      >
        <!-- 旋转效果 -->
        <div :style="ballRotateStyle(index)">
          <!-- 反旋转效果 -->
          <div :style="ballRotateInTurnStyle(index)">
            <!-- 缩放效果 -->
            <div :style="ballScaleStyle(index)">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Revolution',
  data () {
    return {
      width: 600, // 容器宽度（所需容器大小等于 width&height + ballWidth / 2）
      height: 300, // 容器高度
      ballWidth: 240, // 球体宽度=球体高度 正方形
      ballImg: '/commonality/code/animations/Revolution/assets/ball.png', // 球体图片
      amTime: 12, // 动画时间
      fontSize: 20, // 字体大小
      color: '#ffffff', // 字体颜色
      data: [ // 数据
        { name: '产业经济' },
        { name: '城市安全' },
        { name: '精准治理' },
        { name: '生态环保' },
        { name: '交通出行' },
        { name: '智慧党建' }
      ]
    }
  },
  mounted () {
    // 设置球的运动轨迹动画
    this.setBallMoveKeyframes()
  },
  methods: {
    // 球体偏移移动动画样式
    ballMoveStyle (index) {
      return {
        animationDelay: `${ index / this.data.length * this.amTime }s`,
        animationDuration: `${ this.amTime / 2 }s`
      }
    },
    // 球体旋转动画样式
    ballRotateStyle (index) {
      return {
        animationDelay: `${ index / this.data.length * this.amTime }s`,
        animationDuration: `${ this.amTime }s`,
        width: `${ this.ballWidth }px`,
        height: `${ this.ballWidth }px`,
        left: `${ this.width / 2 - this.ballWidth / 2 }px`,
        lineHeight: `${ this.ballWidth }px`,
        top: `-${ this.ballWidth / 2 }px`,
        transformOrigin: `${ this.ballWidth / 2 }px ${ this.width / 2 + this.ballWidth / 2 }px`
      }
    },
    // 球体反旋转动画样式
    ballRotateInTurnStyle (index) {
      return {
        animationDelay: `${ index / this.data.length * this.amTime }s`,
        animationDuration: `${ this.amTime }s`
      }
    },
    // 球体缩放动画样式 & 字体样式
    ballScaleStyle (index) {
      return {
        fontSize: `${ this.fontSize }px`,
        color: `${ this.color }`,
        backgroundImage: `url(${ this.ballImg })`,
        animationDelay: `${ index / this.data.length * this.amTime }s`,
        animationDuration: `${ this.amTime }s`
      }
    },
    // 设置球的运动轨迹动画
    setBallMoveKeyframes () {
      const styleId = 'ANIMATION-REVOLUTION-BALL-MOVE-Y'
      const _style = document.getElementById(styleId)
      let sheet = null
      if (!_style || _style.length <= 0) {
        const style = document.createElement('style')
        style.setAttribute('type', 'text/css')
        style.setAttribute('id', styleId)
        document.head.appendChild(style)
        sheet = style.sheet
      } else {
        sheet = _style.sheet
      }
      if (sheet) {
        sheet.insertRule(
          `@keyframes revolution-move-y {
            to {
                transform: translateY(-${ this.width - this.height }px);
            }
          }`
        )
      }
    }
  }
}
</script>
<style
  lang="scss"
  scoped
>
.revolution-animation {
  overflow: hidden;

  .rotate-ball-planet {
    position: relative;
    width: 100%;
    height: 100%;

    .rotate-ball-track {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border: 1px solid darkgrey;
      border-radius: 50%;
    }

    .rotate-ball-ball {
      position: absolute;
      animation: revolution-move-y 8s ease-in-out infinite both alternate;

      > div {
        position: absolute;
        text-align: center;
        animation: revolution-rotation 16s linear both infinite;
        transform-origin: 50% 50%;

        > div {
          width: 100%;
          height: 100%;
          transform-origin: 50% 50%;
          animation: revolution-rotation2 16s linear both infinite;

          > div {
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 100% 100%;
            width: 100%;
            height: 100%;
            font-size: 56px;
            color: #fff;
            animation: revolution-suofang 16s linear both infinite;
          }
        }
      }
    }

    &:hover {
      > div {
        animation-play-state: paused;

        > div {
          animation-play-state: paused;

          > div {
            animation-play-state: paused;

            > div {
              animation-play-state: paused;
            }
          }
        }
      }
    }
  }
}

@keyframes revolution-rotation {
  to {
    transform: rotate(360deg);
  }
}

@keyframes revolution-rotation2 {
  to {
    transform: rotate(-360deg);
  }
}

@keyframes revolution-suofang {
  0% {
    transform: scale(0.4)
  }
  50% {
    transform: scale(1)
  }
  100% {
    transform: scale(0.4)
  }
}
</style>
