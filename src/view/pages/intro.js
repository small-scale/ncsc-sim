import m from "mithril"
import { LinkButton } from "../components/button"



const Introduction = (vnode)=>{
    return {
        view:(vnode)=>{
            return [
            m("h1", {class:"f3 f1-ns fw7"}, "Building court data partnerships"),
            m("section", {class:"f4-ns f5 lh-copy"}, [
                m("p",`You oversee the courts in Cherwell County, a mid-sized suburban county with about 250,000 residents.`),
                m("p",`As part of a renewed interest in court data, you’ve received some foundation funding to set up a data partnership, along with a pilot project that uses court data. There are several promising options to choose from, from research to court efficiency to quality improvement.`),
                m("p", `For the purposes of this exercise, assume that the foundation funding will cover all the costs of whatever partnership and pilot option you select.`),
                m("h2", {class:"f4 f3-ns pt3 fw7"}, "The simulation"),
                m("p",`Your job has three parts.`),
                m("p",[`First, you’ll `, m("span",{class:"fw7"},`identify your values`), ` with respect to court data and data sharing. We’ll ask you to set the court’s priorities for what data should be used for, and help define the court’s role in managing access to data.`]),
                m("p",[`Second, you’ll `, m("span",{class:"fw7"},`select a primary data partner`), `. Each potential partnership has different strengths and weaknesses, and will facilitate or foreclose different types of pilot projects.`]),
                m("p",[`Finally, you’ll `,m("span",{class:"fw7"},`select a pilot project.`),` The pilot projects available to you will change based on your primary data partner. In addition to selecting a pilot project, we’ll ask you to reflect on what you hope to learn from the selected pilot, and how you might evaluate whether it should continue.`]),
                
                vnode.attrs.mp === true ? null : m(LinkButton, {text:"Next!", href:"/ranking1"})
              
            ])
            ]
        }

    }
}

export default Introduction