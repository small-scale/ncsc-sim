import m from "mithril"
import Layout from "./view/layout"
import Discussion from "./view/pages/discussion"
import Introduction from "./view/pages/intro"
import MC from "./view/pages/mc"
import {PartnershipsView} from "./view/pages/partnerships"
import PilotsView from "./view/pages/pilots"
import Ranking from "./view/pages/ranking"
import RankingTwo from "./view/pages/ranking2"

document.addEventListener('scroll', function(e) {
    console.log("scroll")
  });


const AppRouter = ()=>{
    m.route(document.body,'/',{
        '/':{
            onmatch:()=>{
                window.scrollTo(0,0)
            },
            render:()=>{
               return m(Layout, m(Introduction))
            }
        },
        '/ranking1':{
            onmatch:()=>{
                window.scrollTo(0,0)
            },
            render:()=>{
               return m(Layout, m(Ranking))
            }
        },
        '/ranking2':{
            onmatch:()=>{
                window.scrollTo(0,0)
            },
            render:()=>{
               return m(Layout, m(RankingTwo))
            }
        },
        '/mc1':{
            onmatch:()=>{
                window.scrollTo(0,0)
            },
            render:()=>{
                return m(Layout, m(MC))
            }
        },
        '/partnership':{
            onmatch:()=>{
                window.scrollTo(0,0)
            },
            render:()=>{
                return m(Layout, m(PartnershipsView))
            }
        },
        '/pilots':{
            onmatch:()=>{
                window.scrollTo(0,0)
            },
            render:(vnode)=>{
                return m(Layout, m(PilotsView, {partner:m.route.param("partner")}))
            }
        },
        '/discussion':{
            onmatch:()=>{
                window.scrollTo(0,0)
            },
            render:()=>{
               return m(Layout, m(Discussion))
            }
        },
    })
}

AppRouter();