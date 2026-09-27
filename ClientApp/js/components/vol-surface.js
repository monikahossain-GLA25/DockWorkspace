export function setupVolSurface(
    rootElement
) {

    const panel =
        rootElement.querySelector(
            "[data-vol-panel]"
        );


    if (!panel) {

        return;
    }


    panel.addEventListener(
        "click",
        event => {

            const cell =
                event.target.closest(
                    ".vol-cell"
                );


            if (!cell) {

                return;
            }


            panel
                .querySelectorAll(
                    ".vol-cell.selected"
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