import { useTranslation } from "@prefabs.tech/react-i18n";
import { Page, TabView, TDataTable } from "@prefabs.tech/react-ui";
import { Button } from "@prefabs.tech/react-ui";
import { ConfirmationModal } from "@prefabs.tech/react-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { addTab } from "./utils";
import { CodeBlock, Section } from "../../../../components/Demo";

const data = [
  {
    id: 1,
    prop: "activeKey",
    type: "string",
    default: "-",
    description: "Active key of TabView.",
  },
  {
    id: 2,
    prop: "controlled",
    type: "boolean",
    default: "false",
    description:
      "If true, TabView becomes a controlled component. In this mode, internal state, hash routing, and state persistence are disabled.",
  },
  {
    id: 3,
    prop: "enableHashRouting",
    type: "boolean",
    default: "false",
    description: "Enable hash routing for the tab view URL.",
  },
  {
    id: 4,
    prop: "id",
    type: "string",
    default: "-",
    description:
      "Id of tab to save the state. Should provide 'id' in case of tab state persistence.",
  },
  {
    id: 5,
    prop: "lazy",
    type: "boolean",
    default: "true",
    description:
      "The lazy prop enables lazy loading.It only loads content for the active tab.",
  },
  {
    id: 6,
    prop: "persistState",
    type: "boolean",
    default: "true",
    description:
      "If true, tab state is saved either in localStorage or sessionStorage. Ignored when 'controlled' or 'enableHashRouting' is true.",
  },
  {
    id: 7,
    prop: "persistStateStorage",
    type: '"localStorage" | "sessionStorage"',
    default: "localStorage",
    description: "Storage to save tab state.",
  },
  {
    id: 8,
    prop: "position",
    type: '"top" | "left" | "bottom" | "right"',
    default: "top",
    description: "Position of the tab panel header relative to its content.",
  },
  {
    id: 9,
    prop: "tabs",
    type: "Tabs",
    default: "-",
    description: "Array of tab object.",
  },
  {
    id: 10,
    prop: "visibleTabs",
    type: "VisibleTabs",
    default: "-",
    description: "Array of visible tabs.",
  },
  {
    id: 11,
    prop: "onActiveTabChange",
    type: "(activeTab: string) => void",
    default: "-",
    description: "Function to be called when active tab change.",
  },
  {
    id: 12,
    prop: "onVisibleTabsChange",
    type: "(visibleTabs: string[]) => void",
    default: "-",
    description: "Function to be called when visible tabs change.",
  },
  {
    id: 13,
    prop: "onTabClose",
    type: "(activeTab: string) => void",
    default: "-",
    description: "Function to be called when tab close.",
  },
];

export const TabViewDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  const [visibleTabs, setVisibleTabs] = useState(["30"]);
  const [active, setActive] = useState("30");
  const [controlledVisibleTabs, setControlledVisibleTabs] = useState([
    "36",
    "37",
    "38",
  ]);
  const [controlledActiveTab, setControlledActiveTab] = useState("36");
  const [showModal, setShowModal] = useState(false);
  const [requestedTab, setRequestedTab] = useState<string | null>(null);

  const handleTabChange = (key: string) => {
    if (key !== controlledActiveTab) {
      setRequestedTab(key);
      setShowModal(true);
    }
  };

  const confirmTabSwitch = () => {
    if (requestedTab) {
      setControlledActiveTab(requestedTab);
      setRequestedTab(null);
    }
    setShowModal(false);
  };

  const cancelTabSwitch = () => {
    setRequestedTab(null);
    setShowModal(false);
  };

  const handleTabClose = (key: string) => {
    const tabIndex = controlledVisibleTabs.findIndex((tab) => tab === key);
    const newVisibleTabs = controlledVisibleTabs.filter((tab) => tab !== key);

    let newActiveTab = "";
    if (tabIndex > 0) {
      newActiveTab = newVisibleTabs[tabIndex - 1];
    } else {
      newActiveTab = newVisibleTabs[0];
    }

    setControlledActiveTab(newActiveTab);
    setControlledVisibleTabs(newVisibleTabs);

    window.location.hash = newActiveTab;
  };

  return (
    <Page
      title={t("tabview.title")}
      className="tab-view"
      toolbar={
        <Button
          label={t("buttons.back")}
          variant="textOnly"
          iconLeft={<i className="pi pi-chevron-left"></i>}
          onClick={() => navigate("..")}
        />
      }
    >
      <Section title={t("headers.usage")}>
        <p>{t("common.usage", { component: "TabView" })}</p>
        <CodeBlock exampleCode="import { TabView } from '@prefabs.tech/react-ui';" />
      </Section>

      <Section title={t("tabview.usage.basic")}>
        <TabView
          tabs={[
            { label: "Description", children: "Description", key: "1" },
            { label: "Reviews", children: "Reviews", key: "2" },
            {
              label: "Specifications",
              children: "Specifications",
              key: "3",
            },
            { label: "Pricing", children: "Pricing", key: "4" },
            {
              label: "Installation",
              children: "Installation Instructions",
              key: "5",
            },
            { label: "Certifications", children: "Certifications", key: "6" },
          ]}
          id="tabview-1"
        />
        <CodeBlock
          exampleCode='
<TabView
  tabs={[
    { label: "Description", children: "Description", key: "1" },
    { label: "Reviews", children: "Reviews", key: "2" },
    { label: "Specifications", children: "Specifications", key: "3" },
    { label: "Pricing", children: "Pricing", key: "4" },
    { label: "Installation", children: "Installation Instructions", key: "5" },
    { label: "Certifications", children: "Certifications", key: "6" },
  ]}
  id="tabview-1"
/>'
        />
      </Section>

      <Section title={t("tabview.usage.disableTabState.title")}>
        <p>{t("tabbedPanel.usage.disableTabState.subTitle")}</p>
        <TabView
          visibleTabs={["7", "11", "12"]}
          tabs={[
            { label: "Description", children: "Description", key: "7" },
            { label: "Reviews", children: "Reviews", key: "8" },
            {
              label: "Specifications",
              children: "Specifications",
              key: "9",
            },
            { label: "Pricing", children: "Pricing", key: "10" },
            {
              label: "Installation",
              children: "Installation Instructions",
              key: "11",
            },
            { label: "Certifications", children: "Certifications", key: "12" },
          ]}
          activeKey="7"
          id="tabview-2"
          persistState={false}
        />
        <CodeBlock
          exampleCode='
<TabView
visibleTabs={["7", "11", "12"]}
tabs={[
  { label: "Description", children: "Description", key: "7" },
  { label: "Reviews", children: "Reviews", key: "8" },
  {
    label: "Specifications",
    children: "Specifications",
    key: "9",
  },
  { label: "Pricing", children: "Pricing", key: "10" },
  {
    label: "Installation",
    children: "Installation Instructions",
    key: "11",
  },
  { label: "Certifications", children: "Certifications", key: "12" },
]}
  activeKey="7"
  id="tabview-2"
  persistState={false}
/>'
        />
      </Section>

      <Section title={t("tabview.usage.positionBottom")}>
        <TabView
          visibleTabs={["13", "16", "17"]}
          tabs={[
            { label: "Description", children: "Description", key: "13" },
            { label: "Reviews", children: "Reviews", key: "14" },
            {
              label: "Specifications",
              children: "Specifications",
              key: "15",
            },
            { label: "Pricing", children: "Pricing", key: "16" },
            {
              label: "Installation",
              children: "Installation Instructions",
              key: "17",
            },
            { label: "Certifications", children: "Certifications", key: "18" },
          ]}
          activeKey="13"
          id="tabview-4"
          position="bottom"
        />
        <CodeBlock
          exampleCode='
<TabView
visibleTabs={["13", "16", "17"]}
tabs={[
  { label: "Description", children: "Description", key: "13" },
  { label: "Reviews", children: "Reviews", key: "14" },
  {
    label: "Specifications",
    children: "Specifications",
    key: "15",
  },
  { label: "Pricing", children: "Pricing", key: "16" },
  {
    label: "Installation",
    children: "Installation Instructions",
    key: "17",
  },
  { label: "Certifications", children: "Certifications", key: "18" },
]}
  activeKey="13"
  id="tabview-4"
  position="bottom"
/>'
        />
      </Section>

      <Section title={t("tabview.usage.positionLeft")}>
        <TabView
          visibleTabs={["18", "22", "23"]}
          tabs={[
            { label: "Description", children: "Description", key: "18" },
            { label: "Reviews", children: "Reviews", key: "19" },
            {
              label: "Specifications",
              children: "Specifications",
              key: "20",
            },
            { label: "Pricing", children: "Pricing", key: "21" },
            {
              label: "Installation",
              children: "Installation Instructions",
              key: "22",
            },
            { label: "Certifications", children: "Certifications", key: "23" },
          ]}
          activeKey="18"
          id="tabview-5"
          position="left"
        />
        <CodeBlock
          exampleCode=' 
<TabView
visibleTabs={["18", "22", "23"]}
tabs={[
  { label: "Description", children: "Description", key: "18" },
  { label: "Reviews", children: "Reviews", key: "19" },
  {
    label: "Specifications",
    children: "Specifications",
    key: "20",
  },
  { label: "Pricing", children: "Pricing", key: "21" },
  {
    label: "Installation",
    children: "Installation Instructions",
    key: "22",
  },
  { label: "Certifications", children: "Certifications", key: "23" },
]}
  activeKey="18"
  id="tabview-5"
  position="left"
  onVisibleTabsChange={setCustomVisibleTabs}
/>'
        />
      </Section>

      <Section title={t("tabview.usage.positionRight")}>
        <TabView
          visibleTabs={["24", "26", "29"]}
          tabs={[
            { label: "Description", children: "Description", key: "24" },
            { label: "Reviews", children: "Reviews", key: "25" },
            {
              label: "Specifications",
              children: "Specifications",
              key: "26",
            },
            { label: "Pricing", children: "Pricing", key: "27" },
            {
              label: "Installation",
              children: "Installation Instructions",
              key: "28",
            },
            { label: "Certifications", children: "Certifications", key: "29" },
          ]}
          activeKey="24"
          id="tabview-6"
          position="right"
        />
        <CodeBlock
          exampleCode='
<TabView
visibleTabs={["24", "26", "29"]}
tabs={[
  { label: "Description", children: "Description", key: "24" },
  { label: "Reviews", children: "Reviews", key: "25" },
  {
    label: "Specifications",
    children: "Specifications",
    key: "26",
  },
  { label: "Pricing", children: "Pricing", key: "27" },
  {
    label: "Installation",
    children: "Installation Instructions",
    key: "28",
  },
  { label: "Certifications", children: "Certifications", key: "29" },
]}
  activeKey="24"
  id="tabview-6"
  position="right"
/>'
        />
      </Section>

      <Section title={t("tabview.usage.closable")}>
        <div className="tab-button-group">
          <Button
            label="Add specifications tab"
            onClick={() => addTab("32", visibleTabs, setVisibleTabs, setActive)}
          />
          <Button
            label="Add reviews tab"
            onClick={() => addTab("31", visibleTabs, setVisibleTabs, setActive)}
          />
          <Button
            label="Add pricing tab"
            onClick={() => addTab("33", visibleTabs, setVisibleTabs, setActive)}
          />
        </div>
        <TabView
          visibleTabs={visibleTabs}
          tabs={[
            { label: "Description", children: "Description", key: "30" },
            {
              label: "Reviews",
              children: "Reviews",
              key: "31",
              closable: true,
            },
            {
              label: "Specifications",
              children: "Specifications",
              key: "32",
              closable: true,
            },
            {
              label: "Pricing",
              children: "Pricing",
              key: "33",
              closable: true,
            },
            {
              label: "Installation",
              children: "Installation Instructions",
              key: "34",
            },
            { label: "Certifications", children: "Certifications", key: "35" },
          ]}
          activeKey={active}
          id="tabview-3"
          onVisibleTabsChange={setVisibleTabs}
          onActiveTabChange={setActive}
        />
        <CodeBlock
          exampleCode='
          
const [visibleTabs, setVisibleTabs] = useState([{ key: "30" }]);
const [active, setActive] = useState("30");

export const addTab = (
  key: string,
  visibleTabs: any[],
  setVisibleTabs: any,
  setActive: any,
) => {
  const existingTab = visibleTabs.find((tab) => tab === key);
  
  if (existingTab) {
    setActive(existingTab);
    window.location.hash = existingTab;
  } else {
    setVisibleTabs([...visibleTabs, key]);
    setActive(key);
    window.location.hash = key;
  }
};

<div className="tab-button-group">
  <Button
  label="Add specifications tab"
  onClick={() => addTab("32", visibleTabs, setVisibleTabs, setActive)}
  />
  <Button 
  label="Add reviews tab" 
  onClick={() => addTab("31", visibleTabs, setVisibleTabs, setActive)}
  />
  <Button 
  label="Add pricing tab" 
  onClick={() => addTab("33", visibleTabs, setVisibleTabs, setActive)}
  />
</div>
<TabView
visibleTabs={visibleTabs}
 tabs={[
   { label: "Description", children: "Description", key: "30" },
   { label: "Reviews", children: "Reviews", key: "31", closable: true },
   {
     label: "Specifications",
     children: "Specifications",
     key: "32",
     closable: true
   },
   { label: "Pricing", children: "Pricing", key: "33", closable: true },
   {
     label: "Installation",
     children: "Installation Instructions",
     key: "34",
   },
   { label: "Certifications", children: "Certifications", key: "35" },
 ]}
  activeKey={active}
  id="tabview-3"
  onVisibleTabsChange={setVisibleTabs}
  onActiveTabChange={setActive}
/>'
        />
      </Section>

      <Section title={t("tabview.usage.control")}>
        <div className="tab-button-group">
          <Button
            label="Add installation tab"
            onClick={() =>
              addTab(
                "40",
                controlledVisibleTabs,
                setControlledVisibleTabs,
                setControlledActiveTab,
              )
            }
          />
          <Button
            label="Add pricing tab"
            onClick={() =>
              addTab(
                "39",
                controlledVisibleTabs,
                setControlledVisibleTabs,
                setControlledActiveTab,
              )
            }
          />
        </div>
        <TabView
          tabs={[
            { label: "Description", children: "Description", key: "36" },
            { label: "Reviews", children: "Reviews", key: "37" },
            {
              label: "Specifications",
              children: "Specifications",
              key: "38",
            },
            {
              label: "Pricing",
              children: "Pricing",
              key: "39",
              closable: true,
            },
            {
              label: "Installation",
              children: "Installation Instructions",
              key: "40",
              closable: true,
            },
            { label: "Certifications", children: "Certifications", key: "41" },
          ]}
          id="tabview-7"
          activeKey={controlledActiveTab}
          visibleTabs={controlledVisibleTabs}
          controlled={true}
          onActiveTabChange={handleTabChange}
          onTabClose={handleTabClose}
        />
        <ConfirmationModal
          message="Are you sure you want to proceed?"
          visible={showModal}
          onHide={cancelTabSwitch}
          accept={confirmTabSwitch}
        />

        <CodeBlock
          exampleCode='
const [controlledVisibleTabs, setControlledVisibleTabs] = useState([
"36",
"37",
"38",
]);
const [controlledActiveTab, setControlledActiveTab] = useState("36");
const [showModal, setShowModal] = useState(false);
const [requestedTab, setRequestedTab] = useState<string | null>(null);

const handleTabChange = (key: string) => {
  if (key !== controlledActiveTab) {
    setRequestedTab(key);
    setShowModal(true);
  }
};

const confirmTabSwitch = () => {
  if (requestedTab) {
    setControlledActiveTab(requestedTab);
    window.location.hash = requestedTab;

    setRequestedTab(null);
  }
  setShowModal(false);
};

const cancelTabSwitch = () => {
  setRequestedTab(null);
  setShowModal(false);
};

const handleTabClose = (key: string) => {
  const tabIndex = controlledVisibleTabs.findIndex((tab) => tab === key);
  const newVisibleTabs = controlledVisibleTabs.filter((tab) => tab !== key);

  let newActiveTab = "";
  if (tabIndex > 0) {
    newActiveTab = newVisibleTabs[tabIndex - 1];
  } else {
    newActiveTab = newVisibleTabs[0];
  }

  setControlledActiveTab(newActiveTab);
  setControlledVisibleTabs(newVisibleTabs);

  window.location.hash = newActiveTab;
};

export const addTab = (
  key: string,
  visibleTabs: any[],
  setVisibleTabs: any,
  setActive: any,
) => {
  const existingTab = visibleTabs.find((tab) => tab === key);
  if (existingTab) {
    setActive(existingTab);

    window.location.hash = existingTab;
  } else {
    setVisibleTabs([...visibleTabs, key]);
    setActive(key);

    window.location.hash = key;
  }
};

<div className="tab-button-group">
  <Button
    label="Add installation tab"
    onClick={() =>
      addTab(
        "40",
        controlledVisibleTabs,
        setControlledVisibleTabs,
        setControlledActiveTab,
    )}
  />
  <Button
    label="Add pricing tab"
    onClick={() =>
      addTab(
        "39",
        controlledVisibleTabs,
        setControlledVisibleTabs,
        setControlledActiveTab,
      )}
  />
</div>

<TabView
tabs={[
  { label: "Description", children: "Description", key: "36" },
  { label: "Reviews", children: "Reviews", key: "37" },
  {
    label: "Specifications",
    children: "Specifications",
    key: "38",
  },
  { label: "Pricing", children: "Pricing", key: "39", closable: true},
  {
    label: "Installation",
    children: "Installation Instructions",
    key: "40",
    closable: true,
  },
  { label: "Certifications", children: "Certifications", key: "41" },
]}
id="tabview-7"
activeKey={controlledActiveTab}
visibleTabs={controlledVisibleTabs}
controlled={true}
onActiveTabChange={handleTabChange}
onTabClose={handleTabClose}
/>
<ConfirmationModal
  message="Are you sure you want to proceed?"
  visible={showModal}
  onHide={cancelTabSwitch}
  accept={confirmTabSwitch}
/>'
        />
      </Section>

      <Section title={t("tabview.usage.hashRoute")}>
        <TabView
          visibleTabs={[
            "descritpion",
            "specifications",
            "certifications",
            "pricing",
          ]}
          tabs={[
            {
              label: "Description",
              children: "Description",
              key: "descritpion",
            },
            { label: "Reviews", children: "Reviews", key: "reviews" },
            {
              label: "Specifications",
              children: "Specifications",
              key: "specifications",
            },
            { label: "Pricing", children: "Pricing", key: "pricing" },
            {
              label: "Installation",
              children: "Installation Instructions",
              key: "installation",
            },
            {
              label: "Certifications",
              children: "Certifications",
              key: "certifications",
            },
          ]}
          activeKey="descritpion"
          id="tabview-8"
          enableHashRouting={true}
        />
        <CodeBlock
          exampleCode='
<TabView
visibleTabs={["descritpion", "specifications", "certifications", "pricing"]}
tabs={[
  { label: "Description", children: "Description", key: "descritpion" },
  { label: "Reviews", children: "Reviews", key: "reviews" },
  {
    label: "Specifications",
    children: "Specifications",
    key: "specifications",
  },
  { label: "Pricing", children: "Pricing", key: "pricing" },
  {
    label: "Installation",
    children: "Installation Instructions",
    key: "installation",
  },
  { label: "Certifications", children: "Certifications", key: "certifications" },
]}
activeKey="descritpion"
id="tabview-8"
enableHashRouting={true}
/>'
        />
      </Section>
      <Section
        title={t("headers.propertiesValue", {
          value: "Properties",
        })}
      >
        <TDataTable
          columns={[
            {
              accessorKey: "prop",
              header: "Properties",
            },
            {
              accessorKey: "type",
              header: "Type",
            },
            {
              accessorKey: "default",
              header: "Default",
            },
            {
              accessorKey: "description",
              header: "Description",
            },
          ]}
          data={data}
          paginated={false}
          persistState={false}
        />
      </Section>
      <Section title="Type">
        <CodeBlock
          exampleCode="
Tabs = {
  children: React.ReactNode;
  closable?: boolean;
  icon?: string;
  key: string;
  label: string;
}[];

VisibleTabs: string[]
"
        />
      </Section>
    </Page>
  );
};
