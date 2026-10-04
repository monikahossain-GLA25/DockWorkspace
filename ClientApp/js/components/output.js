export function setupOutput(
    rootElement
) {

    const panel =
        rootElement.querySelector(
            "[data-output-panel]"
        );


    if (!panel) {

        return;
    }


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