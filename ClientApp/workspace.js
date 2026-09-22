import {
    DockviewComponent,
    themeLight
} from "dockview";
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

/* 
   GLOBAL COUNTER FOR + ADD TAB
    */

let newTabNumber = 3;


/* 
   CORRELATION DATA
   Static dummy UI data only
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

    [1.00, -0.27, 0.00, -0.77, 0.74, 0.56, -0.74, 0.79],

    [-0.27, 1.00, -0.38, 0.55, 0.44, -0.76, -0.62, -0.13],

    [0.00, -0.38, 1.00, -0.15, -0.63, 0.45, 0.90, 0.59],

    [-0.77, 0.55, -0.15, 1.00, 0.04, -0.04, 0.55, -0.34],

    [0.74, 0.44, -0.63, 0.04, 1.00, -0.23, 0.62, 0.82],

    [0.56, -0.76, 0.45, -0.04, -0.23, 1.00, 0.16, -0.44],

    [-0.74, -0.62, 0.90, 0.55, 0.62, 0.16, 1.00, -0.10],

    [0.79, -0.13, 0.59, -0.34, 0.82, -0.44, -0.10, 1.00]

];


/* 
   BUILD ONE CORRELATION CELL
    */

function getCorrelationColor(value, diagonal) {

    if (diagonal) {

        return {
            background: "#f1f2f4",
            color: "#334155"
        };
    }


    const strength =
        Math.min(Math.abs(value), 1);


    const opacity =
        0.15 + (strength * 0.72);


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


/* 
   CORRELATION PANEL
  */

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

                    <span>-1</span>

                    <span class="scale-gradient"></span>

                    <span>+1</span>

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
           Empty top-left corner
        */

        grid.appendChild(
            document.createElement("span")
        );


        /*
           Column headings
        */

        assets.forEach(asset => {

            const heading =
                document.createElement("span");

            heading.className =
                "correlation-column-heading";

            heading.textContent =
                asset;

            grid.appendChild(
                heading
            );
        });


        /*
           Matrix rows
        */

        correlationData.forEach(
            (row, rowIndex) => {

                const rowName =
                    document.createElement("span");

                rowName.className =
                    "correlation-row-heading";

                rowName.textContent =
                    assets[rowIndex];

                grid.appendChild(
                    rowName
                );


                row.forEach(
                    (value, columnIndex) => {

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
   ORDER BOOK PANEL
   Dummy interface based on Dockview demo
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
                    <span>24H HIGH</span>
                    <strong>67,502.7</strong>
                </div>

                <div>
                    <span>24H LOW</span>
                    <strong>67,324.8</strong>
                </div>

                <div>
                    <span>24H VOL</span>
                    <strong>124.55M</strong>
                </div>

                <div>
                    <span>OPEN INT</span>
                    <strong>43.09M</strong>
                </div>

                <div>
                    <span>FUNDING</span>
                    <strong class="negative">
                        -0.0041%
                    </strong>
                </div>

            </div>


            <div class="order-table-header">

                <span>PRICE</span>

                <span>SIZE</span>

                <span>TOTAL</span>

            </div>


            <div class="order-row ask">

                <span>67,326.6</span>
                <span>4.656</span>
                <span>6.19</span>

            </div>


            <div class="order-row ask">

                <span>67,326.1</span>
                <span>0.150</span>
                <span>1.54</span>

            </div>


            <div class="order-row ask">

                <span>67,325.6</span>
                <span>0.952</span>
                <span>1.39</span>

            </div>


            <div class="order-row ask">

                <span>67,325.1</span>
                <span>0.595</span>
                <span>0.89</span>

            </div>


            <div class="spread-row">

                <strong class="negative">

                    ▼ 67,324.8

                </strong>

                <span>

                    Spread 0.5
                    (0.001%)

                </span>

            </div>


            <div class="order-row bid">

                <span>67,324.6</span>
                <span>0.054</span>
                <span>0.95</span>

            </div>


            <div class="order-row bid">

                <span>67,324.1</span>
                <span>3.081</span>
                <span>3.14</span>

            </div>


            <div class="order-row bid">

                <span>67,323.6</span>
                <span>0.992</span>
                <span>4.06</span>

            </div>


            <div class="order-row bid">

                <span>67,323.1</span>
                <span>0.050</span>
                <span>6.73</span>

            </div>


            <div class="time-sales-title">

                <span>TIME & SALES</span>

                <span>TIME · PRICE · SIZE</span>

            </div>


            <div class="time-sales-row">

                <span>07:13:39</span>

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
   EMPTY TAB
   Used by Tab 2, Tab 3 and + button
  */

class EmptyPanel {

    constructor() {

        this.element =
            document.createElement("div");

        this.element.className =
            "demo-empty-panel";
    }


    init(params) {

        this.element.innerHTML = `

            <div>

                ${params.api.title}

            </div>

        `;
    }
}


/* 
   HAMBURGER ACTION
   Appears BEFORE tabs
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
                class="dock-header-button menu-button"
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
   + BUTTON
   Dockview puts LEFT ACTIONS directly after tabs.
   Therefore this appears like:
   Correlation | Tab2 | Tab3 | +
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
            document.createElement("button");


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

                newTabNumber++;


                const referencePanel =
                    parameters.group
                        .activePanel;


                if (!referencePanel) {

                    return;
                }


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
                                referencePanel.id,

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
   RIGHT-SIDE ACTIONS
   Star / Pop-out appearance / Maximize
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
            document.createElement("button");


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

                /*
                   If something is already maximized,
                   restore normal layout.
                */

                if (
                    parameters
                        .containerApi
                        .hasMaximizedGroup()
                ) {

                    parameters
                        .containerApi
                        .exitMaximizedGroup();

                    expandButton.innerHTML =
                        "⛶";

                    return;
                }


                /*
                   Otherwise maximize this group.
                */

                const activePanel =
                    parameters
                        .group
                        .activePanel;


                if (!activePanel) {

                    return;
                }


                parameters
                    .containerApi
                    .maximizeGroup(
                        activePanel
                    );


                expandButton.innerHTML =
                    "❐";
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
   GET HTML CONTAINER
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
   CREATE DOCKVIEW
   */

const dockview =
    new DockviewComponent(
        container,
        {

            theme:
                themeLight,


            /*
               PANEL CONTENT
            */

            createComponent: (options) => {

                switch (options.name) {

                    case "correlation":

                        return new CorrelationPanel();


                    case "order-book":

                        return new OrderBookPanel();


                    case "blank":

                        return new BlankPanel();


                    case "empty":

                        return new EmptyPanel();


                    default:

                        return new BlankPanel();
                }
            },


            /*
               ☰ before tabs
            */

            createPrefixHeaderActionComponent:
                () =>
                    new MenuHeaderAction(),


            /*
               + directly after tabs
            */

            createLeftHeaderActionComponent:
                () =>
                    new AddTabHeaderAction(),


            /*
               Icons at far right
            */

            createRightHeaderActionComponent:
                () =>
                    new RightHeaderActions()

        }
    );


/* 
   TOP PANEL — CORRELATION
 */

// const correlation =
//     dockview.addPanel({

//         id:
//             "correlation",

//         component:
//             "correlation",

//         title:
//             "Correlation",

//         initialHeight:
//             430

//     });

/* =========================================================
   CALCULATE INITIAL COLUMN SIZE
   ========================================================= */

const totalWidth =
    container.clientWidth;


const totalHeight =
    container.clientHeight;


/*
   Demo is roughly:
   left   ≈ 1/3
   middle ≈ 1/3
   right  ≈ 1/3
*/

const columnWidth =
    Math.floor(totalWidth / 3);


const correlationHeight =
    Math.floor(totalHeight * 0.54);


const orderBookHeight =
    totalHeight - correlationHeight;


/*
   1. LEFT TOP — CORRELATION
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
            columnWidth,

        initialHeight:
            correlationHeight,

        minimumWidth:
            320,

        minimumHeight:
            220

    });


/* 
   2. MIDDLE BLANK COLUMN
    */

const middleBlank =
    dockview.addPanel({

        id:
            "middle-placeholder",

        component:
            "blank",

        title:
            "Middle",

        initialWidth:
            columnWidth,

        position: {

            referencePanel:
                correlation,

            direction:
                "right"
        }

    });


/*
   For now middle section must appear blank.
*/

middleBlank.group.header.hidden =
    true;


/* 
   3. RIGHT BLANK COLUMN
   */

const rightBlank =
    dockview.addPanel({

        id:
            "right-placeholder",

        component:
            "blank",

        title:
            "Right",

        initialWidth:
            columnWidth,

        position: {

            referencePanel:
                middleBlank,

            direction:
                "right"
        }

    });


rightBlank.group.header.hidden =
    true;


/*
   4. LEFT BOTTOM — ORDER BOOK
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
            orderBookHeight,

        minimumHeight:
            220,

        position: {

            referencePanel:
                correlation,

            direction:
                "below"
        }

    });
/* 
   TAB 2
   SAME GROUP
   */

dockview.addPanel({

    id:
        "tab-2",

    component:
        "empty",

    title:
        "Tab 2",

    inactive:
        true,

    position: {

        referencePanel:
            "correlation",

        direction:
            "within"
    }

});


/* 
   TAB 3
   SAME GROUP
    */

dockview.addPanel({

    id:
        "tab-3",

    component:
        "empty",

    title:
        "Tab 3",

    inactive:
        true,

    position: {

        referencePanel:
            "correlation",

        direction:
            "within"
    }

});


/* 
   BOTTOM PANEL — ORDER BOOK
 */

dockview.addPanel({

    id:
        "order-book",

    component:
        "order-book",

    title:
        "Order Book",

    initialHeight:
        400,

    position: {

        referencePanel:
            "correlation",

        direction:
            "below"
    }

});