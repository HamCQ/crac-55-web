/*
 * @Description: 中文配置
 * @Author: BG7ZAG bg7zag@gmail.com
 * @Date: 2023-08-11
 * @LastEditors: BG7ZAG bg7zag@qq.com
 * @LastEditTime: 2023-08-31
 */

export default {
  layout: {
    header: {
      backThisYear: '回今年',
      home: '首页',
      statistics: '统计',
      about: '活动说明',
      onTheAir: '总部电台上线状态',
      cracSite: 'CRAC 站点',
      archive: '历年活动'
    },
    footer: {
      contributions: '开发贡献',
      acknowledgement: '赞助鸣谢'
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
    selectYear: '请选择年份：',
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
  },

  ranking: {
    updateTime: '最近更新时间：',
    total: '总数：',
    callSign: '呼号',
    points: '得分',
    back: '返回'
  },

  archive: {
    title: '历年活动页面',
    years: {
      2022: {
        title: 'CRAC 2022 年度纪念 “5.5中国业余无线电节” 空中通联活动查询页面'
      },
      2023: {
        title: 'CRAC 2023 年度纪念 “5.5中国业余无线电节” 空中通联活动查询页面'
      }
    }
  },

  acknowledgement: {
    title: '感谢以下单位和组织向本活动提供大力支持',
    sponsors: '年赞助商 '
  },

  notfound: {
    title: '404 您的信号已飘向太空'
  },

  award: {
    title: '申请纸质奖状',
    stepOne: '第一步：阅读说明',
    stepOneLine1: '您现在即将开始纸质奖状的邮寄申请，请您仔细阅读以下说明，并按照步骤完成申请。',
    stepOneLine2:
      '纸质奖状免费打印，并使用快递方式寄出，运费采用到付方式，由收件方向快递公司支付，具体资费以快递公司结算为准。',
    agreement: '我已知晓',
    stepTwo: '第二步：校验信息',
    stepTwoLine1: '以下是您在本次通联活动中，与',
    stepTwoLine2: '的一条通联记录。',
    stepTwoLine3: '请查询您的电台通联日志，输入以下信息，并点击验证：',
    band: '波段：',
    model: '模式：',
    day: '日：',
    hour: '时：',
    minute: '分：',
    validate: '验证',
    stepThree: '第三步：请输入您的邮寄信息',
    userName: '收件人姓名',
    phone: '联系电话',
    address: '收件地址',
    pleaseEnter: '请输入',
    pleaseEnterPhone: '请输入11位正确手机号',
    bindCollectionAgent: '绑定代收人',
    bindCollectionAgentInfo: '如果您想与他人一起打包发货，请在此处填写代收人呼号',
    bindCollectionAgentInfo2: '代收人需提前完成信息填写',
    collectionAgent: '代收人呼号（非必填）',
    submit: '提交',
    pleaseAgreement: '请阅读说明并确认已知晓',
    pleaseCheck: '请先校验信息'
  }
}
