export const addTab = (
  key: string,
  visibleTabs: string[],
  setVisibleTabs: (value: string[]) => void,
  setActive: (value: string) => void,
) => {
  const existingTab = visibleTabs.find((tab) => tab === key);

  if (existingTab) {
    setActive(existingTab);
  } else {
    setVisibleTabs([...visibleTabs, key]);
    setActive(key);
  }
};
