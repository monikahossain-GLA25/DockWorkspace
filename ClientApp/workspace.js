import {
    DockviewComponent,
    themeLight
} from "dockview";


/* =========================================================
   EXPLORER PANEL
   ========================================================= */

class ExplorerPanel {

    constructor() {

        this.element = document.createElement("div");

        this.element.className = "explorer-content";

        this.element.innerHTML = `
            <h3 class="explorer-heading">
                Explorer
            </h3>

            <div class="explorer-menu">

                <button class="explorer-item"
                        type="button">

                    <span class="explorer-icon">□</span>

                    <span>Dashboard</span>

                </button>


                <button class="explorer-item"
                        type="button">

                    <span class="explorer-icon">□</span>

                    <span>News</span>

                </button>


                <button class="explorer-item"
                        type="button">

                    <span class="explorer-icon">□</span>

                    <span>Reports</span>

                </button>


                <button class="explorer-item"
                        type="button">

                    <span class="explorer-icon">□</span>

                    <span>Markets</span>

                </button>


                <button class="explorer-item"
                        type="button">

                    <span class="explorer-icon">□</span>

                    <span>Settings</span>

                </button>

            </div>
        `;
    }
}


/* =========================================================
   EMPTY CENTRAL PANEL
   ========================================================= */

class EmptyWorkspacePanel {

    constructor() {

        this.element = document.createElement("div");

        this.element.className = "empty-workspace";

        this.element.innerHTML = `
            <span class="empty-workspace-text">
                Empty Workspace
            </span>
        `;
    }
}


/* =========================================================
   FIND THE HTML HOST
   ========================================================= */

const container =
    document.getElementById("dockview-container");


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

            theme: themeLight,

            createComponent: (options) => {

                switch (options.name) {

                    case "explorer":

                        return new ExplorerPanel();


                    case "empty-workspace":

                        return new EmptyWorkspacePanel();


                    default:

                        return new EmptyWorkspacePanel();
                }
            }

        }
    );


/* =========================================================
   CREATE CENTRAL WORKSPACE FIRST
   ========================================================= */

const mainPanel =
    dockview.addPanel({

        id: "main-workspace",

        component: "empty-workspace",

        title: "Workspace"

    });


/*
    For Milestone 1 we do not want a tab header
    above our blank central workspace.
*/

mainPanel.group.header.hidden = true;


/* =========================================================
   CREATE LEFT EDGE GROUP
   ========================================================= */

const leftGroup =
    dockview.addEdgeGroup(
        "left",
        {

            id: "left-explorer-group",

            initialSize: 240,

            minimumSize: 180,

            maximumSize: 360,

            collapsedSize: 30

        }
    );


/* =========================================================
   PUT EXPLORER PANEL INSIDE LEFT EDGE GROUP
   ========================================================= */

const explorerPanel =
    dockview.addPanel({

        id: "explorer",

        component: "explorer",

        title: "Explorer",

        position: {

            referenceGroup: leftGroup.id

        }

    });


/* =========================================================
   PUT EXPLORER TAB VERTICALLY ON LEFT
   ========================================================= */

explorerPanel.group.api.setHeaderPosition(
    "left"
);


/* =========================================================
   START WITH THE EXPLORER COLLAPSED
   Like the screenshot.
   ========================================================= */

leftGroup.collapse();