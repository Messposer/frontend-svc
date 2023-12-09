import React from "react";
import { Avatar } from "antd";
import { ContactType, User } from "redux/types";

interface UserAvatarProps {
  authUser: User | null;
  size?: number
}
interface ContactAvatarProps {
  contact: ContactType;
  size?: number
}

export const UserAvatar: React.FC<UserAvatarProps> = (props: UserAvatarProps) => {
  const { authUser, size } = props;
  return (
    <Avatar
      size={size}
      src={authUser?.avatar}
      alt={`${authUser?.username} profile image`} 
    />
  );
};

export const ContactAvatar: React.FC<ContactAvatarProps> = (props: ContactAvatarProps) => {
  const { contact, size } = props;
  return (
    <Avatar
      size={size}
      src={contact?.avatar}
      alt={`${contact?.first_name} ${contact?.last_name} profile image`} 
    />
  );
};
