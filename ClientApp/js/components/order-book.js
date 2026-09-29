export function setupOrderBook(
    rootElement
) {

    const panel =
        rootElement.querySelector(
            "[data-order-book-panel]"
        );


    if (!panel) {

        return;
    }


    panel.addEventListener(
        "click",
        event => {

            const row =
                event.target.closest(
                    ".order-book-row"
                );


            if (!row) {

                return;
            }


            panel
                .querySelectorAll(
                    ".order-book-row.selected"
                )
                .forEach(
                    item => {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );


            row.classList.add(
                "selected"
            );

        }
    );

}