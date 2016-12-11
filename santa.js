'use strict';

function utf8_to_b64(str) {
    return new Buffer(str).toString('base64');
}

function b64_to_utf8(str) {
    return new Buffer(str, 'base64').toString('utf8');
}

const encrypt = (str) => utf8_to_b64(str).replace(/\w/g, w => w + (Math.random()<0.8 ? Math.floor(Math.random()*1000000) : ''));
const decrypt = (str) => b64_to_utf8(str);

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

const getUrl = (sourcePerson, encDestPerson) => `https://pavelgit.github.io/secret-santa/?sourcePerson=${sourcePerson}&encDestPerson=${encodeURIComponent(encDestPerson)}`;
for (const sourcePerson of Object.keys(dest)) {	
	const destPerson = dest[sourcePerson];
	const encDestPerson = encrypt(destPerson);
	const url = getUrl(sourcePerson, encDestPerson);
	console.log(url);
}
