import { useTranslation } from "@prefabs.tech/react-i18n";
import { Outlet } from "react-router-dom";

import { AccordionDemo } from "./components/AccordionDemo";
import { ButtonDemo } from "./components/Button";
import { CardDemo } from "./components/CardDemo";
import { ConfirmationModalDemo } from "./components/ConfirmationModal";
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
import { Demo } from "../../components/Demo";
import { CountryPickerDemo } from "./components/FormWidgets/CountryPicker";

export const UI_ROUTES = {
  ACCORDION: "/ui/accordion",
  BUTTON: "/ui/button",
  CARD: "/ui/card",
  CHECKBOX: "/ui/checkbox",
  CHECKBOX_INPUT: "/ui/checkbox-input",
  CONFIRMATION_MODAL: "/ui/confirmation-modal",
  CURRENCY_SELECTOR: "/ui/currency-picker",
  COUNTRY_PICKER: "/ui/country-picker",
  DATA_COMPONENT: "/ui/data-component",
  DROPDOWN_MENU: "/ui/dropdown-menu",
  EDITABLE_TITLE: "/ui/editable-title",
  EXPORT_BUTTON: "/ui/export-xlsx",
  FILES_LIST: "/ui/files-list",
  FILES_PRESENTATION: "/ui/files-presentation",
  FILES_TABLE: "/ui/files-table",
  FILE_CARD: "/ui/file-card",
  GET_STARTED: "/ui",
  GRID_CONTAINER: "/ui/grid-container",
  INPUT: "/ui/input",
  INLINE_LINK: "/ui/inline-link",
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
    path: UI_ROUTES.BUTTON,
    key: "button.title",
    element: <ButtonDemo />,
  },
  {
    path: UI_ROUTES.EXPORT_BUTTON,
    key: "exportButton.title",
    element: <ExportButtonDemo />,
  },
  {
    path: UI_ROUTES.SUBMIT_BUTTON,
    key: "submitButton.title",
    element: <SubmitButtonDemo />,
  },
];

const DATA_COMPONENT_ROUTES = [
  {
    path: UI_ROUTES.DATA_COMPONENT,
    key: "data.title",
    element: <DataDemo />,
  },
  {
    path: UI_ROUTES.TABLE,
    key: "table.title",
    element: <TableDemo />,
  },
];

const FILE_ROUTES = [
  {
    path: UI_ROUTES.FILE_CARD,
    key: "fileCard.title",
    element: <FileCardDemo />,
  },
  {
    path: UI_ROUTES.FILES_LIST,
    key: "filesList.title",
    element: <FilesListDemo />,
  },
  {
    path: UI_ROUTES.FILES_PRESENTATION,
    key: "filesPresentation.title",
    element: <FilesPresentationDemo />,
  },
  {
    path: UI_ROUTES.FILES_TABLE,
    key: "filesTable.title",
    element: <FilesTableDemo />,
  },
];

const FORM_WIDGETS_ROUTES = [
  {
    path: UI_ROUTES.CHECKBOX,
    key: "checkbox.title",
    element: <CheckboxDemo />,
  },
  {
    path: UI_ROUTES.CHECKBOX_INPUT,
    key: "checkboxInput.title",
    element: <CheckboxInputDemo />,
  },
  {
    path: UI_ROUTES.COUNTRY_PICKER,
    key: "countryPicker.title",
    element: <CountryPickerDemo />,
  },
  {
    path: UI_ROUTES.CURRENCY_SELECTOR,
    key: "currencyPicker.title",
    element: <CurrencyPickerDemo />,
  },
  {
    path: UI_ROUTES.INPUT,
    key: "input.title",
    element: <InputDemo />,
  },
  {
    path: UI_ROUTES.SELECT,
    key: "select.title",
    element: <SelectDemo />,
  },
  {
    path: UI_ROUTES.SWITCH_INPUT,
    key: "switchInput.title",
    element: <SwitchInputDemo />,
  },
  {
    path: UI_ROUTES.TEXTAREA,
    key: "textarea.title",
    element: <TextareaDemo />,
  },
  {
    path: UI_ROUTES.TYPEAHEAD,
    key: "typeahead.title",
    element: <TypeaheadDemo />,
  },
];

const MENU_ROUTES = [
  {
    path: UI_ROUTES.DROPDOWN_MENU,
    key: "dropdownMenu.title",
    element: <DropdownMenuDemo />,
  },
];

const MESSAGES_ROUTES = [
  {
    path: UI_ROUTES.MESSAGE,
    key: "message.title",
    element: <MessageDemo />,
  },
];

const MISC_ROUTES = [
  {
    path: UI_ROUTES.EDITABLE_TITLE,
    key: "editableTitle.title",
    element: <EditableTitleDemo />,
  },
  {
    path: UI_ROUTES.GRID_CONTAINER,
    key: "gridContainer.title",
    element: <GridContainerDemo />,
  },
  {
    path: UI_ROUTES.LOADING,
    key: "loading.title",
    element: <LoadingDemo />,
  },
  {
    path: UI_ROUTES.PAGE_DEMO,
    key: "page.title.menu",
    element: <PageDemo />,
  },
  {
    path: UI_ROUTES.SORTABLE_LIST,
    key: "sortableList.title",
    element: <SortableListDemo />,
  },
  {
    path: UI_ROUTES.TAG,
    key: "tag.title",
    element: <TagDemo />,
  },
  {
    path: UI_ROUTES.YOUTUBE_FACADE,
    key: "youtubeFacade.title",
    element: <YoutubeFacadeDemo />,
  },
  {
    path: UI_ROUTES.INLINE_LINK,
    key: "inlineLink.title",
    element: <InlineLinkDemo />,
  },
];

const OVERLAY_ROUTES = [
  {
    path: UI_ROUTES.CONFIRMATION_MODAL,
    key: "confirmationModal.title",
    element: <ConfirmationModalDemo />,
  },
  {
    path: UI_ROUTES.MODAL,
    key: "modal.title",
    element: <ModalDemo />,
  },
  {
    path: UI_ROUTES.POPUP,
    key: "popup.title",
    element: <PopupDemo />,
  },
  {
    path: UI_ROUTES.TOOLTIP,
    key: "tooltip.title",
    element: <TooltipDemo />,
  },
];

const PANEL_ROUTES = [
  {
    path: UI_ROUTES.ACCORDION,
    key: "accordion.title",
    element: <AccordionDemo />,
  },
  {
    path: UI_ROUTES.CARD,
    key: "card.title",
    element: <CardDemo />,
  },
  {
    path: UI_ROUTES.STEPPER,
    key: "stepper.title",
    element: <StepperDemo />,
  },
  {
    path: UI_ROUTES.TABBED_PANEL,
    key: "tabbedPanel.title",
    element: <TabbedPanelDemo />,
  },
  {
    path: UI_ROUTES.TABVIEW,
    key: "tabview.title",
    element: <TabViewDemo />,
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
        ...BUTTONS_ROUTES.map(({ path, key }) => {
          return { route: path, label: t(key) };
        }),
      ],
    },
    {
      label: t("headers.data"),
      submenu: [
        ...DATA_COMPONENT_ROUTES.map(({ path, key }) => {
          return { route: path, label: t(key) };
        }),
      ],
    },
    {
      label: t("headers.file"),
      submenu: [
        ...FILE_ROUTES.map(({ path, key }) => {
          return { route: path, label: t(key) };
        }),
      ],
    },
    {
      label: t("headers.formWidgets"),
      submenu: [
        ...FORM_WIDGETS_ROUTES.map(({ path, key }) => {
          return { route: path, label: t(key) };
        }),
      ],
    },
    {
      label: t("headers.menu"),
      submenu: [
        ...MENU_ROUTES.map(({ path, key }) => {
          return { route: path, label: t(key) };
        }),
      ],
    },
    {
      label: t("headers.messages"),
      submenu: [
        ...MESSAGES_ROUTES.map(({ path, key }) => {
          return { route: path, label: t(key) };
        }),
      ],
    },
    {
      label: t("headers.overlay"),
      submenu: [
        ...OVERLAY_ROUTES.map(({ path, key }) => {
          return { route: path, label: t(key) };
        }),
      ],
    },
    {
      label: t("headers.panel"),
      submenu: [
        ...PANEL_ROUTES.map(({ path, key }) => {
          return { route: path, label: t(key) };
        }),
      ],
    },
    {
      label: t("headers.misc"),
      submenu: [
        ...MISC_ROUTES.map(({ path, key }) => {
          return { route: path, label: t(key) };
        }),
      ],
    },
  ];

  return (
    <Demo subnav={subnav} isGrouped>
      <Outlet />
    </Demo>
  );
};
