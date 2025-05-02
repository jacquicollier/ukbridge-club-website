import * as fs from 'fs';
import * as path from 'path';
import { loadPBN } from '../lib/pbn/pbnConverter';
import { PBNHand } from '../lib/pbn/model';
import { loadUsebio } from '../lib/usebio/usebioConverter';
import { Contestant } from 'shared/contestants/contestant';
import { cases } from './constants';
import { generateTravellers } from '../lib/travellers/travellers-generator';

describe('Travellers Generator', () => {
  test.each(cases)('should generate travellers from "%s"\'', async (folder) => {
    const usebioFilePath = path.resolve(
      __dirname,
      `payloads/${folder}/usebio.xml`,
    );
    const usebio = fs.readFileSync(usebioFilePath, 'utf-8');
    const usebioFile = await loadUsebio(usebio);

    let pbnFile: PBNHand[] | null = null;

    const pbnFilePath = path.resolve(__dirname, `payloads/${folder}/hands.pbn`);

    if (fs.existsSync(pbnFilePath)) {
      const pbn = fs.readFileSync(pbnFilePath, 'utf-8');
      pbnFile = loadPBN(pbn);
    }

    const travellers = generateTravellers(usebioFile, pbnFile);
    const travellersJson: Contestant[] = JSON.parse(
      fs.readFileSync(
        path.resolve(__dirname, `payloads/${folder}/travellers.json`),
        'utf-8',
      ),
    );

    expect(travellers).toMatchObject(travellersJson);
  });
});
