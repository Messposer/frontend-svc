import { ContactType } from "redux/types";

export const displayContactsInfo = (contacts: ContactType[]) => {
  let displayText;
  const formattedNames = contacts?.map(contact => `${contact.first_name} ${contact.last_name}`);
  if (formattedNames.length <= 10) {
    return displayText = formattedNames.join(', ');
  } else {
    const remainingCount = formattedNames.length - 10;
    return displayText = formattedNames.slice(0, 9).join(', ') + ` and ${remainingCount} others`;
  }
}