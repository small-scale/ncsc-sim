import m from "mithril"
import { Host } from "../../model/multiplayer"
import { Button, LinkButton } from "../components/button"
import twemoji from "twemoji"
import Discussion from "./discussion";
import Introduction from "./intro";
import MC from "./mc";
import { PartnershipsView } from "./partnerships";
import PilotsView from "./pilots";
import Ranking from "./ranking";
import RankingTwo from "./ranking2";

import { css, cx } from "@emotion/css"
import { append, compose, descend, filter, flatten, has, includes, isEmpty, length, prop, sortBy } from "ramda";
import { Model } from "../../model/model";
import { __ } from "ramda";
import { invisibleRadio } from "../components/styles";

const RemoteGrid = css`
display: grid;
grid-template-rows: 125px 1fr 1fr;
grid-template-columns: .75fr 1fr 1fr;
grid-template-areas: "a b b"
            "c b b"
            "c b b";
grid-gap:10px;
`
const DashMenu = css`
grid-area: a
`
const RemoteMenu = css`
grid-area: c
`
const RemotePreview = css`
grid-area: b
`

const VotedTable = css`
display: grid;
grid-template-columns: 75px 1fr 50px;
grid-gap: 15px;
min-width: 300px;
max-width: 450px;
align-items:center;
`

const flagGrid = css`
display:grid;
grid-template-columns: 75px 1fr;
grid-gap: 15px;
align-items:center;
`

const RankedTable = css`
display: grid;
grid-template-columns: 1fr 50px 50px 50px 50px;
grid-gap: 10px; 
min-width: 300px;
max-width: 450px;
`

const DataCardGrid = css`
display: grid;
grid-template-columns: 1fr 1fr;
grid-gap:10px;
min-width: 300px;
max-width: 450px;
`

let DataSetting = "aggregate"
const HostDash = (vnode)=>{
    return {
        oninit:(vnode)=>{Host.connect(vnode.attrs.room)},
        onremove:()=>{Host.disconnect()},
        view:(vnode)=>{
            return [
            m("h1", {class:"f3 f1-ns fw7"}, "Host"),
            m("section", {class:"f4-ns f5 lh-copy"}, [
                m("p",`Room Code: ${vnode.attrs.room}`),
                m(Remote, {room:vnode.attrs.room}),

                
                m("h2", {class:"f2 fw7 mt5 mb0", oncreate:(vnode)=>{twemoji.parse(vnode.dom)}}, "📊 Data"),
                m("p",{},[
                    m("button", {
                        class:`pa3 bn mr3 f5 pointer ${DataSetting === "aggregate" ? "fw7 bg-black-10 br3" : "fw4 bg-transparent br3"}`,
                        onclick: (e)=>{
                            DataSetting = "aggregate"
                        }
                    }, "Aggregate"),
                    m("button", {
                        class:`pa3 bn f5 pointer ${DataSetting === "individual" ? "fw7 bg-black-10  br3" : "fw4 bg-transparent br3"}`,
                        onclick: (e)=>{
                            DataSetting = "individual"
                        }
                    }, "Individual"),
                ]),
                m(DataView),
                
                //console.log(AggregateRankingData(Host.participantData, "ranking1")),
               /* Object.entries(Host.participantData).map(([key, value])=>{
                    return m("p",JSON.stringify(value))

                    m("p",`Status`),
                    m(Button, {
                        class:"", 
                        text:"Open", 
                        onclick:(e)=>{
                            Host.update(vnode.attrs.room, {status:"open"})
                        }
                    }),
                    m(Button, {
                        class:"", 
                        text:"Close", 
                        onclick:(e)=>{
                            Host.update(vnode.attrs.room, {status:"closed"})
                        }
                    }),
                    m(Button, {
                        oncreate:(vnode)=>{twemoji.parse(vnode.dom)},
                        class:"", 
                        text:"☕  Coffee break", 
                        onclick:(e)=>{
                            Host.update(vnode.attrs.room, {status:"coffee"})
                        }
                    }),
                })*/
              
              
            ])
            ]
        }

    }
}



const AggregateRankingData = (data, key)=> {
    //take in participant data, format it for aggregate purposes
   // const keys = ["ranking1", "ranking2", "pilot", "partnership", "courtRole"]
    let AggRanking = []

    Object.values(data).map((item)=>{
        const hasPath = has(key)
        if(hasPath(item) == true){
        const newRanking = append(item[key], AggRanking)
        AggRanking = newRanking
        }
    })
    let OutputRanking = {}
    AggRanking.map((ranking)=>{
        ranking.map((item, index)=>{
            const hasItem = has(item)
            if(hasItem(OutputRanking) === true){
                OutputRanking[item][index]+=1;
            } else{
                OutputRanking[item] = [0,0,0];
                OutputRanking[item][index]+=1;
            } 
        })   
    })
     let ListedRanking = []
    Object.entries(OutputRanking).map(([key,value])=>{
        let total = value[0]*3+value[1]*2+value[2]
        OutputRanking[key][3] = total;
        ListedRanking.push(flatten([key, OutputRanking[key]]))
    })

    let sortByTotal = sortBy(descend(prop(4)))
    const sortedRanking = sortByTotal(ListedRanking)
    //then sort by total
    return sortedRanking
}

const AggregateVotingData = (data, key)=>{
    let AggRanking = {}
    //list of player data data
    Object.values(data).map((item)=>{
        const hasPath = has(key)
        //if player has participated in this activity yet
        if(hasPath(item) == true){
           //grab the data
           const output = item[key]
           const hasOutput = has(output)
           if(hasOutput(AggRanking)){
               AggRanking[output]+=1
           } else{
            if(output !== "" && output!==null){
                AggRanking[output] = 1
            }
            
           }
        }
    })
    let ListedRanking = []
    Object.entries(AggRanking).map(([key,value])=>{
        ListedRanking.push([key, value])
    })
    let sortByTotal = sortBy(descend(prop(1)))
    const sortedRanking = sortByTotal(ListedRanking)
    return sortedRanking
}

const RankingTable = (vnode)=>{
    return {
        view: (vnode)=>{
            let data = AggregateRankingData(Host.participantData, vnode.attrs.id);
            return length(data)===0 ? null : m("div",{class:"pa3 ba b--black mv3 mh2"},
                [   m("h2", {class:"f4 fw7 mt2 mb4", style:"max-width:450px"}, vnode.attrs.title),
                    m("div", {class:`${cx(RankedTable)}`}, 
                        m("div", {},""),
                        m("div", {class:"fw7 tc bb"},"Pts"),
                        m("div", {class:"tc bb"},"1st"),
                        m("div", {class:"tc bb"},"2nd"),
                        m("div", {class:"tc bb"},"3rd"),
                        
                data.map((row)=>{
                    return [
                        m("div",{}, row[0]),
                        m("div",{class:"tc fw7"}, row[4]),
                        m("div",{class:"tc"}, row[1]),
                        m("div",{class:"tc"}, row[2]),
                        m("div",{class:"tc"}, row[3]),
                       
                    ]
                })
            )])

            //this is just aggregate rankings (3-2-1 point system)
        }
    }
}

const VotingTable = (vnode)=>{
    return {
        view:(vnode)=>{
             let data = AggregateVotingData(Host.participantData, vnode.attrs.id);
            return length(data)===0 ? null : m("div",{class:"pa3 ba b--black mv3 mh2"},
            [   m("h2", {class:"f4 fw7 mt2 mb4", style:"max-width:450px"}, vnode.attrs.title),
                m("div", {class:`${cx(VotedTable)}`}, 
                data.map((row)=>{
                    return [
                        m("img", {src:`static/${row[0]}.png`}),
                        m("div", Model.getFieldById(vnode.attrs.id, row[0], "name")),
                        m("div", {class:"tc fw7"}, row[1]),  
                    ]
                })
            )]
            )
        }
    }
}

let TempData = ''
const DataView = (vnode)=>{
    return {
        view: (vnode)=>{
          //  console.log(Object.values(Host.participantData))
            return m("section",{
                class:`flex flex-wrap center justify-around`
            },[
                DataSetting === "aggregate" ? 
                m(DataDash) : 
                Object.values(Host.participantData).map((item)=>{
                    return m(IndividualDataCard,{participant:item}) 
                })
               
            ])
        }
    }
}

const IndividualDataCard = (vnode)=>{
    return {
        view: (vnode)=>{
            const participant = vnode.attrs.participant
           // console.log(participant)
            return m("div",{class:"pa3 ba b--black mv3 mh2"}, [
                participant["name"] ? m("h2", {class:"f3 mb1 fw7"}, participant["name"]) : null,
                m("div",{class:``},[
                    isEmpty(participant["ranking1"]) ? null :
                    [m("p",{class:"fw7"}, "Internal court data initiatives should prioritize: "),
                    m("p", {}, [
                        participant["ranking1"].map((item, index)=>{
                            return m("p",{class:"mv0"}, `${index+1}. ${item}`)
                        })
                    ]),],
                    isEmpty(participant["ranking2"]) ? null :
                    [
                        m("p",{class:"fw7"}, "External court data initatives should prioritize: "),
                        m("p", {}, [
                            participant["ranking2"].map((item, index)=>{
                                return m("p",{class:"mv0"}, `${index+1}. ${item}`)
                            })
                        ]),
                    ],
                    isEmpty(participant["courtRole"]) ? null :
                    [
                        m("p",{class:"fw7"}, "What role should courts have in reviewing requests for court data?"),
                        m("p", {class:cx(flagGrid)}, [
                            m("img", {style:"width:75px;",src:`static/${participant["courtRole"]}.png`}),
                            m("span", Model.getFieldById("courtRole", participant["courtRole"], "name")),
                        ]),
                    ],
                    isEmpty(participant["partnership"]) ? null :
                   [
                        m("p",{class:"fw7"}, "Our court's primary data partner should be: "),
                        m("p", {class:cx(flagGrid)}, [
                            m("img", {style:"width:75px",src:`static/${participant["partnership"]}.png`}),
                            m("span", Model.getFieldById("partnership", participant["partnership"], "name")),
                        ]),
                    ],
                    isEmpty(participant["pilot"]) ? null :
                   [
                        m("p",{class:"fw7"}, "Our court's first pilot project should be:"),
                        m("p", {class:cx(flagGrid)}, [
                            m("img", {style:"width:75px",src:`static/${participant["pilot"]}.png`}),
                            m("span", Model.getFieldById("pilot", participant["pilot"], "name")),
                        ]),
                    ]
                ])
                
            ])
        }
    }
}

const DataDash = (vnode)=>{
    return {
        view: (vnode)=>{
            return [
                m(RankingTable, {data:Host.participantData, id: "ranking1", title:"Internal court data initiatives should prioritize: "}),
                m(RankingTable, {data:Host.participantData, id: "ranking2", title:"External court data initatives should prioritize: "}),
                m(VotingTable, {data:Host.participantData, id: "courtRole", title: "What role should courts have in reviewing requests for court data?"}),
                m(VotingTable, {data:Host.participantData, id: "partnership", title: "Our court's primary data partner should be: "}),
                m(VotingTable, {data:Host.participantData, id: "pilot", title: "Our court's first pilot project should be:"})
        ]
        }
    }
}

const RemoteItem = (vnode)=>{
    return {
        view: (vnode)=>{
            const highlight = vnode.attrs.route === TempRoute || vnode.attrs.route === PreviewRoute;
            return m("li", {
                class:`${vnode.attrs.class} f5 pv2 pointer ${highlight ? "bg-black-10 bn br3 b--black" : ""}`,
                onclick:(e)=>{
                    Host.update(vnode.attrs.room, {route:vnode.attrs.route})
                    //PreviewRoute = vnode.attrs.route
                },
                onmouseover:(e)=>{
                    TempRoute = vnode.attrs.route
                },
                onmouseout:(e)=>{
                    TempRoute = ""
                }

            }, vnode.attrs.copy)
        }
    }
}


let PreviewRoute;
let TempRoute = ''

const getRoute = (route)=>{return includes("pilot", route) ? "pilot" : route === "intro" ? "ready" : route}
const isReady = (item, route)=>{
                                if(item[route] && !(isEmpty(item[route])) ){
                                    return true} 
                                else {
                                    return false}
                                }

const getReady = (item)=>{
    const route = getRoute(Host.room.route)
   // console.log(route)
   // console.log(isReady(item, route))
    return isReady(item, route)
}
const isSynced = (item)=>{
    return Host.room.sync === item.sync
}
const readyParticipants = filter(getReady)
const activeParticipants = filter(isSynced)
const Remote = (vnode)=>{
    return {
        view:(vnode)=>{
            console.log(length(activeParticipants(Object.values(Host.participantData))))
            PreviewRoute = Host.room.route || "intro"
            let test = JSON.stringify(Host.participantData)
            return m("section", {class:cx(RemoteGrid)}, [
                m("aside",{class:`pa3 ba tc  bw1 ${cx(DashMenu)}`}, [
                    m("p", {class:"mt0"}, [
                        m("span", {class:"f4 fw7 mt1" }, `Ready: ${length(readyParticipants(Object.values(Host.participantData)))} / `), 
                        m("span", {class:"f4 fw7 mt1" }, `Participants: ${length(activeParticipants(Object.values(Host.participantData)))}`),
                    ]),
                    
                    m("p", {class:"tc"}, 
                    m("button",{class:"ba pointer b--black fw7 f5 pa2 bg-transparent black hover-white hover-bg-green mb2",oncreate:(vnode)=>{twemoji.parse(vnode.dom)},onclick:(e)=>{Host.resync(vnode.attrs.room)}},"🔄 Refresh"))

                       
                ]),
                m("aside", {class:`pa3 ba bw1 ${cx(RemoteMenu)}`}, [
                    m("form",{
                        class:`list pl1 lh-copy`,
                        oninput:(e)=>{Host.update(vnode.attrs.room, {route: e.target.value})}
                    },
                    [
                        m("h2", {class:"f2 fw7", oncreate:(vnode)=>{twemoji.parse(vnode.dom)}}, "🎮 Remote"),
                        m(RemoteItem,{room:vnode.attrs.room, route:"intro", copy: "Introduction", class:"pl1"}),
                        m("li",{class:"fw7 mid-gray pv2 pl1"}, `Part 1: Values`),
                        m(RemoteItem,{room:vnode.attrs.room, route:"ranking1", copy: "Internal Values", class:"ph4"}),
                        m(RemoteItem,{room:vnode.attrs.room, route:"ranking2", copy: "External Values", class:"ph4"}),
                        m(RemoteItem,{room:vnode.attrs.room, route:"mc", copy: "How should courts manage data requests?", class:"ph4"}),
                        m("li",{class:"fw7 mid-gray mv2"}, `Part 2: Partnership`),
                        m(RemoteItem,{room:vnode.attrs.room, route:"partnership", copy: "Choose a partnership", class:"ph4"}),
                        m("li",{class:"fw7 mid-gray mv2"}, `Part 3: Pilot`),
                        m("li",{class:"fw2 i f5"},  `Pick the pilot page that corresponds with your chosen partnership.`),
                        m(RemoteItem,{room:vnode.attrs.room, route:"pilot?partner=university", copy: "East Cherwell University Pilots", class:"pl4"}),
                        m(RemoteItem,{room:vnode.attrs.room, route:"pilot?partner=courtfeed", copy: "Courtfeed Pilots", class:"ph4"}),
                        m(RemoteItem,{room:vnode.attrs.room, route:"pilot?partner=iliad", copy: "Iliad Systems Pilots", class:"ph4"}),
                        m(RemoteItem,{room:vnode.attrs.room, route:"pilot?partner=government", copy: "Cherwell County Government Pilots", class:"pl4"}),
                        m("li",{class:"fw7 mid-gray mv2"}, `Part 4: Discussion`),
                        m(RemoteItem,{room:vnode.attrs.room, route:"discussion", copy: "Discussion questions and credits", class:"ph4"}),
                        //maybe separate

                    ]),
                ]),
                m("div", {
                    
                    oncreate:(vnode)=>{twemoji.parse(vnode.dom)},
                    class:`pa3 ba bw1 ${cx(RemotePreview)}`
                }, [
                    m("a", {},"👁️ Preview"),
                    m("div", {class:"mw8 center pa2", style:"box-sizing:content-box"},[
                        m(PreviewRouter[`${TempRoute==='' ? PreviewRoute : TempRoute}`])
                    ])
                ])
            ])
           
            

        }
    }
}

const PreviewRouter = {
    "/": (vnode)=>{
        return {
            view:(vnode)=>{
                return m(Introduction, {mp: false, preview: true})
            }
        }
    },
    "intro": (vnode)=>{
        return {
            view:(vnode)=>{
                return m(Introduction, {mp: false, preview: true})
            }
        }
    },
    "ranking1": (vnode)=>{
        return {
            view:(vnode)=>{
                return m(Ranking, {mp: false, preview: true})
            }
        }
    },
    "ranking2": (vnode)=>{
        return {
            view:(vnode)=>{
                return m(RankingTwo, {mp: false, preview: true})
            }
        }
    },
    "mc": (vnode)=>{
        return {
            view:(vnode)=>{
                return m(MC, {mp: false, preview: true})
            }
        }
    },
    "partnership": (vnode)=>{
        return {
            view:(vnode)=>{
                return m(PartnershipsView, {mp: false, preview: true})
            }
        }
    },
    "pilot?partner=university": (vnode)=>{
        return {
            view:(vnode)=>{
                return m(PilotsView, {mp: false, preview: true, partner:"university"})
            }
        }
    },
    "pilot?partner=courtfeed": (vnode)=>{
        return {
            view:(vnode)=>{
                return m(PilotsView, {mp: false, preview: true, partner:"courtfeed"})
            }
        }
    },
    "pilot?partner=iliad": (vnode)=>{
        return {
            view:(vnode)=>{
                return m(PilotsView, {mp: false, preview: true, partner:"iliad"})
            }
        }
    },
    "pilot?partner=government": (vnode)=>{
        return {
            view:(vnode)=>{
                return m(PilotsView, {mp: false, preview: true, partner:"county"})
            }
        }
    },
    "discussion": (vnode)=>{
        return {
            view:(vnode)=>{
                return m(Discussion, {mp: false, preview: true})
            }
        }
    },
}

export  {HostDash, IndividualDataCard}