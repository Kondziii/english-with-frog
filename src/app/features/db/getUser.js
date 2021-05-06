// import { useState, useEffect } from 'react';
import { database } from '../../firebase';

//pierwsze i ostatnie sprawdzone w praktyce: wywołanie GetMoney - userPanel, wywołanie GetLearning - matching

export const getUserInfo = async (id) => {
  return database
    .ref('/database/users/' + id)
    .once('value')
    .then((snap) => {
      return snap.val();
    });
};

// const GetMoney = (id) => {
//   const [state, setState] = useState(0);
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       database
//         .ref('/database/users/' + id + '/money')
//         .get()
//         .then((snapshot) => {
//           setState(snapshot.val());
//         });
//     }, 1000);
//     return () => clearInterval(intervalId);
//   }, [[], useState]);
//   useEffect(() => () => console.log('unmount'), []);
//   return state;
// };

// const GetFrogstage = (id) => {
//   const [state, setState] = useState(0);
//   useEffect(() => {
//     database
//       .ref('/database/users/' + id + '/frogstate')
//       .get()
//       .then((snapshot) => {
//         setState(snapshot.val());
//       });
//   }, [[], useState]);
//   return state;
// };

// const GetItems = (id, item) => {
//   const [state, setState] = useState(0);
//   useEffect(() => {
//     database
//       .ref('/database/users/' + id + '/items/' + item)
//       .get()
//       .then((snapshot) => {
//         setState(snapshot.val());
//       });
//   }, [[], useState]);
//   return state;
// };

// const GetTests = (id, unit) => {
//   const [state, setState] = useState(0);
//   useEffect(() => {
//     database
//       .ref('/database/users/' + id + '/tests/' + unit)
//       .get()
//       .then((snapshot) => {
//         setState(snapshot.val());
//       });
//   }, [[], useState]);
//   return state;
// };

// const GetLearning = (id, unit, type) => {
//   const [state, setState] = useState(0);
//   useEffect(() => {
//     database
//       .ref('/database/users/' + id + '/learning/' + unit + '/' + type)
//       .get()
//       .then((snapshot) => {
//         setState(snapshot.val());
//       });
//   }, [[], useState]);
//   return state;
// };
// export { GetMoney, GetFrogstage, GetItems, GetTests, GetLearning };
