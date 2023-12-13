import React from "react";
import moment from "moment";

interface MomentTimeProps {
  date: string;
  type?: 'relative' | 'normal';
  showTime?: boolean;
}

const MomentTime: React.FC<MomentTimeProps> = ({ date, type, showTime = false }: MomentTimeProps) => {
  const _time = (_date: string | undefined) => {
    if (!_date) {
      return "Invalid Date";
    }

    if (type === "relative") {
      return moment(_date).fromNow();
    } else {
      return moment(_date).format(showTime ? "MMMM D, YYYY, h:mm A" : "MMMM D, YYYY");
    }
  };

  return <span>{_time(date)}</span>;
};

export default MomentTime;