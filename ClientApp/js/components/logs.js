export function setupLogs(
    rootElement
) {

    const panel =
        rootElement.querySelector(
            "[data-logs-panel]"
        );


    if (!panel) {

        return;
    }


    /*
       LOG FILTERS
     */

    const filters =
        panel.querySelectorAll(
            "[data-log-filter]"
        );


    const rows =
        panel.querySelectorAll(
            "[data-log-level]"
        );


    filters.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const filter =
                        button.dataset.logFilter;


                    filters.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    rows.forEach(
                        row => {

                            const level =
                                row.dataset.logLevel;


                            row.hidden =
                                filter !== "all" &&
                                level !== filter;

                        }
                    );

                }
            );

        }
    );


    /*
       COLLAPSE
 */

    panel
        .querySelectorAll(
            "[data-bottom-collapse], [data-bottom-close]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        window.dispatchEvent(
                            new CustomEvent(
                                "dockworkspace:collapse-bottom"
                            )
                        );

                    }
                );

            }
        );

}