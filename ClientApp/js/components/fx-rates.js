export function setupFxRates(
    rootElement
) {

    const panel =
        rootElement.querySelector(
            "[data-fx-panel]"
        );


    if (!panel) {

        return;
    }


    const tabs =
        panel.querySelectorAll(
            "[data-fx-tab]"
        );


    const panes =
        panel.querySelectorAll(
            "[data-fx-pane]"
        );


    function activateTab(
        tabName
    ) {

        tabs.forEach(
            tab => {

                tab.classList.toggle(
                    "active",
                    tab.dataset.fxTab ===
                    tabName
                );

            }
        );


        panes.forEach(
            pane => {

                pane.classList.toggle(
                    "active",
                    pane.dataset.fxPane ===
                    tabName
                );

            }
        );

    }


    tabs.forEach(
        tab => {

            tab.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    event.stopPropagation();


                    activateTab(
                        tab.dataset.fxTab
                    );

                }
            );

        }
    );


    activateTab(
        "g10"
    );

}