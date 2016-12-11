'use strict';


const CryptoJS = require("crypto-js");
const encrypt = (str, key) => CryptoJS.AES.encrypt(str, key).toString();
const decrypt = (str, key) => CryptoJS.AES.decrypt(str, key).toString(CryptoJS.enc.Utf8);

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

const getUrl = (sourcePerson, encDestPerson, key) => `https://pavelgit.github.io/secret-santa/?sourcePerson=${encodeURIComponent(sourcePerson)}&encDestPerson=${encodeURIComponent(encDestPerson)}&key=${encodeURIComponent(key)}`;
for (const sourcePerson of Object.keys(dest)) {	
	const destPerson = dest[sourcePerson];
	const key = ''+Math.floor(Math.random()*10000000);
	const encDestPerson = encrypt(destPerson, key);
	const url = getUrl(sourcePerson, encDestPerson, key);
	console.log(url);
}
