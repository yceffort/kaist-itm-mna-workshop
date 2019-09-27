export function removeAllBlank(s: string) {
  return s.replace(/ /g, "");
}

export function compareString(s1: string, s2: string) {
  return removeAllBlank(s1).toLowerCase() === removeAllBlank(s2).toLowerCase();
}

export function getAllWrongAnswerInLocalStorage() {
  return Object.keys(window.localStorage).filter(
    (key: string) =>
      key.startsWith("mna-") && window.localStorage[key] === "false"
  );
}
