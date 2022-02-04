import m from "mithril"
import Layout from "./view/layout"
import Discussion from "./view/pages/discussion"
import Introduction from "./view/pages/intro"
import MC from "./view/pages/mc"
import DevMenu from "./view/pages/devmenu"
import {PartnershipsView} from "./view/pages/partnerships"
import PilotsView from "./view/pages/pilots"
import Ranking from "./view/pages/ranking"
import RankingTwo from "./view/pages/ranking2"

document.addEventListener('scroll', function(e) {
    console.log("scroll")
  });

m.mount(
    // Don't attach to the document
    document.createDocumentFragment(),
    {
        route: null,
      // We need a valid view for Mithril to behave
      view : (vnode) => '',
  
      // Will execute on the DOM ready phase of every draw
      onupdate(){
        const route = m.route.get()
  
        if(route !== this.route) {
            scrollTo(0, 0)
            console.log("scroll")
        }
     
        this.route = route
      }
    }
  )
const AppRouter = ()=>{
    m.route(document.body,'/',{
        '/devmenu':{
            view:()=>{
                return m(Layout, m(DevMenu))
            }
        },
        '/':{
            
            view:()=>{
               return m(Layout, m(Introduction))
            }
        },
        '/ranking1':{
            view:()=>{
               return m(Layout, m(Ranking))
            }
        },
        '/ranking2':{
            view:()=>{
               return m(Layout, m(RankingTwo))
            }
        },
        '/mc1':{
            view:()=>{
                return m(Layout, m(MC))
            }
        },
        '/partnership':{
            view:()=>{
                return m(Layout, m(PartnershipsView))
            }
        },
        '/pilots':{
            view:(vnode)=>{
                return m(Layout, m(PilotsView, {partner:m.route.param("partner")}))
            }
        },
        '/discussion':{
            view:()=>{
               return m(Layout, m(Discussion))
            }
        },
    })
}

AppRouter();