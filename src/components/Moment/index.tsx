import React from "react";
import moment from "moment";

interface MomentTimeProps {
  date: string;
  type?: string;
}

const MomentTime: React.FC<MomentTimeProps> = ({ date, type }: MomentTimeProps) => {
  const _time = (_date: string | undefined) => {
    if (!_date) {
      return "Invalid Date";
    }

    if (type === "relative") {
      return moment(_date).fromNow();
    } else {
      return moment(_date).format("MMMM D, YYYY, h:mm A");
    }
  };

  return <span>{_time(date)}</span>;
};

export default MomentTime;