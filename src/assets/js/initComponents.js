document.addEventListener('DOMContentLoaded', function () {
    // navbar
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {

    });

    // modals
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});

    // select
    /*var elems = document.querySelectorAll('select');
    
    var instances = M.FormSelect.init(elems, {});*/
});