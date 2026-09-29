import {
    DockviewComponent,
    themeLight
} from "dockview";


import {
    setupFxRates
} from "./js/components/fx-rates.js";


import {
    setupOrders
} from "./js/components/orders.js";


import {
    setupPositions
} from "./js/components/positions.js";


import {
    setupVolSurface
} from "./js/components/vol-surface.js";


/* =========================================================
   GLOBAL VARIABLES
   ========================================================= */

let newTabNumber = 0;


/* =========================================================
   BASIC PANELS
   ========================================================= */

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

        this.element.innerHTML = "";
    }

}


/* =========================================================
   TEMPLATE PANEL

   Used for Razor partial content:
   FX Rates
   Orders
   Positions
   Vol Surface
   ========================================================= */

class TemplatePanel {

    constructor(templateId) {

        this.templateId =
            templateId;


        this.element =
            document.createElement(
                "div"
            );


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
            template
                .content
                .cloneNode(true);


        this.element.appendChild(
            content
        );


        /* ==========================================
           COMPONENT-SPECIFIC JAVASCRIPT
           ========================================== */

        switch (
        this.templateId
        ) {


            case "fxrates-template":

                setupFxRates(
                    this.element
                );

                break;


            case "orders-template":

                setupOrders(
                    this.element
                );

                break;


            case "positions-template":

                setupPositions(
                    this.element
                );

                break;


            case "volsurface-template":

                setupVolSurface(
                    this.element
                );

                break;


            default:

                break;

        }

    }

}


/* =========================================================
   CORRELATION DATA
   ========================================================= */

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


/* =========================================================
   CORRELATION COLOR
   ========================================================= */

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
   CORRELATION PANEL
   LEFT TOP
   ========================================================= */

class CorrelationPanel {

    constructor() {

        this.element =
            document.createElement(
                "div"
            );


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

                    <span class="scale-gradient">
                    </span>

                    <span>
                        +1
                    </span>

                </div>

            </div>


            <div class="correlation-scroll">

                <div class="correlation-grid">
                </div>

            </div>

        `;


        const grid =
            this.element.querySelector(
                ".correlation-grid"
            );


        if (!grid) {

            return;

        }


        /* Empty top-left grid item */

        grid.appendChild(
            document.createElement(
                "span"
            )
        );


        /* Column headings */

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


        /* Matrix */

        correlationData.forEach(
            (
                row,
                rowIndex
            ) => {


                const rowHeading =
                    document.createElement(
                        "span"
                    );


                rowHeading.className =
                    "correlation-row-heading";


                rowHeading.textContent =
                    assets[rowIndex];


                grid.appendChild(
                    rowHeading
                );


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


/* =========================================================
   ORDER BOOK PANEL
   LEFT BOTTOM
   ========================================================= */

class OrderBookPanel {

    constructor() {

        this.element =
            document.createElement(
                "div"
            );


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
                                140,28
                            "

                            fill="none"

                            stroke="#ef3340"

                            stroke-width="1.6">

                        </polyline>

                    </svg>

                </div>

            </div>


            <!-- MARKET STATS -->

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


            <!-- TABLE HEADER -->

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


            <!-- ASK -->

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


            <!-- CURRENT PRICE -->

            <div class="spread-row">

                <strong class="negative">

                    ▼ 67,324.8

                </strong>


                <span>

                    Spread 0.5
                    (0.001%)

                </span>

            </div>


            <!-- BID -->

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


/* =========================================================
   MENU HEADER BUTTON
   ========================================================= */

class MenuHeaderAction {

    constructor() {

        this.element =
            document.createElement(
                "div"
            );


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


/* =========================================================
   ADD TAB BUTTON
   ========================================================= */

class AddTabHeaderAction {

    constructor() {

        this.element =
            document.createElement(
                "div"
            );


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


/* =========================================================
   EXPAND / RESTORE BUTTON
   ========================================================= */

class RightHeaderActions {

    constructor() {

        this.element =
            document.createElement(
                "div"
            );


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


        expandButton.textContent =
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


                if (
                    panel.api.isMaximized()
                ) {

                    panel.api.exitMaximized();

                    return;

                }


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


/* =========================================================
   FIND DOCKVIEW CONTAINER
   ========================================================= */

const container =
    document.getElementById(
        "dockview-container"
    );


if (!container) {

    throw new Error(
        "Dockview container was not found."
    );

}


/* =========================================================
   CREATE DOCKVIEW
   ========================================================= */

const dockview =
    new DockviewComponent(
        container,
        {

            theme:
                themeLight,


            createComponent:
                options => {


                    switch (
                    options.name
                    ) {


                        case "correlation":

                            return new CorrelationPanel();


                        case "order-book":

                            return new OrderBookPanel();


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


                        case "empty":

                            return new EmptyPanel();


                        case "blank":

                            return new BlankPanel();


                        default:

                            return new BlankPanel();

                    }

                },


            createPrefixHeaderActionComponent:
                () =>
                    new MenuHeaderAction(),


            createLeftHeaderActionComponent:
                () =>
                    new AddTabHeaderAction(),


            createRightHeaderActionComponent:
                () =>
                    new RightHeaderActions()

        }
    );


/* =========================================================
   WORKSPACE DIMENSIONS
   ========================================================= */

const workspaceWidth =
    container.clientWidth;


const workspaceHeight =
    container.clientHeight;


/* LEFT 30% */

const leftWidth =
    Math.floor(
        workspaceWidth * 0.30
    );


/* MIDDLE 47% */

const middleWidth =
    Math.floor(
        workspaceWidth * 0.47
    );


/* RIGHT = remaining */

const rightWidth =
    workspaceWidth -
    leftWidth -
    middleWidth;


/* 3 rows in middle workspace */

const middleRowHeight =
    Math.floor(
        workspaceHeight / 3
    );


/* =========================================================
   LEFT TOP
   CORRELATION
   ========================================================= */

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


/* =========================================================
   MIDDLE TOP
   FX RATES
   ========================================================= */

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


/* =========================================================
   RIGHT PLACEHOLDER
   ========================================================= */

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


/* Hide temporary right header */

rightPlaceholder
    .group
    .header
    .hidden = true;


/* =========================================================
   LEFT BOTTOM
   ORDER BOOK
   ========================================================= */

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


/* =========================================================
   MIDDLE CENTER
   ORDERS
   ========================================================= */

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
   POSITIONS

   Same Dockview group as Orders.

   Orders | Positions
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


/* =========================================================
   MIDDLE BOTTOM
   VOL SURFACE
   ========================================================= */

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


/* =========================================================
   END
   ========================================================= */