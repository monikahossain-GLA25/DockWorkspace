import {
    themeLight,
    themeDark,
    themeVisualStudio,
    themeNord,
    themeCatppuccinMocha
} from "dockview";


const LAYOUT_STORAGE_KEY =
    "dockworkspace-layout-v1";


/* =========================================================
   THEMES
   ========================================================= */

const workspaceThemes = {

    light: {
        label: "Light",
        theme: themeLight,
        scheme: "light"
    },

    dark: {
        label: "Dark",
        theme: themeDark,
        scheme: "dark"
    },

    "visual-studio": {
        label: "Visual Studio",
        theme: themeVisualStudio,
        scheme: "dark"
    },

    nord: {
        label: "Nord",
        theme: themeNord,
        scheme: "dark"
    },

    catppuccin: {
        label: "Catppuccin Mocha",
        theme: themeCatppuccinMocha,
        scheme: "dark"
    }

};


/* =========================================================
   DEFAULT SETTINGS
   ========================================================= */

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


    /* =====================================================
       DRAG & DROP THEME SETTINGS
       ===================================================== */

    dndOverlayMounting:
        "relative",

    dndPanelOverlay:
        "content",

    dndTabIndicator:
        "fill",

    dndOverlayBorder:
        "",


    /* =====================================================
       DOCKVIEW OPTIONS
       ===================================================== */

    dndEnabled:
        true,

    floatingEnabled:
        true

};


/* =========================================================
   MAIN SETUP
   ========================================================= */

export function setupControlsTheme(
    dockview,
    dockviewContainer
) {

    /* =====================================================
       DOM
       ===================================================== */

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


    /* =====================================================
       STATE
       ===================================================== */

    const state = {
        ...defaultSettings
    };


    /*
     * Stores custom values from:
     *
     * Backgrounds
     * Active Group Tabs
     * Inactive Group Tabs
     *
     * This is important because custom colours should remain
     * after switching Light -> Dark -> Nord etc.
     */
    const themeVariableOverrides =
        new Map();


    let generatedPanelNumber =
        0;


    /*
     * setupControlsTheme() is called after the normal
     * Dockview layout has been created.
     *
     * Therefore this is the original/default layout used
     * by Controls -> Reset.
     */
    const initialLayout =
        JSON.stringify(
            dockview.toJSON()
        );


    /* =====================================================
       STATUS MESSAGE
       ===================================================== */

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


    /* =====================================================
       DRAWER
       ===================================================== */

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


        /*
         * Make sure all current Dockview values are shown
         * when the drawer opens.
         */
        requestAnimationFrame(
            () => {

                syncAllVariableControls();

                refreshActiveInformation();

            }
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


    /* =====================================================
       THEME / CONTROLS MAIN TAB SWITCHING
       ===================================================== */

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


    /* =====================================================
       DOCKVIEW CSS VARIABLES

       Handles:

       Drag-over background
       Backgrounds
       Active Group Tabs
       Inactive Group Tabs

       This works with BOTH:

       old version:
       <input data-dv-variable="..." />

       new version:
       color square + text + X reset
       ===================================================== */

    const variableInputs =
        drawer.querySelectorAll(
            "[data-dv-variable]"
        );


    const colorPickers =
        drawer.querySelectorAll(
            "[data-color-variable]"
        );


    const clearVariableButtons =
        drawer.querySelectorAll(
            "[data-clear-variable]"
        );


    /* =====================================================
       FIND DOCKVIEW THEME TARGETS
       ===================================================== */

    function getDockviewThemeTargets() {

        const targets =
            new Set();


        /*
         * Always include main Dockview container.
         */
        targets.add(
            dockviewContainer
        );


        /*
         * Dockview applies its actual theme class inside
         * its rendered structure.
         *
         * We apply variables there too so the built-in
         * theme cannot override our custom value.
         */
        dockviewContainer
            .querySelectorAll(
                '[class*="dockview-theme-"]'
            )
            .forEach(
                element => {

                    targets.add(
                        element
                    );

                }
            );


        return [
            ...targets
        ];

    }


    /* =====================================================
       SET ONE DOCKVIEW CSS VARIABLE
       ===================================================== */

    function setDockviewVariable(
        variableName,
        value,
        remember = true
    ) {

        const cleanValue =
            String(
                value ?? ""
            )
                .trim();


        if (
            remember
        ) {

            if (
                cleanValue
            ) {

                themeVariableOverrides.set(
                    variableName,
                    cleanValue
                );

            }
            else {

                themeVariableOverrides.delete(
                    variableName
                );

            }

        }


        getDockviewThemeTargets()
            .forEach(
                target => {

                    if (
                        cleanValue
                    ) {

                        target.style.setProperty(
                            variableName,
                            cleanValue
                        );

                    }
                    else {

                        target.style.removeProperty(
                            variableName
                        );

                    }

                }
            );

    }


    /* =====================================================
       READ CURRENT CSS VARIABLE
       ===================================================== */

    function getCurrentDockviewVariable(
        variableName
    ) {

        const targets =
            getDockviewThemeTargets();


        /*
         * Prefer the real Dockview theme element.
         *
         * If none is found use the normal container.
         */
        const themeTarget =
            targets.find(
                target =>

                    target !==
                    dockviewContainer &&

                    target.matches?.(
                        '[class*="dockview-theme-"]'
                    )
            ) ??
            dockviewContainer;


        return getComputedStyle(
            themeTarget
        )
            .getPropertyValue(
                variableName
            )
            .trim();

    }


    /* =====================================================
       RGB -> HEX
       ===================================================== */

    function rgbToHex(
        red,
        green,
        blue
    ) {

        const toHex =
            value =>

                Math.max(
                    0,
                    Math.min(
                        255,
                        Number(
                            value
                        )
                    )
                )
                    .toString(16)
                    .padStart(
                        2,
                        "0"
                    );


        return (

            "#" +

            toHex(
                red
            ) +

            toHex(
                green
            ) +

            toHex(
                blue
            )

        );

    }


    /* =====================================================
       NORMALIZE VALUE FOR HTML COLOR PICKER
       ===================================================== */

    function normalizePickerColor(
        value
    ) {

        const cleanValue =
            String(
                value ?? ""
            )
                .trim();


        if (
            !cleanValue
        ) {

            return null;

        }


        /* #fff */

        if (
            /^#[0-9a-f]{3}$/i.test(
                cleanValue
            )
        ) {

            return (

                "#" +

                cleanValue[1] +
                cleanValue[1] +

                cleanValue[2] +
                cleanValue[2] +

                cleanValue[3] +
                cleanValue[3]

            );

        }


        /* #ffffff */

        if (
            /^#[0-9a-f]{6}$/i.test(
                cleanValue
            )
        ) {

            return cleanValue;

        }


        /*
         * #ffffff80
         *
         * HTML type=color does not represent alpha.
         * Use only the RGB section in its square.
         */

        if (
            /^#[0-9a-f]{8}$/i.test(
                cleanValue
            )
        ) {

            return cleanValue.substring(
                0,
                7
            );

        }


        /*
         * rgb(...)
         * rgba(...)
         */

        const rgbMatch =
            cleanValue.match(

                /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/i

            );


        if (
            rgbMatch
        ) {

            return rgbToHex(
                rgbMatch[1],
                rgbMatch[2],
                rgbMatch[3]
            );

        }


        return null;

    }


    /* =====================================================
       SYNC ONE THEME VARIABLE ROW
       ===================================================== */

    function syncVariableControl(
        variableName
    ) {

        const textInput =
            drawer.querySelector(

                `[data-dv-variable="${variableName}"]`

            );


        const colorPicker =
            drawer.querySelector(

                `[data-color-variable="${variableName}"]`

            );


        const currentValue =

            themeVariableOverrides.get(
                variableName
            ) ??

            getCurrentDockviewVariable(
                variableName
            );


        if (
            textInput
        ) {

            textInput.value =
                currentValue;

        }


        if (
            colorPicker
        ) {

            const pickerColor =
                normalizePickerColor(
                    currentValue
                );


            if (
                pickerColor
            ) {

                colorPicker.value =
                    pickerColor;

            }

        }

    }


    /* =====================================================
       SYNC ALL VARIABLE ROWS
       ===================================================== */

    function syncAllVariableControls() {

        variableInputs.forEach(
            input => {

                syncVariableControl(
                    input.dataset.dvVariable
                );

            }
        );

    }


    /* =====================================================
       REAPPLY USER COLOUR OVERRIDES
       ===================================================== */

    function reapplyThemeVariableOverrides() {

        themeVariableOverrides.forEach(
            (
                value,
                variableName
            ) => {

                setDockviewVariable(
                    variableName,
                    value,
                    false
                );

            }
        );

    }


    /* =====================================================
       TEXT FIELD CHANGES
       ===================================================== */

    variableInputs.forEach(
        input => {

            input.addEventListener(
                "input",
                () => {

                    const variableName =
                        input.dataset.dvVariable;


                    const value =
                        input.value;


                    setDockviewVariable(
                        variableName,
                        value
                    );


                    /*
                     * If this row also has a color square,
                     * keep the square synchronized.
                     */
                    const colorPicker =
                        drawer.querySelector(

                            `[data-color-variable="${variableName}"]`

                        );


                    const pickerColor =
                        normalizePickerColor(
                            value
                        );


                    if (
                        colorPicker &&
                        pickerColor
                    ) {

                        colorPicker.value =
                            pickerColor;

                    }

                }
            );

        }
    );


    /* =====================================================
       COLOR PICKER CHANGES
       ===================================================== */

    colorPickers.forEach(
        picker => {

            picker.addEventListener(
                "input",
                () => {

                    const variableName =
                        picker.dataset.colorVariable;


                    const value =
                        picker.value;


                    const textInput =
                        drawer.querySelector(

                            `[data-dv-variable="${variableName}"]`

                        );


                    if (
                        textInput
                    ) {

                        textInput.value =
                            value;

                    }


                    setDockviewVariable(
                        variableName,
                        value
                    );

                }
            );

        }
    );


    /* =====================================================
       × RESET ONE VARIABLE
       ===================================================== */

    clearVariableButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const variableName =
                        button.dataset.clearVariable;


                    themeVariableOverrides.delete(
                        variableName
                    );


                    setDockviewVariable(
                        variableName,
                        "",
                        false
                    );


                    /*
                     * Show the original current theme value
                     * again after removing the custom value.
                     */
                    requestAnimationFrame(
                        () => {

                            syncVariableControl(
                                variableName
                            );

                        }
                    );

                }
            );

        }
    );


    /* =====================================================
       DRAG-OVER BORDER
       ===================================================== */

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


    /* =====================================================
       APPLY DOCKVIEW THEME
       ===================================================== */

    function applyDockviewTheme() {

        const definition =

            workspaceThemes[
            state.theme
            ] ??

            workspaceThemes.light;


        const configuredTheme = {

            ...definition.theme,


            /* Layout */

            gap:
                state.gap,


            /* Drag & Drop */

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


        /* =================================================
           UPDATE DOCKVIEW OPTIONS
           ================================================= */

        dockview.updateOptions({

            theme:
                configuredTheme,

            disableDnd:
                !state.dndEnabled,

            disableFloatingGroups:
                !state.floatingEnabled

        });


        /* =================================================
           OUR CUSTOM RAZOR THEME SUPPORT
           ================================================= */

        document.body.dataset.workspaceScheme =
            definition.scheme;


        document.body.dataset.workspaceTheme =
            state.theme;


        /* =================================================
           TAB BAR
           ================================================= */

        dockviewContainer.style.setProperty(

            "--dv-tabs-and-actions-container-height",

            `${state.tabBarHeight}px`

        );


        dockviewContainer.style.setProperty(

            "--dv-tabs-and-actions-container-font-size",

            `${state.fontSize}px`

        );


        /* =================================================
           CUSTOM PANEL WRAPPERS
           ================================================= */

        document.documentElement.style.setProperty(

            "--workspace-panel-spacing",

            `${state.spacing}px`

        );


        document.documentElement.style.setProperty(

            "--workspace-panel-padding",

            `${state.padding}px`

        );


        /*
         * Changing Dockview's built-in theme may replace
         * theme-level CSS variables.
         *
         * Reapply Background / Active / Inactive values.
         */

        requestAnimationFrame(
            () => {

                reapplyThemeVariableOverrides();

                syncAllVariableControls();

            }
        );

    }


    /* =====================================================
       THEME PRESET BUTTONS
       ===================================================== */

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


    /* =====================================================
       DRAG & DROP SEGMENTED OPTIONS
       ===================================================== */

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

                    state[property] ===
                    value

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


                    if (
                        !Object.prototype.hasOwnProperty.call(
                            state,
                            property
                        )
                    ) {

                        return;

                    }


                    state[property] =
                        value;


                    updateChoiceButtons();


                    applyDockviewTheme();

                }
            );

        }
    );


    /* =====================================================
       RANGE CONTROLS
       ===================================================== */

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
            outputMap[
            key
            ];


        if (
            !id
        ) {

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


    /* =====================================================
       VIEW OPTIONS
       ===================================================== */

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


                    if (
                        !Object.prototype.hasOwnProperty.call(
                            state,
                            key
                        )
                    ) {

                        return;

                    }


                    state[key] =
                        input.checked;


                    applyDockviewTheme();

                }
            );

        }
    );


    /* =====================================================
       ACTIVE PANEL / ACTIVE GROUP
       ===================================================== */

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


            if (
                !activeGroup
            ) {

                return;

            }


            activeGroup
                .api
                .setHeaderPosition(

                    activeGroupHeader.value

                );

        }
    );


    /* =====================================================
       ADD EMPTY PANEL
       ===================================================== */

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


    /* =====================================================
       ADD GROUP
       ===================================================== */

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


    /* =====================================================
       SAVE / LOAD / RESET LAYOUT
       ===================================================== */

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


                    /* =================================================
                       SAVE
                       ================================================= */

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


                    /* =================================================
                       LOAD
                       ================================================= */

                    if (
                        action === "load"
                    ) {

                        const savedLayout =
                            localStorage.getItem(

                                LAYOUT_STORAGE_KEY

                            );


                        if (
                            !savedLayout
                        ) {

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


                            requestAnimationFrame(
                                () => {

                                    reapplyThemeVariableOverrides();

                                    refreshActiveInformation();

                                }
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


                    /* =================================================
                       CLEAR SAVED LAYOUT
                       ================================================= */

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


                    /* =================================================
                       RESET LAYOUT
                       ================================================= */

                    if (
                        action === "reset-layout"
                    ) {

                        try {

                            dockview.fromJSON(

                                JSON.parse(
                                    initialLayout
                                )

                            );


                            requestAnimationFrame(
                                () => {

                                    reapplyThemeVariableOverrides();

                                    refreshActiveInformation();

                                }
                            );


                            setStatus(
                                "Layout reset"
                            );

                        }
                        catch (
                        error
                        ) {

                            console.error(
                                error
                            );


                            setStatus(
                                "Layout could not be reset"
                            );

                        }


                        return;

                    }


                    /* =================================================
                       ADD PANEL
                       ================================================= */

                    if (
                        action === "add-panel"
                    ) {

                        addEmptyPanel();


                        return;

                    }


                    /* =================================================
                       ADD GROUP
                       ================================================= */

                    if (
                        action === "add-group"
                    ) {

                        addNewGroup();

                    }

                }
            );

        }
    );


    /* =====================================================
       RESET THEME SETTINGS
       ===================================================== */

    function resetSettings() {

        Object.assign(
            state,
            defaultSettings
        );


        /* =================================================
           RESET RANGE CONTROLS
           ================================================= */

        rangeControls.forEach(
            control => {

                const key =
                    control.dataset.layoutControl;


                control.value =
                    state[
                    key
                    ];


                updateOutput(

                    key,

                    state[
                    key
                    ]

                );

            }
        );


        /* =================================================
           RESET BACKGROUND / ACTIVE / INACTIVE VARIABLES
           ================================================= */

        themeVariableOverrides.clear();


        variableInputs.forEach(
            input => {

                const variableName =
                    input.dataset.dvVariable;


                getDockviewThemeTargets()
                    .forEach(
                        target => {

                            target.style.removeProperty(
                                variableName
                            );

                        }
                    );

            }
        );


        /* =================================================
           RESET DRAG BORDER
           ================================================= */

        if (
            borderInput
        ) {

            borderInput.value =
                "";

        }


        /* =================================================
           RESET VIEW CHECKBOXES
           ================================================= */

        dockOptionInputs.forEach(
            input => {

                const key =
                    input.dataset.dockOption;


                input.checked =
                    Boolean(
                        state[
                        key
                        ]
                    );

            }
        );


        updateThemeUI();


        updateChoiceButtons();


        applyDockviewTheme();


        requestAnimationFrame(
            () => {

                syncAllVariableControls();

            }
        );


        setStatus(
            "Theme settings reset"
        );

    }


    resetButton?.addEventListener(
        "click",
        resetSettings
    );


    /* =====================================================
       INITIALIZE
       ===================================================== */

    activateSettingsTab(
        "theme"
    );


    rangeControls.forEach(
        control => {

            const key =
                control.dataset.layoutControl;


            if (
                Object.prototype.hasOwnProperty.call(
                    state,
                    key
                )
            ) {

                control.value =
                    state[
                    key
                    ];


                updateOutput(

                    key,

                    state[
                    key
                    ]

                );

            }

        }
    );


    dockOptionInputs.forEach(
        input => {

            const key =
                input.dataset.dockOption;


            if (
                Object.prototype.hasOwnProperty.call(
                    state,
                    key
                )
            ) {

                input.checked =
                    Boolean(
                        state[
                        key
                        ]
                    );

            }

        }
    );


    updateThemeUI();


    updateChoiceButtons();


    refreshActiveInformation();


    applyDockviewTheme();

}