import firebase from '../../firebase'
import { database } from '../../firebase';

//użycie addMoney i updateLearning- matching

const updateMoney = (id, val) => {
    database.ref('/database/users/' + id + '/money').set(val);
}

const updateFrogstageDB = (id, val) => {
    database.ref('/database/users/' + id + '/frogstage').set(val);
}

const updateItems = (id, itemType, item, val) => {
    database.ref('/database/users/' + id + '/items/' + itemType + '/' + item).set(val);
}


const updateLearning = (id, unit, type, val) => {
    database.ref('/database/users/' + id + '/learning/' + unit + '/' + type).set(val);
}

const addMoney = (id, val) => {
    database.ref('/database/users/' + id + '/money')
    .set(firebase.database.ServerValue.increment(val));
}

const upgradeFrogOnce = (id) => {
    database.ref('/database/users/' + id + '/money')
    .set(firebase.database.ServerValue.increment(1));
}

export { updateMoney, updateFrogstageDB, updateItems, updateLearning, addMoney, upgradeFrogOnce };