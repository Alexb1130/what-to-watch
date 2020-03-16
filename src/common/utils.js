
export default class Utils {
    static getRandomBoolean(chance = 0.5) {
        return Math.random() > chance;
    }

    static generateRandomInt(min, max) {
        const length = max - min + 1;
        return Math.floor(Math.random() * length + min);
    }

    static getRandomIndexArr(arr) {
        return this.generateRandomInt(0, arr.length - 1);
    }

    static getRandomElementArr(arr) {
        return arr[this.getRandomIndexArr(arr)];
    }

    static generateId(id = ``) {
        return `${id}-${(~~(Math.random() * 1e8)).toString(16)}`;
    }
}