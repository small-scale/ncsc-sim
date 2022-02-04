import m from "mithril"
import Layout from "./view/layout"
import Discussion from "./view/pages/discussion"
import Introduction from "./view/pages/intro"
import MC from "./view/pages/mc"
import {PartnershipsView} from "./view/pages/partnerships"
import PilotsView from "./view/pages/pilots"
import Ranking from "./view/pages/ranking"
import RankingTwo from "./view/pages/ranking2"

const AppRouter = ()=>{
    m.route(document.body,'/',{
        '/':{
            
            view:()=>{
                window.scrollTo(0,0);
               return m(Layout, m(Introduction))
            }
        },
        '/ranking1':{
            view:()=>{
                window.scrollTo(0,0);
               return m(Layout, m(Ranking))
            }
        },
        '/ranking2':{
            view:()=>{
                window.scrollTo(0,0);
               return m(Layout, m(RankingTwo))
            }
        },
        '/mc1':{
            view:()=>{
                window.scrollTo(0,0);
                return m(Layout, m(MC))
            }
        },
        '/partnership':{
            view:()=>{
                window.scrollTo(0,0);
                return m(Layout, m(PartnershipsView))
            }
        },
        '/pilots':{
            view:(vnode)=>{
                window.scrollTo(0,0);
                return m(Layout, m(PilotsView, {partner:m.route.param("partner")}))
            }
        },
        '/discussion':{
            view:()=>{
                window.scrollTo(0,0);
               return m(Layout, m(Discussion))
            }
        },
    })
}

AppRouter();