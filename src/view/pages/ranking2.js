import m from "mithril"
import { append, includes, length, move, remove } from "ramda"
import { LinkButton } from "../components/button"

import twemoji from "twemoji"

import {css, cx} from "@emotion/css"
import { Model } from "../../model/model"

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


const addItem = (item)=>{
    const Ranked = Model.answers.ranking2
    if(length(Ranked)>=3){
        return;
    }
    if(includes(item, Ranked)){
        return;
    }
    const newRanked = append(item, Ranked)
    Model.answers.ranking2 = newRanked;
}

const moveItem = (item, index, newIndex)=>{
    const Ranked = Model.answers.ranking2
    if(newIndex < 0 || newIndex > 2 ){
        return;
    }
    const newRanked = move(index, newIndex, Ranked)
    Model.answers.ranking2 = newRanked
}

const deleteItem = (item, index)=>{
    const Ranked = Model.answers.ranking2
    const newRanked = remove(index, 1, Ranked)
    Model.answers.ranking2 = newRanked
}


const RankingTwo = ()=>{
    return {
        view:()=>{
            return [
            m("h1", {class:"f3 f1-ns fw7"}, "Question 2"),
            m("section", {class:"f4-ns f5 lh-copy"}, [
                m("p",`Of the following list, identify the top three values that complete the sentence. No ties are allowed.`),
                m("p",{class:"f3-ns f4 fw2 mt2 tc"},`"When building and operating external data initiatives, courts should prioritize initiatives that support ___________. "`),
                
                m(RankedList),
                m(ValuesList),
                
                m(LinkButton, {text:"Next!", href:"/mc1"})
              
            ])
            ]
        }

    }
}

const RankedList = (vnode)=>{
    return {
        view:(vnode)=>{
            return m("div", {"aria-live":"polite"}, [
                Model.answers.ranking2.map((item, index, items)=>{
                   return m(RankedItem, {key: item, item:item, index:index, length: length(items) })
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
            return m("div", {class:`mw6 center fw7 ${cx(rankedGrid)}` },[
                m("a", {class:"pa2 f3-ns f4 w-75"}, `${index+1}. ${item}`),
                index > 0 ? 
                m("button", {"aria-label": "Move up", oncreate:(vnode)=>{twemoji.parse(vnode.dom, {folder: 'svg', ext: '.svg'})}, class:"pointer input-reset bg-transparent bn", onclick:(e)=>{moveItem(item, index, index-1)}}, "🔼") : m("a", {class:"pa2"}, " "),
                index < 2 && index < howMany-1 ? 
                m("button", {"aria-label": "Move down", oncreate:(vnode)=>{twemoji.parse(vnode.dom, {folder: 'svg', ext: '.svg'})}, class:"pointer input-reset bg-transparent bn", onclick:(e)=>{moveItem(item, index, index+1)}}, "🔽") :  m("a", {class:"pa2"}, " "),

                m("button", {"aria-label": "Remove", oncreate:(vnode)=>{twemoji.parse(vnode.dom, {folder: 'svg', ext: '.svg'})}, class:"pointer input-reset bg-transparent bn", onclick:(e)=>{deleteItem(item, index)}}, "❌"),
            ])
            
        }
    }
}

const ValuesList = ()=>{
    return {
        view:()=>{
            return m("div", {class:`pt4 tc ${cx(optionGrid)}`}, [
                Values.map((item)=>{
                    if(includes(item, Model.answers.ranking2)){
                        return m("button", {class:"bg-transparent input-reset pa2 bn disabled moon-gray",disabled:true}, item)
                    }
                    return m("button", {class:`bg-transparent relative pointer input-reset pa2 bn`, onclick: (e)=>{
                        addItem(item)
                    }} ,item)
                    
                })
            ])
        }
    }
}



export default RankingTwo