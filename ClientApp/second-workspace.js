import {
    DockviewComponent,
    themeLight
} from "dockview";


/* 
   GLOBAL TAB COUNTER
 */

let tabCounter = 1;


/* 
   FX RATES DATA

   i take it  as a array of objects
 */

const fxRates = [

    {
        pair: "EUR/USD",
        action: "Sell EUR",
        valueBefore: "1.08",
        bigValue: "19",
        valueAfter: "9",
        direction: "up",
        size: "4.4"
    },

    {
        pair: "GBP/USD",
        action: "Sell GBP",
        valueBefore: "1.26",
        bigValue: "42",
        valueAfter: "8",
        direction: "up",
        size: "2.0"
    },

    {
        pair: "USD/JPY",
        action: "Sell USD",
        valueBefore: "149.",
        bigValue: "11",
        valueAfter: "0",
        direction: "down",
        size: "3.3"
    },

    {
        pair: "USD/CHF",
        action: "Sell USD",
        valueBefore: "0.88",
        bigValue: "40",
        valueAfter: "6",
        direction: "down",
        size: "4.5"
    },

    {
        pair: "USD/CAD",
        action: "Sell USD",
        valueBefore: "1.39",
        bigValue: "19",
        valueAfter: "",
        direction: "up",
        size: "3.2"
    },

    {
        pair: "AUD/USD",
        action: "Sell AUD",
        valueBefore: "0.78",
        bigValue: "78",
        valueAfter: "",
        direction: "up",
        size: "2.7"
    },

    {
        pair: "NZD/USD",
        action: "Sell NZD",
        valueBefore: "0.67",
        bigValue: "31",
        valueAfter: "",
        direction: "down",
        size: "2.4"
    },

    {
        pair: "EUR/JPY",
        action: "Sell EUR",
        valueBefore: "159.",
        bigValue: "70",
        valueAfter: "",
        direction: "down",
        size: "3.0"
    }

];


/*
   ORDER BLOTTER DATA
 */

const orderRows = [

    {
        side: "SELL",
        symbol: "AMD",
        type: "LMT",
        price: "162.12",
        notional: "266.85K",
        status: "CANCEL",
        time: "05:27"
    },

    {
        side: "BUY",
        symbol: "GOOGL",
        type: "LMT",
        price: "141.70",
        notional: "272.63K",
        status: "FILLED",
        time: "03:36"
    },

    {
        side: "BUY",
        symbol: "TSLA",
        type: "STP",
        price: "250.93",
        notional: "439.63K",
        status: "CANCEL",
        time: "02:09"
    },

    {
        side: "SELL",
        symbol: "INTC",
        type: "MKT",
        price: "44.22",
        notional: "43.11K",
        status: "FILLED",
        time: "19:56"
    },

    {
        side: "SELL",
        symbol: "GOOGL",
        type: "LMT",
        price: "141.63",
        notional: "223.07K",
        status: "FILLED",
        time: "18:54"
    },

    {
        side: "BUY",
        symbol: "AMD",
        type: "STP",
        price: "169.13",
        notional: "74.92K",
        status: "PARTIAL",
        time: "18:19"
    }

];


/* 
   VOLATILITY SURFACE DATA
    */

const volColumns = [
    "10dP",
    "25dP",
    "ATM",
    "25dC",
    "10dC"
];


const volRows = [

    {
        tenor: "1W",
        values: [13.3, 10.4, 9.6, 10.4, 12.3]
    },

    {
        tenor: "2W",
        values: [14.3, 12.3, 10.9, 11.3, 14.2]
    },

    {
        tenor: "1M",
        values: [15.9, 14.2, 11.8, 12.7, 16.1]
    },

    {
        tenor: "2M",
        values: [17.8, 15.5, 12.7, 14.6, 17.6]
    },

    {
        tenor: "3M",
        values: [19.7, 16.4, 14.1, 16.5, 18.5]
    },

    {
        tenor: "6M",
        values: [21.0, 17.3, 16.0, 18.0, 19.4]
    },

    {
        tenor: "1Y",
        values: [21.9, 18.7, 17.9, 18.9, 20.6]
    }

];
/* 
   VOLATILITY COLOUR HELPER
    */

function getVolClass(value) {

    if (value < 10.5) {

        return "vol-blue";
    }


    if (value < 12.5) {

        return "vol-cyan";
    }


    if (value < 15.0) {

        return "vol-green";
    }


    if (value < 18.0) {

        return "vol-lime";
    }


    if (value < 19.5) {

        return "vol-yellow";
    }


    if (value < 21.0) {

        return "vol-orange";
    }


    return "vol-red";
}
/* 
   FX RATES PANEL
   */

class FxRatesPanel {

    constructor() {

        this.element =
            document.createElement("div");


        this.element.className =
            "workspace-panel fx-panel";
    }


    init() {

        /*
           Create the basic panel structure.
        */

        this.element.innerHTML = `

            <div class="fx-subtabs">

                <button
                    type="button"
                    class="fx-subtab active">

                    G10 ×

                </button>


                <button
                    type="button"
                    class="fx-subtab">

                    EM

                </button>


                <button
                    type="button"
                    class="fx-subtab">

                    Crosses

                </button>

            </div>


            <div class="fx-grid">
            </div>

        `;


        /*
           Find our grid.
        */

        const grid =
            this.element.querySelector(
                ".fx-grid"
            );


        /*
           Generate one card for every FX item.
        */

        fxRates.forEach(rate => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "fx-card";


            const directionSymbol =
                rate.direction === "up"
                    ? "▸"
                    : "▸";


            card.innerHTML = `

                <div class="fx-card-header">

                    <span
                        class="
                            fx-direction
                            ${rate.direction === "up"
                    ? "fx-up"
                    : "fx-down"}">

                        ${directionSymbol}

                    </span>


                    <span>
                        ${rate.pair}
                    </span>


                    <span class="fx-demo">
                        Demo Account
                    </span>

                </div>


                <div class="fx-card-body">

                    <div class="fx-label-row">

                        <span>
                            ${rate.action}
                        </span>

                        <span>
                            Buy
                        </span>

                    </div>


                    <div class="fx-price-row">

                        <div
                            class="
                                fx-price
                                ${rate.direction}">

                            <span>
                                ${rate.valueBefore}
                            </span>

                            <span class="fx-big">
                                ${rate.bigValue}
                            </span>

                            <span>
                                ${rate.valueAfter}
                            </span>

                        </div>


                        <span class="fx-size">
                            ${rate.size}
                        </span>

                    </div>

                </div>

            `;


            grid.appendChild(
                card
            );
        });


        /*
           Secondary tab behaviour.

           G10 / EM / Crosses
        */

        const subTabs =
            this.element.querySelectorAll(
                ".fx-subtab"
            );


        subTabs.forEach(tab => {

            tab.addEventListener(
                "click",
                () => {

                    subTabs.forEach(
                        item =>
                            item.classList.remove(
                                "active"
                            )
                    );


                    tab.classList.add(
                        "active"
                    );

                }
            );

        });
    }
}
/* 
   ORDERS PANEL
   */

class OrdersPanel {

    constructor() {

        this.element =
            document.createElement("div");


        this.element.className =
            "workspace-panel orders-panel";
    }


    init() {

        this.element.innerHTML = `

            <div class="order-toolbar">

                <span class="order-toolbar-title">
                    Order Blotter
                </span>


                <span
                    class="
                        status-badge
                        status-working">

                    39 WORKING

                </span>


                <span
                    class="
                        status-badge
                        status-filled">

                    18 FILLED

                </span>


                <span class="order-gross">

                    Gross $23.26M

                </span>

            </div>


            <div class="order-table">

                <div class="order-header">

                    <span>SIDE</span>

                    <span>SYMBOL</span>

                    <span>TYP</span>

                    <span>PRICE</span>

                    <span>NOTIONAL</span>

                    <span>STATUS</span>

                    <span>TIME</span>

                </div>


                <div class="order-table-body">
                </div>

            </div>

        `;


        const tableBody =
            this.element.querySelector(
                ".order-table-body"
            );


        orderRows.forEach(order => {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "trade-order-row";


            const sideClass =
                order.side === "BUY"
                    ? "buy-side"
                    : "sell-side";


            let statusClass =
                "status-done";


            if (order.status === "CANCEL") {

                statusClass =
                    "status-cancel";
            }


            if (order.status === "PARTIAL") {

                statusClass =
                    "status-partial";
            }


            row.innerHTML = `

                <span>

                    <span
                        class="
                            side-badge
                            ${sideClass}">

                        ${order.side}

                    </span>

                </span>


                <strong>
                    ${order.symbol}
                </strong>


                <span>
                    ${order.type}
                </span>


                <span>
                    ${order.price}
                </span>


                <span>
                    ${order.notional}
                </span>


                <span>

                    <span
                        class="
                            order-status
                            ${statusClass}">

                        ${order.status}

                    </span>

                </span>


                <span>
                    ${order.time}
                </span>

            `;


            tableBody.appendChild(
                row
            );
        });
    }
}
/* 
   VOL SURFACE PANEL
 */

class VolSurfacePanel {

    constructor() {

        this.element =
            document.createElement("div");


        this.element.className =
            "workspace-panel vol-panel";
    }


    init() {

        this.element.innerHTML = `

            <div class="vol-toolbar">

                <strong class="vol-title">

                    Vol Surface

                </strong>


                <span class="vol-subtitle">

                    implied vol · by delta / tenor

                </span>


                <div class="vol-legend">

                    <span>
                        10
                    </span>

                    <span class="vol-gradient">
                    </span>

                    <span>
                        22%
                    </span>

                </div>

            </div>


            <div class="vol-scroll">

                <div class="vol-grid">
                </div>

            </div>

        `;


        const grid =
            this.element.querySelector(
                ".vol-grid"
            );


        /*
           Top-left blank corner.
        */

        grid.appendChild(
            document.createElement("span")
        );


        /*
           Column headings.
        */

        volColumns.forEach(column => {

            const heading =
                document.createElement(
                    "span"
                );


            heading.className =
                "vol-heading";


            heading.textContent =
                column;


            grid.appendChild(
                heading
            );
        });


        /*
           Matrix rows.
        */

        volRows.forEach(row => {

            const tenor =
                document.createElement(
                    "span"
                );


            tenor.className =
                "vol-tenor";


            tenor.textContent =
                row.tenor;


            grid.appendChild(
                tenor
            );


            row.values.forEach(value => {

                const cell =
                    document.createElement(
                        "div"
                    );


                cell.className =
                    `vol-cell ${getVolClass(value)}`;


                cell.textContent =
                    value.toFixed(1);


                grid.appendChild(
                    cell
                );

            });

        });
    }
}
/* 
   EMPTY / PLACEHOLDER PANEL
   */

class EmptyPanel {

    constructor() {

        this.element =
            document.createElement(
                "div"
            );


        this.element.className =
            "empty-tab-panel";
    }


    init(params) {

        const title =
            params?.api?.title
            ?? "Panel";


        this.element.textContent =
            title;
    }
}
/* =========================================================
   LEFT HAMBURGER BUTTON
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

        const button =
            document.createElement(
                "button"
            );


        button.type =
            "button";


        button.className =
            "dock-header-button menu-button";


        button.title =
            "Panel Menu";


        button.textContent =
            "☰";


        this.element.appendChild(
            button
        );
    }


    dispose() {

        this.element.remove();
    }
}


/* =========================================================
   + ADD TAB
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
            "Add Tab";


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


                tabCounter++;


                parameters
                    .containerApi
                    .addPanel({

                        id:
                            `second-tab-${Date.now()}-${tabCounter}`,

                        component:
                            "empty",

                        title:
                            `Tab ${tabCounter}`,

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


/* =========================================================
   RIGHT-SIDE ACTIONS
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

        /* -----------------------------------------
           STAR
           ----------------------------------------- */

        const starButton =
            document.createElement(
                "button"
            );


        starButton.type =
            "button";


        starButton.className =
            "dock-header-button";


        starButton.title =
            "Favourite";


        starButton.textContent =
            "☆";


        starButton.addEventListener(
            "click",
            () => {

                starButton.textContent =
                    starButton.textContent === "☆"
                        ? "★"
                        : "☆";
            }
        );


        /* -----------------------------------------
           POP-OUT ICON
           Visual only for this milestone.
           ----------------------------------------- */

        const popoutButton =
            document.createElement(
                "button"
            );


        popoutButton.type =
            "button";


        popoutButton.className =
            "dock-header-button";


        popoutButton.title =
            "Pop Out";


        popoutButton.textContent =
            "↗";


        /* -----------------------------------------
           EXPAND / RESTORE
           ----------------------------------------- */

        const expandButton =
            document.createElement(
                "button"
            );


        expandButton.type =
            "button";


        expandButton.className =
            "dock-header-button";


        expandButton.title =
            "Expand / Restore";


        expandButton.textContent =
            "⛶";


        expandButton.addEventListener(
            "click",
            () => {

                const activePanel =
                    parameters
                        .group
                        .activePanel;


                if (!activePanel) {

                    return;
                }


                /*
                   Is THIS group already maximized?
                */

                if (
                    activePanel
                        .api
                        .isMaximized()
                ) {

                    activePanel
                        .api
                        .exitMaximized();


                    expandButton.textContent =
                        "⛶";


                    return;
                }


                /*
                   Otherwise maximize it.
                */

                activePanel
                    .api
                    .maximize();


                expandButton.textContent =
                    "❐";
            }
        );


        this.element.append(
            starButton,
            popoutButton,
            expandButton
        );
    }


    dispose() {

        this.element.remove();
    }
}
/* =========================================================
   FIND HTML CONTAINER
   ========================================================= */

const container =
    document.getElementById(
        "second-dockview-container"
    );


if (!container) {

    throw new Error(
        "Second Dockview container was not found."
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


            /* -------------------------------------
               PANEL COMPONENT FACTORY
               ------------------------------------- */

            createComponent:
                (options) => {

                    switch (
                    options.name
                    ) {

                        case "fx-rates":

                            return new FxRatesPanel();


                        case "orders":

                            return new OrdersPanel();


                        case "vol-surface":

                            return new VolSurfacePanel();


                        case "empty":

                            return new EmptyPanel();


                        default:

                            return new EmptyPanel();
                    }

                },


            /* -------------------------------------
               ☰
               ------------------------------------- */

            createPrefixHeaderActionComponent:
                () =>
                    new MenuHeaderAction(),


            /* -------------------------------------
               +
               ------------------------------------- */

            createLeftHeaderActionComponent:
                () =>
                    new AddTabHeaderAction(),


            /* -------------------------------------
               ☆ ↗ ⛶
               ------------------------------------- */

            createRightHeaderActionComponent:
                () =>
                    new RightHeaderActions()

        }
    );
/* =========================================================
CALCULATE WORKSPACE HEIGHT
========================================================= */

const totalHeight =
    container.clientHeight;


const fxHeight =
    Math.floor(
        totalHeight * 0.35
    );


const ordersHeight =
    Math.floor(
        totalHeight * 0.30
    );


const volHeight =
    Math.floor(
        totalHeight * 0.35
    );


/* =========================================================
   PANEL 1
   FX RATES
   ========================================================= */

const fxPanel =
    dockview.addPanel({

        id:
            "fx-rates",

        component:
            "fx-rates",

        title:
            "FX Rates",

        initialHeight:
            fxHeight,

        minimumHeight:
            200

    });


/* =========================================================
   PANEL 2
   ORDERS
   BELOW FX RATES
   ========================================================= */

const ordersPanel =
    dockview.addPanel({

        id:
            "orders",

        component:
            "orders",

        title:
            "Orders",

        initialHeight:
            ordersHeight,

        minimumHeight:
            180,

        position: {

            referencePanel:
                fxPanel,

            direction:
                "below"
        }

    });


/* =========================================================
   POSITIONS TAB
   SAME GROUP AS ORDERS
   ========================================================= */

dockview.addPanel({

    id:
        "positions",

    component:
        "empty",

    title:
        "Positions",

    inactive:
        true,

    position: {

        referencePanel:
            ordersPanel,

        direction:
            "within"
    }

});


/* =========================================================
   PANEL 3
   VOL SURFACE
   BELOW ORDERS
   ========================================================= */

dockview.addPanel({

    id:
        "vol-surface",

    component:
        "vol-surface",

    title:
        "Vol Surface",

    initialHeight:
        volHeight,

    minimumHeight:
        210,

    position: {

        referencePanel:
            ordersPanel,

        direction:
            "below"
    }

});