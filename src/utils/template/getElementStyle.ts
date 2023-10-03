export const getCSSProperties = (element: HTMLElement) => {
  const styles = window.getComputedStyle(element);
  const cssProperties: { [key: string]: string } = {};

  for (let i = 0; i < styles.length; i++) {
    const propertyName = styles[i];
    const propertyValue = styles.getPropertyValue(propertyName);
    cssProperties[propertyName] = propertyValue;
  }

  return cssProperties;
};

export const getFilteredCSSProperties = (element: HTMLElement, propertyList: string[]) => {
  const styles = window.getComputedStyle(element);
  const cssProperties: { [key: string]: string } = {};

  propertyList.forEach(propertyName => {
    const propertyValue = styles.getPropertyValue(propertyName);
    cssProperties[propertyName] = propertyValue;
  });

  return cssProperties;
};

export const disableKeyBoardEvents = (e: React.KeyboardEvent<HTMLDivElement>, key: string) => {
  if (e.key === key) {
    e.preventDefault(); // Prevent the default Enter key behavior
  }
};

export const parseHtmlString = (htmlString: string): HTMLElement | null => {
  const parser = new DOMParser();
  const parsedElement = parser.parseFromString(htmlString, "text/html").body.firstChild as HTMLElement | null;
  return parsedElement;
}