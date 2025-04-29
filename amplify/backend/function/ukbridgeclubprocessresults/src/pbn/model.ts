import * as yup from 'yup';

export const valueAndDetailsSchema = yup.object().shape({
  value: yup.string().required(),

  details: yup
    .array()
    .of(yup.string().required())
    .required('Details are required')
    .min(1, 'At least one detail is required'),
});

const handSchema = yup.object().shape({
  // Fields mandatory for export

  // the name of the tournament or match
  event: yup.string(),

  // the location of the event
  site: yup.string(),

  // the starting date of the game
  date: yup.string(), // "1997.06.22"

  // the board number
  board: yup.string().required(),

  // the west player
  west: yup.string(),

  // the north player
  north: yup.string(),

  // the east player
  east: yup.string(),

  // the south player
  south: yup.string(),

  // the dealer
  dealer: yup.string().required(),

  // the situation of vulnerability
  vulnerable: yup.string().required(), // None, Love, -, NS, EW, All, Both,

  // the dealt cards
  // [Deal "W:KQT2.AT.J6542.85 - A8654.KQ5.T.QJT6 -"] (only EW hands given)
  // [Deal: N:KJ93.J4.A98.Q764 T6.QT3.KJT654.T2 AQ875.962.7.AJ85 42.AK875.Q32.K93]
  deal: yup.string().required(),

  // the scoring method
  scoring: yup.string(),

  // the declarer of the contract ^W (if irregular declarer - e.g., opening lead out of turn) or W
  declarer: yup.string().required(),

  // the contract
  // Pass, 5CX
  contract: yup.string().required(),

  // the result of the game
  // Empty string for pass out,  No., tricks, e.g., "9" or "EW 9" or "EW 9 NS 4"
  // May start with "^"
  result: yup.string().required(),

  // Optional fields
  // AP (all pass), 1NT (bid), Pass, X, XX
  // Suffix:
  // !  good call, ?  poor call, !!  very good call, ??  very poor call, !?  speculative call, ?!  questionable call
  // =1= - note token (for alerts etc.,)
  auction: valueAndDetailsSchema,

  play: valueAndDetailsSchema,

  room: yup.string(),

  score: yup.string(),

  scoreimp: yup.string(),

  homeTeam: yup.string(),

  round: yup.string(),

  section: yup.string(),

  table: yup.string(),

  visitTeam: yup.string(),

  scoretable: valueAndDetailsSchema,
});

export const pbnSchema = yup.object().shape({
  hands: yup.array().of(handSchema.required()),
});

export type PBNFile = yup.InferType<typeof pbnSchema>;
