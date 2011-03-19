;(function (window) {

  var
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    fromCharCode = String.fromCharCode;

  window.Base64 = {
    encode: function (string) {
      var
        a, b, b1, b2, b3, b4, c,
        i = 0,
        len = string.length,
        result = '';

      do {
        a = string.charCodeAt(i++) || 0;
        b = string.charCodeAt(i++) || 0;
        c = string.charCodeAt(i++) || 0;

        b1 = (a >> 2) & 0x3F;
        b2 = ((a & 0x3) << 4) | ((b >> 4) & 0xF);
        b3 = ((b & 0xF) << 2) | ((c >> 6) & 0x3);
        b4 = c & 0x3F;

        if (!b) {
          b3 = b4 = 64;
        } else if (!c) {
          b4 = 64;
        }

        result += characters.charAt(b1) + characters.charAt(b2) + characters.charAt(b3) + characters.charAt(b4);

      } while (i < len);

      return result;
    },

    decode: function (string) {
      var
        a, b, b1, b2, b3, b4, c,
        i = 0,
        len = string.length,
        result = '';

      do {
        b1 = characters.indexOf(string.charAt(i++));
        b2 = characters.indexOf(string.charAt(i++));
        b3 = characters.indexOf(string.charAt(i++));
        b4 = characters.indexOf(string.charAt(i++));

        a = ((b1 & 0x3F) << 2) | ((b2 >> 4) & 0x3);
        b = ((b2 & 0xF) << 4) | ((b3 >> 2) & 0xF);
        c = ((b3 & 0x3) << 6) | (b4 & 0x3F);

        result += fromCharCode(a) + (b?fromCharCode(b):'') + (c?fromCharCode(c):'');

      } while (i < len);

      return result;
    }
  };

}(this));
