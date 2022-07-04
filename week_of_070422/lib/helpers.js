

module.exports = {
    titlize: inputStr => {
        return inputStr.split(" ").map(word => {
            let output = word.charAt(0).toUpperCase();
            if(word.length > 1) {
                output += word.substring(1);
            }
            return output;
        })
        .join(" ");
    }
}