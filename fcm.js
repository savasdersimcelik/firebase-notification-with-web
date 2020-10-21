/** 
 * Bu dosya hem kullanıcıdan izin istemek 
 * Hemde Firebase üzeringen gelen mesajları dinleyip bildirim oluşturmak için kullanılır.
 */

/**
 * Bu metot localStorage'da fcmToken nesneye atar ve getToken metotunu çalıştırı
 */
function FirebaseNotification() {
    this.local_token = localStorage.getItem("fcmToken");
    this.getToken();
}

/**
 * Kullanıcıdan izin ister izin verirse getToken metotu ile kullanıcı FCM Tokenu alır
 * FCM Token değerini tokenControl metotuna gönderir.
 */
FirebaseNotification.prototype.getToken = function (){
    messaging.requestPermission().then(function () {
        return messaging.getToken()
    }).then((token) => this.tokenControl(token)).catch(function (err) {
        console.log("Notify", err);
    });
}

/**
 * Kullanıcı FCM Token değerini LocalStorage'a yazar
 * @param {String} token 
 */
FirebaseNotification.prototype.tokenControl = function (token){
    if(!this.local_token && this.local_token != token){
        localStorage.setItem("fcmToken", token);
    }
}

/**
 * Firebase'den gelen mesajları dinler ve bildirim ekranını açar.
 */
messaging.onMessage(function (payload) {
    const notificationOption={
        body:payload.notification.body,
        icon:payload.notification.icon
    };

    if(Notification.permission==="granted"){
        var notification=new Notification(payload.notification.title,notificationOption);

        notification.onclick=function (ev) {
            ev.preventDefault();
            window.open(payload.notification.click_action,'_blank');
            notification.close();
        }
    }
});

let FCM = new FirebaseNotification();


