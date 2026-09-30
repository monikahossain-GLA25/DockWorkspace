import {
    themeLight,
    themeDark,
    themeVisualStudio,
    themeNord,
    themeCatppuccinMocha
} from "dockview";


/* 
   AVAILABLE THEMES


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
   DEFAULT SETTINGS
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
        13

};


/* 
   MAIN SETUP
  */

export function setupControlsTheme(
    dockview,
    dockviewContainer
) {

    /* 
       ELEMENTS
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


    /*
       OPEN DRAWER
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


    /*
       CLOSE DRAWER
       */

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
       DRAWER TAB SWITCHING
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
       APPLY CURRENT DOCKVIEW THEME
     */

    function applyDockviewTheme() {

        const definition =
            workspaceThemes[
            state.theme
            ] ??
            workspaceThemes.light;


        /*
         * Dockview's gap is part of the theme object.
         */

        const configuredTheme = {

            ...definition.theme,

            gap:
                state.gap

        };


        /*
         * Runtime theme update.
         */

        dockview.updateOptions({

            theme:
                configuredTheme

        });


        /*
         * Help our custom Razor content know whether
         * the current theme is light or dark.
         */

        document.body.dataset.workspaceScheme =
            definition.scheme;


        document.body.dataset.workspaceTheme =
            state.theme;


        /*
         * Tab dimensions are controlled by Dockview
         * CSS variables.
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
         * App-level panel spacing and padding.
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
       THEME BUTTON UI
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
       RANGE CONTROLS
     */

    const rangeControls =
        drawer.querySelectorAll(
            "[data-layout-control]"
        );


    function updateOutput(
        key,
        value
    ) {

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


        const output =
            document.getElementById(
                outputMap[key]
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


    /* =
       RESET
    */

    function resetSettings() {

        Object.assign(
            state,
            defaultSettings
        );


        /*
         * Reset range inputs.
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


        updateThemeUI();


        applyDockviewTheme();

    }


    resetButton?.addEventListener(
        "click",
        resetSettings
    );


    /* =====================================================
       INITIAL STATE
       ===================================================== */

    activateSettingsTab(
        "theme"
    );


    updateThemeUI();


    applyDockviewTheme();

}