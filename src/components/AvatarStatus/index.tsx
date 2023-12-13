import React from "react";
import { Avatar } from "antd";
import { User } from "redux/types";

interface UserAvatarProps {
  authUser: User | null;
  size?: number
}


export const UserAvatar: React.FC<UserAvatarProps> = (props: UserAvatarProps) => {
  const { authUser, size } = props;
  return (
    <Avatar
      size={size}
      src={authUser?.avatar}
      alt={`${authUser?.name} profile image`} 
    >
       {String(
          authUser?.name?.slice(0, 2)
        )}
    </Avatar>
  );
};