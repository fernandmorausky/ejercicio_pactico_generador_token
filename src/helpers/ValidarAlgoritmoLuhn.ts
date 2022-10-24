export default class ValidarAlgoritmoLuhn {
    validar = (value: string) => {
        // accept only digits, dashes or spaces
        if (/[^0-9-\s]+/.test(value)) return false;
        // The Luhn Algorithm. It's so pretty.
        let nCheck = 0;
        let bEven = false;
        value = value.toString().replace(/\D/g, "");
        for (let n = value.length - 1; n >= 0; n--) {
            let cDigit = value.charAt(n);
            let nDigit = parseInt(cDigit, 10);
            if (bEven) {
                if ((nDigit *= 2) > 9) nDigit -= 9;
            }
            nCheck += nDigit;
            bEven = !bEven;
        }
        const isCardValid = (nCheck % 10) == 0;
        return isCardValid;
    };
};
