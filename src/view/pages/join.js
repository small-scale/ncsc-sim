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
        onremove:(vnode)=>{
            Player.disconnect();
        },
        view:(vnode)=>{
            let room = Player.roomData
            return [
                m("p", {class:"bg-washed-blue b--light-blue dark-blue ba pa3 br3 f5"}, `You have joined room ${vnode.attrs.room} as ${Player.playerData.name}. Your host will remotely control the questions that you and other participants see.`),
             /*   m("p", room.status),
                m("p", room.route),*/
                room.route ? m(JoinRouter[room.route], {playerData: Player.playerData, room:vnode.attrs.room}) : null
            ]
        }
    }
}





const JoinRouter = {
    "/": (vnode)=>{
        return {
            view:(vnode)=>{
                console.log(vnode.attrs.room)
                return m(Introduction, {playerData: vnode.attrs.playerData, room:vnode.attrs.room, mp: true})
            }
        }
    },
    "intro": (vnode)=>{
        return {
            view:(vnode)=>{
                return m(Introduction, {playerData: vnode.attrs.playerData, room:vnode.attrs.room, mp: true})
            }
        }
    },
    "ranking1": (vnode)=>{
        return {
            view:(vnode)=>{
                return m(Ranking, {playerData: vnode.attrs.playerData, room:vnode.attrs.room, mp: true})
            }
        }
    },
    "ranking2": (vnode)=>{
        return {
            view:(vnode)=>{
                return m(RankingTwo, {playerData: vnode.attrs.playerData, room:vnode.attrs.room, mp: true})
            }
        }
    },
    "mc": (vnode)=>{
        return {
            view:(vnode)=>{
                return m(MC, {playerData: vnode.attrs.playerData, room:vnode.attrs.room, mp: true})
            }
        }
    },
    "partnership": (vnode)=>{
        return {
            view:(vnode)=>{
                return m(PartnershipsView, {playerData: vnode.attrs.playerData, room:vnode.attrs.room, mp: true})
            }
        }
    },
    "pilot?partner=university": (vnode)=>{
        return {
            view:(vnode)=>{
                return m(PilotsView, {mp: true, room:vnode.attrs.room, partner: "university"})
            }
        }
    },
    "pilot?partner=courtfeed": (vnode)=>{
        return {
            view:(vnode)=>{
                return m(PilotsView, {mp: true, room:vnode.attrs.room, partner: "courtfeed"})
            }
        }
    },
    "pilot?partner=iliad": (vnode)=>{
        return {
            view:(vnode)=>{
                return m(PilotsView, {mp: true, room:vnode.attrs.room, partner: "iliad"})
            }
        }
    },
    "pilot?partner=government": (vnode)=>{
        return {
            view:(vnode)=>{
                return m(PilotsView, {mp: true, room:vnode.attrs.room, partner: "county"})
            }
        }
    },
    "discussion": (vnode)=>{
        return {
            view:(vnode)=>{
                return m(Discussion, {playerData: vnode.attrs.playerData, room:vnode.attrs.room, mp: true})
            }
        }
    },
}

export {JoinDash, JoinView}