$(document).ready(function () {

    $("a").click(function (event) {
        alert("alo");
        event.preventDefault();
        var page = $(this).attr('href');
        $('#conteudo').load(page);
    });
});