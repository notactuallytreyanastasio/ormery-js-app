import {
  stringBuilderAppendCodePoint as stringBuilderAppendCodePoint_355
} from "@temperlang/core";
/**
 * @param {number} n_351
 * @param {globalThis.Array<string>} sb_352
 */
function appendHex_350(n_351, sb_352) {
  let t_353;
  const i_354 = n_351 & 15;
  try {
    if (i_354 < 10) {
      t_353 = 48;
    } else {
      t_353 = 87;
    }
    stringBuilderAppendCodePoint_355(sb_352, i_354 + t_353 | 0);
  } catch {
    throw Error();
  }
  return;
}
/**
 * @param {number} octet_356
 * @param {globalThis.Array<string>} sb_357
 */
export function percentEscapeOctetTo(octet_356, sb_357) {
  sb_357[0] += "%";
  let t_358 = (octet_356 & 255) / 16 | 0;
  appendHex_350(t_358, sb_357);
  let t_359 = octet_356 & 15;
  appendHex_350(t_359, sb_357);
  return;
};
