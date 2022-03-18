import m from "mithril"
import twemoji from "twemoji";



const Splash = (vnode)=>{
    
    return {
        view:(vnode)=>{
            let mp = vnode.attrs.mp;
            let ready = mp === true ? vnode.attrs.playerData.ready : null;
            let room = mp == true ? vnode.attrs.room : null;
            return [
            m("h1", {class:"f3 f1-ns fw7"}, "Building court data partnerships"),
            m("h2", {class:"f4 f3-ns pt1 fw4"}, "A simulation from small scale and the National Center for State Courts "),
            m("section", {class:"f4-ns f5 lh-copy"}, [
                m("p",`Welcome to `,m("span", {class:"i"},`Building court data partnerships`),`, a simulation from small scale and NCSC. We built this simulation to help courts imagine partnerships that data and technology can help facilitate, and think about how to evaluate them.`),
                m("p",`There are two ways to try the simulation. In single-player mode, you can run the simulation on your own or with an in-person group. In multiplayer mode, you can run the simulation with a distributed team (like over Zoom). In multiplayer mode, each participant uses their own device to answer individual questions, before coming together to discuss each question as a group.`),
                
                
            ]),

            m("div", {class:`flex flex-wrap justify-around mv5`}, [
                m("section", {class:`f4-ns w-third ba f5 ph3 pv3 mr2 mb4 bw1 bg-white br3 lh-copy`, style:`background-color:hsl(216,97%,95%)`}, [
                    m(m.route.Link, {selector:"a", href:"/intro", class:"link black"}, [
                        m("p",{class:`tc f1 mv2`, style:``, oncreate:(vnode)=>{
                            twemoji.parse(vnode.dom)
                        }},`🕹️`),
                        m("h3",{class:`tc f3-ns f5 fw7 mv0`, style:``},`Single player`),
                     //   m("p", {class:'tc mv0 f5'}, 'Courtesy of NCSC')
                    ])
                   
                ]),
    
                m("section", {class:`f4-ns w-third ba f5 ph3 pv3 mr2 mb4 bw1 bg-white br3 lh-copy`, style:`background-color:hsl(35, 100%, 85%)`}, [
                    m(m.route.Link, {selector:"a", href:"/mp", class:"link black"}, [
                        m("p",{class:`tc f1 mv2`, style:``, oncreate:(vnode)=>{
                            twemoji.parse(vnode.dom)
                        }},`🕹️🕹️`),
                    m("h3",{class:`tc fw7 f3-ns f5 mv0`, style:``},`Multiplayer`),
                   // m("p", {class:'tc mv0 f5'}, 'Print and plan')
                ])
                ]),
            ]),
            ]
        }

    }
}

export default Splash