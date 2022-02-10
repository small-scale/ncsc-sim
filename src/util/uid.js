import { customAlphabet } from 'nanoid'

const UID = ()=>{
    const nanoid = customAlphabet("BCDFGHKJLMNPQRSTUVWXZ",6)
    return nanoid();
}


export {UID}