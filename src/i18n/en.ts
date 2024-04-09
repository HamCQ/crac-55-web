/*
 * @Description: 英文配置
 * @Author: BG7ZAG bg7zag@qq.com
 * @Date: 2023-08-11
 * @LastEditors: BG7ZAG bg7zag@gmail.com
 * @LastEditTime: 2023-08-31
 */
export default {
  layout: {
    header: {
      backThisYear: 'Back this year',
      home: 'Home',
      statistics: 'Statistics',
      about: 'About',
      onTheAir: 'On the Air',
      cracSite: 'CRAC Site',
      archive: 'Archive'
    },
    footer: {
      contributions: 'Contributions',
      acknowledgement: 'Acknowledgement'
    }
  },
  home: {
    year: 'Season 2023',
    title: "May 5th Chinese Radio Amateurs Festival's Activity",
    searchPlaceholder: 'Please enter your callsign',
    searchBtn: 'Search Logs',
    searchTip: 'Enter callsign to apply award online',
    award: {
      awardString: {
        Gold: 'Gold',
        Silver: 'Silver',
        Bronze: 'Bronze'
      },
      continent: {
        AS: 'Asia RadioStation',
        OA: 'Outside Asia RadioStation'
      },
      download: 'Download the certificate of merit',
      close: 'Close',
      ImgSave: 'Save original Image',
      Apply: 'Apply for a paper certificate'
    },
    points: 'Points',
    bncra: {
      all: 'All'
    }
  },

  statistic: {
    selectYear: 'Please select year:',
    total: {
      logNum: 'QSO',
      singleCallNum: 'Uniques Callsign',
      awardNum: 'AwardNum'
    },
    ranking: {
      title: 'Ranking List',
      updateTime: 'Last update time:',
      China: 'CHINA',
      international: 'DX',
      distinguish: 'combined CRA',
      indistinguishable: 'separated CRA',
      callSign: 'CallSign',
      points: 'Points',
      more: 'Click here to view the full data'
    },
    BYStationTotal: {
      title: 'BY Station Total Number Of QSO (CN Zone 0-9)',
      zone0: 'Zone 0',
      zone1: 'Zone 1',
      zone2: 'Zone 2',
      zone3: 'Zone 3',
      zone4: 'Zone 4',
      zone5: 'Zone 5',
      zone6: 'Zone 6',
      zone7: 'Zone 7',
      zone8: 'Zone 8',
      zone9: 'Zone 9'
    },
    BnCRATotal: {
      title: 'BnCRA Total number of QSO'
    },
    proportionMode: {
      title: 'Proportion Of Mode'
    }
  },

  onlineSlot: {
    title: 'CRAC headquarters radio on the air status',
    refrash: 'Select the refresh interval:',
    refrashTime: {
      0: 'Not refresh',
      1: '1 minute',
      5: '5 minute',
      10: '10 minute'
    }
  },

  ranking: {
    updateTime: 'Last update time:',
    total: 'Total:',
    callSign: 'CallSign',
    points: 'Points',
    back: 'Back'
  },

  archive: {
    title: 'Events page over the years',
    years: {
      2022: {
        title:
          'CRAC 2022 Annual Commemorative "5.5 China Amateur Radio Festival" Air Connection Activity Query Page'
      },
      2023: {
        title:
          'CRAC 2023 Annual Commemorative "5.5 China Amateur Radio Festival" Air Connection Activity Query Page'
      }
    }
  },

  acknowledgement: {
    title:
      'Thank you to the following units and organizations for providing strong support to this event',
    sponsors: 'Sponsors in '
  },

  notfound: {
    title: '404 Lost in space'
  },

  award: {
    title: 'Apply for a paper certificate',
    stepOne: 'First step: Read the instructions',
    stepOneLine1:
      'You are about to begin the application process for a paper certificate. Please carefully read the following instructions and complete the application steps accordingly.',
    stepOneLine2:
      'The paper certificate is printed free of charge and sent via express delivery. The shipping fee is paid upon receipt, with the recipient covering the cost directly to the courier company. The specific charges are subject to settlement with the courier company.',
    agreement: 'Got it',
    stepTwo: 'Second step: Validate the information',
    stepTwoLine1: 'The following is a communication record you made with',
    stepTwoLine2: 'during this communication activity.',
    stepTwoLine3:
      'Please search your radio communication log, input the following information, and click verify:',
    band: 'Band:',
    model: 'Mode:',
    day: 'Day:',
    hour: 'Hour:',
    minute: 'Minute:',
    validate: 'Validate',
    stepThree: 'Third step: Please enter your mailing information',
    userName: `Recipient's name`,
    phone: 'Phone number',
    address: 'Mailing address',
    pleaseEnter: 'Please enter',
    pleaseEnterPhone: 'Please enter a correct 11-digit phone number.',
    bindCollectionAgent: 'Designate a recipient',
    bindCollectionAgentInfo:
      'If you wish to ship together with someone else, please fill in the callsign of the recipient here.',
    bindCollectionAgentInfo2: 'The recipient needs to complete the information beforehand.',
    collectionAgent: `Recipient's callsign (optional)`,
    submit: 'Submit',
    pleaseAgreement: 'Please read the instructions and confirm your understanding.',
    pleaseCheck: 'Please validate the information first'
  }
}
