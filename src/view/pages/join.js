import m from "mithril"
import { Player } from "../../model/multiplayer"
import { Button } from "../components/button"
import Discussion from "./discussion";
import Introduction from "./intro";
import MC from "./mc";
import { PartnershipsView } from "./partnerships";
import PilotsView from "./pilots";
import Ranking from "./ranking";
import RankingTwo from "./ranking2";


const JoinDash = (vnode)=>{
    
    let roomId = vnode.attrs.room;
    let name; 
    return {
        view:(vnode)=>{
            return [
                m("h1", {class:"f3 f1-ns tl w-100 fw7"}, "Join"),
                m("section", {class:"f4-ns f5 lh-copy w-100"}, [
                    m("label",{class:"f6",for:"roomCode"}, "Enter a room code"),
                    m("input",{class:"input-reset ba db b--black bw1 black br2 pa3 f4 mb4", oninput:(e)=>{
                        roomId=e.target.value
                    }, value:roomId, id:"roomCode"}),
                    m("label",{class:"f6",for:"nameOrAlias"}, "Enter your name (or an alias)"),
                    m("input",{class:"input-reset ba db b--black bw1 black br2 pa3 f4 mb4",oninput:(e)=>{
                        name=e.target.value
                    }, value:name, id:"nameOrAlias"}),
                    m(Button, {
                        onclick:async (e)=>{
                            await Player.join(roomId, name);
                            m.route.set(`/run/${roomId}`)
                        },
                        text:"Join"})
                ])
                ]
        }
    }

}

const JoinView = (vnode)=>{
    return {
        view:(vnode)=>{
            let room = Player.roomData
            return [
                m("p", `Joined ${vnode.attrs.room}`),
                m("p", room.status),
                m("p", room.route),
                room.route ? m(JoinRouter[room.route]) : null
            ]
        }
    }
}





const JoinRouter = {
    "/": (vnode)=>{
        return {
            view:(vnode)=>{
                return m(Introduction, {mp: true})
            }
        }
    },
    "intro": (vnode)=>{
        return {
            view:(vnode)=>{
                return m(Introduction, {mp: true})
            }
        }
    },
    "ranking1": (vnode)=>{
        return {
            view:(vnode)=>{
                return m(Ranking, {mp: true})
            }
        }
    },
    "ranking2": (vnode)=>{
        return {
            view:(vnode)=>{
                return m(RankingTwo, {mp: true})
            }
        }
    },
    "mc": (vnode)=>{
        return {
            view:(vnode)=>{
                return m(MC, {mp: true})
            }
        }
    },
    "partnership": (vnode)=>{
        return {
            view:(vnode)=>{
                return m(PartnershipsView, {mp: true})
            }
        }
    },
    "pilot": (vnode)=>{
        return {
            view:(vnode)=>{
                return m(PilotsView, {mp: true, pilot: vnode.attrs.pilot || null})
            }
        }
    },
    "discussion": (vnode)=>{
        return {
            view:(vnode)=>{
                return m(Discussion, {mp: true})
            }
        }
    },
}

export {JoinDash, JoinView}