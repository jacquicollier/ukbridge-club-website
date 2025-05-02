import * as fs from 'fs';
import * as path from 'path';
import { loadPBN } from '../lib/pbn/pbnConverter';
import { PBNHand } from '../lib/pbn/model';
import { loadUsebio } from '../lib/usebio/usebioConverter';
import { Contestant } from 'shared/contestants/contestant';
import { generateContestants } from '../lib/contestants/contestants-generator';
import { cases } from './constants';

describe('Contestants Generator', () => {
  test.each(cases)(
    'should generate contestants from "%s"\'',
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

      const contestants = generateContestants(usebioFile, pbnFile);
      const contestantsJson: Contestant[] = JSON.parse(
        fs.readFileSync(
          path.resolve(__dirname, `payloads/${folder}/contestants.json`),
          'utf-8',
        ),
      );

      expect(contestants).toMatchObject(contestantsJson);
    },
  );
});
