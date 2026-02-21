(function () {
    var DURATION_MS = 420;
    var body = document.body;

    if (!body) {
        return;
    }

    body.classList.add("page-enter");
    window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
            body.classList.add("page-enter-active");
        });
    });

    window.setTimeout(function () {
        body.classList.remove("page-enter", "page-enter-active");
    }, DURATION_MS + 60);

    document.addEventListener("click", function (event) {
        var link = event.target.closest("a[href]");

        if (!link) {
            return;
        }

        if (link.target === "_blank" || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
        }

        var href = link.getAttribute("href");
        if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
            return;
        }

        var destination;
        try {
            destination = new URL(link.href, window.location.href);
        } catch (error) {
            return;
        }

        if (destination.origin !== window.location.origin) {
            return;
        }

        if (destination.pathname === window.location.pathname && destination.search === window.location.search) {
            if (destination.hash && destination.hash !== window.location.hash) {
                return;
            }
            if (!destination.hash) {
                return;
            }
        }

        event.preventDefault();
        body.classList.add("page-leave");

        window.setTimeout(function () {
            window.location.href = destination.href;
        }, DURATION_MS);
    });

    window.addEventListener("pageshow", function () {
        body.classList.remove("page-leave");
    });
})();
