function checkFieldsInRecord(record) {
  return "id" in record && "text" in record && "checked" in record;
}

function checkIdInRecord(record) {
  return (
    typeof record.id === "number" &&
    !Number.isNaN(record.id) &&
    Number.isFinite(record.id) &&
    record.id >= 0 &&
    record.id < Number.MAX_SAFE_INTEGER
  );
}

function isStorageDamaged(state) {
  for (let storage in state.storage) {
    if (storage.length > 0) {
      for (let record of state.storage[storage]) {
        if (
          !checkFieldsInRecord(record) ||
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
