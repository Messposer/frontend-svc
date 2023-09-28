import { ContactScheduleType } from "services/types/ScheduleServiceType";

export const displayContactScheduleNames = (contacts: ContactScheduleType[]) => {
  let displayText;
  const formattedNames = contacts?.map(contact => `${contact.contact.first_name} ${contact.contact.last_name}`);
  if (formattedNames.length <= 10) {
    return displayText = formattedNames.join(', ');
  } else {
    const remainingCount = formattedNames.length - 10;
    return displayText = formattedNames.slice(0, 9).join(', ') + ` and ${remainingCount} others`;
  }
}