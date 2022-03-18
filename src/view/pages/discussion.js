import m from "mithril"
import { Player } from "../../model/multiplayer"
import { LinkButton } from "../components/button"
import { IndividualDataCard } from "./host"



const Discussion = (vnode)=>{
    return {
        view:(vnode)=>{
            return [
            m("h1", {class:"f3 f1-ns fw7"}, "Discussion"),
            vnode.attrs.showCard ? 
            m("section", {class:"f4-ns f5 lh-copy"}, [
                m("p",`You did it! Here are the choices you made:`),
                m(IndividualDataCard, {participant: Player.playerData})

            ]) : null,
            m("section", {class:"mt3 f4-ns f5 lh-copy"}, [
                
                m("p",`Some closing discussion questions to consider.`),
                m("ul", [
                    m("li", {}, "Why did you pick this pilot project?"),
                    m("li", {}, "Do you have experience working on a pilot like this in your jurisdiction? "),
                    m("li", {}, "How does this project align with the values you selected at the beginning of the session?"),
                    m("li", {}, "How might you evaluate whether the pilot project is a success? (i.e., What might you want to know to facilitate learning about the project?"),
                    m("li", {}, "After this exercise, what questions might you have before starting a data partnership? What might you want to use data for in your own jurisdiction?"),
                ]),

                m("section", {class:`f5 ph4 pv3 ba br2 mt5 lh-copy`, style:`background-color:hsl(35, 100%, 95%)`},[
                m("h2", {class:"f4 f3-ns tc fw7"}, "About us"),
                m("p", `This simulation was written by Keith Porcaro (small scale), Zach Zarnow (NCSC), and Danielle Hirsch (NCSC).`),
                m("p",  [m("span",{class:"fw7"}, `small scale`), ` helps communities navigate a digitizing world. We design training materials, build simulations, and consult on data and technology governance.`]),
                m("p", [m("span",{class:"fw7"}, `The National Center for State Courts Access to Justice team`),` provides technical assistance and support to courts to help them ensure meaningful access to the courts for all. We work on process simplification and improvement, legal information, and a bunch of other stuff. Let's talk.`]),
                m("div", {class:"flex justify-around flex-wrap mv2"}, [
                    m("a", {"class":"pa2 dib black link mr3-ns mb3 mb0-ns f5-ns f6 fw7 ", href: "mailto:hi@smallscale.org", style:"background-image: linear-gradient(to right bottom, hsl(0, 100%, 90%),hsl(27, 99%, 90%))","alt":"small scale"}, "Contact small scale"),
                    m("a", {"class":"pa2 black link f5-ns f6 fw7 ", href:"https://calendly.com/d/cns-9d7-v3d/exiting-technology-projects-consult?month=2022-03", style:"background-image: linear-gradient(to right bottom, hsl(200, 100%, 90%),hsl(240, 99%, 90%))","alt":"small scale"}, "Contact NCSC A2J"),
                    // m("img", {"class":"dib h3","src":"static/ncsc.png","alt":"National Center for State Courts"}),
                ]),
              ])
               
              
            ])
            ]
        }

    }
}

export default Discussion