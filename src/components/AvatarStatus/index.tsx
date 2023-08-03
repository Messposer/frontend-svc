import React from "react";
import { Avatar } from "antd";
import { User } from "redux/types";

interface UserAvatarProps {
  authUser: User | null;
  size?: number
}
export const UserAvatar: React.FC<UserAvatarProps> = (props: UserAvatarProps) => {
  const { authUser, size } = props;
  const backgroundColors = [
    {
      id: 1,
      colorText:"#f56a00",
      backgroundColor: "#fde3cf"
    },
  ];
  return (
    <Avatar
      size={size}
      style={{ color: backgroundColors[0].colorText, backgroundColor: backgroundColors[0].backgroundColor }}
    >
      <span className="text-uppercase">
        {String(
         authUser?.username.substring(0, 2)
        )}
      </span>
    </Avatar>
  );
};

export default UserAvatar;
