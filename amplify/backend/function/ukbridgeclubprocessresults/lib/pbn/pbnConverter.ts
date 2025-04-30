type Field = { value: string; details?: string[] };

export function convertPBNToJSON(inputString: string): string {
  const dataMap: Record<string, Field>[] = [];
  let currentDataMap: Record<string, Field> = {};
  let currentHeading: string | null = null;
  let insideCurlyBrackets = false; // Track whether we are inside { ... } blocks

  inputString.split(/\r?\n/).forEach((line) => {
    line = line.trim();

    // Handle start of a curly bracket block
    if (line.startsWith('{')) {
      insideCurlyBrackets = true;
      return; // Ignore this line
    }

    // Handle end of a curly bracket block
    if (line.endsWith('}')) {
      insideCurlyBrackets = false;
      return; // Ignore this line
    }

    // If inside { ... } block, ignore all lines
    if (insideCurlyBrackets) return;

    if (line === '') {
      // If an empty line is encountered, store the current object and reset
      if (Object.keys(currentDataMap).length > 0) {
        dataMap.push({ ...currentDataMap });
        currentDataMap = {};
      }
    } else if (line.startsWith('[')) {
      // Heading line in PBN format
      const match = line.match(/^\[([^\s]+)\s+"(.*)"\]$/);
      if (match) {
        const key = match[1].toLowerCase(); // Convert to lowercase for consistency
        const value = match[2];

        currentHeading = key;
        currentDataMap[key] = { value };
      }
    } else if (currentHeading) {
      // Additional data for the last heading
      if (currentDataMap[currentHeading]) {
        const existingField = currentDataMap[currentHeading];
        currentDataMap[currentHeading] = {
          ...existingField,
          details: [...(existingField.details || []), line],
        };
      }
    }
  });

  // Ensure the last set of data is added
  if (Object.keys(currentDataMap).length > 0) {
    dataMap.push(currentDataMap);
  }

  // Convert the dataMap to the desired output format
  const finalMap = dataMap.map((entry) => {
    const mappedEntry: { [key: string]: string | Field } = {};
    Object.keys(entry).forEach((key) => {
      const field = entry[key];
      if (!field.details || field.details.length === 0) {
        mappedEntry[key] = field.value; // If no details, just use the value
      } else {
        mappedEntry[key] = field; // If there are details, keep the entire field
      }
    });
    return mappedEntry;
  });

  // Convert the final map to a JSON string
  return JSON.stringify(finalMap, null, 2);
}
