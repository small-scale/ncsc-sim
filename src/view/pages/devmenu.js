import m from "mithril"
import { LinkButton } from "../components/button"



const DevMenu = ()=>{
    return {
        view:()=>{
            return [
            m("h1", {class:"f3 f1-ns fw7"}, "Building court data partnerships"),
            m("section", {class:"f4-ns f5 lh-copy"}, [
                m("p",`Single Player`),
                m("p",`Multiplayer`),
                m("p", `Embed Test`),
                m("h2", {class:"f4 f3-ns pt3 fw7"}, "The simulation"),
              
                m(LinkButton, {text:"Next!", href:"/ranking1"})
              
            ])
            ]
        }

    }
}

export default DevMenu