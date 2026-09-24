import {
    DockviewComponent,
    themeLight
} from "dockview";


/* 
   DockWorkspace
   Updated: 23.09.2026
 */


/* 
   1. GLOBAL VARIABLES
   23.09.2026
   */

let newTabNumber = 0;


/* 
   2. BLANK PANEL
   Used for the right-side placeholder.
   23.09.2026
    */

class BlankPanel {

    constructor() {

        this.element =
            document.createElement("div");

        this.element.className =
            "blank-panel";
    }


    init() {

        this.element.innerHTML = "";
    }
}
class EmptyPanel {

    constructor() {

        this.element =
            document.createElement("div");

        this.element.className =
            "demo-empty-panel";
    }


    init() {

        this.element.innerHTML = `

            <div class="empty-tab-content">

                Empty Panel

            </div>

        `;
    }
}

/* 
   3. TEMPLATE PANEL
   Used by:
   - FX Rates
   - Orders
   - Positions
   - Vol Surface



   23.09.2026
 */

class TemplatePanel {

    constructor(templateId) {

        this.templateId =
            templateId;


        this.element =
            document.createElement("div");


        this.element.className =
            "dock-panel-host";
    }


    init() {

        const template =
            document.getElementById(
                this.templateId
            );


        if (!template) {

            throw new Error(
                `Template '${this.templateId}' was not found.`
            );
        }


        const content =
            template.content.cloneNode(true);


        this.element.appendChild(
            content
        );
    }
}


/* 
   4. EMPTY TAB
   Used when user clicks +
   23.09.2026
    */



/* 
   5. CORRELATION DATA
   Static dummy data only.
   23.09.2026
  */

const assets = [

    "BTC",
    "ETH",
    "AAPL",
    "MSFT",
    "NVDA",
    "TSLA",
    "SPX",
    "GOLD"

];


const correlationData = [

    [
        1.00,
        -0.27,
        0.00,
        -0.77,
        0.74,
        0.56,
        -0.74,
        0.79
    ],

    [
        -0.27,
        1.00,
        -0.38,
        0.55,
        0.44,
        -0.76,
        -0.62,
        -0.13
    ],

    [
        0.00,
        -0.38,
        1.00,
        -0.15,
        -0.63,
        0.45,
        0.90,
        0.59
    ],

    [
        -0.77,
        0.55,
        -0.15,
        1.00,
        0.04,
        -0.04,
        0.55,
        -0.34
    ],

    [
        0.74,
        0.44,
        -0.63,
        0.04,
        1.00,
        -0.23,
        0.62,
        0.82
    ],

    [
        0.56,
        -0.76,
        0.45,
        -0.04,
        -0.23,
        1.00,
        0.16,
        -0.44
    ],

    [
        -0.74,
        -0.62,
        0.90,
        0.55,
        0.62,
        0.16,
        1.00,
        -0.10
    ],

    [
        0.79,
        -0.13,
        0.59,
        -0.34,
        0.82,
        -0.44,
        -0.10,
        1.00
    ]

];


/* 
   6. CORRELATION COLOR
   23.09.2026
 */

function getCorrelationColor(
    value,
    diagonal
) {

    if (diagonal) {

        return {

            background:
                "#f1f2f4",

            color:
                "#334155"
        };
    }


    const strength =
        Math.min(
            Math.abs(value),
            1
        );


    const opacity =
        0.15 +
        (strength * 0.72);


    /*
        Positive correlation = green
    */

    if (value >= 0) {

        return {

            background:
                `rgba(10, 157, 78, ${opacity})`,

            color:
                strength > 0.48
                    ? "#ffffff"
                    : "#334155"
        };
    }


    /*
        Negative correlation = red
    */

    return {

        background:
            `rgba(225, 29, 46, ${opacity})`,

        color:
            strength > 0.48
                ? "#ffffff"
                : "#334155"
    };
}


/* =========================================================
   7. CORRELATION PANEL
   LEFT TOP
   23.09.2026
   ========================================================= */

class CorrelationPanel {

    constructor() {

        this.element =
            document.createElement("div");


        this.element.className =
            "trade-panel correlation-panel";
    }


    init() {

        this.element.innerHTML = `

            <div class="panel-inner-toolbar">

                <div class="panel-inner-title">

                    <strong>
                        Correlation
                    </strong>

                    <span>
                        30d rolling
                    </span>

                </div>


                <div class="correlation-scale">

                    <span>
                        -1
                    </span>

                    <span
                        class="scale-gradient">
                    </span>

                    <span>
                        +1
                    </span>

                </div>

            </div>


            <div class="correlation-scroll">

                <div
                    class="correlation-grid"
                    id="correlation-grid">
                </div>

            </div>

        `;


        const grid =
            this.element.querySelector(
                "#correlation-grid"
            );


        /*
            Empty top-left position
        */

        grid.appendChild(
            document.createElement("span")
        );


        /*
            Column headings
        */

        assets.forEach(
            asset => {

                const heading =
                    document.createElement(
                        "span"
                    );


                heading.className =
                    "correlation-column-heading";


                heading.textContent =
                    asset;


                grid.appendChild(
                    heading
                );
            }
        );


        /*
            Matrix rows
        */

        correlationData.forEach(
            (
                row,
                rowIndex
            ) => {

                /*
                    Row heading
                */

                const rowName =
                    document.createElement(
                        "span"
                    );


                rowName.className =
                    "correlation-row-heading";


                rowName.textContent =
                    assets[rowIndex];


                grid.appendChild(
                    rowName
                );


                /*
                    Cells
                */

                row.forEach(
                    (
                        value,
                        columnIndex
                    ) => {

                        const cell =
                            document.createElement(
                                "div"
                            );


                        cell.className =
                            "correlation-cell";


                        const diagonal =
                            rowIndex ===
                            columnIndex;


                        const colors =
                            getCorrelationColor(
                                value,
                                diagonal
                            );


                        cell.style.background =
                            colors.background;


                        cell.style.color =
                            colors.color;


                        cell.textContent =
                            value.toFixed(2);


                        if (diagonal) {

                            cell.classList.add(
                                "correlation-diagonal"
                            );
                        }


                        grid.appendChild(
                            cell
                        );
                    }
                );
            }
        );
    }
}


/* 
   8. ORDER BOOK PANEL
   LEFT BOTTOM

   Static dummy interface only.
   23.09.2026
    */

class OrderBookPanel {

    constructor() {

        this.element =
            document.createElement("div");


        this.element.className =
            "trade-panel order-book-panel";
    }


    init() {

        this.element.innerHTML = `

            <div class="order-top">

                <div>

                    <div class="instrument-name">

                        BTC/USD

                        <span class="instrument-tag">
                            PERP
                        </span>

                    </div>


                    <div class="main-price negative">

                        67,324.8

                    </div>


                    <div class="index-line">

                        Index&nbsp;
                        67,338.3

                        <span class="negative">
                            -0.14%
                        </span>

                    </div>

                </div>


                <div class="mini-chart">

                    <svg
                        viewBox="0 0 140 45"
                        preserveAspectRatio="none">

                        <polyline

                            points="
                            0,31
                            10,26
                            16,30
                            23,21
                            32,24
                            39,13
                            46,18
                            54,10
                            62,17
                            69,15
                            76,7
                            83,11
                            91,9
                            99,5
                            108,12
                            116,8
                            124,17
                            132,23
                            140,28"

                            fill="none"

                            stroke="#ef3340"

                            stroke-width="1.6">

                        </polyline>

                    </svg>

                </div>

            </div>


            <div class="market-stat-row">

                <div>

                    <span>
                        24H HIGH
                    </span>

                    <strong>
                        67,502.7
                    </strong>

                </div>


                <div>

                    <span>
                        24H LOW
                    </span>

                    <strong>
                        67,324.8
                    </strong>

                </div>


                <div>

                    <span>
                        24H VOL
                    </span>

                    <strong>
                        124.55M
                    </strong>

                </div>


                <div>

                    <span>
                        OPEN INT
                    </span>

                    <strong>
                        43.09M
                    </strong>

                </div>


                <div>

                    <span>
                        FUNDING
                    </span>

                    <strong class="negative">
                        -0.0041%
                    </strong>

                </div>

            </div>


            <div class="order-table-header">

                <span>
                    PRICE
                </span>

                <span>
                    SIZE
                </span>

                <span>
                    TOTAL
                </span>

            </div>


            <!-- SELL ORDERS -->

            <div class="order-row ask">

                <span>
                    67,326.6
                </span>

                <span>
                    4.656
                </span>

                <span>
                    6.19
                </span>

            </div>


            <div class="order-row ask">

                <span>
                    67,326.1
                </span>

                <span>
                    0.150
                </span>

                <span>
                    1.54
                </span>

            </div>


            <div class="order-row ask">

                <span>
                    67,325.6
                </span>

                <span>
                    0.952
                </span>

                <span>
                    1.39
                </span>

            </div>


            <div class="order-row ask">

                <span>
                    67,325.1
                </span>

                <span>
                    0.595
                </span>

                <span>
                    0.89
                </span>

            </div>


            <!-- SPREAD -->

            <div class="spread-row">

                <strong class="negative">

                    ▼ 67,324.8

                </strong>


                <span>

                    Spread 0.5
                    (0.001%)

                </span>

            </div>


            <!-- BUY ORDERS -->

            <div class="order-row bid">

                <span>
                    67,324.6
                </span>

                <span>
                    0.054
                </span>

                <span>
                    0.95
                </span>

            </div>


            <div class="order-row bid">

                <span>
                    67,324.1
                </span>

                <span>
                    3.081
                </span>

                <span>
                    3.14
                </span>

            </div>


            <div class="order-row bid">

                <span>
                    67,323.6
                </span>

                <span>
                    0.992
                </span>

                <span>
                    4.06
                </span>

            </div>


            <div class="order-row bid">

                <span>
                    67,323.1
                </span>

                <span>
                    0.050
                </span>

                <span>
                    6.73
                </span>

            </div>


            <!-- TIME & SALES -->

            <div class="time-sales-title">

                <span>
                    TIME & SALES
                </span>

                <span>
                    TIME · PRICE · SIZE
                </span>

            </div>


            <div class="time-sales-row">

                <span>
                    07:13:39
                </span>

                <span class="negative">
                    67,323.7
                </span>

                <span>
                    1.998
                </span>

            </div>

        `;
    }
}


/* 
   9. MENU BUTTON
   Appears before every Dockview tab group.
   23.09.2026
 */

class MenuHeaderAction {

    constructor() {

        this.element =
            document.createElement("div");


        this.element.className =
            "header-action-container";
    }


    init() {

        this.element.innerHTML = `

            <button

                type="button"

                class="
                    dock-header-button
                    menu-button
                "

                title="Panel menu">

                ☰

            </button>

        `;
    }


    dispose() {

        this.element.remove();
    }
}


/* 
   10. + ADD TAB BUTTON
   Adds another tab inside the current group.
   23.09.2026
 */

class AddTabHeaderAction {

    constructor() {

        this.element =
            document.createElement("div");


        this.element.className =
            "header-action-container";
    }


    init(parameters) {

        const button =
            document.createElement(
                "button"
            );


        button.type =
            "button";


        button.className =
            "dock-header-button add-tab-button";


        button.title =
            "Add tab";


        button.textContent =
            "+";


        button.addEventListener(
            "click",
            () => {

                /*
                    Active panel of the current group
                */

                const referencePanel =
                    parameters
                        .group
                        .activePanel;


                if (!referencePanel) {

                    return;
                }


                newTabNumber++;


                parameters
                    .containerApi
                    .addPanel({

                        id:
                            `new-tab-${Date.now()}-${newTabNumber}`,

                        component:
                            "empty",

                        title:
                            `Tab ${newTabNumber}`,

                        position: {

                            referencePanel:
                                referencePanel,

                            direction:
                                "within"
                        }

                    });
            }
        );


        this.element.appendChild(
            button
        );
    }


    dispose() {

        this.element.remove();
    }
}


/* 
   11. EXPAND / RESTORE BUTTON
   Appears at top-right of each group.
   23.09.2026
   */

class RightHeaderActions {

    constructor() {

        this.element =
            document.createElement("div");


        this.element.className =
            "right-header-actions";
    }


    init(parameters) {

        const expandButton =
            document.createElement(
                "button"
            );


        expandButton.type =
            "button";


        expandButton.className =
            "dock-header-button expand-button";


        expandButton.title =
            "Expand / Restore";


        expandButton.innerHTML =
            "⛶";


        expandButton.addEventListener(
            "click",
            () => {

                const panel =
                    parameters
                        .group
                        .activePanel;


                if (!panel) {

                    return;
                }


                /*
                    If currently expanded,
                    restore previous layout.
                */

                if (
                    panel.api.isMaximized()
                ) {

                    panel.api.exitMaximized();

                    return;
                }


                /*
                    Otherwise maximize this panel group.
                */

                panel.api.maximize();
            }
        );


        this.element.appendChild(
            expandButton
        );
    }


    dispose() {

        this.element.remove();
    }
}

/* 
   FX RATES INTERNAL TABS
   G10 / EM / Crosses
   24.09.2026
 */

function initializeFxTabs() {

    document.addEventListener(
        "click",
        (event) => {

            const tab =
                event.target.closest(
                    "[data-fx-tab]"
                );


            if (!tab) {

                return;
            }


            const fxPanel =
                tab.closest(
                    "[data-fx-panel]"
                );


            if (!fxPanel) {

                return;
            }


            const selectedTab =
                tab.dataset.fxTab;


            /*
                Remove active state
                from all FX tabs.
            */

            fxPanel
                .querySelectorAll(
                    "[data-fx-tab]"
                )
                .forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );
                    }
                );


            /*
                Hide all panes.
            */

            fxPanel
                .querySelectorAll(
                    "[data-fx-pane]"
                )
                .forEach(
                    pane => {

                        pane.classList.remove(
                            "active"
                        );
                    }
                );


            /*
                Activate clicked tab.
            */

            tab.classList.add(
                "active"
            );


            /*
                Find matching content.
            */

            const selectedPane =
                fxPanel.querySelector(
                    `[data-fx-pane="${selectedTab}"]`
                );


            if (selectedPane) {

                selectedPane.classList.add(
                    "active"
                );
            }

        }
    );
}
/* 
   12. GET DOCKVIEW HTML CONTAINER
   23.09.2026
    */


const container =
    document.getElementById(
        "dockview-container"
    );


if (!container) {

    throw new Error(
        "Dockview container was not found."
    );
}


/* 
   13. CREATE DOCKVIEW
   23.09.2026
  */

const dockview =
    new DockviewComponent(
        container,
        {

            theme:
                themeLight,


            /* 
               PANEL COMPONENT FACTORY
               */

            createComponent:
                (options) => {

                    switch (
                    options.name
                    ) {

                        /*
                            LEFT WORKSPACE
                        */

                        case "correlation":

                            return new CorrelationPanel();


                        case "order-book":

                            return new OrderBookPanel();


                        /*
                            MIDDLE WORKSPACE
                            Razor <template> components
                        */

                        case "fx-rates":

                            return new TemplatePanel(
                                "fxrates-template"
                            );


                        case "orders":

                            return new TemplatePanel(
                                "orders-template"
                            );


                        case "positions":

                            return new TemplatePanel(
                                "positions-template"
                            );


                        case "vol-surface":

                            return new TemplatePanel(
                                "volsurface-template"
                            );


                        /*
                            DYNAMIC + TAB
                        */

                        case "empty":

                            return new EmptyPanel();


                        /*
                            TEMPORARY RIGHT SIDE
                        */

                        case "blank":

                            return new BlankPanel();


                        default:

                            return new BlankPanel();
                    }
                },


            /* 
               ☰ BEFORE TABS
               */

            createPrefixHeaderActionComponent:
                () =>
                    new MenuHeaderAction(),


            /* 
               + AFTER TABS
               */

            createLeftHeaderActionComponent:
                () =>
                    new AddTabHeaderAction(),


            /* 
               ⛶ AT RIGHT SIDE
              */

            createRightHeaderActionComponent:
                () =>
                    new RightHeaderActions()

        }
    );


/* 
   14. FINAL WORKSPACE LAYOUT
   23.09.2026

   
    */


/* 
   WORKSPACE DIMENSIONS
   */

const workspaceWidth =
    container.clientWidth;


const workspaceHeight =
    container.clientHeight;


/* 
   COLUMN WIDTHS

   Dockview demo approximation:

   Left   = 30%
   Middle = 47%
   Right  = 23%

   23.09.2026
    */

const leftWidth =
    Math.floor(
        workspaceWidth * 0.30
    );


const middleWidth =
    Math.floor(
        workspaceWidth * 0.47
    );


const rightWidth =
    workspaceWidth -
    leftWidth -
    middleWidth;


/* 
   MIDDLE ROW HEIGHT

   FX Rates
   Orders
   Vol Surface

   roughly 1/3 each
  */

const middleRowHeight =
    Math.floor(
        workspaceHeight / 3
    );


/* 
   15. LEFT TOP
   CORRELATION
   23.09.2026
   */

const correlation =
    dockview.addPanel({

        id:
            "correlation",

        component:
            "correlation",

        title:
            "Correlation",

        initialWidth:
            leftWidth,

        initialHeight:
            Math.floor(
                workspaceHeight / 2
            )

    });


/* 
   16. MIDDLE TOP
   FX RATES
   23.09.2026
 */

const fxRates =
    dockview.addPanel({

        id:
            "fx-rates",

        component:
            "fx-rates",

        title:
            "FX Rates",

        initialWidth:
            middleWidth,

        initialHeight:
            middleRowHeight,

        position: {

            referencePanel:
                correlation,

            direction:
                "right"
        }

    });


/* 
   17. RIGHT COLUMN
   BLANK PLACEHOLDER

   News / Tech View will be added later.

   23.09.2026
   */

const rightPlaceholder =
    dockview.addPanel({

        id:
            "right-placeholder",

        component:
            "blank",

        title:
            "Right",

        initialWidth:
            rightWidth,

        position: {

            referencePanel:
                fxRates,

            direction:
                "right"
        }

    });


/*
    Hide title/header of blank right section.
*/

rightPlaceholder
    .group
    .header
    .hidden = true;


/* 
   18. LEFT BOTTOM
   ORDER BOOK
   23.09.2026
 */

const orderBook =
    dockview.addPanel({

        id:
            "order-book",

        component:
            "order-book",

        title:
            "Order Book",

        initialHeight:
            Math.floor(
                workspaceHeight / 2
            ),

        position: {

            referencePanel:
                correlation,

            direction:
                "below"
        }

    });


/* 
   19. MIDDLE CENTER
   ORDERS
   23.09.2026
    */

const orders =
    dockview.addPanel({

        id:
            "orders",

        component:
            "orders",

        title:
            "Orders",

        initialHeight:
            middleRowHeight,

        position: {

            referencePanel:
                fxRates,

            direction:
                "below"
        }

    });


/* =========================================================
   20. POSITIONS TAB

   Positions belongs to SAME group as Orders.

   Orders | Positions

   direction = "within"

   23.09.2026
   ========================================================= */

dockview.addPanel({

    id:
        "positions",

    component:
        "positions",

    title:
        "Positions",

    inactive:
        true,

    position: {

        referencePanel:
            orders,

        direction:
            "within"
    }

});


/* 
   21. MIDDLE BOTTOM
   VOL SURFACE
   23.09.2026
    */

const volSurface =
    dockview.addPanel({

        id:
            "vol-surface",

        component:
            "vol-surface",

        title:
            "Vol Surface",

        initialHeight:
            middleRowHeight,

        position: {

            referencePanel:
                orders,

            direction:
                "below"
        }

    });


