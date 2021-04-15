//index.js
//获取应用实例
const getData = require('../../http/getData.js')
const app = getApp();
var nF = 0;
Page({
  data: {
    // 快捷颜色组
    color: {
      bgdcolor: '#cbe9f4',
      light: '#93d5eb',
      medium: '#66bbd8',
      dark: '#4da2bb',
      bush: '#fff',
      trunk: '#c2653c',
      trunk2: '#9d5d5d',
      cloud: '#fff',
      sun: 'transparent',
      rabbit: '#fff',
    },

    // 快捷颜色数组
    lightColours: ["#93d5eb", "#add63a", "#c5d63a", "#febe42"],
    mediumColours: ["#66bbd8", "#92c938", "#acc52b", "#ff9d25"],
    darkColours: ["#4da2bb", "#2a9d5c", "#89a503", "#ff6b2f"],
    backgroundColours: ["#cbe9f4", "#daf8ff", "#feec98", "#ffdc8a"],
    bushColours: ["#ffffff", "#3ebf6d", "#99b31a", "#fd6d2e"],
    cloudColours: ["#ffffff", "#ffffff", "#ffffff", "#eaf9fe"],
    seasons: ["Winter", "Spring", "Summer", "Autumn"],

    // 当前季节
    c: 0,
    season: '',

    // 季节组件出现与消失
    display: {
      snow: 'none',
      rain: 'none',
      rabbit: false,
      rainbow: false,
      flower: false
    },

    // 计时器
    time: 8,

  },
  onLoad: async function() {
    // 执行动画
    this.animate()
    let timeInterval = setInterval(()=> {
      if(this.data.time >= 2) {
        this.setData({
          time: this.data.time - 1,
        })
      } else {
        this.setData({
          time: '进入'
        })
        clearInterval(timeInterval)
      }
    },1000)

    // 获取轮播图数据
    let bannerData = await getData.getBannerData(app)
    console.log(bannerData)
  },
  // 进入主页
  timeTap:function() {
    if(this.data.time == '进入') {
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }
  },

  // 自动执行动画
  animate() {
    if (nF++ % 600 === 0) {
        this.updateSeasons();
    }
    setTimeout(()=>{
        this.animate()
    },2);
  },
  
  //切换季节
  changeSeason(){
      this.updateSeasons();
  },

  // 季节动画
  updateSeasons() {
    let c = this.data.c;
    // 更改颜色
    this.setData({
        'color.bgdcolor': this.data.backgroundColours[c],
        'color.light': this.data.lightColours[c],
        'color.medium': this.data.mediumColours[c],
        'color.dark': this.data.darkColours[c],
        'color.bush': this.data.bushColours[c],
        'color.cloud': this.data.cloudColours[c],
    })
    // 快捷季节
    let season = this.data.seasons[c];
    let seasons = this.data.seasons;

    //控制落雪
    if (season === seasons[0]) {
        this.setData({
            'display.snow': 'block'
        })
    } else {
        this.setData({
            'display.snow': 'none'
        })
    }

    //控制兔子
    if (season === seasons[0] || season === seasons[2]) {
        this.setData({
            'display.rabbit': true
        })
    } else {
        this.setData({
            'display.rabbit': false
        })
    }


    //控制彩虹
    if (season === seasons[1]) {
        this.setData({
            'display.rainbow': true
        })
    } else {
        this.setData({
            'display.rainbow': false
        })
    }

    //控制兔子颜色
    if (season === seasons[1]) {
        this.setData({
            'color.rabbit': "#9E6255"
        })
    }

    //控制花
    if (season === seasons[1]) {
        this.setData({
            'display.flower': true
        })
    } else {
        this.setData({
            'display.flower': false
        })
    }

    //控制太阳和兔子
    if (season === seasons[2]) {
        this.setData({
            'color.sun': "#ffb53a",
            'color.rabbit': "#9E6255"
        })
    } else {
        this.setData({
            'color.sun': "transparent",
            'color.rabbit': "#ffffff"
        })
    }

    //控制雨
    if (season === seasons[3]) {
        this.setData({
            'display.rain': 'block'
        })
    } else {
        this.setData({
            'display.rain': 'none'
        })

    }
    this.setData({
        c: (c + 1) % seasons.length
    })
  },
})