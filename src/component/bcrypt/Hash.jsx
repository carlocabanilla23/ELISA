const Hash = ({curSaltedPassword}) => {
    var binaryStringSize = 8; //0x12345678
    var K = new Array(0xbcf38a9a, 0x0311503e, 0x5165ab5a, 0x758fc067, 0xb1c66749, 0x01494cc6, 0x8af6de69, 0x1ad25b4a, 0x7b15dc49, 0xb88eace7, 0xf2457654, 0x68a8d951, 0xe9946dde, 0xcaa51346, 0x8c86b169, 0x12b3caea, 0x64766460, 0xb5194864, 0x1759575d, 0x93605031, 0x57e91da2, 0x64685908, 0xd72f43d4, 0x46ef1348, 0x42986f7c, 0x21ded24f, 0x6c5e8a0a, 0x359266e1, 0xb8126ead, 0x86257154, 0x71503e0f, 0x504242d8, 0xfd963d7f, 0x08a96735, 0x47b941aa, 0x7415bc19, 0xed96523d, 0xaf66613e, 0x3aa2b769, 0xd4f3ce4e, 0xed5713e9, 0x36ae83c0, 0xd1f5bfe3, 0x672f92e7, 0xe2477413, 0xb2141273, 0x44855f70, 0xf3d5f7e2, 0xb8597006, 0x33c15af7, 0x966f9e25, 0xbe6bc84f, 0xb805aab9, 0x69465dff, 0x6a1afce4, 0x7afc8d89, 0xec66a1ad, 0x7650c778, 0x1a9e7c66, 0xe1b26119, 0x99e39c98, 0x4c7d2b6c, 0x890b8635, 0xc2358b05);
    var core_hashed = new Array(0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19);
    var hashedList = new Array(64);
    var a, b, c, d, e, f, g, h, T1, T2;

    // generateNum will create a new decimal from two given numbers.
    const generateNum = (x, y) => {
        var left = (x & 0xFFFF) + (y & 0xFFFF);
        var right = (x >> 16) + (y >> 16) + (left >> 16);
        return (right << 16) | (left & 0xFFFF);
    }
    const S = (x, n) => {return (x >>> n) | (x << (32-n));}
    const R = (x, n) => {return (x >>> n);}
    const Ch = (x,y,z) => {return ((x & y) ^ (~x & z));}
    const Maj = (x,y,z) => {return ((x & y) ^ (x & z) ^ (y & z));}

    const Sigma1 = (x) => {return (S(x, 2) ^ S(x, 13) ^ S(x,22));}
    const Sigma2 = (x) => {return (S(x, 6) ^ S(x, 11) ^ S(x,25));}
    const Gamma1 = (x) => {return (S(x, 7) ^ S(x, 18) ^ R(x,3));}
    const Gamma2 = (x) => {return (S(x, 17) ^ S(x, 19) ^ R(x,10));}

    const hashing = (binaryList, stringLength) => {
        binaryList[stringLength >> 5] |= 0x80 << (24 - stringLength % 32);
        binaryList[((stringLength + 64 >> 9) << 4) + 15] = stringLength;

        for(var i = 0; i < binaryList.length; i+=16){
            var a = core_hashed[0];
            var b = core_hashed[1];
            var c = core_hashed[2];
            var d = core_hashed[3];
            var e = core_hashed[4];
            var f = core_hashed[5];
            var g = core_hashed[6];
            var h = core_hashed[7];

            for(var j = 0; j < 64; j++){
                if(j < 16){
                    hashedList[j] = binaryList[j + i];
                }else{
                    hashedList[j] = generateNum(generateNum(generateNum(Gamma2(hashedList[j - 2]), hashedList[j - 7]), Gamma1(hashedList[j - 15])), hashedList[j - 16])
                }

                T1 = generateNum(generateNum(generateNum(generateNum(h, Sigma2(e)), Ch(e, f, g)), K[j]), hashedList[j]);
                T2 = generateNum(Sigma1(a), Maj(a, b, c));
                h = g;
                g = f;
                f = e;
                e = generateNum(d, T1);
                d = c;
                c = b;
                b = a;
                a = generateNum(T1, T2);
            }
            core_hashed[0] = generateNum(a, core_hashed[0]);
            core_hashed[1] = generateNum(b, core_hashed[1]);
            core_hashed[2] = generateNum(c, core_hashed[2]);
            core_hashed[3] = generateNum(d, core_hashed[3]);
            core_hashed[4] = generateNum(e, core_hashed[4]);
            core_hashed[5] = generateNum(f, core_hashed[5]);
            core_hashed[6] = generateNum(g, core_hashed[6]);
            core_hashed[7] = generateNum(h, core_hashed[7]);
        }
        return core_hashed;
    }
    /* 
        convert the given string to binary string and store them in an array
        the array will store a list of binary string from the sum of 4 characters (32 bits)
    */
    const convertToBinary = (input) => {
        var binaryString = new Array();
        var mask = 0xFF; //8 bits
        for(var i = 0; i < input.length * binaryStringSize; i += binaryStringSize){
            binaryString[i >> 5] |= (input.charCodeAt(i / binaryStringSize) & mask) << (24 - i % 32);
        }
        return binaryString;
    }
    const convertToEncrypted = (binaryList) => {
        var hex_tab = '0123456789abcdef';
        var str = '';
        for(var i = 0; i < binaryList.length * 4; i++){
            str += hex_tab.charAt((binaryList[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +
            hex_tab.charAt((binaryList[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
        }
        return str;
    }
    return convertToEncrypted(hashing(convertToBinary(curSaltedPassword), curSaltedPassword.length + binaryStringSize));
}

export default Hash;