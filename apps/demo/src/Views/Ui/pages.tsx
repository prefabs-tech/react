import { useTranslation } from "@prefabs.tech/react-i18n";
import { Outlet } from "react-router-dom";

import { Demo } from "../../components/Demo";
import { AccordionDemo } from "./components/AccordionDemo";
import { ButtonDemo } from "./components/Button";
import { CardDemo } from "./components/CardDemo";
import { ConfirmationModalDemo } from "./components/ConfirmationModal";
import { CountryDisplayDemo } from "./components/CountryDisplay/CountryDisplayDemo";
import { DataDemo } from "./components/DataComponent";
import { DropdownMenuDemo } from "./components/DropdownMenuDemo";
import { EditableTitleDemo } from "./components/EditableTitleDemo";
import { ExportButtonDemo } from "./components/ExportButton";
import { FileCardDemo } from "./components/FileCard";
import { FilesListDemo } from "./components/FilesList";
import { FilesPresentationDemo } from "./components/FilesPresentation";
import { FilesTableDemo } from "./components/FilesTable";
import {
  CheckboxDemo,
  CheckboxInputDemo,
  CurrencyPickerDemo,
  InputDemo,
  SelectDemo,
  SwitchInputDemo,
  TextareaDemo,
  TypeaheadDemo,
} from "./components/FormWidgets";
import { CountryPickerDemo } from "./components/FormWidgets/CountryPicker";
import { GridContainerDemo } from "./components/GridContainerDemo";
import { InlineLinkDemo } from "./components/InlineLinkDemo";
import { LoadingDemo } from "./components/Loading";
import { MessageDemo } from "./components/Message";
import { ModalDemo } from "./components/ModalDemo";
import { PageDemo } from "./components/PageDemo";
import { PopupDemo } from "./components/Popup";
import { SortableListDemo } from "./components/SortableList";
import { StepperDemo } from "./components/Stepper";
import { SubmitButtonDemo } from "./components/SubmitButton";
import { TabbedPanelDemo } from "./components/TabbedPanel/TabbedPanel";
import { TableDemo } from "./components/Table";
import { TabViewDemo } from "./components/TabView";
import { TagDemo } from "./components/Tag/Tag";
import { TooltipDemo } from "./components/Tooltip";
import { YoutubeFacadeDemo } from "./components/YoutubeFacade";

export const UI_ROUTES = {
  ACCORDION: "/ui/accordion",
  BUTTON: "/ui/button",
  CARD: "/ui/card",
  CHECKBOX: "/ui/checkbox",
  CHECKBOX_INPUT: "/ui/checkbox-input",
  CONFIRMATION_MODAL: "/ui/confirmation-modal",
  COUNTRY_DISPLAY: "/ui/country-display",
  COUNTRY_PICKER: "/ui/country-picker",
  CURRENCY_SELECTOR: "/ui/currency-picker",
  DATA_COMPONENT: "/ui/data-component",
  DROPDOWN_MENU: "/ui/dropdown-menu",
  EDITABLE_TITLE: "/ui/editable-title",
  EXPORT_BUTTON: "/ui/export-xlsx",
  FILE_CARD: "/ui/file-card",
  FILES_LIST: "/ui/files-list",
  FILES_PRESENTATION: "/ui/files-presentation",
  FILES_TABLE: "/ui/files-table",
  GET_STARTED: "/ui",
  GRID_CONTAINER: "/ui/grid-container",
  INLINE_LINK: "/ui/inline-link",
  INPUT: "/ui/input",
  LOADING: "/ui/loading",
  LOCAL_DATA_TABLE: "/ui/local-table",
  MESSAGE: "/ui/message",
  MODAL: "/ui/modal",
  PAGE_DEMO: "/ui/page-demo",
  POPUP: "/ui/popup",
  RESPONSIVE_MENU: "/ui/responsive-menu",
  SELECT: "/ui/select",
  SORTABLE_LIST: "/ui/sortable-list",
  STEPPER: "/ui/stepper",
  SUBMIT_BUTTON: "/ui/submit-button",
  SWITCH_INPUT: "/ui/switch-input",
  TABBED_PANEL: "/ui/tabbed-panel",
  TABLE: "/ui/table",
  TABVIEW: "/ui/tabview",
  TAG: "/ui/tag",
  TEXTAREA: "/ui/textarea",
  TOOLTIP: "/ui/tooltip",
  TYPEAHEAD: "/ui/typeahead",
  YOUTUBE_FACADE: "/ui/youtube-facade",
};

const BUTTONS_ROUTES = [
  {
    element: <ButtonDemo />,
    key: "button.title",
    path: UI_ROUTES.BUTTON,
  },
  {
    element: <ExportButtonDemo />,
    key: "exportButton.title",
    path: UI_ROUTES.EXPORT_BUTTON,
  },
  {
    element: <SubmitButtonDemo />,
    key: "submitButton.title",
    path: UI_ROUTES.SUBMIT_BUTTON,
  },
];

const DATA_COMPONENT_ROUTES = [
  {
    element: <DataDemo />,
    key: "data.title",
    path: UI_ROUTES.DATA_COMPONENT,
  },
  {
    element: <TableDemo />,
    key: "table.title",
    path: UI_ROUTES.TABLE,
  },
  {
    element: <CountryDisplayDemo />,
    key: "countryDisplay.title",
    path: UI_ROUTES.COUNTRY_DISPLAY,
  },
];

const FILE_ROUTES = [
  {
    element: <FileCardDemo />,
    key: "fileCard.title",
    path: UI_ROUTES.FILE_CARD,
  },
  {
    element: <FilesListDemo />,
    key: "filesList.title",
    path: UI_ROUTES.FILES_LIST,
  },
  {
    element: <FilesPresentationDemo />,
    key: "filesPresentation.title",
    path: UI_ROUTES.FILES_PRESENTATION,
  },
  {
    element: <FilesTableDemo />,
    key: "filesTable.title",
    path: UI_ROUTES.FILES_TABLE,
  },
];

const FORM_WIDGETS_ROUTES = [
  {
    element: <CheckboxDemo />,
    key: "checkbox.title",
    path: UI_ROUTES.CHECKBOX,
  },
  {
    element: <CheckboxInputDemo />,
    key: "checkboxInput.title",
    path: UI_ROUTES.CHECKBOX_INPUT,
  },
  {
    element: <CountryPickerDemo />,
    key: "countryPicker.title",
    path: UI_ROUTES.COUNTRY_PICKER,
  },
  {
    element: <CurrencyPickerDemo />,
    key: "currencyPicker.title",
    path: UI_ROUTES.CURRENCY_SELECTOR,
  },
  {
    element: <InputDemo />,
    key: "input.title",
    path: UI_ROUTES.INPUT,
  },
  {
    element: <SelectDemo />,
    key: "select.title",
    path: UI_ROUTES.SELECT,
  },
  {
    element: <SwitchInputDemo />,
    key: "switchInput.title",
    path: UI_ROUTES.SWITCH_INPUT,
  },
  {
    element: <TextareaDemo />,
    key: "textarea.title",
    path: UI_ROUTES.TEXTAREA,
  },
  {
    element: <TypeaheadDemo />,
    key: "typeahead.title",
    path: UI_ROUTES.TYPEAHEAD,
  },
];

const MENU_ROUTES = [
  {
    element: <DropdownMenuDemo />,
    key: "dropdownMenu.title",
    path: UI_ROUTES.DROPDOWN_MENU,
  },
];

const MESSAGES_ROUTES = [
  {
    element: <MessageDemo />,
    key: "message.title",
    path: UI_ROUTES.MESSAGE,
  },
];

const MISC_ROUTES = [
  {
    element: <EditableTitleDemo />,
    key: "editableTitle.title",
    path: UI_ROUTES.EDITABLE_TITLE,
  },
  {
    element: <GridContainerDemo />,
    key: "gridContainer.title",
    path: UI_ROUTES.GRID_CONTAINER,
  },
  {
    element: <LoadingDemo />,
    key: "loading.title",
    path: UI_ROUTES.LOADING,
  },
  {
    element: <PageDemo />,
    key: "page.title.menu",
    path: UI_ROUTES.PAGE_DEMO,
  },
  {
    element: <SortableListDemo />,
    key: "sortableList.title",
    path: UI_ROUTES.SORTABLE_LIST,
  },
  {
    element: <TagDemo />,
    key: "tag.title",
    path: UI_ROUTES.TAG,
  },
  {
    element: <YoutubeFacadeDemo />,
    key: "youtubeFacade.title",
    path: UI_ROUTES.YOUTUBE_FACADE,
  },
  {
    element: <InlineLinkDemo />,
    key: "inlineLink.title",
    path: UI_ROUTES.INLINE_LINK,
  },
];

const OVERLAY_ROUTES = [
  {
    element: <ConfirmationModalDemo />,
    key: "confirmationModal.title",
    path: UI_ROUTES.CONFIRMATION_MODAL,
  },
  {
    element: <ModalDemo />,
    key: "modal.title",
    path: UI_ROUTES.MODAL,
  },
  {
    element: <PopupDemo />,
    key: "popup.title",
    path: UI_ROUTES.POPUP,
  },
  {
    element: <TooltipDemo />,
    key: "tooltip.title",
    path: UI_ROUTES.TOOLTIP,
  },
];

const PANEL_ROUTES = [
  {
    element: <AccordionDemo />,
    key: "accordion.title",
    path: UI_ROUTES.ACCORDION,
  },
  {
    element: <CardDemo />,
    key: "card.title",
    path: UI_ROUTES.CARD,
  },
  {
    element: <StepperDemo />,
    key: "stepper.title",
    path: UI_ROUTES.STEPPER,
  },
  {
    element: <TabbedPanelDemo />,
    key: "tabbedPanel.title",
    path: UI_ROUTES.TABBED_PANEL,
  },
  {
    element: <TabViewDemo />,
    key: "tabview.title",
    path: UI_ROUTES.TABVIEW,
  },
];

export const routes = [
  ...BUTTONS_ROUTES,
  ...DATA_COMPONENT_ROUTES,
  ...FILE_ROUTES,
  ...FORM_WIDGETS_ROUTES,
  ...MENU_ROUTES,
  ...MESSAGES_ROUTES,
  ...MISC_ROUTES,
  ...OVERLAY_ROUTES,
  ...PANEL_ROUTES,
];

export const Pages = () => {
  const [t] = useTranslation("ui");

  const subnav = [
    { label: t("app:getStarted"), route: UI_ROUTES.GET_STARTED },
    {
      label: t("headers.buttons"),
      submenu: [
        ...BUTTONS_ROUTES.map(({ key, path }) => {
          return { label: t(key), route: path };
        }),
      ],
    },
    {
      label: t("headers.data"),
      submenu: [
        ...DATA_COMPONENT_ROUTES.map(({ key, path }) => {
          return { label: t(key), route: path };
        }),
      ],
    },
    {
      label: t("headers.file"),
      submenu: [
        ...FILE_ROUTES.map(({ key, path }) => {
          return { label: t(key), route: path };
        }),
      ],
    },
    {
      label: t("headers.formWidgets"),
      submenu: [
        ...FORM_WIDGETS_ROUTES.map(({ key, path }) => {
          return { label: t(key), route: path };
        }),
      ],
    },
    {
      label: t("headers.menu"),
      submenu: [
        ...MENU_ROUTES.map(({ key, path }) => {
          return { label: t(key), route: path };
        }),
      ],
    },
    {
      label: t("headers.messages"),
      submenu: [
        ...MESSAGES_ROUTES.map(({ key, path }) => {
          return { label: t(key), route: path };
        }),
      ],
    },
    {
      label: t("headers.overlay"),
      submenu: [
        ...OVERLAY_ROUTES.map(({ key, path }) => {
          return { label: t(key), route: path };
        }),
      ],
    },
    {
      label: t("headers.panel"),
      submenu: [
        ...PANEL_ROUTES.map(({ key, path }) => {
          return { label: t(key), route: path };
        }),
      ],
    },
    {
      label: t("headers.misc"),
      submenu: [
        ...MISC_ROUTES.map(({ key, path }) => {
          return { label: t(key), route: path };
        }),
      ],
    },
  ];

  return (
    <Demo isGrouped subnav={subnav}>
      <Outlet />
    </Demo>
  );
};
