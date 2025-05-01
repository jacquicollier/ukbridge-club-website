import { UsebioFile } from './model';
import { parseStringPromise } from 'xml2js';

export async function loadUsebio(fileContents: string): Promise<UsebioFile> {
  return (await parseStringPromise(fileContents, {
    explicitArray: false,
  })) as UsebioFile;
}
