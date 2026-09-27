export function setupOrders(
    rootElement
) {

    const panel =
        rootElement.querySelector(
            "[data-orders-panel]"
        );


    if (!panel) {

        return;
    }


    panel.addEventListener(
        "click",
        event => {

            const row =
                event.target.closest(
                    ".orders-row"
                );


            if (!row) {

                return;
            }


            panel
                .querySelectorAll(
                    ".orders-row.selected"
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