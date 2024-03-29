import m from "mithril"
import { LinkButton } from "../components/button"
import { AnswerGrid, AnswerListGrid, hoverAdjust, selectedClass, invisibleRadio } from "../components/styles"
import { Model } from "../../model/model"

import {css, cx} from "@emotion/css"
import { Player } from "../../model/multiplayer"



const Answers = Model.content.courtRole

const choose = (answer, room=null)=>{
    Player.submit(room, {courtRole:answer})
    //Model.answers.courtRole = answer;
}


const MC = (vnode)=>{
    return {
        view:(vnode)=>{
            return [
            m("h1", {class:"f3 f1-ns fw7"}, "Question 3"),
            m("section", {class:"f4-ns f5 lh-copy"}, [
                m("p",`For this question, assume that laws around sealing court documents remain unchanged, and that there is sufficient technical and staff infrastructure to support whichever answer you choose.`),
                m("p",{class:"f3-ns f4 fw2 mt2 tc"},`"In general, the court should have the following role in managing requests for court data from parties not involved in an instant case: "`),
               
                m(AnswerListView, {room: vnode.attrs.room}),
                
                
                vnode.attrs.mp === true || vnode.attrs.preview === true ? null : m(LinkButton, {text:"Next!", href:"/partnership"})
              
            ])
            ]
        }


    }
}

const AnswerListView = (vnode)=>{
    return {
        view:(vnode)=>{
            let room = vnode.attrs.room
            return m("form", {class:`mw7 center ${cx(AnswerListGrid)}`, oninput:(e)=>{choose(e.target.value, room)}, value:Player.playerData.courtRole || ""},                
                Answers.map((answer)=>{
                    return m(AnswerView, {answer:answer, key:answer.icon})
                })
            )               
        }
    }
}


const AnswerView = (vnode)=>{
    const answer = vnode.attrs.answer
    const icon = answer.id;
    const copy = answer.copy;
    const header = answer.name;
    return {
        view:(vnode)=>{
            return m("label", {
                for:icon,
               
                class:`pointer bw2 input-reset bg-transparent tl ba b--transparent pa2-ns pa1 ${Player.playerData.courtRole == icon ? cx(AnswerGrid, selectedClass) : cx(AnswerGrid, hoverAdjust)}`,
                onclick: (e)=>{/*choose(header)*/}
            
                }, [
                m("input",{type:"radio", id:icon, class:cx(invisibleRadio), value:icon,  name:"courtRole",}),
                m("img", {src:`static/${icon}.png`, class:"ba b--black bw1"}),
                m("p", {class:"pv0 mv0 f5-ns f6 lh-copy"}, [m("span", {class:"fw7 pr2"}, header), m("span", copy)]),
               
            ])
        }
    }
}
export default MC
