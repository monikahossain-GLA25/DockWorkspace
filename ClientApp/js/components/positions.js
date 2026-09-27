export function setupPositions(
    rootElement
) {

    const panel =
        rootElement.querySelector(
            "[data-positions-panel]"
        );


    if (!panel) {

        return;
    }


    panel.addEventListener(
        "click",
        event => {

            const row =
                event.target.closest(
                    ".position-row"
                );


            if (!row) {

                return;
            }


            panel
                .querySelectorAll(
                    ".position-row.selected"
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