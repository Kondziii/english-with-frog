import { database } from '../../firebase';

//Register

export const createUser = (id) => {
    database.ref('/database/users/' + id).set({
        money: 0,
        frogstage: 1,
        items: {
            item1: 0,
            item2: 0
        },
        tests: {
            animals: 0,
            body: 0,
            clothes: 0,
            colours: 0,
            family: 0,
            food: 0,
            furniture: 0,
            job: 0,
            school: 0,
            shop: 0,
            sport: 0,
            time: 0,
            weather: 0
        },
        learning: {
            animals: {
                fiszki: 0,
                dopasowywanie: 0,
                memory: 0
            },
            body: {
                fiszki: 0,
                dopasowywanie: 0,
                memory: 0
            },
            clothes: {
                fiszki: 0,
                dopasowywanie: 0,
                memory: 0
            },
            colours: {
                fiszki: 0,
                dopasowywanie: 0,
                memory: 0
            },
            family: {
                fiszki: 0,
                dopasowywanie: 0,
                memory: 0
            },
            food: {
                fiszki: 0,
                dopasowywanie: 0,
                memory: 0
            },
            furniture: {
                fiszki: 0,
                dopasowywanie: 0,
                memory: 0
            },
            job: {
                fiszki: 0,
                dopasowywanie: 0,
                memory: 0
            },
            school: {
                fiszki: 0,
                dopasowywanie: 0,
                memory: 0
            },
            shop: {
                fiszki: 0,
                dopasowywanie: 0,
                memory: 0
            },
            sport: {
                fiszki: 0,
                dopasowywanie: 0,
                memory: 0
            },
            time: {
                fiszki: 0,
                dopasowywanie: 0,
                memory: 0
            },
            weather: {
                fiszki: 0,
                dopasowywanie: 0,
                memory: 0
            },
        }

    });
}
