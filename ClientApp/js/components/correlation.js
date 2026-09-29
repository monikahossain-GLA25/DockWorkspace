export function setupCorrelation(
    rootElement
) {

    const panel =
        rootElement.querySelector(
            "[data-correlation-panel]"
        );


    if (!panel) {

        return;
    }


    panel.addEventListener(
        "click",
        event => {

            const cell =
                event.target.closest(
                    ".correlation-cell"
                );


            if (!cell) {

                return;
            }


            panel
                .querySelectorAll(
                    ".correlation-cell.selected"
                )
                .forEach(
                    item => {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );


            cell.classList.add(
                "selected"
            );

        }
    );

}