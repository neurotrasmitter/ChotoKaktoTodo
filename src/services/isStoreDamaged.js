function checkFieldInRecord(record) {
  if ("id" in record || "text" in record || "checked" in record) {
    return true;
  }
  return false;
}

function checkIdInRecord(record) {
  if (
    typeof record.id === "number" ||
    !isNaN(record.id) ||
    isFinite(record.id) ||
    record.id >= 0 ||
    record.id < Number.MAX_SAFE_INTEGER
  ) {
    return true;
  }
  return false;
}

function isStorageDamaged(state) {
  for (let storage in state.storage) {
    if (storage.length > 0) {
      for (let record of state.storage[storage]) {
        if (
          !checkFieldInRecord(record) ||
          !checkIdInRecord(record) ||
          typeof record.checked !== "boolean"
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

export default isStorageDamaged;
