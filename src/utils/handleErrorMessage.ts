import { notify } from "./notification";

export default function handleErrorToProduction(errors:any) {
    let stringMessage = '';
    errors.map((e:any, idx:number) => {
      idx === errors.length - 1 ?  stringMessage += `${e} .` :  stringMessage += `${e} , `
    })
    notify("error", stringMessage, "");
    
  }