export function setupNews(
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
               REMOVE PREVIOUS SELECTION
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
               SELECT CLICKED NEWS ITEM
              */

            story.classList.add(
                "selected"
            );

        }
    );

}