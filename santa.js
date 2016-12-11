'use strict';


const CryptoJS = require("crypto-js");
const key = 'our santa';

const encrypt = str => CryptoJS.AES.encrypt(str, key).toString();
const decrypt = str => CryptoJS.AES.decrypt(str, key).toString(CryptoJS.enc.Utf8);

const people = ['Паша', 'Даша', 'Динар', 'Вика', 'Игорь', 'Ринат', 'Андрей'];
const families = [['Паша', 'Даша', 'Андрей'], ['Динар', 'Вика', 'Ринат'], ['Игорь']];

const removeElement = (array, element) => array.splice(array.indexOf(element), 1);

const getRandomElement = items => items[Math.floor(Math.random()*items.length)];

const createRandomDest = (people) => {
	const dest = {};
	const sourcePersons = [...people];
	const destPersons = [...people];
	while(destPersons.length > 0) {
		const sourcePerson = getRandomElement(sourcePersons);
		const destPerson = getRandomElement(destPersons);
		dest[sourcePerson] = destPerson;
		removeElement(sourcePersons, sourcePerson);
		removeElement(destPersons, destPerson);
	}
	return dest;
};

const destIsGood = (dest, families) => {
	const thereIsBadDest = Object.keys(dest).some(sourcePerson => 
		families.some(family => family.indexOf(sourcePerson)>=0 && family.indexOf(dest[sourcePerson])>=0 ));
	return !thereIsBadDest;
};

const createGoodDest = (people, families) => {
	for (;;) {
		const dest = createRandomDest(people);
		if (destIsGood(dest, families)) {
			return dest;
		}
	}
};

const dest = createGoodDest(people, families);

const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '0x6fwhite@gmail.com',
    pass: 'kIm8B_g1b3gmyzmpfp'
  }
});

//console.log(dest);

async function sendMail() { 
	try {
		await transport.sendMail({
		    from: '0x6fwhite@gmail.com',
		    to: '0x6fwhite@gmail.com',
		    subject: 'Секретный Дед Мороз',
		    text: 'привет, как дела'
		});
	} catch (e) {
		console.log(e);
	}
}

sendMail();

/*for (const sourcePerson of Object.keys(dest)) {
	const destPerson = dest[sourcePerson];
	const text = `${sourcePerson} дарит подарок ${destPerson}`;
	const mailData = {
	    from: '0x6fwhite@gmail.com',
	    to: '0x6fwhite@gmail.com',
	    subject: 'Secret Santa',
	    text: text
	};
	transport.sendMail(mailData);
}*/