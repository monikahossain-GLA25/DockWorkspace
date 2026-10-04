export function setupTerminal(
    rootElement
) {

    const panel =
        rootElement.querySelector(
            "[data-terminal-panel]"
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