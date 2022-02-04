import m from "mithril"
import { Button, LinkButton } from "../components/button"
import { Tabs, HeaderClass, ImageHeader, TitleHeader, SubtitleHeader } from "../components/styles"

import {css, cx} from "@emotion/css"


let TabSelected = 0
let Chosen = null;
const Partnerships = [
    {
        id: "university",
        icon: "university.png",
        name: "East Cherwell University",
        slug: "An academic-led partnership to build a research repository for civil and criminal justice data.",
        content: [
            {
                section: "Theory of Change",
                copy: "A repository of standardized, cleaned court data from multiple jurisdictions, along with other institutional data, can help researchers and policymakers develop better understandings of how the justice system works in practice."
            },
            {
                section: "Data Transfer",
                copy: "Monthly bulk transfers to start. ECU eventually hopes to set up API access to individual courts, but this project is still in development."
            },
            {
                section: "Governance",
                copy: "ECU manages the repository. ECU is building an invited advisory board of court and other civil and criminal justice stakeholders. There are quarterly town halls for stakeholders to learn about the repository’s new initiatives, and public comment periods for new features. As a condition of receiving access, academic researchers are required to share data, analysis, and findings back into the repository."
            },
            {
                section: "Funding",
                copy: "To date, the repository has been funded by outside foundations."
            },
            {
                section: "Access",
                copy: "A public portal allows people to browse high-level trend data. Researchers will be able to submit detailed data requests, to be approved by ECU’s institutional review board (IRB). Courts get access to a dashboard of case trend data for their own courts, and rankings against other participating jurisdictions."
            },
            {
                section: "Other Features",
                copy: "ECU hopes to build mock datasets of civil and criminal justice issues to help facilitate research and testing while respecting the privacy of justice-involved individuals. They are preparing a design research sprint to better understand what courts would want to see in a data dashboard."
            },
        ]
    },
    {
        id: "courtfeed",
        icon: "courtfeed.png",
        name: "Courtfeed",
        slug: "A court-operated data collaborative, built around data feeds and regular court-centric reporting.",
        content: [
            {
                section: "Theory of Change",
                copy: "Modeled after quality improvement initiatives in hospitals and local government technology co-operatives, Courtfeed is a community of local courts building standards and tools for courts to produce real-time (or near-real-time) data feeds. Courts can make their data feeds available to outside partners, such as social service providers, law firms, and government agencies. Courtfeed also develops reports and resources for courts to help improve administrative processes and policies."
            },
            {
                section: "Data Transfer",
                copy: "Courtfeed works with courts to build data feeds that integrate with existing court management systems."
            },
            {
                section: "Governance",
                copy: "Courtfeed is a membership organization. Membership is currently open exclusively to state and local courts in the United States."
            },
            {
                section: "Funding",
                copy: "Courtfeed members pay an annual fee (currently $10,000) to participate. (Your current foundation funding will support the first two years of membership.)"
            },
            {
                section: "Data Access",
                copy: "Individual courts are free to make their data feeds available to whomever they like. Courtfeed is building a centralized request portal for researchers who want multi-jurisdictional data, and are in the planning stages of a pre-certification program for outside vendors who provide technology compatible with the standard."
            }
        ]
    },
    {
        id: "iliad",
        icon: "iliad.png",
        name: "Iliad Systems",
        slug: "Your court’s technology vendor offers a managed data portal, targeted primarily at litigants and researchers.",
        content: [
            {
                section: "Theory of Change",
                copy: "The best data program is the one you already have. Iliad Systems, your court management system provider, offers a managed data portal called Lore. Users can query Lore for individual or bulk cases, or subscribe to receive alerts when selected cases are updated."
            },
            {
                section: "Data Transfer",
                copy: "None. Data stays within Cherwell County court systems."
            },
            {
                section: "Governance",
                copy: "Lore is governed by your vendor contract with Iliad. Lore is not compatible with third-party court management systems."
            },
            {
                section: "Funding",
                copy: "Lore is free to courts. Iliad collects fees from high-usage users of Lore, such as businesses and universities."
            },
            {
                section: "Data Access",
                copy: "Using Lore, courts can set data access policies that are fully automatic and managed by Iliad. Lore automatically handles seals, redaction of personal information, and delayed data releases. Litigants, researchers, and policy makers can create accounts to browse data, make bulk queries, or get API access."
            }
        ]
    },
    {
        id: "county",
        icon: "county.png",
        name: "Cherwell County",
        slug: "A collaboration of local nonprofits and government agencies are sharing data to improve access to services for low-income and vulnerable residents.",
        content: [
            {
                section: "Theory of Change",
                copy: "Breaking down data silos among local nonprofits and government agencies can help improve access to services and close gaps in the social safety net for Cherwell County’s low-income and vulnerable residents."
            },
            {
                section: "Data Transfer",
                copy: "The county government is building a data clearinghouse, which would allow participating agencies and nonprofits (and you) to request data from one another.  The county hopes this solution won’t require a centralized data repository."
            },
            {
                section: "Governance",
                copy: "A stakeholder steering committee led by the county government manages the project."
            },
            {
                section: "Funding",
                copy: "The county government is using COVID stimulus funds to pay for the technical infrastructure to set up the clearinghouse, and to support partner onboarding. Partners are expected to be responsible for the cost of maintaining their incoming and outgoing data connections."
            },
            {
                section: "Access",
                copy: "Currently, this is a closed system. Data access is reserved for participating partners. If the project succeeds, the government may eventually allow limited access to the data for research purposes. However, many partners handle sensitive, confidential, or regulated data, and the county does not yet have a plan for resolving those issues, or reconsenting individuals."
            }
        ]
    }
]

const PartnershipsView = (vnode)=>{

    return {
        view: ()=>{
            return [
                m("h1", {class:"f3 f1-ns fw7"}, "Select a partnership"),
            m("section", {class:"f4-ns f5 lh-copy"}, [
                m("p",`There are four data partnerships for you to choose from. Although in the future, you may be able to engage with multiple partners, here you may select only one to proceed with.`),
                m("p",`Click on each partnership to learn more. You can hit the button labeled "Choose this one" to make your choice`),
                
                m("div", {role:"tablist", class:`center mw7 ${cx(Tabs)}`},[
                   Partnerships.map((item, index)=>{
                        return m("button", {
                            class:`br3 br--top input-reset w-100 pointer b--silver bt bl br ${item.id == Chosen ? "bg-washed-blue" : index === TabSelected ? "bg-white " : "bg-transparent bb"} ${item == Chosen ? "bw1" : ""} tc`,
                            role:"tab",
                            tabindex:"0",
                            style:`${index === TabSelected ? "border-bottom:none" : ""}`,
                            "aria-selected": (index === TabSelected).toString(),
                            onclick:(e)=>{
                                console.log(e.target)
                                TabSelected = index
                            },
                            },[
                            m("img", {
                            
                            style:"width:100px",
                            src:`static/${item.id}.png`,
                            alt:item.name
                            }),
                            //m("p",{class:"fw7 tc f6"}, item.name)
                        ])
                    })
                ]),

                m(PartnershipView, {partnership: Partnerships[TabSelected]}),
               /* Partnerships.map((partnership)=>{
                    return m(PartnershipView, {partnership: partnership, key: partnership.id})
                })*/
                m(LinkButton, {text:"Next!", href:`/pilots?partner=${Chosen}`, partner:Chosen})

            ])
            ]
        }
    }
    
}

const PartnershipView = (vnode)=>{
    return {
        view:(vnode)=>{
            const partner = vnode.attrs.partnership;
            return m("section", {role:"tabpanel", class:`mw7 bb bl br b--silver center br3 br--bottom pv3 ph4 f4-ns f5 lh-copy ${partner.id == Chosen ? "bw1 bg-washed-blue":"bg-white"}`}, [
                m("div",{class:cx(HeaderClass)},[
                    m("img", {class: `pr2 ${cx(ImageHeader)}`, src:`static/${partner.icon}`}),
                    m("h1", {class:`mv0 f2-ns f4 fw7 ${cx(TitleHeader)}`}, partner.name),
                    m("h2", {class:`mv0 fw4 f4-ns f6 ${cx(SubtitleHeader)}`}, partner.slug ),
                ]),
                
                partner.content.map((item)=>{
                    return m('p',{class:"f6 f4-ns lh-copy"},[
                        m("span", {class:"fw7"}, `${item.section}: `),
                        item.copy
                    ])
                }),

                partner.id != Chosen ? 
                m(Button, {
                    class:"center",
                    onclick:(e)=>{
                    console.log("click")
                    Chosen = partner.id;
                }, text: `Choose ${partner.name}`},)
                : null
            ])
        }
    }
}

export {PartnershipsView, Chosen}