import m from "mithril"

import {css, cx} from "@emotion/css"

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

const Button = (vnode) =>{
    return {
        view: (vnode)=>{
            return m("button", {
                onclick: vnode.attrs.onclick, 
                class:`f3 center db tc pointer no-underline black bw2 bg-animate hover-bg-blue hover-white inline-flex items-center pa3 ba border-box `
                }, vnode.attrs.text)
        }
    }
}

const LinkButton = (vnode)=>{
    return {
        view: (vnode)=>{
            return m(m.route.Link, {
                selector: "button",
                options: {},
                href:vnode.attrs.href,
                class:`f3 db tc mt4 pointer relative no-underline bg-animate inline-flex items-center pa3 ba border-box ${cx(buttonShadow, hoverButton)}`
            }, vnode.attrs.text)
        }
    }
}

export {Button, LinkButton}