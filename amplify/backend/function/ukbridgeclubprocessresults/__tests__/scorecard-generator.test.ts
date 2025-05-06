import * as fs from 'fs';
import * as path from 'path';
import { loadPBN } from '../lib/pbn/pbnConverter';
import { PBNHand } from '../lib/pbn/model';
import { loadUsebio } from '../lib/usebio/usebioConverter';
import { cases } from './constants';
import { generateScoreCards } from '../lib/scorecard/scorecards-generator';
import { ScoreCard } from '../lib/scorecard/model';

describe('Score Card Generator', () => {
  test.each(cases)(
    'should generate score cards from "%s"\'',
    async (folder) => {
      const usebioFilePath = path.resolve(
        __dirname,
        `payloads/${folder}/usebio.xml`,
      );
      const usebio = fs.readFileSync(usebioFilePath, 'utf-8');
      const usebioFile = await loadUsebio(usebio);

      let pbnFile: PBNHand[] | null = null;

      const pbnFilePath = path.resolve(
        __dirname,
        `payloads/${folder}/hands.pbn`,
      );

      if (fs.existsSync(pbnFilePath)) {
        const pbn = fs.readFileSync(pbnFilePath, 'utf-8');
        pbnFile = loadPBN(pbn);
      }

      const scoreCards = generateScoreCards(usebioFile, pbnFile);
      const scoreCardsJson: ScoreCard[] = JSON.parse(
        fs.readFileSync(
          path.resolve(__dirname, `payloads/${folder}/scorecard.json`),
          'utf-8',
        ),
      );

      expect(scoreCards).toMatchObject(scoreCardsJson);
    },
  );
});
