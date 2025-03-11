'use client';

import { useEffect, useState } from 'react';

interface DDSInstance {
  _dds_init: () => void;
  allocateUTF8: (str: string) => number;
  _malloc: (size: number) => number;
  _do_dds_solve_board: (
    trump: number,
    first: number,
    second: number,
    third: number,
    fourth: number,
    deal_string_ptr: number,
    buf: number,
  ) => number;
  _do_dds_calc_dd_table: (deal_string_ptr: number, buf: number) => number;
  getValue: (ptr: number, type: 'i32' | 'i8' | 'i16' | 'i64') => number;
  _free: (ptr: number) => void;
}

export default function DDSComponent() {
  const [ddsInstance, setDDSInstance] = useState<DDSInstance | null>(null);

  useEffect(() => {
    async function loadWasm() {
      if (typeof window !== 'undefined') {
        setDDSInstance(
          await (
            await import('./dds.js')
          ).default({
            locateFile: () => '/dds.wasm',
          }),
        );
      }
    }

    loadWasm();
  }, []);

  function solveBoard() {
    if (ddsInstance) {
      ddsInstance._dds_init();
      const deal_string =
        'E:AQ.T964.AJ987.63 5.AKQ73.Q2.98742 9743.52.T54.AJT5 KJT862.J8.K63.KQ';
      const deal_string_ptr = ddsInstance.allocateUTF8(deal_string);

      const buf2 = ddsInstance._malloc(20 * 4);
      const response = ddsInstance._do_dds_calc_dd_table(deal_string_ptr, buf2);
      console.log('response', response);
      for (let i = 0; i < 20; i++) {
        console.log(ddsInstance.getValue(buf2 + i * 4, 'i32'));
      }

      ddsInstance._free(buf2);
      ddsInstance._free(deal_string_ptr);
    }
  }

  solveBoard();

  return (
    <>
      <div>DDS Loaded: {ddsInstance ? '✅' : '❌'}</div>
      {/*<div>{results}</div>*/}
    </>
  );
}

// const buf = ddsInstance._malloc(26 * 4);
// const num_nodes = ddsInstance._do_dds_solve_board(
//   14,
//   0,
//   -1,
//   -1,
//   -1,
//   deal_string_ptr,
//   buf,
// );

// console.log(num_nodes);
// for (let i = 0; i < 26; i++) {
//   console.log(ddsInstance.getValue(buf + i * 4, 'i32'));
// }

// ddsInstance._free(buf);
// ddsInstance._free(deal_string_ptr);

// const res = ddsInstance._SolveBoard();
// setResults(res);
