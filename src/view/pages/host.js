import m from "mithril"
import { Host } from "../../model/multiplayer"
import { Button, LinkButton } from "../components/button"



const HostDash = (vnode)=>{
    return {
        oninit:Host.connect(vnode.attrs.room),
        view:(vnode)=>{
            console.log(vnode.attrs)
            return [
            m("h1", {class:"f3 f1-ns fw7"}, "Host"),
            m("section", {class:"f4-ns f5 lh-copy"}, [
                m("p",`Host Code: ${vnode.attrs.room}`),
                m("p",`Participants`),
                Object.entries(Host.participantData).map(([key, value])=>{
                    return m("p", key)
                }),
                m("p",`Remote`),
                m(Button, {
                    class:"", 
                    text:"Intro", 
                    onclick:(e)=>{
                        Host.update(vnode.attrs.room, {route:"intro"})
                    }
                }),
                m(Button, {
                    class:"", 
                    text:"Question 1", 
                    onclick:(e)=>{
                        Host.update(vnode.attrs.room, {route:"ranking1"})
                    }
                }),
                m(Button, {
                    class:"", 
                    text:"Question 2", 
                    onclick:(e)=>{
                        Host.update(vnode.attrs.room, {route:"ranking2"})
                    }
                }),
                m(Button, {
                    class:"", 
                    text:"Question 3", 
                    onclick:(e)=>{
                        Host.update(vnode.attrs.room, {route:"mc"})
                    }
                }),
                m(Button, {
                    class:"", 
                    text:"Question 4", 
                    onclick:(e)=>{
                        Host.update(vnode.attrs.room, {route:"partnership"})
                    }
                }),
                m(Button, {
                    class:"", 
                    text:"Question 5", 
                    onclick:(e)=>{
                        Host.update(vnode.attrs.room, {route:"pilot"})
                    }
                }),
                m(Button, {
                    class:"", 
                    text:"Question 6", 
                    onclick:(e)=>{
                        Host.update(vnode.attrs.room, {route:"discussion"})
                    }
                }),


                m("p",`Status`),
                    m(Button, {
                        class:"", 
                        text:"Open", 
                        onclick:(e)=>{
                            Host.update(vnode.attrs.room, {status:"open"})
                        }
                    }),
                    m(Button, {
                        class:"", 
                        text:"Close", 
                        onclick:(e)=>{
                            Host.update(vnode.attrs.room, {status:"closed"})
                        }
                    }),
                    m(Button, {
                        class:"", 
                        text:"Coffee Break", 
                        onclick:(e)=>{
                            Host.update(vnode.attrs.room, {status:"coffee"})
                        }
                    }),
                m("p", `Data`),
              
              
            ])
            ]
        }

    }
}

export default HostDash