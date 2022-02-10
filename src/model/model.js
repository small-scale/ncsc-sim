const Model = {

    order: [
        "ranking1",
        "ranking2",
        "courtRole",
        "partnership",
        "pilot"
    ],

    answers: {
        ranking1: [],
        ranking2: [],
        courtRole: null,
        partnership: null,
        pilot: null
    },

    update:(id, data)=>{
        //check whether the update is allowed (if multiplayer participant)
        //modify answer
        //update firebsae
    },

    getFieldById:(section, criterion, field)=>{
        let output;
        Model.content[section].some((item)=>{
            if(item["id"]===criterion){
                output = item[field]
                return true;
            }
        })
        return output
    },

    content: {
        "partnership":[
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
                name: "Cherwell County Government",
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
        ],
        "courtRole": [
                {
                    id:"okay",
                    name:"No role.",
                    copy: "Court data should be open and available to everyone."
                   },
                   {
                    id:"inform",
                    name:"Informed.",
                    copy: "The court should be informed of data requests (who is making them, what data they are accessing), but should have no role in approving or denying them."
                   },
                   {
                       id:"consult",
                       name:"Consulting.",
                       copy: "Data requesters should be required to consult with the court on how data requests can be improved or modified, but they are not required to accept the court’s recommendations."
                   },
                   {
                       id:"approve",
                       name:"Approval.",
                       copy: "The court should be responsible for approving at least some large-scale data requests from non-litigants."
                   },
                   {
                       id:"veto",
                       name:"Veto.",
                       copy: "The court should be able to prevent fulfillment of data requests if there is a compelling reason to do so."
                   },
                   {
                       id:"nope",
                       name:"No public data.",
                       copy: "Court data should not be available to the public."
                   },
            ]
        , 
        "pilot":[
                {
                    id: "fines",
                    partnerships: ["university", "iliad"],
                    name: "Fines and fees mitigation research",
                    copy: `A university researcher would like to use archival court data and qualitative interviews to understand the impact of fines and fees (and strategies to reduce and mitigate them).`
                },
                {
                    id: "caseflow",
                    partnerships: ["university", "iliad"],
                    name: "Caseflow Management Study",
                    copy: `NCSC can work with the court’s data to model and analyze its criminal caseflow management, compare it to peer counties, and work with a national framework to suggest improvements and best practices. `
                },
                {
                    id: "experience",
                    partnerships: ["university", "iliad"],
                    name: "Research on disparate experiences of minority court users",
                    copy: `A university researcher would like to survey court officers and compare case outcomes to uncover and quantify race-based bias and case outcome disparities.`
                },
                {
                    id: "pretrial",
                    partnerships: ["university", "iliad"],
                    name: "Pretrial collateral consequences research",
                    copy: `A university researcher would like to use archival civil and criminal court data to understand collateral consequences of pretrial detention for Cherwell County residents.`
                },
                {
                    id: "jfa",
                    partnerships: ["university", "iliad"],
                    name: "Justice for All strategic planning ",
                    copy: `As part of their Justice for All Initiative, NCSC would like to partner to facilitate building a strategic action plan for Cherwell County courts. Using detailed court data, NCSC consultants will work with the courts and other justice sector stakeholders to identify and quantify civil justice gaps (legal deserts, barriers to access, etc.) in the county, and develop targeted interventions to mitigate them.`
                },
                {
                    id: "pandemictech",
                    partnerships: ["university", "iliad"],
                    name: "Research on pandemic-adopted technology in courts",
                    copy: `A university researcher would like to use court data and interviews of court staff and justice-involved individuals to examine how appearance rates, court user satisfaction, and/or case outcomes are affected by remote appearances, e-filing, and other uses of technology.`
                },
                {
                    id: "kiosk",
                    partnerships: ["courtfeed", "county"],
                    name: "Community kiosk network",
                    copy: `The county government would like to integrate the courts into a community kiosk network. Kiosks are small private booths with videoconferencing and print setups. Installed in government offices, social service agencies, churches, and other trusted locations, they can connect people with social services, resources, and vital documents, and facilitate live video conversations with local caseworkers. Here, people could use kiosks to connect to remote court hearings and access services and documents that might be relevant to their case.`
                },
                {
                    id: "healthcare",
                    partnerships: ["courtfeed", "county"],
                    name: "Healthcare access program",
                    copy: `The state health department has been piloting a program to expand healthcare access to justice-involved individuals. They would like to expand the pilot to Cherwell County. They hope that direct access to court data can make the program more efficient, help connect more people to the state’s healthcare exchange, and bring more services directly to people who need them.`
                },
                {
                    id: "selfhelp",
                    partnerships: ["courtfeed", "iliad"],
                    name: "Self-help research center",
                    copy: `NCSC has proposed to help improve and expand the services offered at a self-help research center for county residents. The self-help center would have both an online presence and a physical presence in the courts, and would rely on case data to help users identify personalized resources and assistance.`
                },
                {
                    id: "reminders",
                    partnerships: ["courtfeed", "iliad"],
                    name: "Reminder engine",
                    copy: `A local university wants to use live court data to build a reminder engine—a tool for litigants and attorneys to create and send custom reminders via text, email, or phone call. The university argues that using their reminder engine will help the content of reminders stay protected under attorney-client privilege, and minimize court responsibility for failed reminders.`
                },
                {
                    id: "checkup",
                    partnerships: ["courtfeed", "county"],
                    name: "Legal check-up",
                    copy: `A collaboration of statewide legal aid organizations have built a digital checkup tool for helping families remove civil legal barriers. The check-up tool relies on data pulled directly from state and local agencies. The collaboration would like to directly integrate court data to build a more complete picture of users’ legal issues.`
                },
                {
                    id: "eviction",
                    partnerships: [ "courtfeed", "county"],
                    name: "Eviction diversion",
                    copy: `A collaboration of community organizations are building a pilot eviction diversion network. The project connects landlords and tenants with rental assistance funds, housing counselors, mediators, and legal aid. It uses data shared amongst these entities and the court to coordinate and ensure transparency about the status of a given case. (e.g., waiting for rental assistance, landlord has already been paid)`
                },
                {
                    id: "mlpp",
                    partnerships: [ "courtfeed", "county"],
                    name: "Medical-legal-psychology partnership",
                    copy: `A local children’s hospital and legal aid organization are partnering on a medical-legal partnership that incorporates child psychologists to address social, economic, and environmental barriers that entrench inequities in children’s health. The partnership would like to use live court data to conduct outreach to justice-involved courts, similar to a partnership they have with Cherwell County Schools.`
                },
            ]
       
    }

}

export {Model}