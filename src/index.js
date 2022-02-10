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
import MultiplayerMenu from "./view/pages/multiplayer"
import HostDash from "./view/pages/host"
import { JoinDash, JoinView } from "./view/pages/join"
import { Player } from "./model/multiplayer"
import { signInAnonymously } from "firebase/auth"
import { auth } from "./util/firebase"



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
        '/mp':{
            view:()=>{
                return m(Layout, m(MultiplayerMenu, {error:m.route.param("error")}))
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
        '/mc':{
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
        '/host/:id':{
            // TODO: use a route resolver to prevent navigation to this page without setting options
            view:(vnode)=>{
               return m(Layout, {full:true},m(HostDash, {room: m.route.param("id")}))
            }
        },
        '/join':{
            view:()=>{
               return m(Layout, m(JoinDash, {room:m.route.param("room")}))
            }
        },
        '/run/:id':{
            onmatch: async (args)=>{
                signInAnonymously(auth).then(async () => {
                    console.log("checking")
                    await Player.check(args["id"], true)

                  })
                  .catch(async (error) => {
                    await Player.check(args["id"], false)
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ...
                  });
            },
            // TODO: use a route resolver to prevent navigation to this page without setting options
            render:()=>{
               return m(Layout, m(JoinView, {room: m.route.param("id")}))
            }
        },
    })
}

AppRouter();