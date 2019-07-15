import { database } from "../main";

/**
 * get user function
 * @param {string} email
 * @returns {promise}
 */

export const getUser = email => {
  return new Promise((resolve, reject) => {
    database
      .collection("users")
      .where("email", "==", email)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(function(doc) {
          let data = {
            name: doc.data().user,
            email: doc.data().email,
            id: doc.id
          };
          resolve(data);
        });
      })
      .catch(error => {
        reject(error);
      });
  });
};

/**
 * Get all days board
 * @param {string} userId
 * @returns {promise}
 */

export const getBoard = userId => {
  return new Promise((resolve, reject) => {
    database
      .collection("users")
      .doc(userId)
      .get()
      .then(doc => {
        if (doc.exists) {
          resolve(doc.data());
        } else {
          reject("No such document!");
        }
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

/**
 * Update firebase board function
 * @param {string} user
 * @param {string} day
 * @param {string} mealType
 * @returns {promise}
 */

export const updateBoard = (board, userId) => {
  return new Promise((resolve, reject) => {
    database
      .collection("users")
      .doc(userId)
      .set(board, { merge: true })
      .then(() => resolve())
      .catch(error => {
        reject(error);
        console.log("Error getting document:", error);
      });
  });
};
