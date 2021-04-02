const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const createNotification = ((notification) => {
  return admin.firestore().collection('notifications')
    .add(notification)
    .then(doc => console.log('notification added', doc));
});


exports.projectCreated = functions.firestore
  .document('meals/{mealId}')
  .onCreate(doc => {
    const meal = doc.data();
    const notification = {
      content: 'added a new project',
      user: `${meal.authorFirstName} ${meal.authorLastName}`,
      mealName: `${meal.name}`,
      time: admin.firestore.FieldValue.serverTimestamp(),
    }

    return createNotification(notification);

});