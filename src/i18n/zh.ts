/*
 * @Description:
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-11
 * @LastEditors: zyg0121 zhouyiguo2012@qq.com
 * @LastEditTime: 2023-08-20
 */

export default {
  layout: {
    header: {
      home: '首页',
      statistics: '统计',
      about: '活动说明',
      onTheAir: '总部电台上线状态',
      cracSite: 'CRAC 站点',
      archive: '历年活动'
    }
  },

  home: {
    year: '2023年度',
    title: '纪念“5.5中国业余无线电节”空中通联活动',
    searchPlaceholder: '请输入您的呼号',
    searchBtn: '查询日志',
    searchTip: '输入呼号查询可在线获取奖状',
    award: {
      awardString: {
        Gold: '金奖',
        Silver: '银奖',
        Bronze: '铜奖'
      },
      continent: {
        AS: '亚洲 电台',
        OA: '亚洲以外 电台'
      },
      download: '点此下载奖状',
      close: '关闭',
      ImgSave: '保存原图',
      Apply: '申请纸质证书'
    },
    points: '分',
    bncra: {
      all: '全部'
    }
  },

  statistic: {
    total: {
      logNum: 'QSO数量',
      singleCallNum: '独立呼号',
      awardNum: '奖状数量'
    },
    ranking: {
      title: '排名统计',
      updateTime: '最近更新时间：',
      China: '中国电台',
      international: '国际电台',
      distinguish: '区分 CRA 电台',
      indistinguishable: '不区分 CRA 电台',
      callSign: '呼号',
      points: '得分',
      more: '点此查看完整数据'
    },
    BYStationTotal: {
      title: 'BY 电台通联数量统计（0-9 区）',
      zone0: '0 区',
      zone1: '1 区',
      zone2: '2 区',
      zone3: '3 区',
      zone4: '4 区',
      zone5: '5 区',
      zone6: '6 区',
      zone7: '7 区',
      zone8: '8 区',
      zone9: '9 区'
    },
    BnCRATotal: {
      title: 'BnCRA 电台通联统计'
    },
    proportionMode: {
      title: 'BnCRA 电台通联模式比例'
    }
  },

  onlineSlot: {
    title: 'CRAC 总部电台上线状态',
    refrash: '选择刷新间隔：',
    refrashTime: {
      0: '不自动刷新',
      1: '1分钟',
      5: '5分钟',
      10: '10分钟'
    }
  }
}
