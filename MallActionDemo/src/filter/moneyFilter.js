export function toMoney(money) {
    let newMoney = money;
    if (money) {
        newMoney = money;
    } else {
        newMoney = 0;
    }

    newMoney = newMoney.toFixed(2);
    return newMoney;
}