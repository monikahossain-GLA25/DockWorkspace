/* 
   DOCKVIEW TAB CONTEXT MENU

   Used by every Dockview tab:
   Correlation
   Order Book
   FX Rates
   Orders
   Positions
   Vol Surface
   News
   Tech View
   Logs
   Terminal
   Output
   Problems
   Tab 1 / Tab 2 / etc.
 */


export function createTabContextMenuItems(
    params
) {

    /* 
       RENAME TAB
 */

    const renameTab = {

        label:
            "Rename tab...",

        action:
            () => {

                const currentTitle =
                    params.panel.title ??
                    params.panel.id;


                const newTitle =
                    window.prompt(
                        "Rename tab",
                        currentTitle
                    );


                if (
                    newTitle === null
                ) {

                    return;
                }


                const cleanTitle =
                    newTitle.trim();


                if (
                    cleanTitle.length === 0
                ) {

                    return;
                }


                params.panel.api.setTitle(
                    cleanTitle
                );

            }

    };


    /* 
       ADD TAB TO A BRAND NEW GROUP
     */

    const addToNewGroup = {

        label:
            "Add to new group",

        action:
            () => {

                const newGroup =
                    params.api.addGroup({

                        referenceGroup:
                            params.group,

                        direction:
                            "right"

                    });


                params.panel.api.moveTo({

                    group:
                        newGroup,

                    index:
                        0

                });

            }

    };


    /*
       FREE OVERFLOW MODE

       Dropdown is the normal/free overflow mode.
 */

    const useOverflowDropdown = {

        label:
            "✓ Overflow dropdown",

        action:
            () => {

                params.api.updateOptions({

                    overflow: {

                        mode:
                            "dropdown"

                    }

                });

            }

    };


    /* 
       ENTERPRISE-ONLY OPTIONS

      I display them for  resembling Dockview demo
       but deliberately keep them disabled.
  */

    const pinEnterprise = {

        label:
            "Pin tab  ·  Enterprise",

        disabled:
            true

    };


    const wrapEnterprise = {

        label:
            "Wrap onto rows  ·  Enterprise",

        disabled:
            true

    };


    /* 
       FINAL MENU
   */

    return [

        renameTab,

        pinEnterprise,

        "separator",

        "close",

        "closeOthers",

        "closeAll",

        "closeLeft",

        "closeRight",

        "separator",

        "maximize",

        "separator",

        useOverflowDropdown,

        wrapEnterprise,

        "separator",

        "float",

        "popout",

        "separator",

        addToNewGroup

    ];

}