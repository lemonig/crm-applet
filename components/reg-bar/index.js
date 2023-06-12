// components/reg-bar/index.js
import * as echarts from '../../libs/ec-canvas/echarts';
const app = getApp()


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    toImg: {
      type: Boolean
    },
    idRef: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ec: {
      lazyLoad: true
    },
    chartsImg: ''
  },

  lifetimes: {
    ready: function () {
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    init(option) {
      this.chartsComponent = this.selectComponent('#' + this.data.idRef);
      this.chartsComponent.init((canvas, width, height, dpr) => {
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          // renderer: 'svg',
          devicePixelRatio: dpr // new
        });
        canvas.setChart(chart);
        this.chart = chart
        this.setChartsData(option)
        return chart;
      })
    },
    setChartsData(option) {
      this.chart.setOption(option);
      if (!this.data.toImg) return
      this.chart.on('finished', () => {
        //  动画执行完毕图表转图片
        this.chartsComponent.canvasToTempFilePath({
          success: res => {
            this.setData({
              chartsImg: res.tempFilePath
            })
          },
          fail: res => console.log(res)
        })
      });
    }
  }
})