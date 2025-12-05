feather.replace();

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const layout = document.querySelector('.hub-layout');

    sidebar.classList.toggle('collapsed');
    if (layout) {
        layout.classList.toggle('sidebar-collapsed', sidebar.classList.contains('collapsed'));
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('.sidebar-item');
    const currentPath = window.location.pathname; // ex: /hub/metas

    items.forEach(item => {
        const url = item.getAttribute('data-url');

        // 1. Marca como ativo se a URL bater com a atual
        if (currentPath === url || (currentPath === '/hub/' && url === '/hub/inicio')) {
            item.classList.add('active');
        }

        // 2. Adiciona o clique para navegar e marcar como ativo
        item.addEventListener('click', function () {
            // Remove active de todos
            items.forEach(el => el.classList.remove('active'));
            // Adiciona no clicado
            this.classList.add('active');
            // Navega
            window.location.href = url;
        });
    });
});
