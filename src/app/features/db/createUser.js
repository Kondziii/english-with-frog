import { database } from '../../firebase';

//Register

export const createUser = (id) => {
    database.ref('/database/users/' + id).set({
        money: 0,
        frogstage: 1,
        chosenItems: {
            frogSkin: 1,
            background: 1,
            clothes: 0
        },
        items: {
            frogSkin: {
                1: 1,
                2: 0,
                3: 0
            },
            background: {
                1: 1,
                2: 0,
                3: 0
            },
            clothes: {
                1: 0,
                2: 0,
                3: 0
            }
        },
        learning: {
            animals: {
                fiszki: 0,
                dopasowywanie: 0,
                memory: 0,
                test: 0
            },
            body: {
                fiszki: 0,
                dopasowywanie: 0,
                memory: 0,
                test: 0
            },
            clothes: {
                fiszki: 0,
                dopasowywanie: 0,
                memory: 0,
                test: 0
            },
            colours: {
                fiszki: 0,
                dopasowywanie: 0,
                memory: 0,
                test: 0
            },
            family: {
                fiszki: 0,
                dopasowywanie: 0,
                memory: 0,
                test: 0
            },
            food: {
                fiszki: 0,
                dopasowywanie: 0,
                memory: 0,
                test: 0
            },
            furniture: {
                fiszki: 0,
                dopasowywanie: 0,
                memory: 0,
                test: 0
            },
            job: {
                fiszki: 0,
                dopasowywanie: 0,
                memory: 0,
                test: 0
            },
            school: {
                fiszki: 0,
                dopasowywanie: 0,
                memory: 0,
                test: 0
            },
            shop: {
                fiszki: 0,
                dopasowywanie: 0,
                memory: 0,
                test: 0
            },
            sport: {
                fiszki: 0,
                dopasowywanie: 0,
                memory: 0,
                test: 0
            },
            time: {
                fiszki: 0,
                dopasowywanie: 0,
                memory: 0,
                test: 0
            },
            weather: {
                fiszki: 0,
                dopasowywanie: 0,
                memory: 0,
                test: 0
            },
        }

    });
}
