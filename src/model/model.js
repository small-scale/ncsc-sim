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

    content: {
        "courtRole":{
            choices: [
                {
                    icon:"okay",
                    header:"No role.",
                    copy: "Court data should be open and available to everyone."
                   },
                   {
                    icon:"inform",
                    header:"Informed.",
                    copy: "The court should be informed of data requests (who is making them, what data they are accessing), but should have no role in approving or denying them."
                   },
                   {
                       icon:"consult",
                       header:"Consulting.",
                       copy: "Data requesters should be required to consult with the court on how data requests can be improved or modified, but they are not required to accept the court’s recommendations."
                   },
                   {
                       icon:"approve",
                       header:"Approval.",
                       copy: "The court should be responsible for approving at least some large-scale data requests from non-litigants."
                   },
                   {
                       icon:"veto",
                       header:"Veto.",
                       copy: "The court should be able to prevent fulfillment of data requests if there is a compelling reason to do so."
                   },
                   {
                       icon:"nope",
                       header:"No public data.",
                       copy: "Court data should not be available to the public."
                   },
            ]
        }, 
        "pilots":{
            choices: [
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

}

export {Model}