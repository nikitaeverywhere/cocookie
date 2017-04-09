/**
 * Simple and clean JS ES6 cookie management package.
 * @author ZitRo [zitros.tk]
 */

/**
 * @typedef {Object} cookieAttributes
 * @property {string} [domain]
 * @property {Date} [expires]
 * @property {number} [maxAge]
 * @property {string} [path]
 * @property {boolean} [secure]
 */

/**
 * @type {RegExp}
 */
const cookieSearchRegEx = /(?:;|^)\s?([^=]+)=([^;]*)/g;

/**
 * @param {string} name
 * @constructor
 */
function CookieCtrl (name) {
    this.name = name;
}

/**
 * Set the cookie value and its options (optional).
 * @param {string|*} value
 * @param {cookieAttributes} [options]
 */
CookieCtrl.prototype.set = function (value, options = {}) {
    return this.update(options, value);
};

/**
 * Update existing cookie, use for your convenience. Works as same as set function, but provides a
 * way to avoid passing value. If no cookie is set, nothing will be updated.
 * @param {cookieAttributes} options
 * @param {string|*} [value]
 * @returns {string|null} - Assigned cookie or null if no cookies were updated.
 */
CookieCtrl.prototype.update = function (options = {}, value) {
    if (typeof value === "undefined" && typeof (value = this.get()) === "undefined") return null;
    return document.cookie = `${ this.name }=${
        encodeURIComponent(value)
           .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent)
    }` + cookiePartFromAttributes(options);
};

/**
 * Returns the cookie value.
 * @returns {*}
 */
CookieCtrl.prototype.get = function () {
    const cookie = document.cookie;
    let   res;
    cookieSearchRegEx.lastIndex = 0;
    while (res = cookieSearchRegEx.exec(cookie))
        if (res[1] === this.name)
            return decodeURIComponent(res[2]);
    return undefined;
};

/**
 * Delete (expire) the cookie optionally with the known options.
 * @param {cookieAttributes} attributes
 */
CookieCtrl.prototype.delete = function (attributes = {}) {
    return document.cookie = `${ this.name }=`
        + cookiePartFromAttributes(Object.assign(attributes, {
            expires: new Date(0)
        }));
};

/**
 * Returns cookie part beginning with ";" from options object.
 * @param {cookieAttributes} attributes
 */
let cookiePartFromAttributes = (attributes) =>
    (attributes.domain ? `;domain=${ attributes.domain }` : ``)
    + (attributes.expires ? `;expires=${ attributes.expires instanceof Date 
        ? attributes.expires.toUTCString() : attributes.expires }` : ``)
    + (attributes.maxAge ? `;max-age=${ attributes.maxAge }` : ``)
    + (attributes.path ? `;path=${ attributes.path }` : ``)
    + (attributes.secure ? `;secure=${ attributes.secure }` : ``);

/**
 * @param name - Cookie name
 * @return {CookieCtrl}
 */
export default function (name) {
    return new CookieCtrl(
        name.toString()
            .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent) // allowed characters
            .replace(/[()]/g, c => c === "(" ? "%28" : "%29") // additional replace
    );
}

/**
 * Return array of all the cookie names defined.
 * @returns {string[]}
 */
export const cookies = () => {
    const cookie = document.cookie,
          list = [];
    let   res;
    cookieSearchRegEx.lastIndex = 0;
    while (res = cookieSearchRegEx.exec(cookie))
        list.push(res[1]);
    return list;
};
