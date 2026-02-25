import {
  type as type__1102, stdNetSend as stdNetSend_1100, panic as panic_1108
} from "@temperlang/core";
export class NetRequest extends type__1102() {
  /** @type {string} */
  #url_1091;
  /** @type {string} */
  #method_1092;
  /** @type {string | null} */
  #bodyContent_1093;
  /** @type {string | null} */
  #bodyMimeType_1094;
  /**
   * @param {string} content_1096
   * @param {string} mimeType_1097
   */
  post(content_1096, mimeType_1097) {
    this.#method_1092 = "POST";
    this.#bodyContent_1093 = content_1096;
    let t_1098 = this.#bodyMimeType_1094;
    this.#bodyMimeType_1094 = t_1098;
    return;
  }
  /** @returns {globalThis.Promise<NetResponse>} */
  send() {
    return stdNetSend_1100(this.#url_1091, this.#method_1092, this.#bodyContent_1093, this.#bodyMimeType_1094);
  }
  /** @param {string} url_1101 */
  constructor(url_1101) {
    super ();
    this.#url_1091 = url_1101;
    this.#method_1092 = "GET";
    this.#bodyContent_1093 = null;
    this.#bodyMimeType_1094 = null;
    return;
  }
};
export class NetResponse extends type__1102() {
};
/**
 * @param {string} url_1104
 * @param {string} method_1105
 * @param {string | null} bodyContent_1106
 * @param {string | null} bodyMimeType_1107
 * @returns {globalThis.Promise<NetResponse>}
 */
function sendRequest_1103(url_1104, method_1105, bodyContent_1106, bodyMimeType_1107) {
  return panic_1108();
}
