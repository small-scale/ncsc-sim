import m from "mithril"
import { LinkButton } from "../components/button"



const MultiplayerMenu = ()=>{
    return {
        view:()=>{
            return [
            m("h1", {class:"f3 f1-ns fw7"}, "Building court data partnerships"),
            m("section", {class:"f4-ns f5 lh-copy"}, [
                m("p",`Connecting to service`),
                m("p",`Existing Connections`),
                m("p",`Host`),
                m("p", `Join`),
              
              
            ])
            ]
        }

    }
}

export default MultiplayerMenu