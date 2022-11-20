$(document).ready(function () {
    $('#conteudo').load('web/menu-principal.html');

    $('a').click(function (e) {
        e.preventDefault();
        var page = $(this).attr('href');
        $('#conteudo').load('conteudo/' + page + '.html');
        return false;
    });
});