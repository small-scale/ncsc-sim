//player status
import { getAuth, onAuthStateChanged, } from "firebase/auth";
import { db } from "../util/firebase";
import { arrayUnion, collection, doc, getDoc, getDocs, onSnapshot, setDoc, query, updateDoc, where } from "firebase/firestore"; 
import { UID } from "../util/uid";
import m from "mithril";
import { has, mergeDeepRight } from "ramda";

const auth = getAuth();
onAuthStateChanged(auth, async (user) => {
  if (user) {
    //check to see if userDoc exists. if it doesn't, create one.
    const userDoc = doc(db,"users",user.uid)
    const userSnap = await getDoc(userDoc)
    const uid = user.uid;
    User.id = uid;
    if(userSnap.exists()){
        console.log("exists")
        createListener(user.uid)
    } else {
        await setDoc(doc(db, "users", user.uid), {
            id: user.uid,
            host:[],
            join:[]
        })
        createListener(user.uid)
    }

    
    
    // ...
  } else {
    // User is signed out
    // ...
   // ConnectionListener();
  }
});

const createListener = (userId)=>{
    ConnectionListener = onSnapshot(doc(db, "users", userId), (doc)=>{
        // UserData = doc.data();
         User.host = doc.data().host,
         User.join = doc.data().join || []
         m.redraw()
     })
}


let User = {
    id: null,
    status: "",
    host:[],
    join:[]
}

let UserData;

const Run = {
    id: "",
    host: "",
    route:"",
}


const RunData = {

}

let ConnectionListener;

const Host = {

    init:async (uid)=>{
        //initialize
        if(User.id !== null){
            const id = UID()
            const sync = UID()
            Host.room = {
                owner: User.id,
                id: id,
                route: "intro",
                status:"open",
                sync:sync
                 
            }
            await setDoc(doc(db,"rooms",id),{
                owner: User.id,
                id: id,
                route: "intro",
                status:"open",
                sync:sync
                 
            },{
                merge: true
            });
            await setDoc(doc(db,"users",User.id),{
                host:arrayUnion(id)
            },
            {
                merge: true
            });
            Run.id = id
            return id
        }
        else return null
       
        
    },
    resync: async(room)=>{
        const newCode = UID();
        await Host.update(room, {sync:newCode})
        //return
    },
    update: async(room, data)=>{
        const roomRef = doc(db,"rooms",room)
        await updateDoc(roomRef, data, {merge:true})
        return
    },
    connect:async (room)=>{
        const roomRef = doc(db, "rooms", room)
        
        const roomSnap = await getDoc(roomRef);
        if(roomSnap.exists()){
            Host.room = roomSnap.data()
            m.redraw()
        }

        Host.roomListener = await onSnapshot(roomRef, (doc)=>{
            Host.room = doc.data()
            m.redraw()
        })
        const sync =  Host.room.sync || ""
        const participantRef = query(collection(db, "rooms", room, "participants"),where("sync", "==", sync))

        Host.participantListener = await onSnapshot(participantRef, (querySnapshot)=>{
            console.log('query')
            querySnapshot.forEach((doc)=>{
                console.log("doc")
                Host.participantData[doc.id] = doc.data() 
            })
            m.redraw();
        })
      //  Host.syncMaintainer=setInterval(Host.resync, 10000, room)
            //connect to data listeners
    },
    disconnect:()=>{
        if (Host.syncMaintainer!={}){
            clearInterval(Host.syncMaintainer)
        }
        if(Host.roomListener != {}){
            Host.roomListener();
        }
        if(Host.participantListener != {}){
            Host.participantListener();
        }
        Host.room = {}
        Host.participantData = {}
    },
    syncMaintainer: {},
    participantListener:{},
    roomListener:{},
    room:{},
    participantData: {

    }
}

const Heartbeat = {
    //heartbeat every X seconds
    //heartbeat on update event
    //heartbeat manual refresh
}


const Player = {
    init:(room)=>{
        //initial
    },
    check:async (room, userBypass)=>{
        //check if user is logged in
        if(User.id===null && userBypass === false){
            m.route.set("/mp", {error:"Not connected to online services."})
            return false;
        } else {
            console.log("user exists")
            //check if room exists
            const roomRef = doc(db, "rooms", room);
            const roomDoc = await getDoc(roomRef)
            const partRef = doc(db, "rooms", room, "participants", User.id);
            const partDoc = await getDoc(partRef)
            if(!roomDoc.exists()){
                console.log("room does not exist")
                m.route.set("/join", {error:"Room does not exist"})
                return false;
            } else if(roomDoc.data().status === "closed") {
                console.log("room is closed")
                m.route.set("/join", {error:"Room is closed"})
                return false;
            } else if (!partDoc.exists()){
                console.log("room is open but player isn't joined")
                m.route.set("/join", {error:"The room is open, but you need to join first"})
                return false;
            } else {
                console.log("everything ok")
                await Player.connect(room)
                m.redraw();
                return true
            }
            

        }
    },
    ready:()=>{
        //mark status as ready
    },
    disconnect:()=>{
        if(Player.roomListener != {}){
            Player.roomListener();
        }
        if(Player.playerListener != {}){
            Player.playerListener();
        }
        Player.playerData = {
            ready: false,
            ranking1: [],
            ranking2: [],
            courtRole: "",
            partnership: "",
            pilot: ""
        }
    },
    submit:async (room, data)=>{
        if(room!==null){
            const partRef = doc(db, "rooms", room, "participants", User.id);
            await updateDoc(partRef, data, {merge:true})
            return;
        } else {
            //if not multiplayer, skip all that and just update Player.playerData
            const updatedData = mergeDeepRight(Player.playerData, data)
            Player.playerData = updatedData;
            return;
        }
        
        //send data to connection
    },
    connect:async (room)=>{
        const participantRef = doc(db,"rooms",room,"participants",User.id)
        const roomRef = doc(db, "rooms", room)

        Player.roomListener = onSnapshot(roomRef,(doc)=>{
            const oldRoute = Player.roomData.route
            const oldSync = Player.roomData.sync
            if(oldRoute !== doc.data().route){
                window.scrollTo(0,0)
            }
            if(oldSync !== doc.data().sync){
                Player.submit(room, {sync: doc.data().sync})
            }
            Player.roomData = doc.data();
            m.redraw();
        })

        Player.participantListener = onSnapshot(participantRef,(doc)=>{
            Player.playerData = doc.data();
            m.redraw();

        })
    },
    join:async (room, name)=>{
        const roomRef = doc(db, "rooms", room);
        const roomSnap = await getDoc(roomRef);

        if(roomSnap.exists() && roomSnap.data().status == "open"){
            const partRef = collection(db, "rooms", room, "participants")
         
            await setDoc(doc(partRef, User.id), {
                id: User.id,
                name:name,
                ready: false,
                ranking1: [],
                ranking2: [],
                courtRole: "",
                partnership: "",
                pilot: ""
                
            }, {merge: true})
            await setDoc(doc(db,"users",User.id),{
                join:arrayUnion(room)
            },
            {
                merge: true
            }); 
            return room
        }
        
    },
    playerListener:{},
    roomListener:{},
    roomData:{},
    playerData: {
        ready: false,
        ranking1: [],
        ranking2: [],
        courtRole: "",
        partnership: "",
        pilot: ""
    },
}
//game status 

export {Player, Host, User, Run, RunData, UserData}