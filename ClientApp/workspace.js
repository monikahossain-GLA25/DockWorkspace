import {
    DockviewComponent,
    themeLight
} from "dockview";


/* 
   LEFT WORKSPACE COMPONENTS
 */

import {
    setupCorrelation
} from "./js/components/correlation.js";


import {
    setupOrderBook
} from "./js/components/order-book.js";


/*
   MIDDLE WORKSPACE COMPONENTS
*/

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


/* 
   RIGHT WORKSPACE COMPONENTS
 */

import {
    setupNews
} from "./js/components/news.js";


import {
    setupTechView
} from "./js/components/tech-view.js";

import {
    setupControlsTheme
} from "./js/components/controls-theme.js";



/* 
   TAB CONTEXT MENU
 */

import {
    createTabContextMenuItems
} from "./js/components/tab-context-menu.js";













//04.10.2026
/* 
   BOTTOM TOOL WORKSPACE
 */

import {
    setupLogs
} from "./js/components/logs.js";


import {
    setupTerminal
} from "./js/components/terminal.js";


import {
    setupOutput
} from "./js/components/output.js";


import {
    setupProblems
} from "./js/components/problems.js";


/* 
   GLOBAL VARIABLES
 */

let newTabNumber = 0;


/*
   BLANK PANEL

   Only used as a safe fallback.
   */

class BlankPanel {

    constructor() {

        this.element =
            document.createElement(
                "div"
            );


        this.element.className =
            "blank-panel";
    }


    init() {

        this.element.innerHTML =
            "";
    }

}


/* 
   EMPTY PANEL

*/

class EmptyPanel {

    constructor() {

        this.element =
            document.createElement(
                "div"
            );


        this.element.className =
            "demo-empty-panel";
    }


    init() {

        this.element.innerHTML =
            "";
    }

}


/* =========================================================
   TEMPLATE PANEL

   
    */

class TemplatePanel {

    constructor(
        templateId
    ) {

        this.templateId =
            templateId;


        /* 
           OUTER HOST

           Spacing is applied here.
       = */

        this.element =
            document.createElement(
                "div"
            );


        this.element.className =
            "dock-panel-host";


        /* 
           INNER CONTENT

           Padding is applied here.
            */

        this.contentElement =
            document.createElement(
                "div"
            );


        this.contentElement.className =
            "dock-panel-content";


        this.element.appendChild(
            this.contentElement
        );

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


        this.contentElement.appendChild(
            content
        );


        /* 
           COMPONENT JS
            */

        switch (
        this.templateId
        ) {


            case "correlation-template":

                setupCorrelation(
                    this.contentElement
                );

                break;


            case "orderbook-template":

                setupOrderBook(
                    this.contentElement
                );

                break;


            case "fxrates-template":

                setupFxRates(
                    this.contentElement
                );

                break;


            case "orders-template":

                setupOrders(
                    this.contentElement
                );

                break;


            case "positions-template":

                setupPositions(
                    this.contentElement
                );

                break;


            case "volsurface-template":

                setupVolSurface(
                    this.contentElement
                );

                break;


            case "news-template":

                setupNews(
                    this.contentElement
                );

                break;


            case "techview-template":

                setupTechView(
                    this.contentElement
                );

                break;



            /* 
            BOTTOM TOOL WORKSPACE
             */

            case "logs-template":

                setupLogs(
                    this.contentElement
                );

                break;


            case "terminal-template":

                setupTerminal(
                    this.contentElement
                );

                break;


            case "output-template":

                setupOutput(
                    this.contentElement
                );

                break;


            case "problems-template":

                setupProblems(
                    this.contentElement
                );

                break;








            default:

                break;

        }

    }

}

/* 
   HEADER ACTION
 */

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
   HEADER ACTION
   + ADD TAB
   */

class AddTabHeaderAction {

    constructor() {

        this.element =
            document.createElement(
                "div"
            );


        this.element.className =
            "header-action-container";
    }


    init(
        parameters
    ) {

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


/* 
   HEADER ACTION
   EXPAND / RESTORE
 */

class RightHeaderActions {

    constructor() {

        this.element =
            document.createElement(
                "div"
            );


        this.element.className =
            "right-header-actions";
    }


    init(
        parameters
    ) {

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


                /*
                   Restore
                   */

                if (
                    panel.api.isMaximized()
                ) {

                    panel.api.exitMaximized();

                    return;

                }


                /* 
                   Expand
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
   FIND DOCKVIEW CONTAINER
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
            RIGHT-CLICK TAB MENU
             */

            getTabContextMenuItems:
                params =>
                    createTabContextMenuItems(
                        params
                    ),



            /* 
               COMPONENT FACTORY
               */

            createComponent:
                options => {

                    switch (
                    options.name
                    ) {


                        /* 
                           LEFT WORKSPACE
                           */

                        case "correlation":

                            return new TemplatePanel(
                                "correlation-template"
                            );


                        case "order-book":

                            return new TemplatePanel(
                                "orderbook-template"
                            );


                        /* 
                           MIDDLE WORKSPACE
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
                           RIGHT WORKSPACE
                           */

                        case "news":

                            return new TemplatePanel(
                                "news-template"
                            );


                        case "tech-view":

                            return new TemplatePanel(
                                "techview-template"
                            );


                        /* 10.04.2026 */
                        /*
                           BOTTOM TOOL WORKSPACE
                           */

                        case "logs":

                            return new TemplatePanel(
                                "logs-template"
                            );


                        case "terminal":

                            return new TemplatePanel(
                                "terminal-template"
                            );


                        case "output":

                            return new TemplatePanel(
                                "output-template"
                            );


                        case "problems":

                            return new TemplatePanel(
                                "problems-template"
                            );

                        /* 
                           DYNAMIC TABS
                       */

                        case "empty":

                            return new EmptyPanel();


                        /* 
                           FALLBACK
                        */

                        case "blank":

                            return new BlankPanel();


                        default:

                            return new BlankPanel();

                    }

                },


            /* 
                BEFORE TABS
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
               ⛶ RIGHT SIDE
              = */

            createRightHeaderActionComponent:
                () =>
                    new RightHeaderActions()

        }
    );


/*
   WORKSPACE DIMENSIONS
 */

const workspaceWidth =
    container.clientWidth;


const workspaceHeight =
    container.clientHeight;


/* 
   COLUMN WIDTHS

   LEFT   = 30%
   MIDDLE = 47%
   RIGHT  = 23%
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
   MIDDLE COLUMN

   FX Rates
   Orders / Positions
   Vol Surface
 */

const middleRowHeight =
    Math.floor(
        workspaceHeight / 3
    );


/* 
   RIGHT COLUMN

   News
   Tech View
 */

const newsHeight =
    Math.floor(
        workspaceHeight * 0.55
    );


const techViewHeight =
    workspaceHeight -
    newsHeight;


/* 
   1. LEFT TOP
   CORRELATION
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
   2. MIDDLE TOP
   FX RATES
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
   3. RIGHT TOP
   NEWS
    */

const newsPanel =
    dockview.addPanel({

        id:
            "news",

        component:
            "news",

        title:
            "News",

        initialWidth:
            rightWidth,

        initialHeight:
            newsHeight,

        position: {

            referencePanel:
                fxRates,

            direction:
                "right"

        }

    });


/*
   4. RIGHT BOTTOM
   TECH VIEW
 */

const techView =
    dockview.addPanel({

        id:
            "tech-view",

        component:
            "tech-view",

        title:
            "Tech View",

        initialHeight:
            techViewHeight,

        position: {

            referencePanel:
                newsPanel,

            direction:
                "below"

        }

    });


/* 
   5. LEFT BOTTOM
   ORDER BOOK
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
   6. MIDDLE CENTER
   ORDERS
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


/* 
   7. POSITIONS

   Same Dockview group as Orders.

   Result:

   Orders | Positions | +
   */

const positions =
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
   8. MIDDLE BOTTOM
   VOL SURFACE
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


/* 
BOTTOM EDGE TOOL GROUP

FREE Dockview Edge Group.

Expanded:
   normal bottom tool panel

Collapsed:
   only the bottom tab strip remains

= */

const bottomToolsGroup =
    dockview.addEdgeGroup(
        "bottom",
        {

            id:
                "bottom-tools-group",

            /*
             * Height when expanded.
             */
            initialSize:
                180,

            /*
             * User cannot shrink expanded panel
             * below this size.
             */
            minimumSize:
                90,

            /*
             * Avoid covering too much of the
             * main workspace.
             */
            maximumSize:
                Math.max(
                    220,
                    Math.floor(
                        workspaceHeight * 0.45
                    )
                ),

            /*
             * Height of the bottom footer strip
             * while collapsed.
             */
            collapsedSize:
                30

        }
    );


/* 
  
panel content

   Logs | Terminal | Output | Problems
 */

bottomToolsGroup.setHeaderPosition(
    "bottom"
);


/* 
   LOGS
   */

const logsPanel =
    dockview.addPanel({

        id:
            "logs",

        component:
            "logs",

        title:
            "Logs",

        position: {

            referenceGroup:
                bottomToolsGroup.id

        }

    });


/* 
   TERMINAL
 */

dockview.addPanel({

    id:
        "terminal",

    component:
        "terminal",

    title:
        "Terminal",

    inactive:
        true,

    position: {

        referenceGroup:
            bottomToolsGroup.id

    }

});


/* 
   OUTPUT
   */

dockview.addPanel({

    id:
        "output",

    component:
        "output",

    title:
        "Output",

    inactive:
        true,

    position: {

        referenceGroup:
            bottomToolsGroup.id

    }

});


/* 
   PROBLEMS
   */

dockview.addPanel({

    id:
        "problems",

    component:
        "problems",

    title:
        "Problems",

    inactive:
        true,

    position: {

        referenceGroup:
            bottomToolsGroup.id

    }

});


/* 
   START COLLAPSED
    Dockview expands an edge group when new panels
   are added so collapsing here ensures the page
   starts in footer-strip mode.
   */

window.addEventListener(
    "dockworkspace:collapse-bottom",
    () => {

        const currentBottomGroup =
            dockview.getEdgeGroup(
                "bottom"
            );


        currentBottomGroup?.collapse();

    }
);


/* 
   CUSTOM COLLAPSE EVENT

   The small ▾ and × buttons inside our Razor
   partials send this event.
 */

window.addEventListener(
    "dockworkspace:collapse-bottom",
    () => {

        bottomToolsGroup.collapse();

    }
);


/* 
CONTROLS & THEME
 */

setupControlsTheme(
    dockview,
    container
);
