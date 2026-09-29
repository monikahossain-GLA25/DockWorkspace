export function setupTechView(
    rootElement
) {

    const panel =
        rootElement.querySelector(
            "[data-tech-view-panel]"
        );


    if (!panel) {

        return;
    }


    panel.addEventListener(
        "click",
        event => {

            const signal =
                event.target.closest(
                    ".tech-signal"
                );


            if (!signal) {

                return;
            }


            /*
             * Clear currently selected signal.
             */

            panel
                .querySelectorAll(
                    ".tech-signal.selected"
                )
                .forEach(
                    item => {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );


            /*
             * Select clicked signal.
             */

            signal.classList.add(
                "selected"
            );

        }
    );

}