/**
 * @returns {string}
 */
export function UnicodeArrayRc4DecodeNodeTemplate (): string {
    return `
        if (!{unicodeArrayCallsWrapperName}.atobPolyfillAppended) {            
            {atobPolyfill}
            
            {unicodeArrayCallsWrapperName}.atobPolyfillAppended = true;
        }
        
        if (!{unicodeArrayCallsWrapperName}.rc4) {            
            {rc4Polyfill}
            
            {unicodeArrayCallsWrapperName}.rc4 = rc4;
        }
                        
        if (!{unicodeArrayCallsWrapperName}.data) {
            {unicodeArrayCallsWrapperName}.data = {};
        }

        if ({unicodeArrayCallsWrapperName}.data[index] === undefined) {
            var base64DecodeUnicode = function (str) {
                var string = atob(str);
                var newStringChars = [];
                
                for (var i = 0, length = string.length; i < length; i++) {
                    newStringChars += '%' + ('00' + string.charCodeAt(i).toString(16)).slice(-2);
                }
                
                return decodeURIComponent(newStringChars);
            }

            {selfDefendingCode}
            
            value = {unicodeArrayCallsWrapperName}.rc4(base64DecodeUnicode(value), key);
            {unicodeArrayCallsWrapperName}.data[index] = value;
        } else {
            value = {unicodeArrayCallsWrapperName}.data[index];
        }
    `;
}