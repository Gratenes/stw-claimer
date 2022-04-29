import fetch, { Headers } from 'node-fetch';


/*
  * Fortnite API
  *
  * the auth code can be found by going to 
  * https://www.epicgames.com/id/logout?redirectUrl=https%3A%2F%2Fwww.epicgames.com%2Fid%2Flogin%3FredirectUrl%3Dhttps%253A%252F%252Fwww.epicgames.com%252Fid%252Fapi%252Fredirect%253FclientId%253Dec684b8c687f479fadea3cb2ad83f5c6%2526responseType%253Dcode
  * 
  * feel free to add onto the api to make it more useful only thing that would be asked is to make a pr of the new change 
*/

class Fortnite {
  getToken (authCode:string) {
    const h = new Headers();
    h.append('Content-Type', 'application/x-www-form-urlencoded');
    h.append('Authorization', 'basic ZWM2ODRiOGM2ODdmNDc5ZmFkZWEzY2IyYWQ4M2Y1YzY6ZTFmMzFjMjExZjI4NDEzMTg2MjYyZDM3YTEzZmM4NGQ='); // Some random authorization (i dont know what it is)

    const b = new URLSearchParams();
    b.append('grant_type', 'authorization_code');
    b.append('code', authCode);

    return new Promise((resolve, reject) => {
      let r = fetch('https://account-public-service-prod.ol.epicgames.com/account/api/oauth/token', {
        method: 'POST',
        headers: h,
        body: b
      })
      r.then((res: unknown) => {
        resolve(res)
      })
      .catch((err: any) => {
        reject(err)
      })
    })
  }

  claimReward(token: string, profileId:string) {
    const h = new Headers();
    h.append('Authorization', 'bearer ' + token);
    h.append('Content-Type', 'application/json');

    return new Promise((resolve, reject) => {
      let r = fetch(`https://fortnite-public-service-prod11.ol.epicgames.com/fortnite/api/game/v2/profile/${profileId}/client/ClaimLoginReward?profileId=campaign`, {
        method: 'POST',
        headers: h,
        body: "{}" // This has to be done to claim the reward if there is nothing supplyed it does not work
      })
      r.then((res: any) => {
        resolve(res as any)
      })
      .catch((err: any) => {
        reject(err)
      })
    })

  }
}

export default Fortnite