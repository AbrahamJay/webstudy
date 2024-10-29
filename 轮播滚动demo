<template>
  <div>
    <div class="table-list-container">
      <div class="table-wrap">
        <div class="table-title">
          <div>标题</div>
          <div>标题</div>
          <div>标题</div>
          <div>标题</div>
        </div>
        <div class="table-main">
          <transition-group :name="direction">
            <div
              v-for="(item) in tableData"
              :key="item.id"
              class="table-list-item"
            >
              <div>{{ item.calculateName || '--' }}</div>
              <div>{{ item.vendorName || '--' }}</div>
              <div>{{ item.cpuUsed || '--' }}</div>
              <div>{{ item.cameraNum || '--' }}</div>
            </div>
          </transition-group>
        </div>
      </div>
    </div>
    <div>
      <p>
        <el-button @click="handleClick('forward')">forward</el-button>
        适用于新数据向前翻滚消失，旧数据从下方插入展示，有一种数据向前滚动的感觉
      </p>
      <p>
        <el-button @click="handleClick('back')">back</el-button>
        适用于将最新的数据插入到前面，向后翻滚把旧数据向下消失；
        也适用于数据平等的（没什么1234的排行）滚动展示，关注的新的数据从上面进入
      </p>
      <div>当前：{{ direction }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Loop',
  data () {
    return {
      timer: null,
      tableAllList: [
        { id: '1', calculateName: '1', vendorName: '123123', cpuUsed: 123, cameraNum: 123 },
        { id: '12', calculateName: '2', vendorName: '123123', cpuUsed: 123, cameraNum: 123 },
        { id: '134', calculateName: '3', vendorName: '123123', cpuUsed: 123, cameraNum: 123 },
        { id: '1123', calculateName: '4', vendorName: '123123', cpuUsed: 123, cameraNum: 123 },
        { id: '11234', calculateName: '5', vendorName: '123123', cpuUsed: 123, cameraNum: 123 },
        { id: '123411', calculateName: '6', vendorName: '123123', cpuUsed: 123, cameraNum: 123 },
        { id: '12342134', calculateName: '7', vendorName: '123123', cpuUsed: 123, cameraNum: 123 }
      ],
      direction: 'back'
    }
  },
  computed: {
    tableData () {
      if (this.tableAllList.length) {
        return this.tableAllList.slice(0, 5)
      } else {
        return []
      }
    }
  },
  methods: {
    initAnimation () {
      this.timer = setTimeout(() => {
        if (this.tableAllList.length) {
          this.queenSwitch()
          this.initAnimation()
        }
      }, 2 * 1000)
    },
    queenSwitch () {
      if (this.direction === 'forward') {
        const temp = this.tableAllList.shift()
        this.tableAllList.push(temp)
      }
      if (this.direction === 'back') {
        const temp = this.tableAllList.pop()
        this.tableAllList.unshift(temp)
      }
    },
    handleClick (type) {
      this.direction = type
      clearTimeout(this.timer)
      this.initAnimation()
    }
  },
  mounted () {
    this.initAnimation()
  },
  beforeDestroy () {
    this.clearTimeout()
  }

}
</script>
<style
  lang="scss"
  scoped
>
/* up */
.forward-move {
  transition: all 1s;
}

@keyframes forwardFadeOut {
  from {
    position: absolute;
    opacity: 1;
  }

  to {
    position: absolute;
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
}

.forward-leave-active {
  animation: forwardFadeOut 1s;
}

@keyframes forwardFadeIn {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.forward-enter-active {
  animation: forwardFadeIn 1s;
}

/* back */
.back-move {
  transition: all 1s;
}

@keyframes backFadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

.back-leave-active {
  animation: backFadeOut 1s;
}

@keyframes backFadeIn {
  from {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.back-enter-active {
  animation: backFadeIn 1s;
}


/* style */
.table-list-container {
  background: #06444e;
  width: 400px;

  .table-wrap {
    width: 100%;
    overflow: hidden;

    //.table-title > div:nth-child(1),
    //.table-list-item > div:nth-child(1) {
    //  padding: 0 12px;
    //  width: 110px;
    //}

    .table-title > div,
    .table-list-item > div {
      padding: 0 12px;
      width: 25%;
    }
  }

  .table-title {
    width: 100%;
    height: 32px;
    display: flex;
    align-items: center;
    background: rgba(22, 227, 242, 0.30);

    > div {
      opacity: 0.8;
      font-family: PingFangSC-Semibold;
      font-size: 12px;
      color: #FFFFFF;
      letter-spacing: 0;
      font-weight: 600;
    }
  }

  .table-main {
    position: relative;
    width: 100%;
    height: 210px;
    padding: 8px 0;
    overflow: hidden;

    .table-list-item {
      width: 100%;
      height: 32px;
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      background: rgba(24, 234, 247, 0.1);

      > div {
        height: 32px;
        line-height: 32px;
        font-size: 16px;
        color: #DBFAFF;
        letter-spacing: 0;
        text-shadow: 0 2px 4px rgba(0, 133, 176, 0.50);
        font-weight: 400;
        font-family: PingFangSC-Semibold;

        &.count {
          font-family: PangMenZhengDao;
          font-size: 16px;
        }
      }
    }
  }
}

</style>
