/*
 * Title: Card Distribution App
 * Details:  ‘City Bank’ is planning gifts for the newly registered credit user on this International Mother Language Day from 21 February to 28 February. They need to distribute the card to their user. You need to help to generate their card number and gift.
 * Author: Mehedi Hasan Sarkar
 * Date: 08-Feb-2022
 */

// generate serial number
function generateSerial(users) {
    const serial = [];

    for (let index in users) {
        let num = Number(index) + 1;
        serial.push((num + "").padStart(6, "0"));
    }

    return serial;
}

// sort data alphabetically with fist characters. (priority number should give priority)
function sortDataAlphabetically(data) {
    const tempData = [];
    for (const user of data) {
        const obj = { ...user, cardNumber: user.cardNumber[0] };
        tempData.push(obj);
    }
}

// making serial number based on user information
function generateCardNumber(users) {
    let cardNumber = "";

    // checking the district data add add to the serial
    if (typeof users.district === "string") {
        cardNumber += users.district.slice(0, 2).toUpperCase();
    } else {
        cardNumber += "__";
    }

    // adding last two digit of current year to serial
    let currentYear = users.currentYear + "";
    currentYear = currentYear.slice(-2);
    cardNumber += currentYear;

    // adding first two digit of postal number to serial
    let postNo = users.postNo + "";
    postNo = postNo.slice(0, 2);
    cardNumber += postNo;

    // adding four digit of birth year to serial
    let birthYear = users.birthYear + "";

    if (birthYear.length === 4) {
        cardNumber += birthYear;
    } else if (birthYear.length === 2) {
        cardNumber += "00" + birthYear;
    } else {
        cardNumber += "____";
    }

    birthYear = birthYear.slice(0, 2);

    return cardNumber;
}

function sortArr(arr) {
    return arr.sort((a, b) => {
        if (a.cardNumber[0] < b.cardNumber[0]) {
            return -1;
        }
        if (a.cardNumber[0] > b.cardNumber[0]) {
            return 1;
        }
        return 1;
    });
}

//

function sortByAlphabetAndPriority(arr) {
    const priority1 = [];
    const result = [];

    for (const d of arr) {
        if (d.priority === 1) priority1.push(d);
    }

    const priority2 = [];
    for (const d of arr) {
        if (d.priority !== 1) priority2.push(d);
    }

    result.push(...sortArr(priority1));
    result.push(...sortArr(priority2));

    return result;
}

// generate new user card number and gift
function cardDistribution(userArr) {
    const data = userArr;
    let output = [];

    const serial = generateSerial(userArr);

    for (const index in data) {
        const generatingData = {};

        generatingData.cardNumber =
            generateCardNumber(userArr[index]) + serial[index];

        // create gift
        console.log(serial[index]);
        const lastChar = (serial[index] + "").charAt(serial[index].length - 1);
        generatingData.gift = Number(lastChar) % 2 === 0 ? "R" : "W";

        generatingData.priority = userArr[index].priority;

        output.push(generatingData);
    }

    return sortByAlphabetAndPriority(output);
}
