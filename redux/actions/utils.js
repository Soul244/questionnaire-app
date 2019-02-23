export function statusHandler({status, statusText}) {
    if(status>=200 && status<300){
      status= "success";
    } else if(status>=300 && status<500){
      status="warning";
    } else {
      status="danger";
    }
    return {
      status,
      statusText
    }
  }