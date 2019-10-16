function openPlatformModalMessage(message) {
    document.querySelector("#pMessage").innerHTML = message;
    var elem = document.querySelector('#modalMessage');
    let instance = M.Modal.init(elem, {});
    instance.open();
}
