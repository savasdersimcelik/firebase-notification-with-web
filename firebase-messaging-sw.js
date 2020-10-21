/**
 * Bu sayfa sitenizin root dizininde yer almak zorunda.
 * Bu sayfa kullanıcı sitede değilken çalışan alan. Gelen bildirimleri dinler.
 */

importScripts('https://www.gstatic.com/firebasejs/7.23.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.23.0/firebase-messaging.js');

/**
* Aşağıdaki Bilgileri Firebase Uygulama Oluşturduğunuzda Size Otomatik olarak Verilmektedir.
* */
var firebaseConfig = {
    apiKey: "AIXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",         // API Key
    authDomain: "fcm-XXXXXXXXXXXXXXXXXXXX.firebaseapp.com",         // FCM Domain
    databaseURL: "https://fcm-XXXXXXXXXXXX.firebaseio.com",         // FCM Database Url
    projectId: "XXXXXXXXXX",                                        // FCM Project ID
    storageBucket: "XXXXXXXXXXXXXXX.appspot.com",                   // FCM StoreBucket 
    messagingSenderId: "XXXXXXXXXX",                                // Messaging ID
    appId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",             // APP ID
    measurementId: "G-XXXXXXXX"                                     // MeasurementId
};

firebase.initializeApp(firebaseConfig);
const messaging=firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log(payload);
    const notification=JSON.parse(payload);
    const notificationOption={
        body:notification.body,
        icon:notification.icon
    };
    return self.registration.showNotification(payload.notification.title,notificationOption);
});