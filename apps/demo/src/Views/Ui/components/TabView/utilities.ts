export const addTab = (
  key: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  visibleTabs: any[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setVisibleTabs: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setActive: any,
) => {
  const existingTab = visibleTabs.find((tab) => tab === key);
  if (existingTab) {
    setActive(existingTab);
  } else {
    setVisibleTabs([...visibleTabs, key]);
    setActive(key);
  }
};
