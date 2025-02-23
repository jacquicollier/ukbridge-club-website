import { Hand } from '@/app/model/pbn/hand';

export const hands = [
  {
    event: "Generali Euro Team Champs '97",
    site: 'Montecatini ITA',
    date: '1997.06.22',
    board: '1',
    west: 'Arnarson G',
    north: 'Eriksson M',
    east: 'Jonsson T',
    south: 'Fredin P',
    dealer: 'N',
    vulnerable: 'None',
    deal: 'N:KJ93.J4.A98.Q764 T6.QT3.KJT654.T2 AQ875.962.7.AJ85 42.AK875.Q32.K93',
    declarer: 'S',
    contract: '4S',
    result: '10',
    homeTeam: 'Sweden',
    room: 'Open',
    round: '18',
    score: 'NS 420',
    section: 'Open',
    table: '14',
    visitTeam: 'Iceland',
    auction: {
      value: 'N',
      details: ['1C 2D 2S 3D', '4S Pass Pass Pass'],
    },
    play: {
      value: 'W',
      details: [
        'HA H4 HT H6',
        'HK HJ H3 H2',
        'D2 DA D4 D7',
        'D3 D8 DK S5',
        'S2 S3 S6 SA',
        'S4 SJ ST S7',
        'DQ D9 DT S8',
        'H5 S9 HQ H9',
        'CK C4 C2 CJ',
        '*',
      ],
    },
  },
  {
    board: '1',
    west: 'Andersson L',
    north: 'Baldursson J',
    east: 'Gothe H',
    south: 'Thorbjorns S',
    dealer: 'N',
    vulnerable: 'None',
    deal: 'N:KJ93.J4.A98.Q764 T6.QT3.KJT654.T2 AQ875.962.7.AJ85 42.AK875.Q32.K93',
    declarer: 'S',
    contract: '4S',
    result: '10',
    room: 'Closed',
    score: 'NS 420',
    auction: {
      value: 'N',
      details: ['Pass Pass 1S 2H', '4S Pass Pass Pass'],
    },
    play: {
      value: 'W',
      details: [
        'HA H4 HT H6',
        'D2 DA D4 D7',
        'S2 S3 S6 SA',
        'S4 SK ST S5',
        'C3 C4 C2 CA',
        'CK C6 CT C5',
        '*',
      ],
    },
  },
  {
    date: '1997.06.22',
    board: '2',
    west: 'Arnarson G',
    north: 'Eriksson M',
    east: 'Jonsson T',
    south: 'Fredin P',
    dealer: 'E',
    vulnerable: 'NS',
    deal: 'E:AQ.T964.AJ987.63 5.AKQ73.Q2.98742 9743.52.T54.AJT5 KJT862.J8.K63.KQ',
    declarer: 'S',
    contract: '2H',
    result: '9',
    homeTeam: 'Sweden',
    room: 'Open',
    round: '18',
    score: 'NS 140',
    section: 'Open',
    table: '14',
    visitTeam: 'Iceland',
    auction: {
      value: 'E',
      details: ['1D 1H X 1S', 'Pass 2C Pass 2D', 'Pass 2H Pass Pass', 'Pass'],
    },
    play: {
      value: 'W',
      details: [
        'D5 D3 DJ DQ',
        'S3 SK SA S5',
        'D4 D6 DA D2',
        'DT DK D7 C2',
        'CA CQ C3 C4',
        'H2 H8 H9 HQ',
        'C5 CK C6 C7',
        'S4 S2 SQ H3',
        'CT HJ D8 C8',
        'S7 SJ HT HK',
        'H5 S6 H4 HA',
        '*',
      ],
    },
  },
  {
    board: '2',
    west: 'Andersson L',
    north: 'Baldursson J',
    east: 'Gothe H',
    south: 'Thorbjorns S',
    dealer: 'E',
    vulnerable: 'NS',
    deal: 'E:AQ.T964.AJ987.63 5.AKQ73.Q2.98742 9743.52.T54.AJT5 KJT862.J8.K63.KQ',
    declarer: 'N',
    contract: '3S',
    result: '9',
    room: 'Closed',
    score: 'NS 140',
    auction: {
      value: 'E',
      details: ['1NT 2H Pass 2S', 'Pass 3C X 3S', 'Pass Pass Pass'],
    },
    play: {
      value: 'E',
      details: [
        'C6 C2 CA CK',
        'H4 H3 H2 H8',
        'SA S5 S3 S2',
        'H6 H7 H5 HJ',
        'C3 C4 CJ CQ',
        '*',
      ],
    },
  },
  {
    date: '1997.06.22',
    board: '3',
    west: 'Arnarson G',
    north: 'Eriksson M',
    east: 'Jonsson T',
    south: 'Fredin P',
    dealer: 'S',
    vulnerable: 'EW',
    deal: 'S:QT95.Q963.K.K975 AK87.K4.QJT62.AQ 62.AJT7.54.J8643 J43.852.A9873.T2',
    declarer: 'N',
    contract: '4HX',
    result: '8',
    homeTeam: 'Sweden',
    room: 'Open',
    round: '18',
    score: 'NS -300',
    section: 'Open',
    table: '14',
    visitTeam: 'Iceland',
    auction: {
      value: 'S',
      details: ['Pass 1D 1H 3D', '3H 3NT Pass Pass', '4H X Pass Pass', 'Pass'],
    },
    play: {
      value: 'E',
      details: [
        'CT C5 CQ C6',
        'C2 C7 CA C4',
        'DA DK D2 D5',
        'D7 H3 D6 D4',
        'H2 HQ HK HA',
        'H5 H9 H4 H7',
        'H8 H6 DT HJ',
        'D3 CK DJ C3',
        '*',
      ],
    },
  },
  {
    board: '3',
    west: 'Andersson L',
    north: 'Baldursson J',
    east: 'Gothe H',
    south: 'Thorbjorns S',
    dealer: 'S',
    vulnerable: 'EW',
    deal: 'S:QT95.Q963.K.K975 AK87.K4.QJT62.AQ 62.AJT7.54.J8643 J43.852.A9873.T2',
    declarer: 'W',
    contract: '3NT',
    result: '9',
    room: 'Closed',
    score: 'NS -600',
    auction: {
      value: 'S',
      details: [
        'Pass 1D Pass 1H',
        'Pass 1S Pass 2D',
        'Pass 3D Pass 3S',
        'Pass 3NT Pass Pass',
        'Pass',
      ],
    },
    play: {
      value: 'N',
      details: [
        'HA H2 H3 H4',
        'H7 H5 HQ HK',
        'D4 D3 DK DQ',
        'HT H8 H9 D2',
        'HJ C2 H6 S7',
        'D5 D7 C7 DT',
        'S2 D8 C5 DJ',
        'S6 S3 S5 SA',
        'C3 - - SK',
        '*',
      ],
    },
  },
  {
    date: '1997.06.22',
    board: '4',
    west: 'Arnarson G',
    north: 'Eriksson M',
    east: 'Jonsson T',
    south: 'Fredin P',
    dealer: 'W',
    vulnerable: 'All',
    deal: 'W:KQ2.T974.43.Q643 J864.AK6.AT86.K7 93.QJ5.KQJ52.A92 AT75.832.97.JT85',
    declarer: 'N',
    contract: '1NT',
    result: '6',
    homeTeam: 'Sweden',
    room: 'Open',
    round: '18',
    score: 'NS -100',
    section: 'Open',
    table: '14',
    visitTeam: 'Iceland',
    auction: {
      value: 'W',
      details: ['Pass 1NT Pass Pass', 'Pass'],
    },
    play: {
      value: 'E',
      details: ['DK D7 D3 DA', 'S3 ST SQ S6', 'HQ H2 HT HA', '*'],
    },
  },
  {
    board: '4',
    west: 'Andersson L',
    north: 'Baldursson J',
    east: 'Gothe H',
    south: 'Thorbjorns S',
    dealer: 'W',
    vulnerable: 'All',
    deal: 'W:KQ2.T974.43.Q643 J864.AK6.AT86.K7 93.QJ5.KQJ52.A92 AT75.832.97.JT85',
    declarer: 'N',
    contract: '1NT',
    result: '6',
    room: 'Closed',
    score: 'NS -100',
    auction: {
      value: 'W',
      details: ['Pass 1NT Pass Pass', 'Pass'],
    },
    play: {
      value: 'E',
      details: [
        'DK D7 D3 DA',
        'C9 C5 C3 CK',
        'S3 ST SQ S4',
        'DJ D9 D4 D6',
        'DQ H2 C4 D8',
        'D2 S5 HT DT',
        'CA C8 C6 C7',
        'D5 H3 H4 H6',
        'S9 SA S2 S6',
        '- S7 - -',
        '*',
      ],
    },
  },
  {
    date: '1997.06.22',
    board: '5',
    west: 'Arnarson G',
    north: 'Eriksson M',
    east: 'Jonsson T',
    south: 'Fredin P',
    dealer: 'N',
    vulnerable: 'NS',
    deal: 'N:96.Q863.K653.754 AQ853.AK72.AQ.J9 J742..JT9872.KT3 KT.JT954.4.AQ862',
    declarer: 'W',
    contract: '6H',
    result: '12',
    homeTeam: 'Sweden',
    room: 'Open',
    round: '18',
    score: 'NS -980',
    section: 'Open',
    table: '14',
    visitTeam: 'Iceland',
    auction: {
      value: 'N',
      details: [
        'Pass 1S Pass 2H',
        'Pass 3H Pass 4H',
        'Pass 4S Pass 4NT',
        'Pass 5D Pass 6H',
        'Pass Pass Pass',
      ],
    },
    play: {
      value: 'N',
      details: [
        'C4 C9 CT CQ',
        'H3 HA D2 H4',
        'S9 S3 S2 SK',
        'H6 H2 D7 HJ',
        'H8 H7 D8 HT',
        'HQ HK C3 H5',
        'S6 S5 SJ ST',
        '*',
      ],
    },
  },
  {
    board: '5',
    west: 'Andersson L',
    north: 'Baldursson J',
    east: 'Gothe H',
    south: 'Thorbjorns S',
    dealer: 'N',
    vulnerable: 'NS',
    deal: 'N:96.Q863.K653.754 AQ853.AK72.AQ.J9 J742..JT9872.KT3 KT.JT954.4.AQ862',
    declarer: 'W',
    contract: '6H',
    result: '12',
    room: 'Closed',
    score: 'NS -980',
    auction: {
      value: 'N',
      details: [
        'Pass 1D 2D 2H',
        '3D 3H Pass 4D',
        'Pass 4S Pass 5C',
        'Pass 5D Pass 5S',
        'Pass 6H Pass Pass',
        'Pass',
      ],
    },
    play: {
      value: 'N',
      details: [
        'D5 DA D8 D4',
        'H3 HA D7 H4',
        'C4 CJ CK CA',
        'H6 H2 D2 HJ',
        'H8 H7 D9 HT',
        'C5 C9 CT C2',
        '- - DT -',
        '*',
      ],
    },
  },
  {
    date: '1997.06.22',
    board: '6',
    west: 'Arnarson G',
    north: 'Eriksson M',
    east: 'Jonsson T',
    south: 'Fredin P',
    dealer: 'E',
    vulnerable: 'EW',
    deal: 'E:Q92.AJT3.J52.T75 AK3.2.KQ83.AQJ82 J854.KQ97654..64 T76.8.AT9764.K93',
    declarer: 'N',
    contract: '6D',
    result: '12',
    homeTeam: 'Sweden',
    room: 'Open',
    round: '18',
    score: 'NS 920',
    section: 'Open',
    table: '14',
    visitTeam: 'Iceland',
    auction: {
      value: 'E',
      details: [
        'Pass 1C 2H 2NT',
        '3H 4NT Pass 5D',
        'Pass 6D Pass Pass',
        'Pass',
      ],
    },
    play: {
      value: 'E',
      details: ['HA H2 H6 H8', 'D2 - - -', '*'],
    },
  },
  {
    board: '6',
    west: 'Andersson L',
    north: 'Baldursson J',
    east: 'Gothe H',
    south: 'Thorbjorns S',
    dealer: 'E',
    vulnerable: 'EW',
    deal: 'E:Q92.AJT3.J52.T75 AK3.2.KQ83.AQJ82 J854.KQ97654..64 T76.8.AT9764.K93',
    declarer: 'S',
    contract: '6C',
    result: '12',
    room: 'Closed',
    score: 'NS 920',
    auction: {
      value: 'E',
      details: [
        'Pass 1C 3H X',
        'Pass 4C Pass 4D',
        'Pass 4H Pass 5C',
        'Pass 6C Pass Pass',
        'Pass',
      ],
    },
    play: {
      value: 'W',
      details: ['HK H8 HA H2', 'S5 S6 S2 SA', 'C4 CK C5 C2', '*'],
    },
  },
  {
    date: '1997.06.22',
    board: '7',
    west: 'Arnarson G',
    north: 'Eriksson M',
    east: 'Jonsson T',
    south: 'Fredin P',
    dealer: 'S',
    vulnerable: 'All',
    deal: 'S:A93.KJ.J5.AJ9542 K7654.A542.A2.Q8 T.QT763.9763.K73 QJ82.98.KQT84.T6',
    declarer: 'W',
    contract: '4S',
    result: '9',
    homeTeam: 'Sweden',
    room: 'Open',
    round: '18',
    score: 'NS 100',
    section: 'Open',
    table: '14',
    visitTeam: 'Iceland',
    auction: {
      value: 'S',
      details: ['2C X 3C X', 'Pass 3S Pass 4S', 'Pass Pass Pass'],
    },
    play: {
      value: 'N',
      details: [
        'C3 C6 CA C8',
        'H7 H8 HK HA',
        'D3 D4 DJ DA',
        'D6 DK D5 D2',
        'D7 DQ S9 CQ',
        '*',
      ],
    },
  },
  {
    board: '7',
    west: 'Andersson L',
    north: 'Baldursson J',
    east: 'Gothe H',
    south: 'Thorbjorns S',
    dealer: 'S',
    vulnerable: 'All',
    deal: 'S:A93.KJ.J5.AJ9542 K7654.A542.A2.Q8 T.QT763.9763.K73 QJ82.98.KQT84.T6',
    declarer: 'W',
    contract: '3S',
    result: '9',
    room: 'Closed',
    score: 'NS -140',
    auction: {
      value: 'S',
      details: ['1D 1S X 2H', '3C 3S Pass Pass', 'Pass'],
    },
    play: {
      value: 'N',
      details: [
        'C3 C6 CA C8',
        'H7 H8 HK H2',
        'CK CT CJ CQ',
        'D6 D4 DJ DA',
        'ST SQ SA S4',
        '- - HJ -',
        '*',
      ],
    },
  },
  {
    date: '1997.06.22',
    board: '8',
    west: 'Arnarson G',
    north: 'Eriksson M',
    east: 'Jonsson T',
    south: 'Fredin P',
    dealer: 'W',
    vulnerable: 'None',
    deal: 'W:A86.QJT6.KT93.92 52.A852.A542.K85 KJ974.74.Q86.AQJ QT3.K93.J7.T7643',
    declarer: 'E',
    contract: '2S',
    result: '9',
    homeTeam: 'Sweden',
    room: 'Open',
    round: '18',
    score: 'NS -140',
    section: 'Open',
    table: '14',
    visitTeam: 'Iceland',
    auction: {
      value: 'W',
      details: ['Pass 1C 1S Pass', '2C Pass 2S Pass', 'Pass Pass'],
    },
    play: {
      value: 'S',
      details: [
        'DJ D3 DA D6',
        'D7 D9 D5 DQ',
        'S3 SA S2 S4',
        'ST S6 S5 SK',
        'SQ DT D2 D8',
        'HK H6 H2 H4',
        'H9 HQ HA H7',
        '- - C5 -',
        '*',
      ],
    },
  },
  {
    board: '8',
    west: 'Andersson L',
    north: 'Baldursson J',
    east: 'Gothe H',
    south: 'Thorbjorns S',
    dealer: 'W',
    vulnerable: 'None',
    deal: 'W:A86.QJT6.KT93.92 52.A852.A542.K85 KJ974.74.Q86.AQJ QT3.K93.J7.T7643',
    declarer: 'S',
    contract: '3C',
    result: '7',
    room: 'Closed',
    score: 'NS -100',
    auction: {
      value: 'W',
      details: [
        'Pass Pass 1S Pass',
        '2D Pass 2S Pass',
        'Pass X XX 3C',
        'Pass Pass Pass',
      ],
    },
    play: {
      value: 'W',
      details: [
        'C2 C5 CJ C3',
        'SA S2 S7 ST',
        'C9 CK CA C4',
        'H6 C8 CQ C6',
        'DK DA D8 DJ',
        'S6 S5 SK S3',
        'D3 D2 DQ D7',
        'S8 - S9 SQ',
        '*',
      ],
    },
  },
  {
    date: '1997.06.22',
    board: '9',
    west: 'Arnarson G',
    north: 'Eriksson M',
    east: 'Jonsson T',
    south: 'Fredin P',
    dealer: 'N',
    vulnerable: 'EW',
    deal: 'N:J94.QJ73.J9.9752 T732.K9.Q8.KJT86 K865.8.AK6542.43 AQ.AT6542.T73.AQ',
    declarer: 'W',
    contract: '4H',
    result: '9',
    homeTeam: 'Sweden',
    room: 'Open',
    round: '18',
    score: 'NS 100',
    section: 'Open',
    table: '14',
    visitTeam: 'Iceland',
    auction: {
      value: 'N',
      details: [
        'Pass Pass 1D 1H',
        'Pass 1S Pass 2D',
        'Pass 2H Pass 4H',
        'Pass Pass Pass',
      ],
    },
    play: {
      value: 'N',
      details: [
        'DJ DQ DK D3',
        'D9 D8 DA D7',
        'S4 S2 S6 SA',
        'H3 HK H8 H2',
        'H7 H9 D2 HA',
        'C2 C6 C3 CA',
        'C5 CK C4 CQ',
        '- CJ - -',
        '*',
      ],
    },
  },
  {
    board: '9',
    west: 'Andersson L',
    north: 'Baldursson J',
    east: 'Gothe H',
    south: 'Thorbjorns S',
    dealer: 'N',
    vulnerable: 'EW',
    deal: 'N:J94.QJ73.J9.9752 T732.K9.Q8.KJT86 K865.8.AK6542.43 AQ.AT6542.T73.AQ',
    declarer: 'W',
    contract: '4H',
    result: '9',
    room: 'Closed',
    score: 'NS 100',
    auction: {
      value: 'N',
      details: ['Pass 1S 2D X', 'Pass 3C Pass 3H', 'Pass 4H Pass Pass', 'Pass'],
    },
    play: {
      value: 'N',
      details: ['DJ DQ DK D3', 'D9 D8 DA D7', 'S4 S2 S6 SQ', 'H3 - - H2', '*'],
    },
  },
  {
    date: '1997.06.22',
    board: '10',
    west: 'Arnarson G',
    north: 'Eriksson M',
    east: 'Jonsson T',
    south: 'Fredin P',
    dealer: 'E',
    vulnerable: 'All',
    deal: 'E:8.J762.JT842.A84 754.AQ53.95.KQJ5 KJT62.K8.K6.T972 AQ93.T94.AQ73.63',
    declarer: 'N',
    contract: '3NT',
    result: '9',
    homeTeam: 'Sweden',
    room: 'Open',
    round: '18',
    score: 'NS 600',
    section: 'Open',
    table: '14',
    visitTeam: 'Iceland',
    auction: {
      value: 'E',
      details: ['Pass 1C 1S 3NT', 'Pass Pass Pass'],
    },
    play: {
      value: 'E',
      details: [
        'D4 D5 DK D3',
        'S8 S4 SJ S3',
        'D2 S5 ST SQ',
        'H2 H3 HK H9',
        'D8 D9 D6 DA',
        'C4 CK C2 C3',
        'CA CQ C7 C6',
        '*',
      ],
    },
  },
  {
    board: '10',
    west: 'Andersson L',
    north: 'Baldursson J',
    east: 'Gothe H',
    south: 'Thorbjorns S',
    dealer: 'E',
    vulnerable: 'All',
    deal: 'E:8.J762.JT842.A84 754.AQ53.95.KQJ5 KJT62.K8.K6.T972 AQ93.T94.AQ73.63',
    declarer: 'N',
    contract: '2NT',
    result: '10',
    room: 'Closed',
    score: 'NS 180',
    auction: {
      value: 'E',
      details: [
        'Pass Pass Pass 1D',
        'Pass 1H 1S X',
        'Pass 2S Pass 2NT',
        'Pass Pass Pass',
      ],
    },
    play: {
      value: 'E',
      details: [
        'S8 S4 ST SQ',
        'H2 H3 HK H9',
        'C8 S5 SK S3',
        'D2 D5 DK DA',
        'C4 CK C2 C3',
        '*',
      ],
    },
  },
  {
    date: '1997.06.22',
    board: '11',
    west: 'Arnarson G',
    north: 'Eriksson M',
    east: 'Jonsson T',
    south: 'Fredin P',
    dealer: 'S',
    vulnerable: 'None',
    deal: 'S:T842.AKQ63.73.Q7 63.J72.A54.AJ952 AJ975.T54.Q982.T KQ.98.KJT6.K8643',
    declarer: 'N',
    contract: '3S',
    result: '8',
    homeTeam: 'Sweden',
    room: 'Open',
    round: '18',
    score: 'NS -50',
    section: 'Open',
    table: '14',
    visitTeam: 'Iceland',
    auction: {
      value: 'S',
      details: ['1H Pass 1S Pass', '2S Pass Pass 2NT', '3S Pass Pass Pass'],
    },
    play: {
      value: 'E',
      details: [
        'C3 C7 CA CT',
        'DT D3 D4 D8',
        'CK CQ C2 S5',
        'D6 D7 DA D2',
        'SK S2 S3 S7',
        'H9 HA H2 H4',
        'SQ S4 S6 S9',
        '*',
      ],
    },
  },
  {
    board: '11',
    west: 'Andersson L',
    north: 'Baldursson J',
    east: 'Gothe H',
    south: 'Thorbjorns S',
    dealer: 'S',
    vulnerable: 'None',
    deal: 'S:T842.AKQ63.73.Q7 63.J72.A54.AJ952 AJ975.T54.Q982.T KQ.98.KJT6.K8643',
    declarer: 'N',
    contract: '3S',
    result: '9',
    room: 'Closed',
    score: 'NS 140',
    auction: {
      value: 'S',
      details: ['1H Pass 1S X', '2S 3C 3S Pass', 'Pass Pass'],
    },
    play: {
      value: 'E',
      details: [
        'C3 CQ CA CT',
        'D6 D3 DA D2',
        'DJ D7 D5 D8',
        'CK C7 C2 S5',
        'SQ S2 S3 SA',
        '*',
      ],
    },
  },
  {
    date: '1997.06.22',
    board: '12',
    west: 'Arnarson G',
    north: 'Eriksson M',
    east: 'Jonsson T',
    south: 'Fredin P',
    dealer: 'W',
    vulnerable: 'NS',
    deal: 'W:AJ3.KJ.Q.KQT7643 Q9.AT9842.A72.AJ K42.65.JT98543.8 T8765.Q73.K6.952',
    declarer: 'S',
    contract: '3H',
    result: '9',
    homeTeam: 'Sweden',
    room: 'Open',
    round: '18',
    score: 'NS 140',
    section: 'Open',
    table: '14',
    visitTeam: 'Iceland',
    auction: {
      value: 'W',
      details: ['3D Pass Pass 3H', 'Pass Pass Pass'],
    },
    play: {
      value: 'W',
      details: ['C3 - - -', '*'],
    },
  },
  {
    board: '12',
    west: 'Andersson L',
    north: 'Baldursson J',
    east: 'Gothe H',
    south: 'Thorbjorns S',
    dealer: 'W',
    vulnerable: 'NS',
    deal: 'W:AJ3.KJ.Q.KQT7643 Q9.AT9842.A72.AJ K42.65.JT98543.8 T8765.Q73.K6.952',
    declarer: 'S',
    contract: '3H',
    result: '9',
    room: 'Closed',
    score: 'NS 140',
    auction: {
      value: 'W',
      details: ['3D Pass Pass 3H', 'Pass Pass Pass'],
    },
  },
  {
    date: '1997.06.22',
    board: '13',
    west: 'Baldursson J',
    north: 'Eriksson M',
    east: 'Thorbjorns S',
    south: 'Fredin P',
    dealer: 'N',
    vulnerable: 'All',
    deal: 'N:AQ63.8543.K.A864 52.KJT96.J876.KT T7..AQT5432.Q973 KJ984.AQ72.9.J52',
    declarer: 'S',
    contract: '5D',
    result: '11',
    homeTeam: 'Sweden',
    room: 'Open',
    round: '18',
    score: 'NS 600',
    section: 'Open',
    table: '14',
    visitTeam: 'Iceland',
    auction: {
      value: 'N',
      details: ['Pass 2H 3D 4H', 'X Pass 5D Pass', 'Pass Pass'],
    },
    play: {
      value: 'W',
      details: [
        'HA H3 H9 D3',
        'D9 DK D6 D4',
        'H2 H4 H6 D2',
        'H7 S3 D7 DA',
        'SJ SQ S2 ST',
        'C5 C4 CK C3',
        'S8 SA S5 S7',
        'C2 C6 CT CQ',
        '- - - DQ',
        '*',
      ],
    },
  },
  {
    board: '13',
    west: 'Fallenius B',
    north: 'Jonsson T',
    east: 'Nilsland M',
    south: 'Arnarson G',
    dealer: 'N',
    vulnerable: 'All',
    deal: 'N:AQ63.8543.K.A864 52.KJT96.J876.KT T7..AQT5432.Q973 KJ984.AQ72.9.J52',
    declarer: 'N',
    contract: '5CX',
    result: '11',
    room: 'Closed',
    score: 'NS 750',
    auction: {
      value: 'N',
      details: ['1C 1H 3D 4H', 'Pass Pass 4NT X', '5C X Pass Pass', 'Pass'],
    },
    play: {
      value: 'E',
      details: [
        'S5 ST SK SA',
        'D6 D2 D9 DK',
        'CT C3 C2 CA',
        'CK C7 C5 C4',
        'HT C9 H2 H3',
        '- D3 CJ -',
        '*',
      ],
    },
  },
  {
    date: '1997.06.22',
    board: '14',
    west: 'Baldursson J',
    north: 'Eriksson M',
    east: 'Thorbjorns S',
    south: 'Fredin P',
    dealer: 'E',
    vulnerable: 'None',
    deal: 'E:T82.A9732.84.A98 K54.KQJ4.T53.KJT J763.T65.QJ9.532 AQ9.8.AK762.Q764',
    declarer: 'S',
    contract: '3NT',
    result: '10',
    homeTeam: 'Sweden',
    room: 'Open',
    round: '18',
    score: 'NS 430',
    section: 'Open',
    table: '14',
    visitTeam: 'Iceland',
    auction: {
      value: 'E',
      details: [
        'Pass 1C Pass 2S',
        'Pass 2NT Pass 3C',
        'Pass 3NT Pass Pass',
        'Pass',
      ],
    },
    play: {
      value: 'W',
      details: [
        'S3 SA ST S5',
        'C2 C4 C8 CJ',
        'C3 C6 CA CK',
        'S7 SQ S8 S4',
        'H5 H8 H3 HQ',
        'D9 D2 D4 D5',
        'H6 D6 HA -',
        '*',
      ],
    },
  },
  {
    board: '14',
    west: 'Fallenius B',
    north: 'Jonsson T',
    east: 'Nilsland M',
    south: 'Arnarson G',
    dealer: 'E',
    vulnerable: 'None',
    deal: 'E:T82.A9732.84.A98 K54.KQJ4.T53.KJT J763.T65.QJ9.532 AQ9.8.AK762.Q764',
    declarer: 'S',
    contract: '3NT',
    result: '10',
    room: 'Closed',
    score: 'NS 430',
    auction: {
      value: 'E',
      details: [
        'Pass 1C Pass 1D',
        'Pass 1NT Pass 2D',
        'Pass 2H Pass 3C',
        'Pass 3NT Pass Pass',
        'Pass',
      ],
    },
    play: {
      value: 'W',
      details: [
        'S3 SQ S8 S4',
        'C2 C4 CA CT',
        'H6 H8 H3 HK',
        'H5 D2 HA HQ',
        'HT C6 H7 HJ',
        'C3 C7 C8 CJ',
        '- - - CK',
        '*',
      ],
    },
  },
  {
    date: '1997.06.22',
    board: '15',
    west: 'Baldursson J',
    north: 'Eriksson M',
    east: 'Thorbjorns S',
    south: 'Fredin P',
    dealer: 'S',
    vulnerable: 'NS',
    deal: 'S:AQ9.Q.9532.97653 532.T532.QJ74.Q2 KJT8.J974.AK8.AJ 764.AK86.T6.KT84',
    declarer: 'S',
    contract: '3NT',
    result: '8',
    homeTeam: 'Sweden',
    room: 'Open',
    round: '18',
    score: 'NS -100',
    section: 'Open',
    table: '14',
    visitTeam: 'Iceland',
    auction: {
      value: 'S',
      details: ['Pass Pass 1C Pass', '1NT Pass 3NT Pass', 'Pass Pass'],
    },
    play: {
      value: 'W',
      details: [
        'H2 H4 HK HQ',
        'C2 CJ C4 C5',
        'CQ CA C8 C3',
        'S2 S8 S7 S9',
        'S3 H7 CT C6',
        'D4 DA DT D2',
        'S5 ST S4 SA',
        'DJ DK D6 D3',
        'H3 SK S6 SQ',
        'D7 SJ H6 C7',
        '- D8 H8 -',
        '*',
      ],
    },
  },
  {
    board: '15',
    west: 'Fallenius B',
    north: 'Jonsson T',
    east: 'Nilsland M',
    south: 'Arnarson G',
    dealer: 'S',
    vulnerable: 'NS',
    deal: 'S:AQ9.Q.9532.97653 532.T532.QJ74.Q2 KJT8.J974.AK8.AJ 764.AK86.T6.KT84',
    declarer: 'N',
    contract: '3NT',
    result: '8',
    room: 'Closed',
    score: 'NS -100',
    auction: {
      value: 'S',
      details: [
        'Pass Pass 1NT Pass',
        '2C Pass 2D Pass',
        '2NT Pass 3NT Pass',
        'Pass Pass',
      ],
    },
    play: {
      value: 'E',
      details: [
        'HA HQ H5 H4',
        'S7 S9 S5 S8',
        'CK C3 C2 CJ',
        'S4 SA S2 ST',
        'D6 D2 D4 DA',
        'DT D3 D7 DK',
        'S6 D5 DJ D8',
        'C8 D9 DQ H7',
        'HK - H2 H9',
        '*',
      ],
    },
  },
  {
    date: '1997.06.22',
    board: '16',
    west: 'Baldursson J',
    north: 'Eriksson M',
    east: 'Thorbjorns S',
    south: 'Fredin P',
    dealer: 'W',
    vulnerable: 'EW',
    deal: 'W:J8.A974.KJ862.94 974.QT5.A743.Q83 Q653.8.T95.AT652 AKT2.KJ632.Q.KJ7',
    declarer: 'N',
    contract: '4H',
    result: '8',
    homeTeam: 'Sweden',
    room: 'Open',
    round: '18',
    score: 'NS -100',
    section: 'Open',
    table: '14',
    visitTeam: 'Iceland',
    auction: {
      value: 'W',
      details: [
        'Pass Pass Pass 1C',
        '1D X 2D X',
        'Pass 2H Pass 4H',
        'Pass Pass Pass',
      ],
    },
    play: {
      value: 'E',
      details: [
        'DT DQ DK DA',
        'H8 H2 H4 HQ',
        'C5 HJ H7 H5',
        'CA CK C4 C3',
        'D9 H3 D2 D3',
        'C2 CJ C9 C8',
        'C6 C7 H9 CQ',
        'S3 H6 HA HT',
        'D5 HK DJ D4',
        'S5 SA S8 S4',
        'S6 SK SJ S7',
        'SQ S2 D6 S9',
        '*',
      ],
    },
  },
  {
    board: '16',
    west: 'Fallenius B',
    north: 'Jonsson T',
    east: 'Nilsland M',
    south: 'Arnarson G',
    dealer: 'W',
    vulnerable: 'EW',
    deal: 'W:J8.A974.KJ862.94 974.QT5.A743.Q83 Q653.8.T95.AT652 AKT2.KJ632.Q.KJ7',
    declarer: 'N',
    contract: '3S',
    result: '8',
    room: 'Closed',
    score: 'NS -50',
    auction: {
      value: 'W',
      details: ['2C Pass 2D X', 'Pass 2S Pass 3S', 'Pass Pass Pass'],
    },
    play: {
      value: 'E',
      details: [
        'DT DQ DK DA',
        'C5 CK C4 C3',
        'H8 H2 HA H5',
        'CA C7 C9 C8',
        'CT CJ S8 CQ',
        'S3 H3 H4 HQ',
        '*',
      ],
    },
  },
  {
    date: '1997.06.22',
    board: '17',
    west: 'Baldursson J',
    north: 'Eriksson M',
    east: 'Thorbjorns S',
    south: 'Fredin P',
    dealer: 'N',
    vulnerable: 'None',
    deal: 'N:AJ97.QT3.A5.9872 KQ54.J9.QT843.T6 T82.A876.J7.AJ43 63.K542.K962.KQ5',
    declarer: 'E',
    contract: '3D',
    result: '9',
    homeTeam: 'Sweden',
    room: 'Open',
    round: '18',
    score: 'NS -110',
    section: 'Open',
    table: '14',
    visitTeam: 'Iceland',
    auction: {
      value: 'N',
      details: ['1C 1D X 3C', 'Pass 3D Pass Pass', 'Pass'],
    },
    play: {
      value: 'S',
      details: [
        'S2 S3 SA S4',
        'HA H2 H3 H9',
        'H6 HK HT HJ',
        'S8 S6 S7 SK',
        'D7 DK DA D3',
        'H7 H4 HQ D8',
        'DJ D2 D5 DQ',
        '*',
      ],
    },
  },
  {
    board: '17',
    west: 'Fallenius B',
    north: 'Jonsson T',
    east: 'Nilsland M',
    south: 'Arnarson G',
    dealer: 'N',
    vulnerable: 'None',
    deal: 'N:AJ97.QT3.A5.9872 KQ54.J9.QT843.T6 T82.A876.J7.AJ43 63.K542.K962.KQ5',
    declarer: 'S',
    contract: '1NT',
    result: '6',
    room: 'Closed',
    score: 'NS -50',
    auction: {
      value: 'N',
      details: ['1C Pass 1H Pass', '1S Pass 1NT Pass', 'Pass Pass'],
    },
    play: {
      value: 'W',
      details: [
        'D2 D5 DQ D7',
        'D6 DA D4 DJ',
        'C5 C2 C6 CA',
        'S3 S7 SK S8',
        'DK C7 D3 H6',
        'CQ C8 CT C3',
        '*',
      ],
    },
  },
  {
    date: '1997.06.22',
    board: '18',
    west: 'Baldursson J',
    north: 'Eriksson M',
    east: 'Thorbjorns S',
    south: 'Fredin P',
    dealer: 'E',
    vulnerable: 'NS',
    deal: 'E:Q9.AJ2.J654.8753 AK65.Q84.AT2.J96 J72.T953.97.AKQ4 T843.K76.KQ83.T2',
    declarer: 'S',
    contract: '1NT',
    result: '6',
    homeTeam: 'Sweden',
    room: 'Open',
    round: '18',
    score: 'NS -100',
    section: 'Open',
    table: '14',
    visitTeam: 'Iceland',
    auction: {
      value: 'E',
      details: ['Pass 1NT Pass Pass', 'Pass'],
    },
    play: {
      value: 'W',
      details: [
        'CQ C2 C8 C6',
        'H3 H6 HJ HQ',
        'D7 D3 D6 DA',
        'D9 DK D4 DT',
        'C4 DQ D5 D2',
        'S2 S3 SQ SA',
        'S7 S4 S9 SK',
        'CK CT C3 C9',
        'SJ S8 C5 S5',
        'CA - - -',
        '*',
      ],
    },
  },
  {
    board: '18',
    west: 'Fallenius B',
    north: 'Jonsson T',
    east: 'Nilsland M',
    south: 'Arnarson G',
    dealer: 'E',
    vulnerable: 'NS',
    deal: 'E:Q9.AJ2.J654.8753 AK65.Q84.AT2.J96 J72.T953.97.AKQ4 T843.K76.KQ83.T2',
    declarer: 'N',
    contract: '2S',
    result: '9',
    room: 'Closed',
    score: 'NS 140',
    auction: {
      value: 'E',
      details: ['Pass 1C Pass 1S', 'Pass 2S Pass Pass', 'Pass'],
    },
    play: {
      value: 'E',
      details: [
        'HJ H4 H3 HK',
        'S9 SA S2 S3',
        'SQ SK S7 S4',
        'D4 DA D7 D3',
        'D5 D2 D9 DK',
        'D6 DT - DQ',
        '*',
      ],
    },
  },
  {
    date: '1997.06.22',
    board: '19',
    west: 'Baldursson J',
    north: 'Eriksson M',
    east: 'Thorbjorns S',
    south: 'Fredin P',
    dealer: 'S',
    vulnerable: 'EW',
    deal: 'S:T9765.Q2.843.K82 Q32.KJ97.Q5.QT95 A84.65.AKJT2.AJ7 KJ.AT843.976.643',
    declarer: 'S',
    contract: '3S',
    result: '10',
    homeTeam: 'Sweden',
    room: 'Open',
    round: '18',
    score: 'NS 170',
    section: 'Open',
    table: '14',
    visitTeam: 'Iceland',
    auction: {
      value: 'S',
      details: ['Pass Pass 1C 1H', 'Pass 3C 3D 3H', '3S Pass Pass Pass'],
    },
    play: {
      value: 'W',
      details: [
        'HK H5 H3 H2',
        'CT CJ C6 C8',
        'S2 SA SJ S5',
        'C5 C7 C3 CK',
        'C9 CA C4 C2',
        'S3 S4 SK S6',
        'H7 H6 H4 HQ',
        '*',
      ],
    },
  },
  {
    board: '19',
    west: 'Fallenius B',
    north: 'Jonsson T',
    east: 'Nilsland M',
    south: 'Arnarson G',
    dealer: 'S',
    vulnerable: 'EW',
    deal: 'S:T9765.Q2.843.K82 Q32.KJ97.Q5.QT95 A84.65.AKJT2.AJ7 KJ.AT843.976.643',
    declarer: 'N',
    contract: '1NT',
    result: '7',
    room: 'Closed',
    score: 'NS 90',
    auction: {
      value: 'S',
      details: ['Pass Pass 1NT Pass', 'Pass Pass'],
    },
    play: {
      value: 'E',
      details: [
        'H4 HQ HK H5',
        'H8 H2 H7 H6',
        'HT D3 H9 D2',
        'H3 D4 HJ DT',
        'D6 D8 D5 DA',
        'SJ S5 S2 SA',
        'SK S6 S3 S8',
        'HA S7 C5 S4',
        'C6 C2 CQ CA',
        'C3 CK C9 C7',
        'C4 C8 CT CJ',
        '*',
      ],
    },
  },
  {
    date: '1997.06.22',
    board: '20',
    west: 'Baldursson J',
    north: 'Eriksson M',
    east: 'Thorbjorns S',
    south: 'Fredin P',
    dealer: 'W',
    vulnerable: 'All',
    deal: 'W:AKQJ65.3.AJ2.J98 T83.T8.86.AQT643 4.AKQ75.KQ743.72 972.J9642.T95.K5',
    declarer: 'W',
    contract: '5S',
    result: '13',
    homeTeam: 'Sweden',
    room: 'Open',
    round: '18',
    score: 'NS -710',
    section: 'Open',
    table: '14',
    visitTeam: 'Iceland',
    auction: {
      value: 'W',
      details: [
        '1C 2C 2H Pass',
        '2S Pass 3D Pass',
        '3S Pass 4D Pass',
        '4S Pass 5S Pass',
        'Pass Pass',
      ],
    },
    play: {
      value: 'N',
      details: ['HT HA H6 H3', 'S3 S4 S2 SA', 'S8 C2 S7 SK', '- - - SQ', '*'],
    },
  },
  {
    board: '20',
    west: 'Fallenius B',
    north: 'Jonsson T',
    east: 'Nilsland M',
    south: 'Arnarson G',
    dealer: 'W',
    vulnerable: 'All',
    deal: 'W:AKQJ65.3.AJ2.J98 T83.T8.86.AQT643 4.AKQ75.KQ743.72 972.J9642.T95.K5',
    declarer: 'W',
    contract: '5S',
    result: '13',
    room: 'Closed',
    score: 'NS -710',
    auction: {
      value: 'W',
      details: [
        '1C 2C 2H Pass',
        '2S Pass 3D Pass',
        '3S Pass 4D Pass',
        '4S Pass 5S Pass',
        'Pass Pass',
      ],
    },
    play: {
      value: 'N',
      details: ['HT HA H4 H3', 'S3 S4 S2 SA', 'S8 C2 - SK', '*'],
    },
  },
  {
    date: '1997.06.22',
    board: '21',
    west: 'Baldursson J',
    north: 'Eriksson M',
    east: 'Thorbjorns S',
    south: 'Fredin P',
    dealer: 'N',
    vulnerable: 'NS',
    deal: 'N:Q42.T86.Q632.AJ2 JT76.QJ943.A9.K3 A83.A7.J75.98765 K95.K52.KT84.QT4',
    declarer: 'W',
    contract: '2NT',
    result: '7',
    homeTeam: 'Sweden',
    room: 'Open',
    round: '18',
    score: 'NS 50',
    section: 'Open',
    table: '14',
    visitTeam: 'Iceland',
    auction: {
      value: 'N',
      details: ['Pass 1H Pass 1NT', 'Pass 2C Pass 2NT', 'Pass Pass Pass'],
    },
    play: {
      value: 'N',
      details: [
        'S2 S6 SA S5',
        'CJ CK C7 CT',
        'H8 H3 H7 HK',
        'H6 HQ HA H5',
        'CA C3 C6 CQ',
        'C2 S7 C5 C4',
        'D6 ST C9 D4',
        '- - C8 D8',
        '*',
      ],
    },
  },
  {
    board: '21',
    west: 'Fallenius B',
    north: 'Jonsson T',
    east: 'Nilsland M',
    south: 'Arnarson G',
    dealer: 'N',
    vulnerable: 'NS',
    deal: 'N:Q42.T86.Q632.AJ2 JT76.QJ943.A9.K3 A83.A7.J75.98765 K95.K52.KT84.QT4',
    declarer: '',
    contract: 'Pass',
    result: '',
    room: 'Closed',
    score: 'NS 0',
    auction: {
      value: 'N',
      details: ['Pass Pass Pass Pass'],
    },
  },
  {
    date: '1997.06.22',
    board: '22',
    west: 'Baldursson J',
    north: 'Eriksson M',
    east: 'Thorbjorns S',
    south: 'Fredin P',
    dealer: 'E',
    vulnerable: 'EW',
    deal: 'E:KJT9753.J.QT.T72 8.K962.A432.Q654 Q42.AQT3.765.K83 A6.8754.KJ98.AJ9',
    declarer: 'W',
    contract: '4S',
    result: '7',
    homeTeam: 'Sweden',
    room: 'Open',
    round: '18',
    score: 'NS 300',
    section: 'Open',
    table: '14',
    visitTeam: 'Iceland',
    auction: {
      value: 'E',
      details: ['3D Pass 4C Pass', '4H Pass 4S Pass', 'Pass Pass'],
    },
    play: {
      value: 'N',
      details: [
        'D9 DT DA D5',
        'C9 C2 CQ C3',
        'CJ C7 C4 C8',
        'CA CT C5 CK',
        'DK - - -',
        '*',
      ],
    },
  },
  {
    board: '22',
    west: 'Fallenius B',
    north: 'Jonsson T',
    east: 'Nilsland M',
    south: 'Arnarson G',
    dealer: 'E',
    vulnerable: 'EW',
    deal: 'E:KJT9753.J.QT.T72 8.K962.A432.Q654 Q42.AQT3.765.K83 A6.8754.KJ98.AJ9',
    declarer: 'N',
    contract: '4H',
    result: '8',
    room: 'Closed',
    score: 'NS -100',
    auction: {
      value: 'E',
      details: ['Pass Pass Pass 1D', '2S X 3D 3H', 'Pass 4H Pass Pass', 'Pass'],
    },
    play: {
      value: 'E',
      details: [
        'ST S8 S4 SA',
        'HJ HK HA H4',
        'S3 H2 SQ S6',
        'C2 C4 C3 CJ',
        'SK H9 HT H5',
        'S5 H6 HQ H7',
        'SJ D2 S2 D8',
        'S9 C5 D5 H8',
        'DT D3 D6 DK',
        'DQ D4 D7 DJ',
        '*',
      ],
    },
  },
  {
    date: '1997.06.22',
    board: '23',
    west: 'Baldursson J',
    north: 'Eriksson M',
    east: 'Thorbjorns S',
    south: 'Fredin P',
    dealer: 'S',
    vulnerable: 'All',
    deal: 'S:Q62.KQ72.T632.53 T.94.AJ74.KT8762 AJ73.A65.K9.AQ94 K9854.JT83.Q85.J',
    declarer: 'N',
    contract: '3NT',
    result: '9',
    homeTeam: 'Sweden',
    room: 'Open',
    round: '18',
    score: 'NS 600',
    section: 'Open',
    table: '14',
    visitTeam: 'Iceland',
    auction: {
      value: 'S',
      details: ['Pass Pass 1C 1S', 'Pass Pass 1NT Pass', '3NT Pass Pass Pass'],
    },
    play: {
      value: 'E',
      details: [
        'HJ HQ H4 H5',
        'CJ C3 C2 C9',
        'D5 D2 DA D9',
        'S4 C5 C6 CQ',
        'D8 D3 D4 DK',
        'SK S2 ST S3',
        'DQ D6 D7 C4',
        '*',
      ],
    },
  },
  {
    board: '23',
    west: 'Fallenius B',
    north: 'Jonsson T',
    east: 'Nilsland M',
    south: 'Arnarson G',
    dealer: 'S',
    vulnerable: 'All',
    deal: 'S:Q62.KQ72.T632.53 T.94.AJ74.KT8762 AJ73.A65.K9.AQ94 K9854.JT83.Q85.J',
    declarer: 'N',
    contract: '3NT',
    result: '9',
    room: 'Closed',
    score: 'NS 600',
    auction: {
      value: 'S',
      details: ['Pass Pass 1C Pass', '1H Pass 2NT Pass', '3NT Pass Pass Pass'],
    },
    play: {
      value: 'E',
      details: [
        'S5 S2 ST SJ',
        'H3 HK H4 H5',
        'CJ C3 C2 C9',
        'HJ H2 H9 HA',
        'SK S6 CT S3',
        'HT HQ D4 H6',
        'D5 D2 D7 DK',
        'S9 SQ C6 S7',
        '- C5 C7 CQ',
        '*',
      ],
    },
  },
  {
    date: '1997.06.22',
    board: '24',
    west: 'Baldursson J',
    north: 'Eriksson M',
    east: 'Thorbjorns S',
    south: 'Fredin P',
    dealer: 'W',
    vulnerable: 'None',
    deal: 'W:A96.A87.A8652.32 K8732.43.K74.AK4 QJ.KQT9.93.QJT75 T54.J652.QJT.986',
    declarer: 'W',
    contract: '1NT',
    result: '10',
    homeTeam: 'Sweden',
    room: 'Open',
    round: '18',
    score: 'NS -180',
    section: 'Open',
    table: '14',
    visitTeam: 'Iceland',
    auction: {
      value: 'W',
      details: ['Pass 1S Pass Pass', '1NT Pass Pass Pass'],
    },
    play: {
      value: 'N',
      details: [
        'S2 SJ ST S6',
        'C4 CQ C9 C2',
        'CK CJ C8 C3',
        'SK SQ S4 SA',
        'H3 HK H2 H8',
        'CA C5 C6 D2',
        'S8 D3 S5 S9',
        'H4 H9 H5 HA',
        '- - - H7',
        '*',
      ],
    },
  },
  {
    board: '24',
    west: 'Fallenius B',
    north: 'Jonsson T',
    east: 'Nilsland M',
    south: 'Arnarson G',
    dealer: 'W',
    vulnerable: 'None',
    deal: 'W:A96.A87.A8652.32 K8732.43.K74.AK4 QJ.KQT9.93.QJT75 T54.J652.QJT.986',
    declarer: 'W',
    contract: '3D',
    result: '9',
    room: 'Closed',
    score: 'NS -110',
    auction: {
      value: 'W',
      details: ['1D 1S X 2S', 'Pass Pass X Pass', '3D Pass Pass Pass'],
    },
    play: {
      value: 'N',
      details: [
        'CA C5 C6 C2',
        'H4 H9 H2 H7',
        'D4 D3 DT DA',
        'DK D9 DJ D2',
        'H3 HT H5 HA',
        'CK C7 C8 C3',
        'SK SJ S4 SA',
        '- - - D5',
        '*',
      ],
    },
  },
] as Hand[];
