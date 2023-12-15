// Função para verificar qual seção está visível e adicionar a classe 'active' ao link correspondente
function checkActiveSection() {
    $('section').each(function () {
        var top = $(this).offset().top;
        var bottom = top + $(this).outerHeight();
        var scrollPosition = $(window).scrollTop();

        if (scrollPosition >= top-80 && scrollPosition <= bottom) {
            var sectionId = $(this).attr('id');
            $('.nav-link').removeClass('active'); // Remove a classe 'active' de todos os links de navegação
            $('.nav-link[href="#' + sectionId + '"]').addClass('active'); // Adiciona a classe 'active' ao link correspondente
        }
    });
}

// Verifica a seção ativa quando a página é carregada
checkActiveSection();

// Verifica a seção ativa quando a página é rolada
$(window).scroll(function () {
    checkActiveSection();
});

$(function () {
    
    
    $('nav a').click(function (e) {
        e.preventDefault(); // Impede o comportamento padrão do link
        var href = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(href).offset().top
        }, 500);
    });
});