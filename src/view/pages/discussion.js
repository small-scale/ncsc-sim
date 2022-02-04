import m from "mithril"
import { LinkButton } from "../components/button"



const Discussion = ()=>{
    return {
        view:()=>{
            return [
            m("h1", {class:"f3 f1-ns fw7"}, "Discussion"),
            m("section", {class:"f4-ns f5 lh-copy"}, [
                m("p",`Now that you've picked a pilot, here are some discussion questions to consider.`),
                m("ul", [
                    m("li", {}, "Why did you pick this pilot project?"),
                    m("li", {}, "Do you have experience working on a pilot like this in your jurisdiction? "),
                    m("li", {}, "How does this project align with the values you selected at the beginning of the session?"),
                    m("li", {}, "How might you evaluate whether the pilot project is a success? (i.e., What might you want to know to facilitate learning about the project?"),
                    m("li", {}, "After this exercise, what questions might you have before starting a data partnership? What might you want to use data for in your own jurisdiction?"),
                ]),

                m("h2", {class:"f4 f3-ns fw7"}, "About us"),
                m("p", `This simulation was written by Keith Porcaro (small scale), Zach Zarnow (NCSC), and Danielle Hirsch (NCSC).`),
                m("p",  [m("span",{class:"fw7"}, `small scale`), ` helps communities navigate a digitizing world. We design training materials, build simulations, and consult on data and technology governance.`]),
                m("p", [m("span",{class:"fw7"}, `The National Center for State Courts Access to Justice team`),` provides technical assistance and support to courts to help them ensure meaningful access to the courts for all. We work on process simplification and improvement, legal information, and a bunch of other stuff. Let's talk.`]),
                m("p",`To remix this simulation, or make your own, visit `, m("a", {href:"https://smallscale.org/?ref=ncscsim", class:"link black"},`small scale.`)),
                m("p",`If you're interested in learning more about possible data partnerships, get in touch with the `, m("a", {href:"https://ncsc.org/a2j", class:"link black"},`NCSC A2J team.`)),

               
              
            ])
            ]
        }

    }
}

export default Discussion