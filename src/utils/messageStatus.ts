export const messageStatus = (status: number) => {
  if(status === 1){
    return "Sent"
  }
  if(status === 2){
    return "Pending"
  }
  if(status === 3){
    return "Failed"
  }
  if(status === 4){
    return "Delivered"
  }
};