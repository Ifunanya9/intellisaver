// export const createBooking = (booking) => {
//     return(dispatch, getState,  {getFirebase} ) => {
//         //make async call to database
//         //go ahead to dispatch the action again
//         // const firestore = getFirestore();
//         const profile = getState().firebase.profile;
//         const authId = getState().firebase.auth.uid;

//         getFirebase().firestore().collection('bookings').add({
//             ...booking,
//             createdBy: profile.provider,
//             authorFirstName: profile.firstName,
//             authorLastName: profile.lastName,
//             authId: authId,
//             createdAt: new Date()
//         }).then(() => {
//             dispatch({type: 'CREATE_MEAL', meal});          
//         }).catch((err) => {
//             dispatch({type: 'CREATE_MEAL_ERROR', err});
//         })
//     }  
// };
