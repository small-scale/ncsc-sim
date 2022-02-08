import m from "mithril"
import { append, includes, length, move, remove } from "ramda"
import { LinkButton } from "../components/button"
import { Model } from "../../model/model"

import twemoji from "twemoji"

import {css, cx} from "@emotion/css"
import { Player } from "../../model/multiplayer"

const optionGrid = css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
`
const rankedGrid = css`
    display: grid;
    grid-template-columns: 1fr 30px 30px 30px;
    grid-gap: 10px
`

const Values = [
    "Access to Justice",
    "Efficiency",
    "Innovation",
    "Learning",
    "Community",
    "Research",
    "Privacy",
    "Policy Improvements",
    "Openness",
    "Accessibility",
    "Anti-poverty",
    "Equity"
]

const buttonShadow = css`
box-shadow: 0 6px hsl(216,71%,78%);
background-color: hsl(222,95%,95%);
border-color: hsl(216,71%,78%);
border-radius: .5rem;
border-width: .1rem;
color: hsl(216, 71%, 33%);
font-weight:700
`

const hoverButton = css`
&:hover{
    box-shadow: 0 3px hsl(216,71%,78%);
    top: 2px;
   
}`


const addItem = (item, room=null)=>{
    const Ranked = Player.playerData.ranking2 || []
    if(length(Ranked)>=3){
        return;
    }
    if(includes(item, Ranked)){
        return;
    }
    const newRanked = append(item, Ranked)
    Player.submit(room, {ranking2: newRanked})
}

const moveItem = (item, index, newIndex, room=null)=>{
    const Ranked = Player.playerData.ranking2 || []
    if(newIndex < 0 || newIndex > 2 ){
        return;
    }
    const newRanked = move(index, newIndex, Ranked)
    Player.submit(room, {ranking2: newRanked})
}

const deleteItem = (item, index, room=null)=>{
    const Ranked = Player.playerData.ranking2 || []
    const newRanked = remove(index, 1, Ranked)
    Player.submit(room, {ranking2: newRanked})
}


const RankingTwo = (vnode)=>{
    return {
        view:(vnode)=>{
            let room = vnode.attrs.room || null
            let ranked = Player.playerData.ranking2 || []
            return [
            m("h1", {class:"f3 f1-ns fw7"}, "Question 2"),
            m("section", {class:"f4-ns f5 lh-copy"}, [
                m("p",`Of the following list, identify the top three values that complete the sentence. No ties are allowed.`),
                m("p",{class:"f3-ns f4 fw2 mt2 tc"},`"When building and operating external data initiatives, courts should prioritize initiatives that support ___________. "`),
                
                m(RankedList, {room:vnode.attrs.room}),
                m(ValuesList, {room:vnode.attrs.room}),
                
                vnode.attrs.mp === true ? null : m(LinkButton, {text:"Next!", href:"/ranking2"})
              
            ])
            ]
        }

    }
}

const RankedList = (vnode)=>{
    return {
        view:(vnode)=>{
            let Ranked =  Player.playerData.ranking2 || []            
            return m("div", {"aria-live":"polite"}, [
                Ranked.map((item, index, items)=>{
                   return m(RankedItem, {key: item, item:item, index:index, length: length(items), room:vnode.attrs.room })
                })
            ])
        }
    }
}

const RankedItem = (vnode)=>{
    return { 
        view:(vnode)=>{
            const item = vnode.attrs.item;
            const index = vnode.attrs.index
            const howMany = vnode.attrs.length
            const room = vnode.attrs.room
            return m("div", {class:`mw6 center fw7 ${cx(rankedGrid)}` },[
                m("a", {class:"pa2 f3-ns f4 w-75"}, `${index+1}. ${item}`),
                index > 0 ? 
                m("button", {"aria-label": "Move up", oncreate:(vnode)=>{twemoji.parse(vnode.dom, {folder: 'svg', ext: '.svg'})}, class:"pointer input-reset bg-transparent bn pa0", onclick:(e)=>{moveItem(item, index, index-1, room)}}, "🔼") : m("a", {class:"pa2"}, " "),
                index < 2 && index < howMany-1 ? 
                m("button", {"aria-label": "Move down", oncreate:(vnode)=>{twemoji.parse(vnode.dom, {folder: 'svg', ext: '.svg'})}, class:"pointer input-reset bg-transparent bn pa0", onclick:(e)=>{moveItem(item, index, index+1, room)}}, "🔽") :  m("a", {class:"pa2"}, " "),

                m("button", {"aria-label": "Remove", oncreate:(vnode)=>{twemoji.parse(vnode.dom, {folder: 'svg', ext: '.svg'})}, class:"pointer input-reset bg-transparent bn pa0", onclick:(e)=>{deleteItem(item, index, room)}}, "❌"),
            ])
            
        }
    }
}

const ValuesList = (vnode)=>{
    return {
        view:(vnode)=>{
            let Ranked =  Player.playerData.ranking2 || []
            const room = vnode.attrs.room
            return m("div", {class:`pt4 tc ${cx(optionGrid)}`}, [
                Values.map((item)=>{
                    if(includes(item, Ranked)){
                        return m("button", {class:"bg-transparent input-reset pa2 bn disabled moon-gray",disabled:true}, item)
                    }
                    return m("button", {class:`bg-transparent relative pointer input-reset pa2 bn`, onclick: (e)=>{
                        addItem(item, room)
                    }} ,item)
                    
                })
            ])
        }
    }
}



export default RankingTwo