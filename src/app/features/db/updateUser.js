import firebase from '../../firebase'
import { database } from '../../firebase';

//użycie addMoney i updateLearning- matching

const updateMoney = (id, val) => {
    database.ref('/database/users/' + id + '/money').set(val);
}

const updateFrogstage = (id, val) => {
    database.ref('/database/users/' + id + '/frogstate').set(val);
}

const updateItems = (id, item, val) => {
    database.ref('/database/users/' + id + '/items/' + item).set(val);
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

export { updateMoney, updateFrogstage, updateItems, updateLearning, addMoney, upgradeFrogOnce };