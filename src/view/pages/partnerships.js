import m from "mithril"
import { Button, LinkButton } from "../components/button"
import { Tabs, HeaderClass, ImageHeader, TitleHeader, SubtitleHeader } from "../components/styles"

import {css, cx} from "@emotion/css"
import { Model } from "../../model/model"
import { Player } from "../../model/multiplayer"


let TabSelected = 0
//let Chosen = Player.playerData.partnership || null;
const Partnerships = Model.content.partnership

const PartnershipsView = (vnode)=>{

    return {
        view: (vnode)=>{
            let Chosen = Player.playerData.partnership || null
            return [
                m("h1", {class:"f3 f1-ns fw7"}, "Select a partnership"),
            m("section", {class:"f4-ns f5 lh-copy"}, [
                m("p",`Please choose one of the four partnerships below. In the real world, you may be working with multiple partners, but for the purposes of this exercise, just chose one.`),
                m("p",`Click on each partnership to learn more. You can hit the button labeled "Choose this one" to make your choice`),
                
                m("div", {role:"tablist", class:`center mw7 ${cx(Tabs)}`},[
                   Partnerships.map((item, index)=>{
                        return m("button", {
                            class:`br3 br--top input-reset w-100 pointer ${item.id == Chosen ? "bw1 b--blue" : "b--silver"} bt bl br ${item.id == Chosen ? "bg-washed-blue" : index === TabSelected ? "bg-white " : "bg-transparent bb"} ${item.id == Chosen ? "bw1" : ""} tc`,
                            role:"tab",
                            tabindex:"0",
                            style:`max-height:100px; ${index === TabSelected ? "border-bottom:none; border-bottom-width:0;" : Partnerships[TabSelected].id === Chosen ? "border-bottom-color:#357EDD; border-bottom-width:.125rem" : ""}`,
                            "aria-selected": (index === TabSelected).toString(),
                            onclick:(e)=>{
                                console.log(e.target)
                                TabSelected = index
                            },
                            },[
                            m("img", {
                            
                            style:"width:100px;",
                            src:`static/${item.id}.png`,
                            alt:item.name
                            }),
                            //m("p",{class:"fw7 tc f6"}, item.name)
                        ])
                    })
                ]),

                m(PartnershipView, {partnership: Partnerships[TabSelected], room:vnode.attrs.room || null}),
               /* Partnerships.map((partnership)=>{
                    return m(PartnershipView, {partnership: partnership, key: partnership.id})
                })*/
                vnode.attrs.mp === true || vnode.attrs.preview === true ? null : m(LinkButton, {text:"Next!", href:`/pilots?partner=${Chosen}`, partner:Chosen})

            ])
            ]
        }
    }
    
}

const PartnershipView = (vnode)=>{
    return {
        view:(vnode)=>{
            let Chosen = Player.playerData.partnership || null
            const partner = vnode.attrs.partnership;
            const room = vnode.attrs.room
            return m("section", {role:"tabpanel", class:`mw7 bb bl br ${partner.id == Chosen ? "bw1 b--blue" : "b--silver"} center br3 br--bottom pv3 ph4 f4-ns f5 lh-copy ${partner.id == Chosen ? "bw1 bg-washed-blue":"bg-white"}`}, [
         
                m("h1", {class:`mv0 f2-ns lh-title f4 fw7 ${cx(TitleHeader)}`}, partner.name),
                m("h2", {class:`mb3 fw4 f3-ns lh-title f5 ${cx(SubtitleHeader)}`}, partner.slug ),
                
                partner.content.map((item)=>{
                    return m('p',{class:"f6 f4-ns lh-copy"},[
                        m("span", {class:"fw7"}, `${item.section}: `),
                        item.copy
                    ])
                }),

                partner.id != Chosen ? 
                m(Button, {
                    class:"center",
                    onclick:(e)=>{
                    console.log("click")
                   Player.submit(room, {partnership: partner.id})
                   m.redraw()
                }, text: `Choose ${partner.name}`},)
                : null
            ])
        }
    }
}

export {PartnershipsView}