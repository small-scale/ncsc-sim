import m from "mithril"
import { LinkButton } from "../components/button"



const HostDash = ()=>{
    return {
        view:()=>{
            return [
            m("h1", {class:"f3 f1-ns fw7"}, "Host"),
            m("section", {class:"f4-ns f5 lh-copy"}, [
                m("p",`Host Code`),
                m("p",`Participants`),
                m("p",`Remote`),
                m("p",`Status`),
                m("p", `Data`),
              
              
            ])
            ]
        }

    }
}

export default HostDash