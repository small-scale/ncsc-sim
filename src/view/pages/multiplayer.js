import m from "mithril"
import { LinkButton } from "../components/button"
import {auth} from "../../util/firebase"
import { signInAnonymously } from "@firebase/auth"
import {Host, Run, User, UserData} from "../../model/multiplayer"

const MultiplayerMenu = ()=>{
    let status = null
    return {
        oninit:(vnode)=>{
            signInAnonymously(auth).then(() => {
                // Signed in..
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ...
              });
        },
        view:(vnode)=>{
            
            return [
            m("h1", {class:"f3 f1-ns fw7"}, "Building court data partnerships"),
            m("section", {class:"f4-ns f5 lh-copy"}, [
                m("p",`${User.id === null ? "Connecting to multiplayer service, please wait." : User.id }`),
                
                User.id === null ? null :
                [
                    m("p",`Existing Connections`),
                    User.host.map((room)=>{
                        return m("p", [m(m.route.Link, {selector: "a", class:"link black underline", href:`/host/${room}`}, `Rehost room ${room}` ), ])
                    }),
                    User.join.map((room)=>{
                        return m("p", [m(m.route.Link, {selector: "a", class:"link black underline", href:`/run/${room}`}, `Rejoin room ${room}` ), ])
                    }),
                    /*
                        If there are existing room connections, guide users here first.
                    */
                    m(m.route.Link,
                        {
                            selector: "button",
                            class:"link pa3 bg-washed-blue navy fw7 br2 bw1 b--navy mr3 pointer",
                            href:"/join"
                        },
                        `Join someone else's simulation`),
                    m("button",
                        {
                            class:"link black pa3 bg-transparent navy br2 fw4 f5 pointer bw1 b--navy",
                            onclick:async (e)=>{
                                status = "Loading";
                               let id = await Host.init();
                               if(id!==null){
                                   m.route.set(`/host/${id}`)
                               }
                            }
                        },
                        `${status === null ? "Host a new simulation" : status}`),
                    
                    ,]
              
              
            ])
            ]
        }

    }
}

export default MultiplayerMenu