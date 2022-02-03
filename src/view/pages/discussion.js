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
                m("p",`If you're interested in learning more about possible data partnerships, get in touch with the NCSC A2J team.`),

               
              
            ])
            ]
        }

    }
}

export default Discussion