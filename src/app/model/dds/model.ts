export interface DDSInstance {
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
