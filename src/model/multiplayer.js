//player status

const User = {
    id: null,
    status: "",
}

const Run = {
    id: "",
    host: "",
    route:"",
}

const RunData = {

}

const Host = {
    init:()=>{
        //initialize
    },
    start:()=>{
        //start run
    },
    goTo:(route)=>{
        //direct everyone to route
    },
    pause:(route)=>{
        //coffee break (toggle)
    },
    end:()=>{
        //end run
    },
    connect:()=>{
        //connect to data listeners
    },
}



const Player = {
    init:()=>{
        //initial
    },
    ready:()=>{
        //mark status as ready
    },
    disconnect:()=>{
        
    },
    submit:(data)=>{
        //send data to connection
    },
    connect:()=>{
        //connect to data listeners
    },
    join:(room)=>{
        //join a room
    }
}
//game status 

export {Player, Host, User, Run, RunData }