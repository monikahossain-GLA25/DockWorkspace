import {
    themeLight,
    themeDark,
    themeVisualStudio,
    themeNord,
    themeCatppuccinMocha
} from "dockview";


/*
   STORAGE
    */

const LAYOUT_STORAGE_KEY =
    "dockworkspace-layout-v1";


/* 
   THEMES
 */

const workspaceThemes = {

    light: {

        label:
            "Light",

        theme:
            themeLight,

        scheme:
            "light"

    },


    dark: {

        label:
            "Dark",

        theme:
            themeDark,

        scheme:
            "dark"

    },


    "visual-studio": {

        label:
            "Visual Studio",

        theme:
            themeVisualStudio,

        scheme:
            "dark"

    },


    nord: {

        label:
            "Nord",

        theme:
            themeNord,

        scheme:
            "dark"

    },


    catppuccin: {

        label:
            "Catppuccin Mocha",

        theme:
            themeCatppuccinMocha,

        scheme:
            "dark"

    }

};


/*
   DEFAULT STATE
  */

const defaultSettings = {

    theme:
        "light",

    gap:
        0,

    spacing:
        0,

    padding:
        0,

    tabBarHeight:
        35,

    fontSize:
        13,


    /* 
       Drag and drop theme behaviour
       */

    dndOverlayMounting:
        "relative",

    dndPanelOverlay:
        "content",

    dndTabIndicator:
        "fill",

    dndOverlayBorder:
        "",


    /* 
       Dockview options
       */

    dndEnabled:
        true,

    floatingEnabled:
        true

};


/*
   MAIN SETUP
   */

export function setupControlsTheme(
    dockview,
    dockviewContainer
) {

    /* 
       DOM
    */

    const openButton =
        document.getElementById(
            "controls-theme-button"
        );


    const drawer =
        document.getElementById(
            "workspace-settings-drawer"
        );


    const backdrop =
        document.getElementById(
            "workspace-settings-backdrop"
        );


    const closeButton =
        document.getElementById(
            "settings-close-button"
        );


    const resetButton =
        document.getElementById(
            "settings-reset-button"
        );


    const quickThemeSelect =
        document.getElementById(
            "quick-theme-select"
        );


    const statusElement =
        document.getElementById(
            "control-status"
        );


    const activePanelElement =
        document.getElementById(
            "active-panel-id"
        );


    const activeGroupElement =
        document.getElementById(
            "active-group-id"
        );


    const activeGroupHeader =
        document.getElementById(
            "active-group-header"
        );


    if (
        !openButton ||
        !drawer ||
        !backdrop
    ) {

        console.warn(
            "Controls & Theme UI was not found."
        );

        return;

    }


    /* 
       STATE
        */

    const state = {

        ...defaultSettings

    };


    let generatedPanelNumber =
        0;


    /*
     * Capture the initial workspace after all normal panels
     * and the bottom edge group have been created.
     */

    const initialLayout =
        JSON.stringify(
            dockview.toJSON()
        );


    /* 
       STATUS MESSAGE
     */

    function setStatus(
        message
    ) {

        if (!statusElement) {

            return;

        }


        statusElement.textContent =
            message;


        window.clearTimeout(
            setStatus.timeoutId
        );


        setStatus.timeoutId =
            window.setTimeout(
                () => {

                    statusElement.textContent =
                        "";

                },
                2200
            );

    }


    /*
       DRAWER
      */

    function openDrawer() {

        drawer.classList.add(
            "open"
        );


        backdrop.classList.add(
            "open"
        );


        drawer.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    function closeDrawer() {

        drawer.classList.remove(
            "open"
        );


        backdrop.classList.remove(
            "open"
        );


        drawer.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    openButton.addEventListener(
        "click",
        openDrawer
    );


    closeButton?.addEventListener(
        "click",
        closeDrawer
    );


    backdrop.addEventListener(
        "click",
        closeDrawer
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeDrawer();

            }

        }
    );


    /* 
       THEME / CONTROLS TAB SWITCHING
        */

    const settingsTabs =
        drawer.querySelectorAll(
            "[data-settings-tab]"
        );


    const settingsPanes =
        drawer.querySelectorAll(
            "[data-settings-pane]"
        );


    function activateSettingsTab(
        tabName
    ) {

        settingsTabs.forEach(
            tab => {

                tab.classList.toggle(
                    "active",
                    tab.dataset.settingsTab ===
                    tabName
                );

            }
        );


        settingsPanes.forEach(
            pane => {

                pane.classList.toggle(
                    "active",
                    pane.dataset.settingsPane ===
                    tabName
                );

            }
        );

    }


    settingsTabs.forEach(
        tab => {

            tab.addEventListener(
                "click",
                () => {

                    activateSettingsTab(
                        tab.dataset.settingsTab
                    );

                }
            );

        }
    );


    /* 
       DOCKVIEW CSS VARIABLES
  */

    const variableInputs =
        drawer.querySelectorAll(
            "[data-dv-variable]"
        );


    function applyVariableInput(
        input
    ) {

        const variableName =
            input.dataset.dvVariable;


        const value =
            input.value.trim();


        if (
            value.length === 0
        ) {

            dockviewContainer
                .style
                .removeProperty(
                    variableName
                );

            return;

        }


        dockviewContainer
            .style
            .setProperty(
                variableName,
                value
            );

    }


    variableInputs.forEach(
        input => {

            input.addEventListener(
                "input",
                () => {

                    applyVariableInput(
                        input
                    );

                }
            );

        }
    );


    /*
       THEME BORDER
    */

    const borderInput =
        drawer.querySelector(
            "[data-theme-border]"
        );


    borderInput?.addEventListener(
        "input",
        () => {

            state.dndOverlayBorder =
                borderInput.value.trim();


            applyDockviewTheme();

        }
    );


    /* 
       APPLY THEME
       */

    function applyDockviewTheme() {

        const definition =
            workspaceThemes[
            state.theme
            ] ??
            workspaceThemes.light;


        const configuredTheme = {

            ...definition.theme,


            /* 
               Layout
              */

            gap:
                state.gap,


            /* 
               DnD controls
              */

            dndOverlayMounting:
                state.dndOverlayMounting,

            dndPanelOverlay:
                state.dndPanelOverlay,

            dndTabIndicator:
                state.dndTabIndicator

        };


        if (
            state.dndOverlayBorder
        ) {

            configuredTheme.dndOverlayBorder =
                state.dndOverlayBorder;

        }


        /* 
           Runtime Dockview options
          */

        dockview.updateOptions({

            theme:
                configuredTheme,

            disableDnd:
                !state.dndEnabled,

            disableFloatingGroups:
                !state.floatingEnabled,

            /*
             * Free Dockview overflow behaviour.
             */
            overflow: {

                mode:
                    "dropdown"

            }

        });


        /* 
           Custom Razor theme awareness
           */

        document.body.dataset.workspaceScheme =
            definition.scheme;


        document.body.dataset.workspaceTheme =
            state.theme;


        /* 
           Tab sizing
            */

        dockviewContainer.style.setProperty(
            "--dv-tabs-and-actions-container-height",
            `${state.tabBarHeight}px`
        );


        dockviewContainer.style.setProperty(
            "--dv-tabs-and-actions-container-font-size",
            `${state.fontSize}px`
        );


        /*
           Our own component wrappers
 */

        document.documentElement.style.setProperty(
            "--workspace-panel-spacing",
            `${state.spacing}px`
        );


        document.documentElement.style.setProperty(
            "--workspace-panel-padding",
            `${state.padding}px`
        );

    }


    /* 
       THEME PRESETS
       */

    const themeButtons =
        drawer.querySelectorAll(
            "[data-theme-key]"
        );


    function updateThemeUI() {

        themeButtons.forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.themeKey ===
                    state.theme
                );

            }
        );


        if (
            quickThemeSelect
        ) {

            quickThemeSelect.value =
                state.theme;

        }

    }


    function setTheme(
        themeKey
    ) {

        if (
            !workspaceThemes[
            themeKey
            ]
        ) {

            return;

        }


        state.theme =
            themeKey;


        updateThemeUI();


        applyDockviewTheme();

    }


    themeButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    setTheme(
                        button.dataset.themeKey
                    );

                }
            );

        }
    );


    quickThemeSelect?.addEventListener(
        "change",
        event => {

            setTheme(
                event.target.value
            );

        }
    );


    /* 
       SEGMENTED THEME CHOICES
       */

    const choiceButtons =
        drawer.querySelectorAll(
            "[data-theme-choice]"
        );


    function updateChoiceButtons() {

        choiceButtons.forEach(
            button => {

                const property =
                    button.dataset.themeChoice;


                const value =
                    button.dataset.themeValue;


                button.classList.toggle(
                    "active",
                    state[property] === value
                );

            }
        );

    }


    choiceButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const property =
                        button.dataset.themeChoice;


                    const value =
                        button.dataset.themeValue;


                    state[property] =
                        value;


                    updateChoiceButtons();


                    applyDockviewTheme();

                }
            );

        }
    );


    /* 
       RANGE CONTROLS
        */

    const rangeControls =
        drawer.querySelectorAll(
            "[data-layout-control]"
        );


    const outputMap = {

        gap:
            "layout-gap-value",

        spacing:
            "layout-spacing-value",

        padding:
            "layout-padding-value",

        tabBarHeight:
            "tab-bar-height-value",

        fontSize:
            "workspace-font-size-value"

    };


    function updateOutput(
        key,
        value
    ) {

        const id =
            outputMap[key];


        if (!id) {

            return;

        }


        const output =
            document.getElementById(
                id
            );


        if (
            output
        ) {

            output.textContent =
                `${value}px`;

        }

    }


    rangeControls.forEach(
        control => {

            control.addEventListener(
                "input",
                () => {

                    const key =
                        control.dataset.layoutControl;


                    const value =
                        Number(
                            control.value
                        );


                    if (
                        !Object.prototype.hasOwnProperty.call(
                            state,
                            key
                        )
                    ) {

                        return;

                    }


                    state[key] =
                        value;


                    updateOutput(
                        key,
                        value
                    );


                    applyDockviewTheme();

                }
            );

        }
    );


    /* 
       VIEW OPTIONS
        */

    const dockOptionInputs =
        drawer.querySelectorAll(
            "[data-dock-option]"
        );


    dockOptionInputs.forEach(
        input => {

            input.addEventListener(
                "change",
                () => {

                    const key =
                        input.dataset.dockOption;


                    state[key] =
                        input.checked;


                    applyDockviewTheme();

                }
            );

        }
    );


    /* 
       ACTIVE PANEL / GROUP
    */

    function refreshActiveInformation() {

        const activePanel =
            dockview.activePanel;


        const activeGroup =
            dockview.activeGroup;


        if (
            activePanelElement
        ) {

            activePanelElement.textContent =
                activePanel?.id ??
                "none";

        }


        if (
            activeGroupElement
        ) {

            activeGroupElement.textContent =
                activeGroup?.id ??
                "none";

        }


        if (
            activeGroupHeader &&
            activeGroup
        ) {

            activeGroupHeader.value =
                activeGroup
                    .api
                    .getHeaderPosition();

        }

    }


    dockview.onDidActivePanelChange(
        () => {

            refreshActiveInformation();

        }
    );


    dockview.onDidActiveGroupChange(
        () => {

            refreshActiveInformation();

        }
    );


    activeGroupHeader?.addEventListener(
        "change",
        () => {

            const activeGroup =
                dockview.activeGroup;


            if (!activeGroup) {

                return;

            }


            activeGroup
                .api
                .setHeaderPosition(
                    activeGroupHeader.value
                );

        }
    );


    /* 
       ADD EMPTY PANEL
       */

    function addEmptyPanel() {

        generatedPanelNumber++;


        const activePanel =
            dockview.activePanel;


        const id =
            `dynamic-panel-${Date.now()}-${generatedPanelNumber}`;


        const title =
            `Tab ${generatedPanelNumber}`;


        if (
            activePanel
        ) {

            dockview.addPanel({

                id:
                    id,

                component:
                    "empty",

                title:
                    title,

                position: {

                    referencePanel:
                        activePanel,

                    direction:
                        "within"

                }

            });

        }
        else {

            dockview.addPanel({

                id:
                    id,

                component:
                    "empty",

                title:
                    title

            });

        }


        setStatus(
            `${title} added`
        );

    }


    /* 
       ADD NEW GROUP
   */

    function addNewGroup() {

        generatedPanelNumber++;


        const newGroup =
            dockview.addGroup({

                direction:
                    "right"

            });


        dockview.addPanel({

            id:
                `group-panel-${Date.now()}-${generatedPanelNumber}`,

            component:
                "empty",

            title:
                `Tab ${generatedPanelNumber}`,

            position: {

                referenceGroup:
                    newGroup

            }

        });


        setStatus(
            "New group added"
        );

    }


    /* 
       SAVE / LOAD / RESET LAYOUT
       */

    const layoutButtons =
        drawer.querySelectorAll(
            "[data-layout-action]"
        );


    layoutButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const action =
                        button.dataset.layoutAction;


                    /* 
                       SAVE
                      */

                    if (
                        action === "save"
                    ) {

                        localStorage.setItem(
                            LAYOUT_STORAGE_KEY,
                            JSON.stringify(
                                dockview.toJSON()
                            )
                        );


                        setStatus(
                            "Layout saved"
                        );


                        return;

                    }


                    /* 
                       LOAD
                        */

                    if (
                        action === "load"
                    ) {

                        const savedLayout =
                            localStorage.getItem(
                                LAYOUT_STORAGE_KEY
                            );


                        if (!savedLayout) {

                            setStatus(
                                "No saved layout"
                            );

                            return;

                        }


                        try {

                            dockview.fromJSON(
                                JSON.parse(
                                    savedLayout
                                )
                            );


                            setStatus(
                                "Layout loaded"
                            );

                        }
                        catch (
                        error
                        ) {

                            console.error(
                                error
                            );


                            setStatus(
                                "Layout could not be loaded"
                            );

                        }


                        return;

                    }


                    /*
                       CLEAR SAVED LAYOUT
             */

                    if (
                        action === "clear-saved"
                    ) {

                        localStorage.removeItem(
                            LAYOUT_STORAGE_KEY
                        );


                        setStatus(
                            "Saved layout cleared"
                        );


                        return;

                    }


                    /* 
                       RESET TO INITIAL LAYOUT
                       */

                    if (
                        action === "reset-layout"
                    ) {

                        dockview.fromJSON(
                            JSON.parse(
                                initialLayout
                            )
                        );


                        setStatus(
                            "Layout reset"
                        );


                        return;

                    }


                    /*
                       ADD PANEL
                      */

                    if (
                        action === "add-panel"
                    ) {

                        addEmptyPanel();

                        return;

                    }


                    /* 
                       ADD GROUP
                      */

                    if (
                        action === "add-group"
                    ) {

                        addNewGroup();

                    }

                }
            );

        }
    );


    /* 
       RESET THEME / SETTINGS
   */

    function resetSettings() {

        Object.assign(
            state,
            defaultSettings
        );


        /* 
           Reset ranges
  */

        rangeControls.forEach(
            control => {

                const key =
                    control.dataset.layoutControl;


                control.value =
                    state[key];


                updateOutput(
                    key,
                    state[key]
                );

            }
        );


        /*
           Reset Dockview variable overrides
           */

        variableInputs.forEach(
            input => {

                const variableName =
                    input.dataset.dvVariable;


                input.value =
                    "";


                dockviewContainer
                    .style
                    .removeProperty(
                        variableName
                    );

            }
        );


        /* 
           Reset border override
       - */

        if (
            borderInput
        ) {

            borderInput.value =
                "";

        }


        /* 
           Reset checkboxes
          */

        dockOptionInputs.forEach(
            input => {

                const key =
                    input.dataset.dockOption;


                input.checked =
                    Boolean(
                        state[key]
                    );

            }
        );


        updateThemeUI();


        updateChoiceButtons();


        applyDockviewTheme();


        setStatus(
            "Theme settings reset"
        );

    }


    resetButton?.addEventListener(
        "click",
        resetSettings
    );


    /* 
       INITIALIZE
 */

    activateSettingsTab(
        "theme"
    );


    updateThemeUI();


    updateChoiceButtons();


    refreshActiveInformation();


    applyDockviewTheme();

}