import Vue from 'vue'

export default async (context, inject) => {
    Vue.filter('truncate', (value, max = 10) => {
        let words = value.split(" ");
        if (words.length > max) {
            let str = [];
            while (max) {
                str.push(words.shift())
                max--
            }
            str.push('...');
            return str.join(" ");
        }

        return value;
    })
}
