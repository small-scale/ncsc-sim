import m from "mithril"

import {cx} from "@emotion/css"
import { length, filter, includes, propSatisfies } from "ramda"
import { PilotGrid, PilotsGrid, ImageHeader, TitleHeader, SubtitleHeader, hoverAdjust, selectedClass, invisibleRadio } from "../components/styles"
import { Model } from "../../model/model"
import { LinkButton } from "../components/button"
import { Player } from "../../model/multiplayer"


const shuffle = (arr) => {
    var len = arr.length;
    var d = len;
    var array = [];
    var k, i;
    for (i = 0; i < d; i++) {
        k = Math.floor(Math.random() * len);
        array.push(arr[k]);
        arr.splice(k, 1);
        len = arr.length;
    }
    for (i = 0; i < d; i++) {
        arr[i] = array[i];
    }
    return arr;
}

const producePilots = (partner = null)=>{
    const Pilots = Model.content.pilots.choices
    if(partner===null){
        return shuffle(Pilots)
    }
    const matchPartner = propSatisfies(x => includes(partner, x), "partnerships")
    const matchedPilots = filter(matchPartner, Pilots)
    return shuffle(matchedPilots)
}

const PilotsView = (vnode)=>{
    const pilotSubset = producePilots(vnode.attrs.partner)
    console.log(vnode.attrs.room)
    return {
        view: (vnode)=>{
            let room = vnode.attrs.room || null
            return [
                m("h1", {class:"f3 f1-ns fw7"}, "Select a pilot"),
            m("section", {class:"f4-ns f5 lh-copy"}, [
                m("p",`Based on your partnership selection, there are ${length(pilotSubset)} pilots available to you. You can select one to proceed with.`),
                
                m("form", {
                    class:`center mw12 ${cx(PilotsGrid)}`,
                    oninput: (e)=>{
                        console.log(e.target.value)
                        Player.submit(room, {"pilot":e.target.value}) 
                    }
                    },[
                    pilotSubset.map((pilot)=>{
                        return m(PilotView, {pilot: pilot, key: pilot.id})
                    })
                ]),

                vnode.attrs.mp === true ? null :m(LinkButton, {text:"Next!", href:"/discussion"})


                //m(PartnershipView, {partnership: Partnerships[TabSelected]})
               /* Partnerships.map((partnership)=>{
                    return m(PartnershipView, {partnership: partnership, key: partnership.id})
                })*/
            ])
            ]
        }
    }
    
}

const PilotView = (vnode)=>{
    const pilot = vnode.attrs.pilot
    return {
        view: (vnode)=>{
            return m("label", {
                for: pilot.id,
                class:`pa2 ba bg-white pointer b--transparent bw2 br3 ${Player.playerData.pilot === pilot.id ? cx(PilotGrid, selectedClass) : cx(PilotGrid, hoverAdjust)}`,
                },[
                m("input",{type:"radio", id:pilot.id, class:cx(invisibleRadio), value:pilot.id,  name:"pilotRole",}),
                m("img", {class: cx(ImageHeader), src:`static/${pilot.id}.png`}),
                m("p", {class:`fw7 f4-ns f5 mv0 lh-title ${cx(TitleHeader)}`}, pilot.name),
                m("p", {class:`mv0 f5-ns f6 ${cx(SubtitleHeader)}`}, pilot.copy)
            ])
        }
    }
}

export default PilotsView