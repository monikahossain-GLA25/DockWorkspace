nexport function setupNews(
    rootElement
) {

    const panel =
        rootElement.querySelector(
            "[data-news-panel]"
        );


    if (!panel) {

        return;
    }


    panel.addEventListener(
        "click",
        event => {

            const story =
                event.target.closest(
                    ".news-item"
                );


            if (!story) {

                return;
            }


            /*
             * Clear previous selection.
             */

            panel
                .querySelectorAll(
                    ".news-item.selected"
                )
                .forEach(
                    item => {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );


            /*
             * Highlight selected news story.
             */

            story.classList.add(
                "selected"
            );

        }
    );

}