import {Host} from "./constants";
import cookie from "cookie"
import router from "next/router";

const sendReq = async(url, tokenCookie=null, method="GET", data=null, setfunc=null) => {
    let response = {};
    console.log(tokenCookie)
    try {
      if (data) {
        if (tokenCookie) {
          response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              "Accept": "*/*",
              "Accept-Encoding": "gzip, deflate, br",
              "Connection": "keep-alive",
              "Content-Length": data.length,
              "Host": Host,
              "Authorization": `Token ${cookie.parse(tokenCookie).user}`,
            },
            body: data
          });
        }
        else {
          response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              "Accept": "*/*",
              "Accept-Encoding": "gzip, deflate, br",
              "Connection": "keep-alive",
              "Content-Length": data.length,
              "Host": Host,
            },
            body: data
          })
        }
        }
      else {
        if (tokenCookie) {
          response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              "Accept": "*/*",
              "Accept-Encoding": "gzip, deflate, br",
              "Connection": "keep-alive",
              "Content-Length": 0,
              "Host": Host,
              "Authorization": `Token ${cookie.parse(tokenCookie).user}`,
            }
          });
        }
        else {
          response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              "Accept": "*/*",
              "Accept-Encoding": "gzip, deflate, br",
              "Connection": "keep-alive",
              "Content-Length": 0,
              "Host": Host,
            }
          })
        }
      }
      if (response.status >=300) {
        throw(response.status);
      }
    }
    catch(err) {
      console.log(err);
      alert(err);
      if (err === 403) {
        if (setfunc){
          setfunc(false);
        }
        else{
          try {
            router.push("/login");
          }
          catch {
            throw ("redirect to login");
          }
        }
      }
      else {
        try {
          router.push("/404");
        }
        catch {
          throw ("redirect error")
        }
      }
      
    }
    try {
      return await response.json()
    }
    catch{
      return response;
    }
  }

export {sendReq};